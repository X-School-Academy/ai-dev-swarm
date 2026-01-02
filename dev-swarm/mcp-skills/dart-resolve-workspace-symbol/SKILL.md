---
name: dart-resolve-workspace-symbol
description: "Look up a symbol or symbols in all workspaces by name. Can be used to validate that a symbol exists or discover small spelling mistakes, since the search is fuzzy."
---

# MCP Tool: resolve_workspace_symbol
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"resolve_workspace_symbol","arguments":{}}'
```

## Tool Description
Look up a symbol or symbols in all workspaces by name. Can be used to validate that a symbol exists or discover small spelling mistakes, since the search is fuzzy.

## Input Schema
```json
{
  "type": "object",
  "description": "Returns all close matches to the query, with their names and locations. Be sure to check the name of the responses to ensure it looks like the thing you were searching for.",
  "properties": {
    "query": {
      "type": "string",
      "description": "Queries are matched based on a case-insensitive partial name match, and do not support complex pattern matching, regexes, or scoped lookups."
    }
  },
  "required": [
    "query"
  ]
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
