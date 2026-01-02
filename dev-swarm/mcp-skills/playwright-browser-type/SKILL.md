---
name: playwright-browser-type
description: "Type text into editable element"
---

# MCP Tool: browser_type
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_type","arguments":{}}'
```

## Tool Description
Type text into editable element

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "element": {
      "type": "string",
      "description": "Human-readable element description used to obtain permission to interact with the element"
    },
    "ref": {
      "type": "string",
      "description": "Exact target element reference from the page snapshot"
    },
    "text": {
      "type": "string",
      "description": "Text to type into the element"
    },
    "submit": {
      "type": "boolean",
      "description": "Whether to submit entered text (press Enter after)"
    },
    "slowly": {
      "type": "boolean",
      "description": "Whether to type one character at a time. Useful for triggering key handlers in the page. By default entire text is filled in at once."
    }
  },
  "required": [
    "element",
    "ref",
    "text"
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
