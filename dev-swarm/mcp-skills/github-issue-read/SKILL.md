---
name: github-issue-read
description: "Get information about a specific issue in a GitHub repository."
---

# MCP Tool: issue_read
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"issue_read","arguments":{}}
```

## Tool Description
Get information about a specific issue in a GitHub repository.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "method",
    "owner",
    "repo",
    "issue_number"
  ],
  "properties": {
    "issue_number": {
      "type": "number",
      "description": "The number of the issue"
    },
    "method": {
      "type": "string",
      "description": "The read operation to perform on a single issue.\nOptions are:\n1. get - Get details of a specific issue.\n2. get_comments - Get issue comments.\n3. get_sub_issues - Get sub-issues of the issue.\n4. get_labels - Get labels assigned to the issue.\n",
      "enum": [
        "get",
        "get_comments",
        "get_sub_issues",
        "get_labels"
      ]
    },
    "owner": {
      "type": "string",
      "description": "The owner of the repository"
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
      "description": "The name of the repository"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
