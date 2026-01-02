---
name: playwright-browser-resize
description: "Resize the browser window"
---

# MCP Tool: browser_resize
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_resize","arguments":{}}'
```

## Tool Description
Resize the browser window

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "width": {
      "type": "number",
      "description": "Width of the browser window"
    },
    "height": {
      "type": "number",
      "description": "Height of the browser window"
    }
  },
  "required": [
    "width",
    "height"
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
