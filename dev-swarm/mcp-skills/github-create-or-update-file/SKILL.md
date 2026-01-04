---
name: github-create-or-update-file
description: "Create or update a single file in a GitHub repository.  If updating, you should provide the SHA of the file you want to update. Use this tool to create or update a file in a GitHub repository remotely; do not use it for local file operations.  In order to obtain the SHA of original file version before updating, use the following git command: git ls-tree HEAD <path to file>  If the SHA is not provided, the tool will attempt to acquire it by fetching the current file contents from the repository, which may lead to rewriting latest committed changes if the file has changed since last retrieval."
---

# MCP Tool: create_or_update_file
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"create_or_update_file","arguments":{}}
```

## Tool Description
Create or update a single file in a GitHub repository.  If updating, you should provide the SHA of the file you want to update. Use this tool to create or update a file in a GitHub repository remotely; do not use it for local file operations.  In order to obtain the SHA of original file version before updating, use the following git command: git ls-tree HEAD <path to file>  If the SHA is not provided, the tool will attempt to acquire it by fetching the current file contents from the repository, which may lead to rewriting latest committed changes if the file has changed since last retrieval.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "path",
    "content",
    "message",
    "branch"
  ],
  "properties": {
    "branch": {
      "type": "string",
      "description": "Branch to create/update the file in"
    },
    "content": {
      "type": "string",
      "description": "Content of the file"
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
      "description": "Path where to create/update the file"
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    },
    "sha": {
      "type": "string",
      "description": "The blob SHA of the file being replaced."
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
