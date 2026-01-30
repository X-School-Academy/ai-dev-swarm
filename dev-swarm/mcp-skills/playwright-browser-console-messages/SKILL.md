---
name: playwright-browser-console-messages
description: "To read console logs from the current page, retrieve console messages for debugging JavaScript output."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_console_messages","arguments":{}}
```

## Tool Description
Returns all console messages

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "level": {
      "default": "info",
      "description": "Level of the console messages to return. Each level includes the messages of more severe levels. Defaults to \"info\".",
      "type": "string",
      "enum": [
        "error",
        "warning",
        "info",
        "debug"
      ]
    },
    "filename": {
      "description": "Filename to save the console messages to. If not provided, messages are returned as text.",
      "type": "string"
    }
  },
  "required": [
    "level"
  ],
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
