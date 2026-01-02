## Dev Swarm MCP Server

Run the stdio MCP server that bootstraps the MCP Skill Bridge (from repo root):

```bash
uv --project dev-swarm/py_scripts run dev-swarm/py_scripts/dev-swarm-mcp.py --mcp-settings=dev-swarm/mcp_settings.json --port=28080
```

Example MCP config snippet:

```json
{
  "mcpServers": {
    "dev-swarm": {
      "command": "uv",
      "args": [
        "--project",
        "dev-swarm/py_scripts",
        "run",
        "dev-swarm/py_scripts/dev-swarm-mcp.py",
        "--mcp-settings=dev-swarm/mcp_settings.json",
        "--port=28080"
      ]
    }
  }
}
```
