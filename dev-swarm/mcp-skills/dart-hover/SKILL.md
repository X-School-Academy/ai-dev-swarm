---
name: dart-hover
description: "Get hover information at a given cursor position in a file. This can include documentation, type information, etc for the text at that position."
---

# MCP Tool: hover
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"hover","arguments":{}}'
```

## Tool Description
Get hover information at a given cursor position in a file. This can include documentation, type information, etc for the text at that position.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "uri": {
      "type": "string",
      "description": "The URI of the file."
    },
    "line": {
      "type": "integer",
      "description": "The zero-based line number of the cursor position."
    },
    "column": {
      "type": "integer",
      "description": "The zero-based column number of the cursor position."
    }
  },
  "required": [
    "uri",
    "line",
    "column"
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
