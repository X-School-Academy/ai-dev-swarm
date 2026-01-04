---
name: github-list-releases
description: "List releases in a GitHub repository"
---

# MCP Tool: list_releases
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"list_releases","arguments":{}}
```

## Tool Description
List releases in a GitHub repository

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo"
  ],
  "properties": {
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "page": {
      "type": "number",
      "description": "Page number for pagination (min 1)",
      "minimum": 1
    },
    "perPage": {
      "type": "number",
      "description": "Results per page for pagination (min 1, max 100)",
      "minimum": 1,
      "maximum": 100
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
