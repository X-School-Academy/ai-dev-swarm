# MVP Scope

## MVP Goal

Enable non-technical users (Sarah, Marcus) to operate dev-swarm through a web interface, completing a full project workflow from ideas to sprint execution without using the terminal.

## Core Features

### 1. Stage Dashboard

**Description:** Visual overview of all development stages (00-11) with their current state.

**Acceptance Criteria:**
- Display all stages in a clear, navigable layout
- Show stage state: not started, in-progress, completed, skipped
- Indicate which stages have SKIP.md files
- Click on a stage to view its contents
- Responsive layout for different desktop/laptop screen sizes

**Pain Points Addressed:**
- CLI barrier (Sarah, Marcus) - no commands needed
- No visual feedback (Sarah) - see project state at a glance
- Mental state tracking (Alex) - visual status overview

**User Stories:**
- Sarah: see all stages at a glance
- Alex: see which stages are complete, in-progress, or skipped

---

### 2. Stage Skip Management

**Description:** Toggle stages on/off via UI, creating/removing SKIP.md files.

**Acceptance Criteria:**
- Toggle button or checkbox to skip/unskip a stage
- Visual indicator for skipped stages
- Prevent skipping non-skippable stages (00, 05, 08, 10)
- Changes reflected immediately in file system

**Pain Points Addressed:**
- CLI barrier (Sarah, Marcus) - no commands needed
- No visual feedback (Sarah) - clear skip indicators

**User Stories:**
- Sarah: skip stages that aren't relevant

---

### 3. Document Viewer

**Description:** View markdown and HTML documents in rich rendered mode.

**Acceptance Criteria:**
- Render markdown with proper formatting (headers, lists, code blocks, links)
- Support viewing HTML documentation files
- Navigate between documents within a stage
- File tree or list showing available documents

**Pain Points Addressed:**
- Can't review AI output easily (Sarah) - rendered view in UI
- Tool switching overhead (Alex) - no need for external editor

**User Stories:**
- Sarah: view AI-generated documents in a readable format
- Marcus: see markdown rendered properly

---

### 4. Document Editor

**Description:** Edit markdown documents directly in the UI with live preview.

**Acceptance Criteria:**
- Text editor for markdown content
- Live preview of rendered output (split view or toggle)
- Save changes to file system
- Basic editor features (undo, redo)

**Pain Points Addressed:**
- Can't review AI output easily (Sarah) - edit without switching apps
- CLI barrier (Sarah, Marcus) - no need for code editor

**User Stories:**
- Sarah: edit documents directly in the UI

---

### 5. Stage Execution (One-Click Start)

**Description:** Start a stage's AI workflow with one click.

**Acceptance Criteria:**
- "Run Stage" button for each stage
- Execute AI agent in headless mode via backend
- Handle standard stage workflow (proposal → approval → files)
- Disable button while execution is in progress

**Pain Points Addressed:**
- CLI barrier (Sarah, Marcus) - click instead of type commands
- Technical tool intimidation (Marcus) - simple button interface

**User Stories:**
- Sarah: start a stage with one click

---

### 6. Real-Time AI Output

**Description:** Stream AI agent output to the UI in real-time.

**Acceptance Criteria:**
- Display output as it's generated (streaming, not batch)
- Auto-scroll to latest output
- Preserve output history for the current session
- Clear visual distinction between AI output and UI elements

**Pain Points Addressed:**
- No visual feedback (Sarah) - see what AI is doing
- No control over AI execution (Sarah) - identify problems early

**User Stories:**
- Sarah: see AI output in real-time
- Alex: see streaming output like a terminal

---

### 7. Stop Execution

**Description:** Interrupt AI execution at any time.

**Acceptance Criteria:**
- "Stop" button visible during execution
- Cleanly terminate the AI agent process
- Show confirmation that execution was stopped
- Allow restarting the stage after stopping

**Pain Points Addressed:**
- No control over AI execution (Sarah, Alex) - interrupt when wrong
- No easy interruption (Alex) - clean stop without Ctrl+C

**User Stories:**
- Sarah: stop AI execution if something goes wrong
- Alex: interrupt AI mid-execution

---

### 8. Project Sync

**Description:** Manually refresh UI to reflect file system changes.

**Acceptance Criteria:**
- "Sync" or "Refresh" button in the UI
- Scan file system for stage states on click
- Update stage indicators based on actual folder/file presence
- Sync on initial page load

**Pain Points Addressed:**
- No visibility into implementation (Marcus) - see current state
- Mental state tracking (Alex) - UI reflects terminal changes

**User Stories:**
- Sarah: refresh UI to see latest project state
- Alex: see changes made via terminal reflected in UI

---

## AI Agent Support (MVP)

**MVP supports Claude Code only.**

- Run Claude Code in headless/non-interactive mode
- Pass prompts extracted from agent skill config
- Capture stdout/stderr for streaming
- Support process interruption

Multi-agent support (Codex, Gemini CLI) is deferred to post-MVP.

---

## Tech Stack (Confirmed)

**Frontend:**
- Next.js
- Port 3001
- pnpm (project root: `dev-swarm/js_scripts/`)

**Backend:**
- Python
- Port 8001
- uv (venv root: `dev-swarm/py_scripts/`)

---

## Feature Summary

| Feature | Priority | Pain Points Solved |
|---------|----------|-------------------|
| Stage Dashboard | P0 | CLI barrier, No visual feedback |
| Stage Skip Management | P1 | CLI barrier |
| Document Viewer | P0 | Can't review AI output easily |
| Document Editor | P0 | Can't review AI output easily |
| Stage Execution | P0 | CLI barrier, Technical intimidation |
| Real-Time Output | P0 | No visual feedback, No control |
| Stop Execution | P0 | No control, No easy interruption |
| Project Sync | P1 | No visibility, Mental state tracking |
