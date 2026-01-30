---
name: playwright-browser-file-upload
description: "To upload files through a file input, provide one or more file paths for a page file chooser."
---

## Usage
Use the MCP tool `dev-swarm.request` to send the payload as a JSON string:

```json
{"server_id":"playwright","tool_name":"browser_file_upload","arguments":{}}
```

## Tool Description
Upload one or multiple files

## Arguments Schema
The schema below describes the `arguments` object in the request payload.
```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "paths": {
      "description": "The absolute paths to the files to upload. Can be single file or multiple files. If omitted, file chooser is cancelled.",
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "additionalProperties": false
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the MCP request tool:

```json
{"server_id":"playwright","method":"tasks/status","params":{"task_id":"<task_id>"}}
```
