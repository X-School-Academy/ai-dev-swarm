---
name: github-push-files
description: "Push multiple files to a GitHub repository in a single commit"
---

# MCP Tool: push_files
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"push_files","arguments":{}}
```

## Tool Description
Push multiple files to a GitHub repository in a single commit

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "branch",
    "files",
    "message"
  ],
  "properties": {
    "branch": {
      "type": "string",
      "description": "Branch to push to"
    },
    "files": {
      "type": "array",
      "description": "Array of file objects to push, each object with path (string) and content (string)",
      "items": {
        "type": "object",
        "required": [
          "path",
          "content"
        ],
        "properties": {
          "content": {
            "type": "string",
            "description": "file content"
          },
          "path": {
            "type": "string",
            "description": "path to the file"
          }
        }
      }
    },
    "message": {
      "type": "string",
      "description": "Commit message"
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
