---
name: github-create-pull-request
description: "Create a new pull request in a GitHub repository."
---

# MCP Tool: create_pull_request
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"create_pull_request","arguments":{}}
```

## Tool Description
Create a new pull request in a GitHub repository.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "title",
    "head",
    "base"
  ],
  "properties": {
    "base": {
      "type": "string",
      "description": "Branch to merge into"
    },
    "body": {
      "type": "string",
      "description": "PR description"
    },
    "draft": {
      "type": "boolean",
      "description": "Create as draft PR"
    },
    "head": {
      "type": "string",
      "description": "Branch containing changes"
    },
    "maintainer_can_modify": {
      "type": "boolean",
      "description": "Allow maintainer edits"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    },
    "title": {
      "type": "string",
      "description": "PR title"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
