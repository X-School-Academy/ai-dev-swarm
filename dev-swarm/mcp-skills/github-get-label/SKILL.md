---
name: github-get-label
description: "Get a specific label from a repository."
---

# MCP Tool: get_label
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"get_label","arguments":{}}
```

## Tool Description
Get a specific label from a repository.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "name"
  ],
  "properties": {
    "name": {
      "type": "string",
      "description": "Label name."
    },
    "owner": {
      "type": "string",
      "description": "Repository owner (username or organization name)"
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
