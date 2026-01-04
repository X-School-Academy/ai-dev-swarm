---
name: github-delete-file
description: "Delete a file from a GitHub repository"
---

# MCP Tool: delete_file
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"delete_file","arguments":{}}
```

## Tool Description
Delete a file from a GitHub repository

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "path",
    "message",
    "branch"
  ],
  "properties": {
    "branch": {
      "type": "string",
      "description": "Branch to delete the file from"
    },
    "message": {
      "type": "string",
      "description": "Commit message"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner (username or organization)"
    },
    "path": {
      "type": "string",
      "description": "Path to the file to delete"
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
