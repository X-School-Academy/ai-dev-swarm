---
name: github-assign-copilot-to-issue
description: "Assign Copilot to a specific issue in a GitHub repository.  This tool can help with the following outcomes: - a Pull Request created with source code changes to resolve the issue   More information can be found at: - https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/about-assigning-tasks-to-copilot"
---

# MCP Tool: assign_copilot_to_issue
Server: github

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"github","tool_name":"assign_copilot_to_issue","arguments":{}}
```

## Tool Description
Assign Copilot to a specific issue in a GitHub repository.  This tool can help with the following outcomes: - a Pull Request created with source code changes to resolve the issue   More information can be found at: - https://docs.github.com/en/copilot/using-github-copilot/using-copilot-coding-agent-to-work-on-tasks/about-assigning-tasks-to-copilot

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "type": "object",
  "required": [
    "owner",
    "repo",
    "issueNumber"
  ],
  "properties": {
    "issueNumber": {
      "type": "number",
      "description": "Issue number"
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
