#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import logging
import os
import re
import subprocess
import threading
import urllib.error
import urllib.request
from dataclasses import dataclass
import hashlib
import socket
from pathlib import Path
from typing import Any, Iterable

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import uvicorn


LOGGER = logging.getLogger("mcp-to-skills")
DEFAULT_PORT = 28080
LOCK_FILENAME = "mcp_settings.lock"


class InvokeRequest(BaseModel):
    server_id: str = Field(..., min_length=1)
    tool_name: str = Field(..., min_length=1)
    arguments: dict[str, Any] | None = None


class RawRequest(BaseModel):
    server_id: str = Field(..., min_length=1)
    method: str = Field(..., min_length=1)
    params: dict[str, Any] | None = None


class ServerConfig(BaseModel):
    id: str
    command: str | None = None
    args: list[str] = Field(default_factory=list)
    env: dict[str, str] = Field(default_factory=dict)
    url: str | None = None
    transport: str | None = None
    headers: dict[str, str] = Field(default_factory=dict)
    disabled: bool = False


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
    def __init__(self, command: str, args: list[str], env: dict[str, str]) -> None:
        self._next_id = 1
        self._lock = threading.Lock()
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
        self._initialize()

    def _drain_stderr(self) -> None:
        if self._process.stderr is None:
            return
        for line in self._process.stderr:
            LOGGER.debug("mcp-stderr", extra={"line": line.rstrip()})

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
        while True:
            line = self._process.stdout.readline()
            if not line:
                raise MCPError("stdio process closed while awaiting response")
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
            client = HttpClient(config.url, config.headers, sse=False)
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
    request.add_header("Accept", "text/event-stream")
    for key, value in headers.items():
        request.add_header(key, value)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return _parse_sse(response)
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8")
        raise MCPError(f"HTTP error {exc.code}: {error_body}") from exc


def _parse_sse(response: Any) -> dict[str, Any]:
    for raw_line in response:
        line = raw_line.decode("utf-8").strip()
        if not line or not line.startswith("data:"):
            continue
        payload = line.replace("data:", "", 1).strip()
        if payload in {"[DONE]", ""}:
            continue
        try:
            return json.loads(payload)
        except json.JSONDecodeError:
            continue
    raise MCPError("No JSON response received from SSE stream")


def load_mcp_settings(path: Path) -> list[ServerConfig]:
    if not path.exists():
        raise MCPError(f"MCP settings file not found: {path}")
    raw = json.loads(path.read_text())
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


def render_skill(tool: ToolDef, server_id: str, port: int) -> str:
    description = tool.description or f"Invoke MCP tool {tool.name} on server {server_id}."
    description = " ".join(description.splitlines()).strip()
    description = description.replace("\"", "\\\"")
    input_schema = json.dumps(tool.input_schema or {}, indent=2, ensure_ascii=True)
    # Convert server_id to kebab-case for skill name (e.g., backgroundProcess -> background-process)
    kebab_server_id = camel_to_kebab(server_id)
    template = f"""---
name: {slugify(f"{kebab_server_id}-{tool.name}")}
description: "{description}"
---

# MCP Tool: {tool.name}
Server: {server_id}

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:{port}/invoke \\
  -H "Content-Type: application/json" \\
  -d '{{"server_id":"{server_id}","tool_name":"{tool.name}","arguments":{{}}}}'
```

## Tool Description
{description}

## Input Schema
```json
{input_schema}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:{port}/mcp \\
  -H "Content-Type: application/json" \\
  -d '{{"server_id":"{server_id}","method":"tasks/status","params":{{"task_id":"<task_id>"}}}}'
```
"""
    return template


@dataclass(frozen=True)
class SkillEntry:
    name: str
    path: Path
    content: str


def is_port_available(port: int) -> bool:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        try:
            sock.bind(("127.0.0.1", port))
        except OSError:
            return False
    return True


def find_available_port(start_port: int) -> int:
    port = start_port
    while port <= 65535 and not is_port_available(port):
        port += 1
    if port > 65535:
        raise MCPError("No available port found")
    return port


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


def write_lock(path: Path, hash_value: str, port: int) -> None:
    payload = {"hash": hash_value, "port": port}
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
    port: int,
) -> list[SkillEntry]:
    entries: list[SkillEntry] = []
    for server_id in sorted(tools_by_server.keys()):
        tools = sorted(tools_by_server[server_id], key=lambda tool: tool.name)
        for tool in tools:
            tool_path = skill_dir(output_dir, server_id, tool.name)
            skill_path = tool_path / "SKILL.md"
            entries.append(
                SkillEntry(
                    name=tool.name,
                    path=skill_path,
                    content=render_skill(tool, server_id, port),
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


def get_all_skill_dirs(mcp_skills_dir: Path, server_id: str) -> list[Path]:
    """Get all skill directories for a given server."""
    if not mcp_skills_dir.exists():
        return []
    # Convert server_id to kebab-case first (e.g., backgroundProcess -> background-process)
    kebab_server_id = camel_to_kebab(server_id)
    pattern = f"{slugify(kebab_server_id)}-*"
    return sorted([d for d in mcp_skills_dir.glob(pattern) if d.is_dir()])


def manage_symlinks(
    mcp_skills_dir: Path,
    skills_dir: Path,
    enabled_servers: set[str],
    disabled_servers: set[str],
) -> None:
    """
    Manage symlinks from skills_dir to mcp_skills_dir.
    - Create symlinks for enabled servers
    - Remove symlinks for disabled servers
    - Symlinks are relative paths
    """
    skills_dir.mkdir(parents=True, exist_ok=True)

    # Create symlinks for enabled servers
    for server_id in enabled_servers:
        skill_dirs = get_all_skill_dirs(mcp_skills_dir, server_id)
        for skill_path in skill_dirs:
            skill_name = skill_path.name
            symlink_path = skills_dir / skill_name

            # Create relative symlink: ../mcp-skills/<skill-name>
            relative_target = Path("..") / "mcp-skills" / skill_name

            if symlink_path.exists() or symlink_path.is_symlink():
                # Check if it's already the correct symlink
                if symlink_path.is_symlink() and symlink_path.readlink() == relative_target:
                    continue
                # Remove old symlink or file
                symlink_path.unlink()

            symlink_path.symlink_to(relative_target)
            LOGGER.debug(f"Created symlink: {symlink_path} -> {relative_target}")

    # Remove symlinks for disabled servers
    for server_id in disabled_servers:
        skill_dirs = get_all_skill_dirs(mcp_skills_dir, server_id)
        for skill_path in skill_dirs:
            skill_name = skill_path.name
            symlink_path = skills_dir / skill_name

            if symlink_path.is_symlink():
                symlink_path.unlink()
                LOGGER.debug(f"Removed symlink: {symlink_path}")


def create_app(manager: MCPManager) -> FastAPI:
    app = FastAPI()

    @app.post("/invoke")
    def invoke(request: InvokeRequest) -> dict[str, Any]:
        try:
            result = manager.call_tool(request.server_id, request.tool_name, request.arguments)
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc))
        return {"status": "ok", "result": result}

    @app.post("/mcp")
    def raw_mcp(request: RawRequest) -> dict[str, Any]:
        try:
            result = manager.request(request.server_id, request.method, request.params)
        except Exception as exc:
            raise HTTPException(status_code=500, detail=str(exc))
        return {"status": "ok", "result": result}

    return app


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="MCP Skill Bridge (script)")
    parser.add_argument(
        "--mcp-settings",
        "--mcp_settings",
        dest="mcp_settings",
        required=True,
        help="Path to MCP settings JSON",
    )
    parser.add_argument("--port", type=int, default=DEFAULT_PORT)
    parser.add_argument("--force-refresh", action="store_true")
    parser.add_argument(
        "--output-dir",
        type=str,
        default=None,
        help="Directory to write skills (default: dev-swarm/mcp-skills)",
    )
    parser.add_argument(
        "--skills-only",
        action="store_true",
        help="Generate skills and exit without starting the HTTP server",
    )
    parser.add_argument("--log-level", type=str, default="INFO")
    return parser.parse_args()


def build_bridge(
    *,
    mcp_settings_path: Path,
    port: int,
    force_refresh: bool,
    output_dir: Path | None,
    skills_only: bool,
    log_level: str,
) -> tuple[FastAPI | None, int, bool]:
    logging.basicConfig(level=log_level.upper(), format="%(levelname)s %(message)s")
    base_dir = Path(__file__).resolve().parents[1]
    output_root = output_dir or base_dir / "mcp-skills"
    skills_dir = base_dir / "skills"
    lock_path = base_dir / LOCK_FILENAME

    lock_data = load_lock(lock_path)
    lock_port = None
    lock_hash = None
    if lock_data:
        lock_port = lock_data.get("port")
        lock_hash = lock_data.get("hash")

    requested_port = int(lock_port) if isinstance(lock_port, int) else port
    resolved_port = find_available_port(requested_port)

    all_configs = load_mcp_settings(mcp_settings_path)
    enabled_configs = [c for c in all_configs if not c.disabled]
    disabled_configs = [c for c in all_configs if c.disabled]

    enabled_server_ids = {config.id for config in enabled_configs}
    disabled_server_ids = {config.id for config in disabled_configs}

    manager = MCPManager(enabled_configs)
    server_ids = [config.id for config in enabled_configs]

    tools_by_server = gather_tools(manager, server_ids)
    entries = build_skill_entries(output_root, tools_by_server, resolved_port)
    skills_hash = compute_skills_hash(entries, base_dir)

    lock_changed = skills_hash != lock_hash or resolved_port != lock_port
    should_refresh = force_refresh or lock_changed

    write_skills(entries, should_refresh)
    manage_symlinks(output_root, skills_dir, enabled_server_ids, disabled_server_ids)

    if lock_changed:
        write_lock(lock_path, skills_hash, resolved_port)

    if skills_only:
        return None, resolved_port, lock_changed
    return create_app(manager), resolved_port, lock_changed


def start_bridge_server(
    *,
    mcp_settings_path: Path,
    port: int,
    log_level: str = "INFO",
) -> tuple[int, bool]:
    app, resolved_port, lock_changed = build_bridge(
        mcp_settings_path=mcp_settings_path,
        port=port,
        force_refresh=False,
        output_dir=None,
        skills_only=False,
        log_level=log_level,
    )
    if app is None:
        raise MCPError("bridge_app_unavailable")
    config = uvicorn.Config(app, host="127.0.0.1", port=resolved_port, log_level=log_level.lower())
    server = uvicorn.Server(config)
    thread = threading.Thread(target=server.run, daemon=True)
    thread.start()
    return resolved_port, lock_changed


def main() -> None:
    args = parse_args()
    settings_path = Path(args.mcp_settings).expanduser().resolve()
    output_dir = Path(args.output_dir).expanduser().resolve() if args.output_dir else None
    app, resolved_port, _lock_changed = build_bridge(
        mcp_settings_path=settings_path,
        port=args.port,
        force_refresh=args.force_refresh,
        output_dir=output_dir,
        skills_only=args.skills_only,
        log_level=args.log_level,
    )

    if args.skills_only:
        return
    if app is None:
        raise MCPError("bridge_app_unavailable")

    LOGGER.info("mcp_skill_bridge_started", extra={"port": resolved_port, "output_dir": str(output_dir)})
    uvicorn.run(app, host="127.0.0.1", port=resolved_port)


if __name__ == "__main__":
    main()
