---
name: dart-add-roots
description: "Adds one or more project roots. Tools are only allowed to run under these roots, so you must call this function before passing any roots to any other tools."
---

# MCP Tool: add_roots
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"add_roots","arguments":{}}'
```

## Tool Description
Adds one or more project roots. Tools are only allowed to run under these roots, so you must call this function before passing any roots to any other tools.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "roots": {
      "type": "array",
      "description": "All the project roots to add to this server.",
      "items": {
        "type": "object",
        "properties": {
          "uri": {
            "type": "string",
            "description": "The URI of the root."
          },
          "name": {
            "type": "string",
            "description": "An optional name of the root."
          }
        },
        "required": [
          "uri"
        ]
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
