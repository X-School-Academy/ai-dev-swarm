---
name: dart-connect-dart-tooling-daemon
description: "Connects to the Dart Tooling Daemon. You should get the uri either from available tools or the user, do not just make up a random URI to pass. When asking the user for the uri, you should suggest the \"Copy DTD Uri to clipboard\" action. When reconnecting after losing a connection, always request a new uri first."
---

# MCP Tool: connect_dart_tooling_daemon
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"connect_dart_tooling_daemon","arguments":{}}'
```

## Tool Description
Connects to the Dart Tooling Daemon. You should get the uri either from available tools or the user, do not just make up a random URI to pass. When asking the user for the uri, you should suggest the \"Copy DTD Uri to clipboard\" action. When reconnecting after losing a connection, always request a new uri first.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "uri": {
      "type": "string"
    }
  },
  "required": [
    "uri"
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
