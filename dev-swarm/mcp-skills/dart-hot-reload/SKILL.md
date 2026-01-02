---
name: dart-hot-reload
description: "Performs a hot reload of the active Flutter application. This is to apply the latest code changes to the running application. Requires \"connect_dart_tooling_daemon\" to be successfully called first."
---

# MCP Tool: hot_reload
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"hot_reload","arguments":{}}'
```

## Tool Description
Performs a hot reload of the active Flutter application. This is to apply the latest code changes to the running application. Requires \"connect_dart_tooling_daemon\" to be successfully called first.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "clearRuntimeErrors": {
      "type": "boolean",
      "title": "Whether to clear runtime errors before hot reloading.",
      "description": "This is useful to clear out old errors that may no longer be relevant."
    }
  },
  "required": []
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
