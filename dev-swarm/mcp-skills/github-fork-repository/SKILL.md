---
name: github-fork-repository
description: "Fork a GitHub repository to your account or specified organization"
---

# MCP Tool: fork_repository
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"fork_repository","arguments":{}}
```

## Tool Description
Fork a GitHub repository to your account or specified organization

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
    "organization": {
      "type": "string",
      "description": "Organization to fork to"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
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
