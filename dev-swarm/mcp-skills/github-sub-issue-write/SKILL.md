---
name: github-sub-issue-write
description: "Add a sub-issue to a parent issue in a GitHub repository."
---

# MCP Tool: sub_issue_write
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"sub_issue_write","arguments":{}}
```

## Tool Description
Add a sub-issue to a parent issue in a GitHub repository.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "method",
    "owner",
    "repo",
    "issue_number",
    "sub_issue_id"
  ],
  "properties": {
    "after_id": {
      "type": "number",
      "description": "The ID of the sub-issue to be prioritized after (either after_id OR before_id should be specified)"
    },
    "before_id": {
      "type": "number",
      "description": "The ID of the sub-issue to be prioritized before (either after_id OR before_id should be specified)"
    },
    "issue_number": {
      "type": "number",
      "description": "The number of the parent issue"
    },
    "method": {
      "type": "string",
      "description": "The action to perform on a single sub-issue\nOptions are:\n- 'add' - add a sub-issue to a parent issue in a GitHub repository.\n- 'remove' - remove a sub-issue from a parent issue in a GitHub repository.\n- 'reprioritize' - change the order of sub-issues within a parent issue in a GitHub repository. Use either 'after_id' or 'before_id' to specify the new position.\n\t\t\t\t"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "replace_parent": {
      "type": "boolean",
      "description": "When true, replaces the sub-issue's current parent issue. Use with 'add' method only."
    },
    "repo": {
      "type": "string",
      "description": "Repository name"
    },
    "sub_issue_id": {
      "type": "number",
      "description": "The ID of the sub-issue to add. ID is not the same as issue number"
    }
  }
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"github","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
