---
name: background-process-get-process-output
description: "Gets the recent output for a background process. Can specify `head` or `tail`."
---

# MCP Tool: get_process_output
Server: backgroundProcess

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","tool_name":"get_process_output","arguments":{}}'
```

## Tool Description
Gets the recent output for a background process. Can specify `head` or `tail`.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "processId": {
      "type": "string",
      "format": "uuid"
    },
    "head": {
      "type": "number"
    },
    "tail": {
      "type": "number"
    }
  },
  "required": [
    "processId"
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
