This skill is used to run a background process.
When an AI agent needs to run a background process, the AI agent should check if the MCP server is installed, or install the `background-process` MCP first:

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

After configuration, the AI agent should tell the user to connect the TUI to a running background process server via its port `31337`:

`pnpm dlx @waylaidwanderer/background-process-mcp ui --port 31337`

If the port is in use, check if the MCP server has already started and attempt to connect to it; do not kill it or use a new port unless necessary.