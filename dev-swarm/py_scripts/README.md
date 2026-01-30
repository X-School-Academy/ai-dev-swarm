# Dev Swarm Python Scripts

Shared Python scripts for dev-swarm. All scripts share a common `.venv` via uv workspaces.

## Structure

```
py_scripts/
├── pyproject.toml        # Root workspace package
├── uv.lock               # Shared lockfile
├── .venv/                # Shared virtual environment
├── dev-swarm-mcp.py      # Simple script (root level)
├── screen_stream.py      # Simple script (root level)
├── use_computer.py       # Simple script (root level)
└── scripts/              # Additional standalone scripts (optional)
    └── example.py        # Single-file scripts go here
```

## Setup

```bash
cd dev-swarm/py_scripts
uv sync
```

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

## Adding Simple Scripts

For simple single-file scripts, create them directly in `py_scripts/` or under `scripts/`:

```bash
# Run a script
uv run scripts/example.py
```

## Adding New Complex Apps

For complex apps requiring their own dependencies:

1. Create a subfolder with its own `pyproject.toml`
2. The folder is auto-included via workspace members
3. Dependencies are resolved together in shared lockfile

```bash
mkdir my-app
cd my-app
uv init
# Add dependencies...
```

## Benefits

- **Shared `.venv`**: Single virtual environment for all packages
- **Single lockfile**: Consistent dependency versions across packages
- **Workspace commands**: Run scripts across packages from root
- **Isolated configs**: Each app keeps its own pyproject.toml

## Requirements

- Python 3.12+
- uv (package manager)
