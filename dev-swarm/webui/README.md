# Dev Swarm WebUI

Web-based UI for the AI-driven software development lifecycle. Provides a visual stage-by-stage workflow using headless AI code agents.

## Tech Stack

- **Next.js 16** (TypeScript, App Router, API Routes)
- **Tailwind CSS 4** (dark theme)
- **React 19** with react-markdown
- **pnpm** package manager

## Getting Started

```bash
pnpm install
pnpm dev
```

Runs on **http://localhost:3001**. The backend API is built-in via Next.js API routes — no separate server needed.

## Layout

Three-panel layout:

- **Left** — Stage navigation (00–11, 99)
- **Middle** — Progress menu + stage content (file browser, markdown editor/preview, HTML viewer, action buttons)
- **Right** — AI agent streaming output log

## API Routes

All backend logic runs as Next.js API routes:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/sync` | GET | Full sync of all stage data |
| `/api/stages` | GET | List all stages with status |
| `/api/stages/:id/files` | GET | List files in a stage folder |
| `/api/stages/:id/skip` | POST | Toggle stage skip |
| `/api/files/read` | GET | Read a file's content |
| `/api/files/write` | POST | Write/update a file |
| `/api/files/delete` | DELETE | Delete a file |
| `/api/agent/run` | POST/GET | Start agent (POST) / SSE stream (GET) |
| `/api/agent/interrupt` | POST | Kill running agent process |
| `/api/agents` | GET | List configured AI agents |

## AI Agent Configuration

Agents are configured in `agents.json` at the project root. The dropdown in the UI is populated from this file. No code changes needed to add or remove agents.

### `agents.json` format

```json
[
  {
    "id": "claude",
    "name": "Claude Code",
    "bin": "claude",
    "args": ["--print", "--dangerously-skip-permissions", "{{prompt}}"]
  }
]
```

| Field | Description |
|-------|-------------|
| `id` | Unique identifier (used internally) |
| `name` | Display name shown in the dropdown |
| `bin` | CLI binary name (must be on `$PATH`) |
| `args` | Argument template array. `{{prompt}}` is replaced with the actual prompt at runtime |

### Adding a new agent

Append an entry to `agents.json`:

```json
{
  "id": "myagent",
  "name": "My Agent",
  "bin": "my-agent-cli",
  "args": ["--auto", "{{prompt}}"]
}
```

The file is re-read on every request, so changes take effect immediately without restarting the server.

### Built-in agents

- **Claude Code** — `claude --print --dangerously-skip-permissions`
- **OpenAI Codex** — `codex --approval-mode full-auto -q`
