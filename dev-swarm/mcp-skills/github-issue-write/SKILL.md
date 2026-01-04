---
name: github-issue-write
description: "Create a new or update an existing issue in a GitHub repository."
---

# MCP Tool: issue_write
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"issue_write","arguments":{}}
```

## Tool Description
Create a new or update an existing issue in a GitHub repository.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "method",
    "owner",
    "repo"
  ],
  "properties": {
    "assignees": {
      "type": "array",
      "description": "Usernames to assign to this issue",
      "items": {
        "type": "string"
      }
    },
    "body": {
      "type": "string",
      "description": "Issue body content"
    },
    "duplicate_of": {
      "type": "number",
      "description": "Issue number that this issue is a duplicate of. Only used when state_reason is 'duplicate'."
    },
    "issue_number": {
      "type": "number",
      "description": "Issue number to update"
    },
    "labels": {
      "type": "array",
      "description": "Labels to apply to this issue",
      "items": {
        "type": "string"
      }
    },
    "method": {
      "type": "string",
      "description": "Write operation to perform on a single issue.\nOptions are:\n- 'create' - creates a new issue.\n- 'update' - updates an existing issue.\n",
      "enum": [
        "create",
        "update"
      ]
    },
    "milestone": {
      "type": "number",
      "description": "Milestone number"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    },
    "state": {
      "type": "string",
      "description": "New state",
      "enum": [
        "open",
        "closed"
      ]
    },
    "state_reason": {
      "type": "string",
      "description": "Reason for the state change. Ignored unless state is changed.",
      "enum": [
        "completed",
        "not_planned",
        "duplicate"
      ]
    },
    "title": {
      "type": "string",
      "description": "Issue title"
    },
    "type": {
      "type": "string",
      "description": "Type of this issue. Only use if the repository has issue types configured. Use list_issue_types tool to get valid type values for the organization. If the repository doesn't support issue types, omit this parameter."
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
