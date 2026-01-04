---
name: github-update-pull-request-branch
description: "Update the branch of a pull request with the latest changes from the base branch."
---

# MCP Tool: update_pull_request_branch
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"update_pull_request_branch","arguments":{}}
```

## Tool Description
Update the branch of a pull request with the latest changes from the base branch.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "pullNumber"
  ],
  "properties": {
    "expectedHeadSha": {
      "type": "string",
      "description": "The expected SHA of the pull request's HEAD ref"
    },
    "owner": {
      "type": "string",
      "description": "Repository owner"
    },
    "pullNumber": {
      "type": "number",
      "description": "Pull request number"
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
