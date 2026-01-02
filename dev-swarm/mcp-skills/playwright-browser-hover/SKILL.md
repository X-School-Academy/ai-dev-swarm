---
name: playwright-browser-hover
description: "Hover over element on page"
---

# MCP Tool: browser_hover
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_hover","arguments":{}}'
```

## Tool Description
Hover over element on page

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
    }
  },
  "required": [
    "element",
    "ref"
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
