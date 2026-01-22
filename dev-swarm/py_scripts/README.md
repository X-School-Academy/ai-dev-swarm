# Dev Swarm Python Scripts

Python scripts and servers for AI Dev Swarm.

## Projects

- **webui/** - FastAPI backend for the WebUI
- **dev-swarm-mcp.py** - MCP server for skill bridging

## Setup

```bash
cd dev-swarm/py_scripts

# Install dependencies
uv sync
```

## WebUI Server

The WebUI backend provides REST API endpoints for the Next.js frontend.

### Start Server

```bash
cd dev-swarm/py_scripts

# Start the server
uv run python -m webui.main
```

The server runs at `http://localhost:8001` by default.

### API Documentation

Once running, visit:
- Swagger UI: http://localhost:8001/docs
- ReDoc: http://localhost:8001/redoc

### Environment Variables

Environment variables are configured in `dev-swarm/.env`:

```env
# WebUI Backend
WEBUI_HOST=127.0.0.1
WEBUI_PORT=8001
WEBUI_DEBUG=true
WEBUI_DEFAULT_AGENT=claude
WEBUI_AGENT_TIMEOUT=300
WEBUI_AUTO_COMMIT=false
```

| Variable | Default | Description |
|----------|---------|-------------|
| `WEBUI_HOST` | 127.0.0.1 | Server host |
| `WEBUI_PORT` | 8001 | Server port |
| `WEBUI_DEBUG` | false | Enable debug mode with auto-reload |
| `WEBUI_DEFAULT_AGENT` | claude | Default AI agent (claude, codex, gemini) |
| `WEBUI_AGENT_TIMEOUT` | 300 | Agent execution timeout in seconds |
| `WEBUI_AUTO_COMMIT` | false | Auto-commit changes without confirmation |

---

## Dev Swarm MCP Server

Run the stdio MCP server that bootstraps the MCP Skill Bridge (from repo root):

```bash
uv --project dev-swarm/py_scripts run dev-swarm/py_scripts/dev-swarm-mcp.py --mcp-settings=dev-swarm/mcp_settings.json
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
        "--mcp-settings=dev-swarm/mcp_settings.json"
      ]
    }
  }
}
```

## Requirements

- Python 3.12+
- uv (package manager)
