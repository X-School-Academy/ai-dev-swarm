---
name: background-process-get-server-status
description: "Gets the current status of the Background Process Manager server."
---

# MCP Tool: get_server_status
Server: backgroundProcess

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"backgroundProcess","tool_name":"get_server_status","arguments":{}}'
```

## Tool Description
Gets the current status of the Background Process Manager server.

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
