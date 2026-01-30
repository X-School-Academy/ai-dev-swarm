---
name: playwright-browser-type
description: "To type text into an editable field, enter text into inputs or textareas."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_type","arguments":{}}
```

## Tool Description
Type text into editable element

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "element": {
      "description": "Human-readable element description used to obtain permission to interact with the element",
      "type": "string"
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
      "description": "Whether to submit entered text (press Enter after)",
      "type": "boolean"
    },
    "slowly": {
      "description": "Whether to type one character at a time. Useful for triggering key handlers in the page. By default entire text is filled in at once.",
      "type": "boolean"
    }
  },
  "required": [
    "ref",
    "text"
  ],
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
