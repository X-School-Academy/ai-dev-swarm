Use this skill when adding an MCP server to an AI agent.

For Claude Code:
`claude mcp list`
`claude mcp add --transport [http | sse ] <name> <URL>`
`claude mcp add --transport stdio <name> --env AIRTABLE_API_KEY=YOUR_KEY -- pnpm dlx airtable-mcp-server`

For Codex Code:
`codex mcp list`
`codex mcp add [OPTIONS] <name> (--url <URL> | -- <COMMAND>...)`

For Gemini CLI:
`gemini mcp list`
`gemini mcp add [options] <name> <commandOrUrl> [args...]`

For other AI agents, try `ai-agent-command -h` first to find out the command to add an MCP server.

Always check if it is set up; if not, then install it.

Always tell the user to exit the AI agent CLI and relaunch it to make the MCP server take effect.