---
name: github-list-commits
description: "Get list of commits of a branch in a GitHub repository. Returns at least 30 results per page by default, but can return more if specified using the perPage parameter (up to 100)."
---

# MCP Tool: list_commits
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"list_commits","arguments":{}}
```

## Tool Description
Get list of commits of a branch in a GitHub repository. Returns at least 30 results per page by default, but can return more if specified using the perPage parameter (up to 100).

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
    "author": {
      "type": "string",
      "description": "Author username or email address to filter commits by"
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
      "description": "Commit SHA, branch or tag name to list commits of. If not provided, uses the default branch of the repository. If a commit SHA is provided, will list commits up to that SHA."
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
