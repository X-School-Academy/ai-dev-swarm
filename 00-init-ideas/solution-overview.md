# Solution Overview

## Core Concept

Build a web UI that makes dev-swarm accessible to non-technical users while replacing prompt-based workflow control with code-driven logic.

The key insight is: **use AI for content generation, but use code for workflow orchestration**. Instead of asking an AI agent to "check if a stage should be skipped," the code reads the SKIP.md file directly. Instead of prompting an AI to "run the next step," the code determines and executes the appropriate action.

## How It Works

### Stage Management via UI

- Visual dashboard showing all stages (00 through 11) with their current state
- Users toggle stages on/off through the UI, which creates/removes SKIP.md files
- Clear indicators for: active, skipped, completed, in-progress stages
- No need to remember commands—click to manage

### Code-Controlled Workflows

Each stage follows a structured pattern managed by code, not prompts:

**Standard stages (00, 01, 02, 03, 05, 07, 08):**
1. Generate proposal (README.md) using AI in headless mode
2. User reviews and approves via UI
3. Generate stage files using AI in headless mode

**Special stage workflows:**
- Stage 04 (Tech Research): Proposal → execute each research topic individually
- Stage 06 (UX): Proposal → create files → generate UI mockups
- Stages 09 & 10: Proposal → create files → execute setup commands
- Stage 99: Archive project
- Restore: Restore archived project

### Sprint Management (Stage 10)

The most complex workflow gets dedicated UI support:

- **One-click backlog**: Run dev, review, and test automatically
- **Three-click backlog**: Run dev, review, test separately for control
- **Sprint automation**: Process all backlogs in a sprint sequentially
- **Full automation**: Process all sprints end-to-end

### AI Agent Integration

AI agents run in headless mode, controlled by Python code:

- Support multiple agents: Claude Code, Codex, Gemini CLI (configurable)
- Prompts extracted from agent skill files into centralized config
- Real-time output streaming in the UI
- Interrupt capability at any time
- Auto-commit after each step using the git commit skill

### Project Sync

The UI stays synchronized with the file system:

- Auto-sync on page reload
- Manual refresh button
- Detects changes made via terminal (for users who prefer CLI)
- Updates stage states based on actual folder/file presence

### Document Viewing and Editing

- View markdown documents in rich rendered mode (not plain code)
- Edit markdown with live preview
- View HTML documentation files
- No need to switch to an external editor

## Architecture

**Frontend:** Next.js at `dev-swarm/js_scripts/webui/` (port 3001)
**Backend:** Python at `dev-swarm/py_scripts/webui/` (port 8001)

The frontend provides the user interface. The backend handles file operations, AI agent execution, and git operations.

## What This Is Not

- Not a replacement for AI agents—they still do the creative work
- Not a mobile app—desktop-only layout
- Not a hosted service—runs locally alongside dev-swarm
