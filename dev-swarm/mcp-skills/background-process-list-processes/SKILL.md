---
name: background-process-list-processes
description: "Gets a list of all processes being managed by the Background Process Manager."
---

# MCP Tool: list_processes
Server: backgroundProcess

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","tool_name":"list_processes","arguments":{}}'
```

## Tool Description
Gets a list of all processes being managed by the Background Process Manager.

## Input Schema
```json
{
  "type": "object",
  "properties": {},
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
