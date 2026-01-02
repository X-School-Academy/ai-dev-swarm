---
name: dart-get-runtime-errors
description: "Retrieves the most recent runtime errors that have occurred in the active Dart or Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first."
---

# MCP Tool: get_runtime_errors
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"get_runtime_errors","arguments":{}}'
```

## Tool Description
Retrieves the most recent runtime errors that have occurred in the active Dart or Flutter application. Requires \"connect_dart_tooling_daemon\" to be successfully called first.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "clearRuntimeErrors": {
      "type": "boolean",
      "title": "Whether to clear the runtime errors after retrieving them.",
      "description": "This is useful to clear out old errors that may no longer be relevant before reading them again."
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
