Please create an MCP server in file dev-swarm/py_scripts/dev-swarm-mcp.py using fastmcp

1. update file dev-swarm/py_scripts/mcp-to-skills.py and import it as needed
2. dev-swarm-mcp.py will run in stdio transport with --mcp-settings and --port as parameters
3. dev-swarm-mcp.py will start the MCP bridge server mcp-to-skills.py (if the HTTP port is not available, auto-select the next port until an available port is found)
4. mcp-to-skills.py will create dev-swarm/mcp_settings.lock which contains the hash string (all the skills created by the MCP bridge - skills name, path, content, etc) and the port number
5. if the hash changes (if the port changes, we need to recreate all the skill files), update dev-swarm/mcp_settings.lock
6. when mcp-to-skills.py starts, read dev-swarm/mcp_settings.lock first; the port in dev-swarm/mcp_settings.lock will overwrite --port
7. mcp-to-skills.py has only one tool, get_message_for_user(), it will return a message as below
  * please tell user I (You - AI code Agent) am ready to accept task if no mcp_settings.lock update (no hash change)
  * please tell user to exit this ai coding agent and re-launch again to load the latest agent skills if mcp_settings.lock updates (hash change)
