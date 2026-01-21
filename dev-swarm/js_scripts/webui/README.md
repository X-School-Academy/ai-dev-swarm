# AI Dev Swarm WebUI

A web-based user interface for managing the AI-driven software development workflow.

## Features

- **Ideas Management**: Create and edit project ideas with a markdown editor
- **Stage Management**: Track progress through development stages (00-10)
- **Sprint/Backlog Management**: Manage sprints and backlogs for stage 09
- **AI Agent Execution**: Execute AI agents (Claude, Codex, Gemini) with real-time streaming output
- **Git Integration**: View status, stage changes, and create commits
- **Markdown Editor**: Edit markdown files with live preview

## Architecture

- **Frontend**: Next.js 15 with React 19, TypeScript, Tailwind CSS
- **Backend**: FastAPI with Python 3.12+, LangGraph for workflow orchestration

## Setup

### Backend (Python)

```bash
cd dev-swarm/py_scripts

# Create virtual environment
uv venv
source .venv/bin/activate

# Install dependencies
uv sync

# Run the server
python -m webui.main
# Or using the script entry point:
# webui
```

The backend server runs at `http://localhost:8001`.

### Frontend (Next.js)

```bash
cd dev-swarm/js_scripts

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The frontend runs at `http://localhost:3001`.

## API Endpoints

### Stages
- `GET /stages/` - List all stages
- `GET /stages/current` - Get current active stage
- `GET /stages/{stage_id}` - Get specific stage
- `POST /stages/{stage_id}/skip` - Skip a stage
- `POST /stages/{stage_id}/create-folder` - Create stage folder

### Files
- `GET /files/stage/{folder}` - List files in a stage folder
- `GET /files/read/{path}` - Read file content
- `POST /files/write` - Write file content
- `DELETE /files/{path}` - Delete a file
- `POST /files/render-markdown` - Render markdown to HTML

### Ideas
- `GET /ideas/template` - Get ideas template
- `GET /ideas/current` - Get current ideas.md
- `POST /ideas/create` - Create ideas.md
- `PUT /ideas/update` - Update ideas.md

### Git
- `GET /git/status` - Get git status
- `POST /git/add` - Stage files
- `POST /git/add-all` - Stage all changes
- `POST /git/commit` - Create commit
- `GET /git/commits` - Get recent commits

### Sprints (Stage 09)
- `GET /sprints/` - List all sprints
- `GET /sprints/{name}` - Get sprint details
- `GET /sprints/{name}/backlogs` - List sprint backlogs
- `POST /sprints/{name}/backlogs/{id}/execute` - Execute backlog action

### Agents
- `GET /agents/available` - List available AI agents
- `GET /agents/active` - List active executions
- `POST /agents/execute` - Execute an agent (SSE streaming)
- `POST /agents/execute/{id}/interrupt` - Interrupt execution
- `POST /agents/execute/{id}/terminate` - Terminate execution

## Configuration

### Environment Variables

All environment variables are configured in `dev-swarm/.env`:

```env
# Frontend (Next.js)
NEXT_PUBLIC_API_URL=http://localhost:8001

# Backend (FastAPI)
WEBUI_HOST=127.0.0.1
WEBUI_PORT=8001
WEBUI_DEBUG=true
WEBUI_DEFAULT_AGENT=claude
WEBUI_AGENT_TIMEOUT=300
WEBUI_AUTO_COMMIT=false
```

## Development

### Backend Development

```bash
cd dev-swarm/py_scripts
source .venv/bin/activate
WEBUI_DEBUG=true python -m webui.main
```

### Frontend Development

```bash
cd dev-swarm/js_scripts
pnpm dev
```

## Supported AI Agents

- **Claude Code**: `claude --print --dangerously-skip-permissions`
- **Codex**: `codex --quiet --auto-edit`
- **Gemini CLI**: `gemini --non-interactive`

Make sure the respective CLI tools are installed and available in your PATH.
