---
name: playwright-browser-navigate
description: "open a URL, open a web page, open web browser, or navigate the current page in the web browser to a new URL."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_navigate","arguments":{}}
```

## Tool Description
Navigate to a URL

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "url": {
      "type": "string",
      "description": "The URL to navigate to"
    }
  },
  "required": [
    "url"
  ],
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
