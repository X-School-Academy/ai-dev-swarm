---
name: dart-remove-roots
description: "Removes one or more project roots previously added via the add_roots tool."
---

# MCP Tool: remove_roots
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"remove_roots","arguments":{}}'
```

## Tool Description
Removes one or more project roots previously added via the add_roots tool.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "uris": {
      "type": "array",
      "description": "All the project roots to remove from this server.",
      "items": {
        "type": "string",
        "description": "The URIs of the roots to remove."
      }
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
