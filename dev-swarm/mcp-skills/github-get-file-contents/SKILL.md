---
name: github-get-file-contents
description: "Get the contents of a file or directory from a GitHub repository"
---

# MCP Tool: get_file_contents
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"get_file_contents","arguments":{}}
```

## Tool Description
Get the contents of a file or directory from a GitHub repository

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
      "description": "Repository owner (username or organization)"
    },
    "path": {
      "type": "string",
      "description": "Path to file/directory",
      "default": "/"
    },
    "ref": {
      "type": "string",
      "description": "Accepts optional git refs such as `refs/tags/{tag}`, `refs/heads/{branch}` or `refs/pull/{pr_number}/head`"
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    },
    "sha": {
      "type": "string",
      "description": "Accepts optional commit SHA. If specified, it will be used instead of ref"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
