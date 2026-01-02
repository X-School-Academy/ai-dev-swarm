---
name: playwright-browser-file-upload
description: "Upload one or multiple files"
---

# MCP Tool: browser_file_upload
Server: playwright

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"playwright","tool_name":"browser_file_upload","arguments":{}}'
```

## Tool Description
Upload one or multiple files

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "paths": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The absolute paths to the files to upload. Can be single file or multiple files. If omitted, file chooser is cancelled."
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
