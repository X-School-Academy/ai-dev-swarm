---
name: playwright-browser-select-option
description: "Select an option in a dropdown"
---

# MCP Tool: browser_select_option
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_select_option","arguments":{}}'
```

## Tool Description
Select an option in a dropdown

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
    "values": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Array of values to select in the dropdown. This can be a single value or multiple values."
    }
  },
  "required": [
    "element",
    "ref",
    "values"
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
