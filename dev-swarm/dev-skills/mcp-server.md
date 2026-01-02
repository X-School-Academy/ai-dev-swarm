# Model Context Protocol (MCP) Server Configuration for CLI AI Agents

**Transport Types:**
- **stdio**: Standard input/output (most common for local servers)
- **HTTP**: HTTP-based communication
- **SSE**: Server-Sent Events

---

## For Claude Code CLI

Claude Code is a command-line interface tool that supports MCP servers with multiple configuration scopes.

### Basic Commands

```bash
# List all MCP servers
claude mcp list

# Add MCP server (local scope by default)
claude mcp add <server-name> -- <command> [args...]

# Add with environment variables
claude mcp add <server-name> --env VAR1=VALUE1 --env VAR2=VALUE2 -- <command>

# Add HTTP/SSE transport server
claude mcp add --transport http <name> <URL> --scope user
claude mcp add --transport sse <name> <URL> --scope user

# Add stdio server example
claude mcp add airtable --env AIRTABLE_API_KEY=YOUR_KEY -- pnpm dlx airtable-mcp-server

# Remove a server
claude mcp remove <server-name>

# Add JSON configuration directly
claude mcp add-json
```

### Configuration Scopes

Claude Code supports three configuration scopes:

1. **Local Scope** (default): Current project only, not shared
2. **Project Scope** (`--scope project`): Team-wide, stored in `.mcp.json` at project root, committed to version control
3. **User/Global Scope** (`--scope user`): Available across all your projects, stored in `~/.claude.json`

**Examples:**

```bash
# Project scope (shared with team)
claude mcp add playwright --scope project -- npx -y @playwright/mcp-server

# User scope (global)
claude mcp add github --scope user --env GITHUB_TOKEN=token -- npx -y @modelcontextprotocol/server-github
```

### Configuration File Locations

- **User/Global**: `~/.claude.json`
- **Project**: `.mcp.json` (in project root)

### Advanced Features

- **Timeout Configuration**: Set `MCP_TIMEOUT` environment variable (e.g., `MCP_TIMEOUT=10000 claude` for 10-second timeout)
- **Enterprise Control**: Supports managed configurations with `managed-mcp.json` for centralized control

**Important**: Restart Claude Code after making configuration changes.

---

## For OpenAI Codex CLI

OpenAI Codex is a code assistant CLI tool that supports MCP servers.

### Basic Commands

```bash
# List MCP servers
codex mcp list

# Add MCP server
codex mcp add <server-name> -- <stdio-server-command>

# Add with environment variables
codex mcp add <server-name> --env VAR1=VALUE1 --env VAR2=VALUE2 -- <stdio-server-command>

# Example
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

### Configuration File

- **Location**: `~/.codex/config.toml`
- The CLI and IDE extension share this configuration
- Configuration format uses TOML with `[mcp_servers.<server-name>]` tables

**Configuration Options:**
- `command` (required): The command that starts the server
- `startup_timeout_sec` (optional): Timeout in seconds for server startup (default: 10)
- `enabled` (optional): Set to false to disable without deleting

**Example TOML Configuration:**

```toml
[mcp_servers.context7]
command = "npx -y @upstash/context7-mcp"

[mcp_servers.github]
command = "npx -y @modelcontextprotocol/server-github"
startup_timeout_sec = 15
enabled = true
```

**Note**: Codex currently does not support project-level MCP configuration. All servers are configured at the user level.

---

## For Google Gemini CLI

Google Gemini CLI supports MCP servers with both user and project-level configurations.

### Basic Commands

```bash
# List MCP servers
gemini mcp list

# Add MCP server
gemini mcp add [options] <name> <commandOrUrl> [args...]

# Add with scope
gemini mcp add <name> <command> --scope user     # User level
gemini mcp add <name> <command> --scope project  # Project level
```

### Transport Configuration

Gemini CLI uses different URL keys for different transport types:

**HTTP Transport:**
```json
{
  "mcpServers": {
    "playwright": {
      "httpUrl": "http://url/mcp"
    }
  }
}
```

**SSE Transport:**
```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://url/sse"
    }
  }
}
```

**stdio Transport:**
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

### Configuration File Locations

- **User level**: `~/.gemini/settings.json`
- **Project level**: `.gemini/settings.json` (in project root)

### Features

- Seamless integration with FastMCP (Python's leading MCP server library)
- OAuth 2.0 authentication support for remote MCP servers
- Commands for programmatic configuration management
- Supports both user and project-level configurations

---

## General Best Practices

1. **Always verify installation**: Use `<cli> mcp list` to check if an MCP server is properly configured
2. **Restart required**: Always exit and restart your AI agent CLI after making MCP configuration changes
3. **Project vs User scope**:
   - Use **project scope** when sharing configurations with team members (commit `.mcp.json` or `.gemini/settings.json` to version control)
   - Use **user/global scope** for personal tools and API keys
4. **Environment variables**: Store sensitive data (API keys, tokens) in environment variables, never commit them to version control
5. **Test connectivity**: After adding a server, verify it appears in the list and test basic functionality
6. **Timeouts**: Configure appropriate startup timeouts for servers that take longer to initialize
7. **Server availability**: Always check if a server is set up before attempting to use it; install/configure if missing

---

## For Other AI Agent CLIs

If using a different AI agent CLI tool:

1. **Check for help**: Try `<ai-agent-command> -h` or `<ai-agent-command> --help` first
2. **Look for MCP commands**: Common patterns include:
   - `<cli> mcp list`
   - `<cli> mcp add <name> [options]`
   - `<cli> mcp remove <name>`
3. **Find configuration location**: Check documentation for config file location
4. **Check scope support**: Determine if the tool supports project-level vs user-level configuration
5. **Restart the CLI**: After configuration changes, exit and relaunch the AI agent CLI
