---
name: playwright-browser-tabs
description: "List, create, close, or select a browser tab."
---

# MCP Tool: browser_tabs
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_tabs","arguments":{}}'
```

## Tool Description
List, create, close, or select a browser tab.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "action": {
      "type": "string",
      "enum": [
        "list",
        "new",
        "close",
        "select"
      ],
      "description": "Operation to perform"
    },
    "index": {
      "type": "number",
      "description": "Tab index, used for close/select. If omitted for close, current tab is closed."
    }
  },
  "required": [
    "action"
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
  -d '{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
