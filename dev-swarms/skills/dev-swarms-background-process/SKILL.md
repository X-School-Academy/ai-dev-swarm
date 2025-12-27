---
name: dev-swarms-background-process
description: Run background processes and manage the background-process MCP server. Use when an AI agent needs to run a long-running task or connect to a TUI.
---

# Background Process Management

This skill allows the AI agent to run background processes by installing and configuring the `background-process` MCP server.

## Prerequisites

- `pnpm` must be installed.

## Instructions

### 1. Check/Install MCP Server

When the AI agent needs to run a background process, it should first check if the `background-process` MCP server is installed. If not, install it using the configuration below:

```json
{
  "mcpServers": {
    "background-process": {
      "command": "pnpm",
      "args": [
        "dlx", "@waylaidwanderer/background-process-mcp@latest", "--port", "31337"
      ]
    }
  }
}
```

### 2. Connect to TUI

After configuration, instruct the user to connect the TUI (Text User Interface) to the running background process server via port `31337`:

```bash
pnpm dlx @waylaidwanderer/background-process-mcp ui --port 31337
```

### 3. Troubleshooting

- If port `31337` is in use, check if the MCP server has already started.
- Try to connect to the existing process rather than killing it.
- If necessary, configure a new port.
