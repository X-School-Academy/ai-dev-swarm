---
name: github-merge-pull-request
description: "Merge a pull request in a GitHub repository."
---

# MCP Tool: merge_pull_request
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"merge_pull_request","arguments":{}}
```

## Tool Description
Merge a pull request in a GitHub repository.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "pullNumber"
  ],
  "properties": {
    "commit_message": {
      "type": "string",
      "description": "Extra detail for merge commit"
    },
    "commit_title": {
      "type": "string",
      "description": "Title for merge commit"
    },
    "merge_method": {
      "type": "string",
      "description": "Merge method",
      "enum": [
        "merge",
        "squash",
        "rebase"
      ]
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "pullNumber": {
      "type": "number",
      "description": "Pull request number"
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
