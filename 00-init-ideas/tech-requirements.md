# Technical Requirements

## Tech Stack (Pre-defined)

### Frontend
- **Framework:** Next.js
- **Location:** `dev-swarm/js_scripts/webui/`
- **Package manager:** pnpm
- **pnpm project root:** `dev-swarm/js_scripts/`
- **Port:** 3001

### Backend
- **Language:** Python
- **Location:** `dev-swarm/py_scripts/webui/`
- **Package manager:** uv
- **uv venv root:** `dev-swarm/py_scripts/`
- **Port:** 8001

## Integration Requirements

### AI Agent Headless Mode

Must support running AI code agents programmatically:

- **Claude Code:** Primary agent, requires headless/non-interactive mode
- **Codex:** OpenAI's code agent, requires headless/non-interactive mode
- **Gemini CLI:** Google's code agent, requires headless execution
- Additional agents configurable via config file

Requirements:
- Execute agent with specific prompts
- Capture stdout/stderr in real-time
- Stream output to frontend via websocket or SSE
- Support interruption (SIGINT/SIGTERM)
- Capture exit codes and error states

### Prompt Configuration

- Extract prompts from existing agent skill files (`.claude/skills/`)
- Store in centralized config (YAML or JSON)
- Allow per-step prompt customization
- Support prompt templates with variable substitution

### Git Operations

- Auto-commit after each step completion
- Use existing git commit skill/prompt for message generation
- Stage specific files (not blanket `git add .`)
- Handle uncommitted changes detection

### File System Operations

- Read/write markdown files
- Create/delete SKIP.md files
- Scan directory structure for stage state detection
- Watch for external file changes (or poll on refresh)

## Functional Requirements

### Stage Management
- Display all stages (00-11) with visual state indicators
- Toggle stage skip state via UI
- Show stage contents (files, README)
- Navigate between stages

### Workflow Execution
- Execute stage steps sequentially
- Display real-time AI output
- Pause/interrupt execution
- Resume or restart from any step

### Sprint Management (Stage 10)
- List sprints and their backlogs
- Execute single backlog (dev → review → test)
- Execute full sprint (all backlogs)
- Execute all sprints
- Individual step control (dev, review, test separately)

### Document Management
- View markdown in rich rendered mode (not plain code)
- Edit markdown with live preview
- View HTML documentation files
- Save changes to file system

### Project Sync
- Detect file system state on page load
- Manual refresh/sync button
- Update UI to reflect external changes

## Non-Functional Requirements

### Layout
- Desktop/laptop only (no mobile design needed)
- Responsive design for different desktop/laptop screen sizes
- Single project view (no multi-project support initially)

### Performance
- Real-time streaming without significant lag
- Responsive UI during AI execution

### Reliability
- Graceful handling of AI agent failures
- Clear error messages for user action
