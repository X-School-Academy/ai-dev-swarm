---
name: dart-set-widget-selection-mode
description: "Enables or disables widget selection mode in the active Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first."
---

# MCP Tool: set_widget_selection_mode
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"set_widget_selection_mode","arguments":{}}'
```

## Tool Description
Enables or disables widget selection mode in the active Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "enabled": {
      "type": "boolean",
      "title": "Enable widget selection mode"
    }
  },
  "required": [
    "enabled"
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
