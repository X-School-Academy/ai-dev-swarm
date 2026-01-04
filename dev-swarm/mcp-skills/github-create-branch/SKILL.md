---
name: github-create-branch
description: "Create a new branch in a GitHub repository"
---

# MCP Tool: create_branch
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"create_branch","arguments":{}}
```

## Tool Description
Create a new branch in a GitHub repository

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "branch"
  ],
  "properties": {
    "branch": {
      "type": "string",
      "description": "Name for new branch"
    },
    "from_branch": {
      "type": "string",
      "description": "Source branch (defaults to repo default)"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
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
