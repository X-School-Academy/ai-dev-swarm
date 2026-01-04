---
name: github-search-users
description: "Find GitHub users by username, real name, or other profile information. Useful for locating developers, contributors, or team members."
---

# MCP Tool: search_users
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"search_users","arguments":{}}
```

## Tool Description
Find GitHub users by username, real name, or other profile information. Useful for locating developers, contributors, or team members.

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
      "description": "User search query. Examples: 'john smith', 'location:seattle', 'followers:>100'. Search is automatically scoped to type:user."
    },
    "sort": {
      "type": "string",
      "description": "Sort users by number of followers or repositories, or when the person joined GitHub.",
      "enum": [
        "followers",
        "repositories",
        "joined"
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
