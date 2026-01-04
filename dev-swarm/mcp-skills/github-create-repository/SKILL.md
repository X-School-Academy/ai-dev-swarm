---
name: github-create-repository
description: "Create a new GitHub repository in your account or specified organization"
---

# MCP Tool: create_repository
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"create_repository","arguments":{}}
```

## Tool Description
Create a new GitHub repository in your account or specified organization

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "name"
  ],
  "properties": {
    "autoInit": {
      "type": "boolean",
      "description": "Initialize with README"
    },
    "description": {
      "type": "string",
      "description": "Repository description"
    },
    "name": {
      "type": "string",
      "description": "Repository name"
    },
    "organization": {
      "type": "string",
      "description": "Organization to create the repository in (omit to create in your personal account)"
    },
    "private": {
      "type": "boolean",
      "description": "Whether repo should be private"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
