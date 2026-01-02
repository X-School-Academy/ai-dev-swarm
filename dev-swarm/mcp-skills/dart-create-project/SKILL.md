---
name: dart-create-project
description: "Creates a new Dart or Flutter project."
---

# MCP Tool: create_project
Server: dart

## Usage
Ensure the MCP Skill Bridge is running, then POST tool arguments:

```bash
curl -s -X POST http://127.0.0.1:28080/invoke \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","tool_name":"create_project","arguments":{}}'
```

## Tool Description
Creates a new Dart or Flutter project.

## Input Schema
```json
{
  "type": "object",
  "properties": {
    "root": {
      "type": "string",
      "title": "The file URI of the project root to run this tool in.",
      "description": "This must be equal to or a subdirectory of one of the roots allowed by the client. Must be a URI with a `file:` scheme (e.g. file:///absolute/path/to/root)."
    },
    "directory": {
      "type": "string",
      "description": "The subdirectory in which to create the project, must be a relative path."
    },
    "projectType": {
      "type": "string",
      "description": "The type of project: 'dart' or 'flutter'."
    },
    "template": {
      "type": "string",
      "description": "The project template to use (e.g., \"console-full\", \"app\")."
    },
    "platform": {
      "type": "array",
      "description": "The list of platforms this project supports. Only valid for Flutter projects. The allowed values are `web`, `linux`, `macos`, `windows`, `android`, `ios`. Defaults to creating a project for all platforms.",
      "items": {
        "type": "string"
      }
    },
    "empty": {
      "type": "boolean",
      "description": "Whether or not to create an \"empty\" project with minimized boilerplate and example code. Defaults to true."
    }
  },
  "required": [
    "directory",
    "projectType"
  ]
}
```

## Background Tasks
If the tool returns a task id, poll the task status via the raw MCP endpoint:

```bash
curl -s -X POST http://127.0.0.1:28080/mcp \
  -H "Content-Type: application/json" \
  -d '{"server_id":"dart","method":"tasks/status","params":{"task_id":"<task_id>"}}'
```
