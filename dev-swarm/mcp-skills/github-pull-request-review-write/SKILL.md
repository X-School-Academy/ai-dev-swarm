---
name: github-pull-request-review-write
description: "Create and/or submit, delete review of a pull request.  Available methods: - create: Create a new review of a pull request. If \"event\" parameter is provided, the review is submitted. If \"event\" is omitted, a pending review is created. - submit_pending: Submit an existing pending review of a pull request. This requires that a pending review exists for the current user on the specified pull request. The \"body\" and \"event\" parameters are used when submitting the review. - delete_pending: Delete an existing pending review of a pull request. This requires that a pending review exists for the current user on the specified pull request."
---

# MCP Tool: pull_request_review_write
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"pull_request_review_write","arguments":{}}
```

## Tool Description
Create and/or submit, delete review of a pull request.  Available methods: - create: Create a new review of a pull request. If \"event\" parameter is provided, the review is submitted. If \"event\" is omitted, a pending review is created. - submit_pending: Submit an existing pending review of a pull request. This requires that a pending review exists for the current user on the specified pull request. The \"body\" and \"event\" parameters are used when submitting the review. - delete_pending: Delete an existing pending review of a pull request. This requires that a pending review exists for the current user on the specified pull request.

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "method",
    "owner",
    "repo",
    "pullNumber"
  ],
  "properties": {
    "body": {
      "type": "string",
      "description": "Review comment text"
    },
    "commitID": {
      "type": "string",
      "description": "SHA of commit to review"
    },
    "event": {
      "type": "string",
      "description": "Review action to perform.",
      "enum": [
        "APPROVE",
        "REQUEST_CHANGES",
        "COMMENT"
      ]
    },
    "method": {
      "type": "string",
      "description": "The write operation to perform on pull request review.",
      "enum": [
        "create",
        "submit_pending",
        "delete_pending"
      ]
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
