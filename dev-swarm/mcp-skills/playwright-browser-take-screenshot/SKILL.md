---
name: playwright-browser-take-screenshot
description: "To take a screenshot of a page or element, capture an image for visual verification."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_take_screenshot","arguments":{}}
```

## Tool Description
Take a screenshot of the current page. You can't perform actions based on the screenshot, use browser_snapshot for actions.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "type": {
      "default": "png",
      "description": "Image format for the screenshot. Default is png.",
      "type": "string",
      "enum": [
        "png",
        "jpeg"
      ]
    },
    "filename": {
      "description": "File name to save the screenshot to. Defaults to `page-{timestamp}.{png|jpeg}` if not specified. Prefer relative file names to stay within the output directory.",
      "type": "string"
    },
    "element": {
      "description": "Human-readable element description used to obtain permission to screenshot the element. If not provided, the screenshot will be taken of viewport. If element is provided, ref must be provided too.",
      "type": "string"
    },
    "ref": {
      "description": "Exact target element reference from the page snapshot. If not provided, the screenshot will be taken of viewport. If ref is provided, element must be provided too.",
      "type": "string"
    },
    "fullPage": {
      "description": "When true, takes a screenshot of the full scrollable page, instead of the currently visible viewport. Cannot be used with element screenshots.",
      "type": "boolean"
    }
  },
  "required": [
    "type"
  ],
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
