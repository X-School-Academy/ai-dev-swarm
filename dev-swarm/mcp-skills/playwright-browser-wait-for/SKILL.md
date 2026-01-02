---
name: playwright-browser-wait-for
description: "Wait for text to appear or disappear or a specified time to pass"
---

# MCP Tool: browser_wait_for
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_wait_for","arguments":{}}'
```

## Tool Description
Wait for text to appear or disappear or a specified time to pass

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "time": {
      "type": "number",
      "description": "The time to wait in seconds"
    },
    "text": {
      "type": "string",
      "description": "The text to wait for"
    },
    "textGone": {
      "type": "string",
      "description": "The text to wait for to disappear"
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
