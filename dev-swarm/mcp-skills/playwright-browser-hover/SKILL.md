---
name: playwright-browser-hover
description: "To hover over a page element, trigger hover states such as menus or tooltips."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_hover","arguments":{}}
```

## Tool Description
Hover over element on page

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
    }
  },
  "required": [
    "ref"
  ],
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
