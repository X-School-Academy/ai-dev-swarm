# Sprint 2: MCP Protocol Core

## Sprint Overview
**Goal**: Implement core MCP protocol handler with stdio transport and JSON-RPC messaging

**Duration**: 4-6 days | **Status**: 📋 Not Started

## Sprint Objectives
1. ✅ Implement MCP protocol handler (server lifecycle)
2. ✅ Setup stdio transport (stdin/stdout communication)
3. ✅ JSON-RPC 2.0 message handling
4. ✅ Basic list_tools and call_tool stubs (full implementation in Sprint 3-4)
5. ✅ Server startup and shutdown
6. ✅ MCP Inspector compatibility testing

## Backlog Items
| ID | Type | Title | Status | Priority |
|----|------|-------|--------|----------|
| 01 | feature | MCP protocol handler with server lifecycle | Not Started | P0 |
| 02 | feature | stdio transport implementation | Not Started | P0 |
| 03 | feature | JSON-RPC message parser and formatter | Not Started | P0 |
| 04 | feature | list_tools stub (returns empty list) | Not Started | P0 |
| 05 | feature | call_tool stub (returns placeholder) | Not Started | P0 |
| 06 | feature | Graceful shutdown handling | Not Started | P0 |

**Total**: 6 | **Completed**: 0

## Dependencies
- **Requires**: Sprint 1 (configuration, logging, CLI)
- **Blocks**: Sprint 3 (skill discovery needs MCP protocol)

## Success Criteria
1. ✅ Server starts and listens on stdio
2. ✅ Handles JSON-RPC messages per MCP spec
3. ✅ list_tools returns valid (empty) response
4. ✅ call_tool returns valid placeholder response
5. ✅ MCP Inspector can connect and communicate
6. ✅ Server shuts down gracefully on SIGTERM/SIGINT
7. ✅ Startup time <2 seconds

## Test Plan

```bash
# Test 1: Server starts
python -m mcp_skills_server --skills-dir ./skills
# Expected: Server starts, logs "Server ready"

# Test 2: JSON-RPC list_tools (manual test)
echo '{"jsonrpc":"2.0","method":"list_tools","id":1}' | python -m mcp_skills_server --skills-dir ./skills
# Expected: {"jsonrpc":"2.0","id":1,"result":{"tools":[]}}

# Test 3: JSON-RPC call_tool (manual test)
echo '{"jsonrpc":"2.0","method":"call_tool","params":{"name":"test"},"id":2}' | python -m mcp_skills_server --skills-dir ./skills
# Expected: {"jsonrpc":"2.0","id":2,"result":{"content":"placeholder"}}

# Test 4: MCP Inspector integration
# Use MCP Inspector tool to connect and test
# Expected: Connection successful, can list tools and call tools

# Test 5: Shutdown handling
python -m mcp_skills_server --skills-dir ./skills &
PID=$!
sleep 2
kill -TERM $PID
# Expected: Server logs graceful shutdown, exits cleanly
```

---
Last updated: 2025-12-26
