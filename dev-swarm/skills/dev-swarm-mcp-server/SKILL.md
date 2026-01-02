---
name: dev-swarm-mcp-server
description: Add and manage Model Context Protocol (MCP) servers for AI agents. Use when extending agent capabilities with new tools or data sources.
---

# MCP Server Management

This skill assists in adding MCP servers to various AI agents (Claude, Codex, Gemini, etc.).

## When to Use This Skill

- User wants to add new MCP server to extend agent capabilities
- User needs to list installed MCP servers
- User wants to integrate new tools or data sources through MCP
- User asks to configure MCP servers for different AI agents

## Your Roles in This Skill

- **DevOps Engineer**: Install and configure MCP servers for various AI agents. Verify existing MCP server installations. Guide users through MCP server setup for different platforms (Claude Code, Codex, Gemini). Troubleshoot MCP server connectivity and configuration issues. Manage environment variables and credentials for MCP servers.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

As a {Role} [and {Role}, ...], I will {action description}

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.
## Usage

### Claude Code

To list installed MCP servers:
```bash
claude mcp list
```

To add an MCP server:
```bash
# HTTP or SSE transport
claude mcp add --transport [http|sse] <name> <URL>

# Stdio transport (example with environment variable)
claude mcp add --transport stdio <name> --env AIRTABLE_API_KEY=YOUR_KEY -- pnpm dlx airtable-mcp-server
```

### Codex Code

To list MCP servers:
```bash
codex mcp list
```

To add an MCP server:
```bash
codex mcp add [OPTIONS] <name> (--url <URL> | -- <COMMAND>...)
```

### Gemini CLI

To list MCP servers:
```bash
gemini mcp list
```

To add an MCP server:
```bash
gemini mcp add [options] <name> <commandOrUrl> [args...]
```

Or update config file at 

~/.gemini/settings.json 
{PROJECT_ROOT}/.gemini/settings.json 

```json
{
  "mcpServers": {
    "skillz": {
      "command": "uvx",
      "args": [
        "skillz@latest",
        "/path/skills",
        "--verbose"
      ]
    }
  }
}
```

### Other AI Agents

For other agents, try checking the help command first:
```bash
ai-agent-command -h
```

## Best Practices

1.  **Check Installation:** Always check if the MCP server is already set up before attempting to install it.
2.  **Restart Agent:** After adding an MCP server, instruct the user to exit and relaunch the AI agent CLI to ensure the changes take effect.
