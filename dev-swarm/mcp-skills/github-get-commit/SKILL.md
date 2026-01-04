---
name: github-get-commit
description: "Get details for a commit from a GitHub repository"
---

# MCP Tool: get_commit
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"get_commit","arguments":{}}
```

## Tool Description
Get details for a commit from a GitHub repository

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "sha"
  ],
  "properties": {
    "include_diff": {
      "type": "boolean",
      "description": "Whether to include file diffs and stats in the response. Default is true.",
      "default": true
    },
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
    },
    "sha": {
      "type": "string",
      "description": "Commit SHA, branch name, or tag name"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
