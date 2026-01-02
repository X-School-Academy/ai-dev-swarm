---
name: playwright-browser-handle-dialog
description: "Handle a dialog"
---

# MCP Tool: browser_handle_dialog
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_handle_dialog","arguments":{}}'
```

## Tool Description
Handle a dialog

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "accept": {
      "type": "boolean",
      "description": "Whether to accept the dialog."
    },
    "promptText": {
      "type": "string",
      "description": "The text of the prompt in case of a prompt dialog."
    }
  },
  "required": [
    "accept"
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
