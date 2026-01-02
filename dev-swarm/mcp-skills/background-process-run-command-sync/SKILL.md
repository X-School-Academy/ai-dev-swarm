---
name: background-process-run-command-sync
description: "Runs a short-lived shell command synchronously and returns full output."
---

# MCP Tool: run_command_sync
Server: backgroundProcess

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","tool_name":"run_command_sync","arguments":{}}'
```

## Tool Description
Runs a short-lived shell command synchronously and returns full output.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "command": {
      "type": "string"
    }
  },
  "required": [
    "command"
  ],
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
