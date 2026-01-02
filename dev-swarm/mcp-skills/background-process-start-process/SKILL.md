---
name: background-process-start-process
description: "Starts a new background process (servers, watchers, etc.)."
---

# MCP Tool: start_process
Server: backgroundProcess

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","tool_name":"start_process","arguments":{}}'
```

## Tool Description
Starts a new background process (servers, watchers, etc.).

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
