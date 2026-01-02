---
name: dart-dart-format
description: "Runs `dart format .` for the given project roots."
---

# MCP Tool: dart_format
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"dart_format","arguments":{}}'
```

## Tool Description
Runs `dart format .` for the given project roots.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "roots": {
      "type": "array",
      "title": "All projects roots to run this tool in.",
      "items": {
        "type": "object",
        "properties": {
          "root": {
            "type": "string",
            "title": "The file URI of the project root to run this tool in.",
            "description": "This must be equal to or a subdirectory of one of the roots allowed by the client. Must be a URI with a `file:` scheme (e.g. file:///absolute/path/to/root)."
          },
          "paths": {
            "type": "array",
            "title": "Paths to run this tool on. Must resolve to a path that is within the \"root\".",
            "items": {
              "type": "string"
            }
          }
        },
        "required": [
          "root"
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
