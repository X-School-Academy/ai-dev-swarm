---
name: github-update-pull-request
description: "Update an existing pull request in a GitHub repository."
---

# MCP Tool: update_pull_request
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"update_pull_request","arguments":{}}
```

## Tool Description
Update an existing pull request in a GitHub repository.

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
    "base": {
      "type": "string",
      "description": "New base branch name"
    },
    "body": {
      "type": "string",
      "description": "New description"
    },
    "draft": {
      "type": "boolean",
      "description": "Mark pull request as draft (true) or ready for review (false)"
    },
    "maintainer_can_modify": {
      "type": "boolean",
      "description": "Allow maintainer edits"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "pullNumber": {
      "type": "number",
      "description": "Pull request number to update"
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    },
    "reviewers": {
      "type": "array",
      "description": "GitHub usernames to request reviews from",
      "items": {
        "type": "string"
      }
    },
    "state": {
      "type": "string",
      "description": "New state",
      "enum": [
        "open",
        "closed"
      ]
    },
    "title": {
      "type": "string",
      "description": "New title"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
