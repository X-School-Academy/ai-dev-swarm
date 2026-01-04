---
name: github-search-pull-requests
description: "Search for pull requests in GitHub repositories using issues search syntax already scoped to is:pr"
---

# MCP Tool: search_pull_requests
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"search_pull_requests","arguments":{}}
```

## Tool Description
Search for pull requests in GitHub repositories using issues search syntax already scoped to is:pr

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "query"
  ],
  "properties": {
    "order": {
      "type": "string",
      "description": "Sort order",
      "enum": [
        "asc",
        "desc"
      ]
    },
    "owner": {
      "type": "string",
      "description": "Optional repository owner. If provided with repo, only pull requests for this repository are listed."
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
    "query": {
      "type": "string",
      "description": "Search query using GitHub pull request search syntax"
    },
    "repo": {
      "type": "string",
      "description": "Optional repository name. If provided with owner, only pull requests for this repository are listed."
    },
    "sort": {
      "type": "string",
      "description": "Sort field by number of matches of categories, defaults to best match",
      "enum": [
        "comments",
        "reactions",
        "reactions-+1",
        "reactions--1",
        "reactions-smile",
        "reactions-thinking_face",
        "reactions-heart",
        "reactions-tada",
        "interactions",
        "created",
        "updated"
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
