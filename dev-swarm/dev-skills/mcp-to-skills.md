
## Problem
When an AI agent loads MCP tool definitions into its context, it burns a lot of tokens.

## Goal
Convert MCP tools into on-demand agent skills so the agent only loads and uses tools when needed.

## References
- dev-swarm/docs/agent-skill-specification.md

## Concept
Build an MCP Skill Bridge:

- **MCP Config Reader**: Load MCP server config at `dev-swarm/mcp_settings.json`
  - Each server can have a `"disabled": true` field (default: `false`)
  - Disabled servers are skipped during skill generation
- **MCP Connector**: Connect to all configured MCP servers and fetch tool definitions.
- **Skill Generator**: Create skill markdown files, one per tool, using the file path/name rule:
  - `dev-swarm/mcp-skills/<mcp_server_id>-<tool_name>/SKILL.md`
  - `<mcp_server_id>-<tool_name>` should follow the skill name standard, e.g, replace `_` to `-`
  - Generate once; recreate only if the skill folder is removed.
- **Symlink Manager**: Manage symlinks from `dev-swarm/skills/` to `dev-swarm/mcp-skills/`
  - Create relative symlinks for enabled servers
  - Remove symlinks for disabled servers
  - Symlinks are relative to the project root path
- **Skill Runtime Server**: Run a local HTTP POST server that accepts skill payloads and forwards them to MCP tools.
- **Agent Client Wrapper**: Each skill file includes a `curl` command to POST the payload and return the response.

## Expected Flow
1. Start the MCP Skill Bridge.
2. Load configs, filter out disabled servers, connect enabled MCP servers (support all 3 MCP transport types), fetch tool definitions.
3. Generate skill markdown files for all tools in `dev-swarm/mcp-skills/`.
4. Create symlinks from `dev-swarm/skills/` to enabled server skills, remove symlinks for disabled servers.
5. Agent loads skills on demand from `dev-swarm/skills/`.
6. When a skill is invoked, it posts payloads to the local HTTP server, which routes to the MCP tool and returns the response.
7. Support MCP Background Tasks - https://modelcontextprotocol.io/specification/2025-11-25/basic/utilities/tasks

## Project location
dev-swarm/py_scripts
code file: mcp-to-skills.py

start command: `uv run mcp-to-skills.py --mcp_settings=../mcp_settings.json`

skills-only: `uv run mcp-to-skills.py --mcp_settings=../mcp_settings.json --skills-only`
