---
name: github-list-pull-requests
description: "List pull requests in a GitHub repository. If the user specifies an author, then DO NOT use this tool and use the search_pull_requests tool instead."
---

# MCP Tool: list_pull_requests
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"list_pull_requests","arguments":{}}
```

## Tool Description
List pull requests in a GitHub repository. If the user specifies an author, then DO NOT use this tool and use the search_pull_requests tool instead.

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
    "base": {
      "type": "string",
      "description": "Filter by base branch"
    },
    "direction": {
      "type": "string",
      "description": "Sort direction",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "head": {
      "type": "string",
      "description": "Filter by head user/org and branch"
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
    "sort": {
      "type": "string",
      "description": "Sort by",
      "enum": [
        "created",
        "updated",
        "popularity",
        "long-running"
      ]
    },
    "state": {
      "type": "string",
      "description": "Filter by state",
      "enum": [
        "open",
        "closed",
        "all"
      ]
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
