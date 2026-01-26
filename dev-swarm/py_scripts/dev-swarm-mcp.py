#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import logging
import os
import queue
import re
import shutil
import subprocess
import threading
import time
import urllib.error
import urllib.request
from dataclasses import dataclass
import hashlib
from pathlib import Path
from typing import Any, Iterable, Mapping

import yaml
from dotenv import load_dotenv
from fastmcp import FastMCP
from pydantic import BaseModel, Field


LOGGER = logging.getLogger("mcp-to-skills")
LOCK_FILENAME = "mcp_settings.lock"


class ServerConfig(BaseModel):
    id: str
    command: str | None = None
    args: list[str] = Field(default_factory=list)
    env: dict[str, str] = Field(default_factory=dict)
    url: str | None = None
    type: str | None = None
    transport: str | None = None
    headers: dict[str, str] = Field(default_factory=dict)
    disabled: bool = False
    enabled: bool | None = None


@dataclass
class ToolDef:
    name: str
    description: str
    input_schema: dict[str, Any]


class MCPError(RuntimeError):
    pass


class MCPClient:
    def list_tools(self) -> list[ToolDef]:
        raise NotImplementedError

    def call_tool(self, tool_name: str, arguments: dict[str, Any] | None) -> Any:
        raise NotImplementedError

    def request(self, method: str, params: dict[str, Any] | None) -> Any:
        raise NotImplementedError

    def close(self) -> None:
        return None


class StdioClient(MCPClient):
    _response_timeout_seconds = 30

    def __init__(self, command: str, args: list[str], env: dict[str, str]) -> None:
        self._next_id = 1
        self._lock = threading.Lock()
        self._stdout_queue: queue.Queue[str] = queue.Queue()
        self._stdout_closed = threading.Event()
        merged_env = os.environ.copy()
        merged_env.update(env)
        self._process = subprocess.Popen(
            [command, *args],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            bufsize=1,
            env=merged_env,
        )
        self._stderr_thread = threading.Thread(target=self._drain_stderr, daemon=True)
        self._stderr_thread.start()
        self._stdout_thread = threading.Thread(target=self._drain_stdout, daemon=True)
        self._stdout_thread.start()
        self._initialize()

    def _drain_stderr(self) -> None:
        if self._process.stderr is None:
            return
        for line in self._process.stderr:
            LOGGER.debug("mcp-stderr", extra={"line": line.rstrip()})

    def _drain_stdout(self) -> None:
        if self._process.stdout is None:
            self._stdout_closed.set()
            return
        for line in self._process.stdout:
            self._stdout_queue.put(line)
        self._stdout_closed.set()

    def _initialize(self) -> None:
        try:
            params = {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "mcp-to-skills", "version": "0.1"},
            }
            self.request("initialize", params)
            self._send_notification("initialized", {})
        except Exception as exc:  # pragma: no cover - best effort for unknown servers
            LOGGER.warning(f"initialize_failed for StdioClient: {exc}")

    def _send_notification(self, method: str, params: dict[str, Any] | None) -> None:
        payload = {"jsonrpc": "2.0", "method": method, "params": params or {}}
        self._write_payload(payload)

    def _write_payload(self, payload: dict[str, Any]) -> None:
        if self._process.stdin is None:
            raise MCPError("stdio process stdin unavailable")
        encoded = json.dumps(payload)
        self._process.stdin.write(encoded + "\n")
        self._process.stdin.flush()

    def _read_response(self, request_id: int) -> Any:
        if self._process.stdout is None:
            raise MCPError("stdio process stdout unavailable")
        deadline = time.monotonic() + self._response_timeout_seconds
        while True:
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                raise MCPError("stdio response timed out")
            try:
                line = self._stdout_queue.get(timeout=remaining)
            except queue.Empty:
                if self._stdout_closed.is_set():
                    raise MCPError("stdio process closed while awaiting response")
                raise MCPError("stdio response timed out")
            line = line.strip()
            if not line:
                continue
            try:
                message = json.loads(line)
            except json.JSONDecodeError:
                continue
            if message.get("id") != request_id:
                continue
            if "error" in message:
                raise MCPError(message["error"])
            return message.get("result")

    def request(self, method: str, params: dict[str, Any] | None) -> Any:
        with self._lock:
            request_id = self._next_id
            self._next_id += 1
            payload = {
                "jsonrpc": "2.0",
                "id": request_id,
                "method": method,
                "params": params or {},
            }
            self._write_payload(payload)
            return self._read_response(request_id)

    def list_tools(self) -> list[ToolDef]:
        result = self.request("tools/list", {}) or {}
        return parse_tools(result)

    def call_tool(self, tool_name: str, arguments: dict[str, Any] | None) -> Any:
        params = {"name": tool_name, "arguments": arguments or {}}
        return self.request("tools/call", params)

    def close(self) -> None:
        if self._process.poll() is None:
            self._process.terminate()


class HttpClient(MCPClient):
    def __init__(self, url: str, headers: dict[str, str], sse: bool) -> None:
        self._url = url
        self._headers = headers
        self._sse = sse
        self._next_id = 1
        self._lock = threading.Lock()
        self._initialize()

    def _initialize(self) -> None:
        try:
            params = {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {"name": "mcp-to-skills", "version": "0.1"},
            }
            self.request("initialize", params)
        except Exception as exc:  # pragma: no cover - best effort for unknown servers
            LOGGER.warning(f"initialize_failed for HttpClient: {exc}")

    def request(self, method: str, params: dict[str, Any] | None) -> Any:
        with self._lock:
            request_id = self._next_id
            self._next_id += 1
        payload = {
            "jsonrpc": "2.0",
            "id": request_id,
            "method": method,
            "params": params or {},
        }
        if self._sse:
            return self._request_sse(request_id, payload)
        return self._request_http(request_id, payload)

    def _request_http(self, request_id: int, payload: dict[str, Any]) -> Any:
        response = _post_json(self._url, payload, self._headers)
        if response.get("id") != request_id:
            raise MCPError("mismatched response id")
        if "error" in response:
            raise MCPError(response["error"])
        return response.get("result")

    def _request_sse(self, request_id: int, payload: dict[str, Any]) -> Any:
        response = _post_sse(self._url, payload, self._headers)
        if response.get("id") != request_id:
            raise MCPError("mismatched response id")
        if "error" in response:
            raise MCPError(response["error"])
        return response.get("result")

    def list_tools(self) -> list[ToolDef]:
        result = self.request("tools/list", {}) or {}
        return parse_tools(result)

    def call_tool(self, tool_name: str, arguments: dict[str, Any] | None) -> Any:
        params = {"name": tool_name, "arguments": arguments or {}}
        return self.request("tools/call", params)


class MCPManager:
    def __init__(self, servers: list[ServerConfig]) -> None:
        self._servers = {server.id: server for server in servers}
        self._clients: dict[str, MCPClient] = {}

    def get_client(self, server_id: str) -> MCPClient:
        if server_id in self._clients:
            return self._clients[server_id]
        config = self._servers.get(server_id)
        if config is None:
            raise MCPError(f"Unknown server_id: {server_id}")
        transport = resolve_transport(config)
        if transport == "stdio":
            if not config.command:
                raise MCPError(f"Missing command for stdio server {server_id}")
            client: MCPClient = StdioClient(config.command, config.args, config.env)
        elif transport in {"http", "streamable-http"}:
            if not config.url:
                raise MCPError(f"Missing url for http server {server_id}")
            client = HttpClient(config.url, config.headers, sse=(transport == "streamable-http"))
        elif transport == "sse":
            if not config.url:
                raise MCPError(f"Missing url for sse server {server_id}")
            client = HttpClient(config.url, config.headers, sse=True)
        else:
            raise MCPError(f"Unsupported transport: {transport}")
        self._clients[server_id] = client
        return client

    def list_tools(self, server_id: str) -> list[ToolDef]:
        return self.get_client(server_id).list_tools()

    def call_tool(self, server_id: str, tool_name: str, arguments: dict[str, Any] | None) -> Any:
        return self.get_client(server_id).call_tool(tool_name, arguments)

    def request(self, server_id: str, method: str, params: dict[str, Any] | None) -> Any:
        return self.get_client(server_id).request(method, params)

    def close(self) -> None:
        for client in self._clients.values():
            client.close()


def resolve_transport(config: ServerConfig) -> str:
    if config.transport:
        normalized = config.transport.replace("_", "-").lower()
        if normalized == "streamable-http":
            return "streamable-http"
        return normalized
    if config.type:
        normalized = config.type.replace("_", "-").lower()
        if normalized in {"streamable-http", "http"}:
            return "streamable-http"
        return normalized
    if config.command:
        return "stdio"
    if config.url:
        if "sse" in config.url.lower():
            return "sse"
        return "http"
    raise MCPError(f"Server {config.id} missing transport information")


def parse_tools(result: dict[str, Any]) -> list[ToolDef]:
    tools = result.get("tools") or []
    parsed: list[ToolDef] = []
    for tool in tools:
        name = tool.get("name") or ""
        if not name:
            continue
        parsed.append(
            ToolDef(
                name=name,
                description=tool.get("description") or "",
                input_schema=tool.get("inputSchema") or {},
            )
        )
    return parsed


def _post_json(url: str, payload: dict[str, Any], headers: dict[str, str]) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=body, method="POST")
    request.add_header("Content-Type", "application/json")
    request.add_header("Accept", "application/json, text/event-stream")
    for key, value in headers.items():
        request.add_header(key, value)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            content = response.read().decode("utf-8")
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8")
        raise MCPError(f"HTTP error {exc.code}: {error_body}") from exc
    try:
        return json.loads(content)
    except json.JSONDecodeError as exc:
        raise MCPError("Invalid JSON response from MCP server") from exc


def _post_sse(url: str, payload: dict[str, Any], headers: dict[str, str]) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(url, data=body, method="POST")
    request.add_header("Content-Type", "application/json")
    # Some MCP servers require clients to accept both JSON and SSE responses.
    request.add_header("Accept", "application/json, text/event-stream")
    for key, value in headers.items():
        request.add_header(key, value)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            raw = response.read()
            return _parse_sse_payload(raw)
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8")
        raise MCPError(f"HTTP error {exc.code}: {error_body}") from exc


def _parse_sse_payload(raw: bytes) -> dict[str, Any]:
    text = raw.decode("utf-8", errors="replace")
    for line in text.splitlines():
        line = line.strip()
        if not line or not line.startswith("data:"):
            continue
        payload = line.replace("data:", "", 1).strip()
        if payload in {"[DONE]", ""}:
            continue
        try:
            return json.loads(payload)
        except json.JSONDecodeError:
            continue
    try:
        return json.loads(text)
    except json.JSONDecodeError as exc:
        raise MCPError("No JSON response received from SSE stream") from exc


def load_mcp_settings_data(raw: dict[str, Any]) -> list[ServerConfig]:
    """Load MCP settings from already-expanded configuration dict.

    Note: Placeholders should already be expanded before calling this function.
    """
    server_map = raw.get("mcpServers")
    if not isinstance(server_map, dict):
        raise MCPError("mcpServers missing or invalid in settings file")
    configs: list[ServerConfig] = []
    for server_id, config in server_map.items():
        if not isinstance(config, dict):
            continue
        merged = {"id": server_id, **config}

        # Handle command as array: split into command (first element) and args (rest)
        if isinstance(merged.get("command"), list):
            cmd_list = merged["command"]
            if cmd_list:
                merged["command"] = cmd_list[0]
                # Merge with existing args if any
                existing_args = merged.get("args", [])
                merged["args"] = cmd_list[1:] + existing_args
            else:
                merged["command"] = None

        configs.append(ServerConfig(**merged))
    return configs


def is_server_enabled(config: ServerConfig) -> bool:
    if config.enabled is not None:
        return config.enabled
    return not config.disabled


def camel_to_kebab(value: str) -> str:
    """Convert camelCase or PascalCase to kebab-case."""
    # Insert hyphen before uppercase letters that follow lowercase letters
    value = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", value)
    # Insert hyphen before uppercase letters that are followed by lowercase letters
    value = re.sub(r"([A-Z]+)([A-Z][a-z])", r"\1-\2", value)
    return value.lower()


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    if not value:
        raise MCPError("Skill name resolved to empty string")
    return value


def skill_dir(base_dir: Path, server_id: str, tool_name: str) -> Path:
    # Convert server_id to kebab-case first (e.g., backgroundProcess -> background-process)
    kebab_server_id = camel_to_kebab(server_id)
    skill_name = slugify(f"{kebab_server_id}-{tool_name}")
    return base_dir / skill_name


def render_skill(tool: ToolDef, server_id: str, description_override: str | None = None) -> str:
    # Frontmatter description: use override if available, otherwise use tool description
    frontmatter_description = description_override or tool.description or f"Invoke MCP tool {tool.name} on server {server_id}."
    frontmatter_description = " ".join(frontmatter_description.splitlines()).strip()
    frontmatter_description = frontmatter_description.replace("\"", "\\\"")

    # Tool description (body): always use the original MCP tool description
    tool_description = tool.description or f"Invoke MCP tool {tool.name} on server {server_id}."
    tool_description = " ".join(tool_description.splitlines()).strip()

    input_schema = json.dumps(tool.input_schema or {}, indent=2, ensure_ascii=True)
    # Convert server_id to kebab-case for skill name (e.g., backgroundProcess -> background-process)
    kebab_server_id = camel_to_kebab(server_id)
    template = f"""---
name: {slugify(f"{kebab_server_id}-{tool.name}")}
description: "{frontmatter_description}"
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{{"server_id":"{server_id}","tool_name":"{tool.name}","arguments":{{}}}}
```

## Tool Description
{tool_description}

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{input_schema}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{{"server_id":"{server_id}","method":"tasks/status","params":{{"task_id":"<task_id>"}}}}
```
"""
    return template


def parse_description_value(raw: str) -> str:
    value = raw.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in {'"', "'"}:
        quote = value[0]
        value = value[1:-1]
        if quote == '"':
            value = value.replace('\\"', '"')
        else:
            value = value.replace("\\'", "'")
    return " ".join(value.split()).strip()


def read_frontmatter_description(skill_path: Path) -> str | None:
    if not skill_path.exists():
        return None
    content = skill_path.read_text()
    match = re.match(r"(?s)^---\n(.*?)\n---\n", content)
    if not match:
        return None
    for line in match.group(1).splitlines():
        if line.lstrip().startswith("description:"):
            raw_value = line.split(":", 1)[1]
            parsed = parse_description_value(raw_value)
            return parsed or None
    return None


@dataclass(frozen=True)
class SkillEntry:
    name: str
    path: Path
    content: str


def load_lock(path: Path) -> dict[str, Any] | None:
    if not path.exists():
        return None
    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError:
        LOGGER.warning("invalid_mcp_settings_lock", extra={"path": str(path)})
        return None
    if not isinstance(data, dict):
        return None
    return data


def write_lock(path: Path, hash_value: str) -> None:
    payload = {"hash": hash_value}
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=True))


def gather_tools(manager: MCPManager, server_ids: Iterable[str]) -> dict[str, list[ToolDef]]:
    tools_by_server: dict[str, list[ToolDef]] = {}
    for server_id in server_ids:
        try:
            tools_by_server[server_id] = manager.list_tools(server_id)
        except Exception as exc:
            LOGGER.error(f"tools_list_failed, for server_id={server_id}: {exc}")
    return tools_by_server


def build_skill_entries(
    output_dir: Path,
    tools_by_server: dict[str, list[ToolDef]],
    description_overrides: Mapping[str, str] | None = None,
) -> list[SkillEntry]:
    entries: list[SkillEntry] = []
    overrides = description_overrides or {}
    for server_id in sorted(tools_by_server.keys()):
        tools = sorted(tools_by_server[server_id], key=lambda tool: tool.name)
        for tool in tools:
            tool_path = skill_dir(output_dir, server_id, tool.name)
            skill_path = tool_path / "SKILL.md"
            skill_name = tool_path.name
            existing_description = read_frontmatter_description(skill_path)
            override_description = overrides.get(skill_name)
            description = override_description or existing_description or None
            entries.append(
                SkillEntry(
                    name=tool.name,
                    path=skill_path,
                    content=render_skill(tool, server_id, description),
                )
            )
    return entries


def compute_skills_hash(entries: list[SkillEntry], base_dir: Path) -> str:
    payload: list[dict[str, str]] = []
    for entry in sorted(entries, key=lambda item: (item.name, str(item.path))):
        try:
            path_value = str(entry.path.relative_to(base_dir))
        except ValueError:
            path_value = str(entry.path)
        payload.append({"name": entry.name, "path": path_value, "content": entry.content})
    raw = json.dumps(payload, ensure_ascii=True, sort_keys=True).encode("utf-8")
    return hashlib.sha256(raw).hexdigest()


def write_skills(
    entries: list[SkillEntry],
    force_refresh: bool,
) -> None:
    for entry in entries:
        tool_path = entry.path.parent
        if tool_path.exists() and not force_refresh:
            continue
        tool_path.mkdir(parents=True, exist_ok=True)
        entry.path.write_text(entry.content)


def get_all_skill_dirs(
    mcp_skills_dir: Path,
    server_id: str,
    include_symlinks: bool = False,
) -> list[Path]:
    """Get all skill directories (or symlinks) for a given server."""
    if not mcp_skills_dir.exists():
        return []
    # Convert server_id to kebab-case first (e.g., backgroundProcess -> background-process)
    kebab_server_id = camel_to_kebab(server_id)
    pattern = f"{slugify(kebab_server_id)}-*"
    matches: list[Path] = []
    for path in mcp_skills_dir.glob(pattern):
        if path.is_dir():
            matches.append(path)
            continue
        if include_symlinks and path.is_symlink():
            matches.append(path)
    return sorted(matches)


def build_expected_skill_names(
    output_dir: Path,
    tools_by_server: dict[str, list[ToolDef]],
) -> dict[str, set[str]]:
    expected: dict[str, set[str]] = {}
    for server_id, tools in tools_by_server.items():
        expected[server_id] = {skill_dir(output_dir, server_id, tool.name).name for tool in tools}
    return expected


def remove_skill_path(path: Path) -> None:
    if not path.exists():
        return
    if path.is_symlink() or path.is_file():
        path.unlink()
        return
    if path.is_dir():
        shutil.rmtree(path)


def prune_mcp_skills(
    mcp_skills_dir: Path,
    expected_skill_names: dict[str, set[str]],
    disabled_servers: set[str],
) -> None:
    for server_id in disabled_servers:
        for skill_path in get_all_skill_dirs(mcp_skills_dir, server_id):
            remove_skill_path(skill_path)

    for server_id, expected_names in expected_skill_names.items():
        existing_paths = get_all_skill_dirs(mcp_skills_dir, server_id)
        for skill_path in existing_paths:
            if skill_path.name not in expected_names:
                remove_skill_path(skill_path)


def manage_symlinks(
    mcp_skills_dir: Path,
    skills_dir: Path,
    expected_skill_names: dict[str, set[str]],
    disabled_servers: set[str],
) -> None:
    """
    Manage symlinks from skills_dir to mcp_skills_dir.
    - Create symlinks for enabled servers
    - Remove symlinks for disabled servers
    - Remove symlinks for removed tools on enabled servers
    - Symlinks are relative paths
    """
    skills_dir.mkdir(parents=True, exist_ok=True)

    # Create symlinks for enabled servers
    for server_id, skill_names in expected_skill_names.items():
        for skill_name in sorted(skill_names):
            symlink_path = skills_dir / skill_name

            # Create relative symlink: ../mcp-skills/<skill-name>
            relative_target = Path("..") / "mcp-skills" / skill_name

            if symlink_path.exists() or symlink_path.is_symlink():
                # Check if it's already the correct symlink
                if symlink_path.is_symlink() and symlink_path.readlink() == relative_target:
                    continue
                # Remove old symlink or file; avoid unlinking directories.
                if symlink_path.is_symlink() or symlink_path.is_file():
                    symlink_path.unlink()
                else:
                    LOGGER.warning(
                        "symlink_path_exists_not_removed",
                        extra={"path": str(symlink_path)},
                    )
                    continue

            symlink_path.symlink_to(relative_target)
            LOGGER.debug(f"Created symlink: {symlink_path} -> {relative_target}")

    # Remove symlinks for tools removed from enabled servers
    for server_id, skill_names in expected_skill_names.items():
        skill_dirs = get_all_skill_dirs(skills_dir, server_id, include_symlinks=True)
        for skill_path in skill_dirs:
            if skill_path.name in skill_names:
                continue
            if skill_path.is_symlink() or skill_path.is_file():
                skill_path.unlink()
                LOGGER.debug(f"Removed stale symlink: {skill_path}")

    # Remove symlinks for disabled servers
    for server_id in disabled_servers:
        skill_dirs = get_all_skill_dirs(skills_dir, server_id, include_symlinks=True)
        for skill_path in skill_dirs:
            skill_name = skill_path.name
            symlink_path = skills_dir / skill_name

            if symlink_path.is_symlink():
                symlink_path.unlink()
                LOGGER.debug(f"Removed symlink: {symlink_path}")


@dataclass
class Bridge:
    manager: MCPManager

    def handle_request(self, payload: dict[str, Any]) -> dict[str, Any]:
        server_id = payload.get("server_id")
        if not isinstance(server_id, str) or not server_id:
            raise MCPError("request missing server_id, this is a skill to mcp tool bridge, please use the best agent skill with server_id instead of calling mcp tool directly")
        if "tool_name" in payload:
            tool_name = payload.get("tool_name")
            if not isinstance(tool_name, str) or not tool_name:
                raise MCPError("request missing tool_name")
            arguments = payload.get("arguments")
            if arguments is not None and not isinstance(arguments, dict):
                raise MCPError("arguments must be an object")
            result = self.manager.call_tool(server_id, tool_name, arguments)
            return {"status": "ok", "result": result}
        if "method" in payload:
            method = payload.get("method")
            if not isinstance(method, str) or not method:
                raise MCPError("request missing method")
            params = payload.get("params")
            if params is not None and not isinstance(params, dict):
                raise MCPError("params must be an object")
            result = self.manager.request(server_id, method, params)
            return {"status": "ok", "result": result}
        raise MCPError("request must include tool_name or method")

    def handle_request_json(self, json_str: str) -> str:
        try:
            payload = json.loads(json_str)
        except json.JSONDecodeError:
            return json.dumps({"status": "error", "detail": "invalid_json"}, ensure_ascii=True)
        if not isinstance(payload, dict):
            return json.dumps({"status": "error", "detail": "payload must be object"}, ensure_ascii=True)
        try:
            response = self.handle_request(payload)
        except Exception as exc:
            return json.dumps({"status": "error", "detail": str(exc)}, ensure_ascii=True)
        return json.dumps(response, ensure_ascii=True)


def build_bridge(
    *,
    mcp_settings_data: dict[str, Any] | None,
    force_refresh: bool,
    output_dir: Path | None,
    log_level: str,
    description_overrides: Mapping[str, str] | None = None,
) -> tuple[Bridge, bool]:
    logging.basicConfig(level=log_level.upper(), format="%(levelname)s %(message)s")
    base_dir = Path(__file__).resolve().parents[1]
    output_root = output_dir or base_dir / "mcp-skills"
    skills_dir = base_dir / "skills"
    lock_path = base_dir / LOCK_FILENAME

    lock_data = load_lock(lock_path)
    lock_hash = None
    if lock_data:
        lock_hash = lock_data.get("hash")

    if mcp_settings_data is None:
        raise MCPError("mcp_settings_data is required for build_bridge")
    all_configs = load_mcp_settings_data(mcp_settings_data)
    enabled_configs = [c for c in all_configs if is_server_enabled(c)]
    disabled_configs = [c for c in all_configs if not is_server_enabled(c)]

    enabled_server_ids = {config.id for config in enabled_configs}
    disabled_server_ids = {config.id for config in disabled_configs}

    manager = MCPManager(enabled_configs)
    server_ids = [config.id for config in enabled_configs]

    tools_by_server = gather_tools(manager, server_ids)
    entries = build_skill_entries(output_root, tools_by_server, description_overrides)
    expected_skill_names = build_expected_skill_names(output_root, tools_by_server)
    skills_hash = compute_skills_hash(entries, base_dir)

    lock_changed = skills_hash != lock_hash
    should_refresh = force_refresh or lock_changed

    write_skills(entries, should_refresh)
    prune_mcp_skills(output_root, expected_skill_names, disabled_server_ids)
    manage_symlinks(output_root, skills_dir, expected_skill_names, disabled_server_ids)

    if lock_changed:
        write_lock(lock_path, skills_hash)

    return Bridge(manager=manager), lock_changed


class BridgeSync:
    def __init__(
        self,
        *,
        mcp_settings_data: dict[str, Any],
        force_refresh: bool,
        output_dir: Path | None,
        log_level: str,
        description_overrides: Mapping[str, str] | None = None,
    ) -> None:
        self._mcp_settings_data = mcp_settings_data
        self._force_refresh = force_refresh
        self._output_dir = output_dir
        self._log_level = log_level
        self._description_overrides = description_overrides
        self._ready = threading.Event()
        self._bridge: Bridge | None = None
        self._lock_changed = False
        self._error: Exception | None = None
        self._message = "Syncing MCP tools in background. First tool call will wait until ready."

    def start(self) -> None:
        thread = threading.Thread(target=self._run, daemon=True)
        thread.start()

    def _run(self) -> None:
        try:
            bridge, lock_changed = build_bridge(
                mcp_settings_data=self._mcp_settings_data,
                force_refresh=self._force_refresh,
                output_dir=self._output_dir,
                log_level=self._log_level,
                description_overrides=self._description_overrides,
            )
            self._bridge = bridge
            self._lock_changed = lock_changed
            if lock_changed:
                self._message = (
                    "Please tell user to exit this AI coding agent and relaunch to load the latest agent skills."
                )
            else:
                self._message = "Please tell user I am ready to accept tasks."
        except Exception as exc:
            self._error = exc
            self._message = f"Failed to sync MCP tools: {exc}"
        finally:
            self._ready.set()

    def wait_ready(self) -> Bridge:
        self._ready.wait()
        if self._error:
            raise self._error
        if self._bridge is None:
            raise MCPError("MCP bridge unavailable after sync")
        return self._bridge

    def get_message(self) -> str:
        return self._message

    def is_ready(self) -> bool:
        return self._ready.is_set()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Dev Swarm MCP Server (stdio)")
    parser.add_argument(
        "--mcp-settings",
        "--mcp_settings",
        dest="mcp_settings",
        required=True,
        help="Path to MCP settings JSON",
    )
    parser.add_argument(
        "--force-refresh",
        "--force_refresh",
        dest="force_refresh",
        action="store_true",
        help="Force regeneration of all skill files even if they exist",
    )
    return parser.parse_args()


def expand_env_placeholders(value: Any, env: dict[str, str], missing: set[str]) -> Any:
    if isinstance(value, dict):
        return {key: expand_env_placeholders(child, env, missing) for key, child in value.items()}
    if isinstance(value, list):
        return [expand_env_placeholders(item, env, missing) for item in value]
    if isinstance(value, str):
        pattern = re.compile(r"\$\{([A-Za-z0-9_]+)\}")

        def replace(match: re.Match[str]) -> str:
            var = match.group(1)
            if var not in env:
                missing.add(var)
                return match.group(0)
            return env[var]

        return pattern.sub(replace, value)
    return value


def prepare_mcp_settings(settings_path: Path, env: Mapping[str, str]) -> dict[str, Any]:
    raw = json.loads(settings_path.read_text())
    missing: set[str] = set()
    expanded: dict[str, Any] = {}

    def is_server_enabled(config: dict[str, Any]) -> bool:
        enabled = config.get("enabled")
        if enabled is not None:
            return bool(enabled)
        return not config.get("disabled", False)

    for key, value in raw.items():
        if key == "mcpServers" and isinstance(value, dict):
            expanded_servers: dict[str, Any] = {}
            for server_name, server_config in value.items():
                if isinstance(server_config, dict) and not is_server_enabled(server_config):
                    expanded_servers[server_name] = server_config
                    continue
                expanded_servers[server_name] = expand_env_placeholders(server_config, env, missing)
            expanded[key] = expanded_servers
            continue
        expanded[key] = expand_env_placeholders(value, env, missing)
    if missing:
        missing_list = ", ".join(sorted(missing))
        raise ValueError(f"Missing environment variables for MCP settings: {missing_list}")
    return expanded


def load_mcp_descriptions(base_dir: Path) -> dict[str, str]:
    descriptions_path = base_dir / "mcp_descriptions.yaml"
    if not descriptions_path.exists():
        return {}
    try:
        raw = yaml.safe_load(descriptions_path.read_text())
    except Exception:
        return {}
    if not isinstance(raw, dict):
        return {}
    overrides: dict[str, str] = {}
    for key, value in raw.items():
        if isinstance(key, str) and isinstance(value, str):
            cleaned = " ".join(value.split()).strip()
            if cleaned:
                overrides[key] = cleaned
    return overrides


def main() -> None:
    args = parse_args()
    settings_path = Path(args.mcp_settings).expanduser().resolve()
    base_dir = Path(__file__).resolve().parents[1]
    env_path = base_dir / ".env"
    load_dotenv(dotenv_path=env_path, override=True)

    settings_data = prepare_mcp_settings(settings_path, os.environ)
    overrides = load_mcp_descriptions(base_dir)
    sync = BridgeSync(
        mcp_settings_data=settings_data,
        force_refresh=args.force_refresh,
        output_dir=None,
        log_level="INFO",
        description_overrides=overrides,
    )
    sync.start()

    mcp = FastMCP("dev-swarm-mcp")

    @mcp.tool()
    def get_message_for_user() -> str:
        """Call this tool when the AI code agent starts."""
        return sync.get_message()

    @mcp.tool()
    def request(json_str: str) -> str:
        """Forward a JSON request payload from a agent skill to mcp tool. the payload must include server_id. Use the best agent skill with server_id instead of calling mcp tool directly."""
        try:
            bridge = sync.wait_ready()
        except Exception as exc:
            return json.dumps({"status": "error", "detail": str(exc)}, ensure_ascii=True)
        return bridge.handle_request_json(json_str)

    mcp.run()


if __name__ == "__main__":
    main()
