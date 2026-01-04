---
name: github-search-repositories
description: "Find GitHub repositories by name, description, readme, topics, or other metadata. Perfect for discovering projects, finding examples, or locating specific repositories across GitHub."
---

# MCP Tool: search_repositories
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"search_repositories","arguments":{}}
```

## Tool Description
Find GitHub repositories by name, description, readme, topics, or other metadata. Perfect for discovering projects, finding examples, or locating specific repositories across GitHub.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "query"
  ],
  "properties": {
    "minimal_output": {
      "type": "boolean",
      "description": "Return minimal repository information (default: true). When false, returns full GitHub API repository objects.",
      "default": true
    },
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
      "description": "Repository search query. Examples: 'machine learning in:name stars:>1000 language:python', 'topic:react', 'user:facebook'. Supports advanced search syntax for precise filtering."
    },
    "sort": {
      "type": "string",
      "description": "Sort repositories by field, defaults to best match",
      "enum": [
        "stars",
        "forks",
        "help-wanted-issues",
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
