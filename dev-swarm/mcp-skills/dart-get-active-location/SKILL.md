---
name: dart-get-active-location
description: "Retrieves the current active location (e.g., cursor position) in the connected editor. Requires \"connect_dart_tooling_daemon\" to be successfully called first."
---

# MCP Tool: get_active_location
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"get_active_location","arguments":{}}'
```

## Tool Description
Retrieves the current active location (e.g., cursor position) in the connected editor. Requires \"connect_dart_tooling_daemon\" to be successfully called first.

## Input Schema
```json
{
  "type": "object"
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
