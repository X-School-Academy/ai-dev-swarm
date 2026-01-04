---
name: github-list-issues
description: "List issues in a GitHub repository. For pagination, use the 'endCursor' from the previous response's 'pageInfo' in the 'after' parameter."
---

# MCP Tool: list_issues
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"list_issues","arguments":{}}
```

## Tool Description
List issues in a GitHub repository. For pagination, use the 'endCursor' from the previous response's 'pageInfo' in the 'after' parameter.

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
    "after": {
      "type": "string",
      "description": "Cursor for pagination. Use the endCursor from the previous page's PageInfo for GraphQL APIs."
    },
    "direction": {
      "type": "string",
      "description": "Order direction. If provided, the 'orderBy' also needs to be provided.",
      "enum": [
        "ASC",
        "DESC"
      ]
    },
    "labels": {
      "type": "array",
      "description": "Filter by labels",
      "items": {
        "type": "string"
      }
    },
    "orderBy": {
      "type": "string",
      "description": "Order issues by field. If provided, the 'direction' also needs to be provided.",
      "enum": [
        "CREATED_AT",
        "UPDATED_AT",
        "COMMENTS"
      ]
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
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
    "since": {
      "type": "string",
      "description": "Filter by date (ISO 8601 timestamp)"
    },
    "state": {
      "type": "string",
      "description": "Filter by state, by default both open and closed issues are returned when not provided",
      "enum": [
        "OPEN",
        "CLOSED"
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
