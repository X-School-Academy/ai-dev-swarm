# Ideas

---

## Project Overview

**Project Name**: Dev Swarm WebUI

---

## Project Repository Setup

Select ONE option:

- [x] Use dev-swarm root project
- [ ] Create new GitHub remote repo for root of source code (recommended for production projects)
- [ ] Create local git repo for root of source code (for small experiments/prototypes)

## Source Code Location

- `dev-swarm/js_scripts/webui/` (Frontend)
- `dev-swarm/py_scripts/webui/` (Backend)

---

## Development Stages

Uncheck the stages you want to exclude:

### Discovery & Planning
- **00-init-ideas** - Transform raw ideas into structured business requirements
- [ ] **01-market-research** - Competitive analysis and market validation
- [x] **02-personas** - User personas, stories, and journey maps

### Product Definition
- [x] **03-mvp** - Define MVP scope and prioritize features
- [x] **04-tech-research** - Research and evaluate technical solutions and libraries
- **05-prd** - Product Requirements Document with acceptance criteria

### Design
- [x] **06-ux** - UI/UX design, wireframes, and design system

### Technical Planning
- [ ] **07-architecture** - System architecture, tech stack, database schema
- **08-tech-specs** - Technical specifications, API design, migrations

### Implementation
- [ ] **09-devops** - CI/CD, containerization, cloud infrastructure
- **10-sprints** - Agile sprints, backlog implementation, testing

### Release
- [ ] **11-deployment** - Production deployment, monitoring, launch

**00-init-ideas, 05-prd, 08-tech-specs, and 10-sprints are non-skippable stages**

---

## Problem Statement

The current dev-swarm system relies on terminal console-based AI agents with agent skills and slash commands (`.claude/commands`). This creates two key challenges:

1. **Not user-friendly for non-technical users** - The command-line interface is intimidating and requires familiarity with terminal operations.
2. **Inconsistent AI behavior** - Some AI agents struggle to follow the agent skills reliably, leading to unpredictable results.

---

## Your Solution

Build a web UI that makes dev-swarm accessible to non-technical users while using code-driven logic instead of depending solely on AI agent skills for workflow control.

### Core Concept

Replace prompt-based workflow control with a visual web interface backed by deterministic code logic. Instead of relying on AI agents to create and check SKIP.md files for each stage, use HTML forms and code to manage stage states.

### Key Features

**Stage Management**
- Users can create/remove SKIP.md files for any stage directly from the web UI
- Visual indicators show which stages are active, skipped, or completed

**Stage Workflows**

Most stages (00, 01, 02, 03, 05, 07, 08) follow a two-step pattern:
1. Create stage proposal (README.md)
2. Create stage files once the user approves the proposal

Special stage workflows:
- **Stage 04 (Tech Research)**: Proposal + execute each research topic individually
- **Stage 06 (UX)**: Proposal + create stage files + create UI mockups as needed
- **Stages 09 & 10**: Proposal + create stage files + execute (local install, remote setup, etc.)
- **Stage 99 (Archive)**: Single step to archive the project
- **Restore**: Single step to restore an archived project

**Sprint Management (Stage 10)**

Design a web UI that controls the backlog and sprint workflow via code, not AI prompts:
- Finish a single backlog with one click (runs dev, review, and test automatically)
- Finish a single backlog with three clicks (run dev, review, test separately for more control)
- Finish an entire sprint (run all backlogs in sequence)
- Finish all sprints (run all sprint backlogs across all sprints)

**AI Agent Integration**

- Use AI agents in headless mode (controlled by Python code) for content/file creation
- Support multiple AI code agents via config: Claude Code, Codex, Gemini CLI, and others
- Extract AI prompts from agent skill files into a centralized config
- Auto-commit after each step using headless mode with the git commit skill
- Stream AI output in real-time with the ability to interrupt from the web UI

**Document Viewing and Editing**
- View markdown documents in rich rendered mode (not plain code)
- Edit markdown with live preview
- View HTML documentation files directly in the UI

**Project Sync**
- Scan files and folder structure to reflect the latest project status
- Sync happens automatically on page reload or manually via a refresh/sync button
- Detects changes made outside the web UI (e.g., when users run AI agents directly from the terminal)
- Updates stage states, SKIP.md presence, and file changes accordingly

**Layout**
- Desktop/laptop only (no mobile design needed)
- Responsive design for different desktop/laptop screen sizes

---

## Additional Notes

**Frontend**
- Framework: Next.js
- Location: `dev-swarm/js_scripts/webui/`
- Package manager: pnpm (project root: `dev-swarm/js_scripts/`)
- Port: 3001

**Backend**
- Language: Python
- Location: `dev-swarm/py_scripts/webui/`
- Package manager: uv (venv root: `dev-swarm/py_scripts/`)
- Port: 8001
