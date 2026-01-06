# MCP Server Check (dev-swarm)

when `dev-swarm` MCP is missing or not running. Use the `dev-swarm-mcp-server` skill to add or update the MCP server configuration as information below.

If the MCP server is added at a non-project scope (user/global), use absolute paths for all scripts and config files, or the MCP process may fail to start.


## MCP Config Snippet

```json
{
  "mcpServers": {
    "dev-swarm": {
      "command": "uv",
      "args": [
        "--project",
        "/abs/path/to/dev-swarm/py_scripts",
        "run",
        "/abs/path/to/dev-swarm/py_scripts/dev-swarm-mcp.py",
        "--mcp-settings=/abs/path/to/dev-swarm/mcp_settings.json"
      ]
    }
  }
}
```

## Basic Test Command

Install `uv` or run `uv sync` if needed, then run:

```bash
uv --project /abs/path/to/dev-swarm/py_scripts run /abs/path/to/dev-swarm/py_scripts/dev-swarm-mcp.py --mcp-settings=/abs/path/to/dev-swarm/mcp_settings.json --port=28080
```

## Restart Required

After configuration, tell the user to exit the AI code agent and re-enter to load the MCP server.
