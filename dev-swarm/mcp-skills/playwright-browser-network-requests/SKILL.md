---
name: playwright-browser-network-requests
description: "Returns all network requests since loading the page"
---

# MCP Tool: browser_network_requests
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_network_requests","arguments":{}}'
```

## Tool Description
Returns all network requests since loading the page

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "includeStatic": {
      "type": "boolean",
      "default": false,
      "description": "Whether to include successful static resources like images, fonts, scripts, etc. Defaults to false."
    }
  },
  "additionalProperties": false,
  "$schema": "http://json-schema.org/draft-07/schema#"
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
