---
name: playwright-browser-close
description: "To close the current Playwright page, close the page to end the session or free resources."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_close","arguments":{}}
```

## Tool Description
Close the page

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {},
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
