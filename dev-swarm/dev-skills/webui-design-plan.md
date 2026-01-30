# WebUI Design Plan

## Overview

Build a web-based UI for non-technical users to drive the AI-driven software development lifecycle via headless AI code agents. The WebUI replaces terminal-based agent skill interaction with a visual stage-by-stage workflow.

**Tech Stack:** Next.js (port 3001), pnpm, TypeScript
**Project Location:** `dev-swarm/webui`
**AI Agents Supported:** Claude Code, OpenAI Codex, Gemini CLI (configurable)

---

## Layout Architecture

Three-panel layout:

```
┌──────────┬──────────────────────────────────┬──────────────┐
│          │  Top: Progress Menu (horizontal) │  Right Panel │
│  Left    │                                  │              │
│  Menu    │  Middle: Stage Content Area       │  AI Agent    │
│ (stages) │  - File list (horizontal tabs)   │  Output Log  │
│ vertical │  - Editor / Preview / HTML view  │  (streaming) │
│          │  - Action Buttons                │              │
└──────────┴──────────────────────────────────┴──────────────┘
```

### Top Right Controls
1. **Sync Button** — Syncs all stage files including `SKIP.md`
2. **Agent Select Dropdown** — Lists all configured AI agents; selects the active one

---

## Left Menu — Stage Navigation (Vertical)

Each stage is a menu item displayed vertically. Stages:

| # | Menu Label | Folder | Type |
|---|-----------|--------|------|
| 0 | Init Ideas | `00-init-ideas` | Special (3-step) |
| 1 | Market Research | `01-market-research` | Standard |
| 2 | Personas | `02-personas` | Standard |
| 3 | MVP | `03-mvp` | Standard |
| 4 | Tech Research | `04-tech-research` | Research (dynamic sub-progress) |
| 5 | PRD | `05-prd` | Standard |
| 6 | UX | `06-ux` | UX (with UI Mockup sub-progress) |
| 7 | Architecture | `07-architecture` | Standard |
| 8 | Tech Specs | `08-tech-specs` | Standard |
| 9 | DevOps | `09-devops` | DevOps (with Execute action) |
| 10 | Sprints | `10-sprints` | Sprints (special multi-step) |
| 11 | Deployment | `11-deployment` | DevOps (with Execute action) |
| 12 | Archive | `99-archive` | Archive (single button) |

---

## Middle Panel — Stage Content Area

### Top: Progress Menu (Horizontal)

Each stage has a horizontal progress indicator/selector. The steps vary by stage type (detailed per-stage below). Clicking a step navigates to that sub-view.

### Stage Files Editor/Preview (Shared Component)

Used across multiple stages when showing stage files:

1. **File list** — Displayed horizontally as tabs. Shows markdown/html file names including subfolder names from the current stage folder root. `README.md` is always the first file(show the content in the editor/preview panel by default to allow edit).
2. **File click behavior:**
   - **Markdown file (`.md`)** → Opens markdown code editor + live preview (side by side or toggle)
   - **HTML file (`.html`)** → Opens as a static website homepage in an iframe (can navigate to other HTML files within)
   - **Subfolder** → Replaces file list with the subfolder's contents + an "Up Directory" button; clicking md/html works the same way
3. **Under markdown editor:** Two buttons:
   - `Update` — Saves changes to the file
   - `Delete` — Deletes the file (**Exception:** `README.md` can only be updated, never deleted)

---

## Per-Stage Logic

### Stage 0: Init Ideas

**Progress steps:** `Init` → `Proposal` → `Stage Files`

#### Progress: Init
- **Display:** Content of `ideas.md` in markdown edit + preview mode
- **Buttons:**
  - `Refine Ideas` → AI action: runs prompt from `.claude/commands/ideas-refine.md` to update `ideas.md`, then reloads the editor
  - `Create Proposal` → AI action:
    ```
    Use agent skill `dev-swarm-stage-init-ideas` to create `00-init-ideas/README.md` only, then commit to git
    ```

#### Progress: Proposal (after `00-init-ideas/README.md` exists)
- **Display:** Content of `00-init-ideas/README.md` in markdown edit + preview mode
- **Buttons:**
  - `Update` — Saves edited content to `00-init-ideas/README.md`
  - `Create Files` → AI action:
    ```
    Use agent skill `dev-swarm-stage-init-ideas` to create stage files by `00-init-ideas/README.md`, then commit all to git
    ```

#### Progress: Stage Files (after stage files created)
- **Display:** Stage files editor/preview (shared component) for `00-init-ideas/`
- **Button:**
  - `Finalize` → AI action:
    ```
    Use agent skill `dev-swarm-stage-init-ideas` to update `00-init-ideas/README.md` to reflect stage files at `00-init-ideas/`, then commit all to git
    ```

---

### Stage 1: Market Research (Standard Template)

**Progress steps:** `Proposal` → `Stage Files`

#### Progress: Proposal
- **Display:** Content of `01-market-research/README.md` in markdown edit + preview (if file exists)
- **Buttons:**
  - `Update` — If file exists, saves edited content
  - `Create Proposal` — If file does NOT exist → AI action:
    ```
    Use agent skill `dev-swarm-stage-market-research` to create `01-market-research/README.md` only, then commit to git
    ```
  - `Create Files` → AI action:
    ```
    Use agent skill `dev-swarm-stage-market-research` to create stage files by `01-market-research/README.md`, then commit all to git
    ```

#### Progress: Stage Files (after stage files created)
- **Display:** Stage files editor/preview for `01-market-research/`
- **Button:**
  - `Finalize` → AI action:
    ```
    Use agent skill `dev-swarm-stage-market-research` to update `01-market-research/README.md` to reflect stage files at `01-market-research/`, then commit all to git
    ```

---

### Stage 2: Personas — Same as Market Research (Standard Template)
- **Skill:** `dev-swarm-stage-personas`
- **Folder:** `02-personas`

### Stage 3: MVP — Same as Market Research (Standard Template)
- **Skill:** `dev-swarm-stage-mvp`
- **Folder:** `03-mvp`

---

### Stage 4: Tech Research (Research Template)

**Progress steps:** `Proposal` → `Stage Files` → `Research Name 1` → `Research Name 2` → ...

Dynamic progress items are added based on research subfolders created inside `04-tech-research/`.

#### Progress: Proposal
- Same as Standard Template with skill `dev-swarm-stage-tech-research` and folder `04-tech-research`

#### Progress: Stage Files
- Stage files editor/preview for `04-tech-research/`
- After files are created, detect research subfolders and add them as additional progress indicators

#### Progress: Each Research Name
- **Display:** Subfolder files as stage files (only markdown and HTML files), allow editing markdown
- **Button:**
  - `Research` → AI action:
    ```
    Use agent skill `dev-swarm-stage-tech-research` to do tech research for {{the research name}}, once finished, then commit all to git
    ```

#### On the last research topic: additional button
- `Finalize` → AI action:
  ```
  Use agent skill `dev-swarm-stage-tech-research` to update `04-tech-research/README.md` to reflect stage files and research results at `04-tech-research/`, then commit all to git
  ```

---

### Stage 5: PRD — Same as Market Research (Standard Template)
- **Skill:** `dev-swarm-stage-prd`
- **Folder:** `05-prd`

---

### Stage 6: UX (UX Template)

**Progress steps:** `Proposal` → `Stage Files` → `UI Mockup`

#### Progress: Proposal
- Same as Standard Template with skill `dev-swarm-stage-ux` and folder `06-ux`

#### Progress: Stage Files
- Stage files editor/preview for `06-ux/`
- After files are created, if a UI Mockup subfolder exists, show the `UI Mockup` progress indicator

#### Progress: UI Mockup
- **Display:** Subfolder files as stage files (only markdown and HTML files), allow editing markdown
- **Button:**
  - `Create Mockup` → AI action:
    ```
    Use agent skill `dev-swarm-stage-ux` to create the UI mockup by the UI mockup readme file, once finished, then commit all to git
    ```
  - `Finalize` → AI action:
    ```
    Use agent skill `dev-swarm-stage-ux` to update `06-ux/README.md` to reflect stage files and UI mockup, then commit all to git
    ```

---

### Stage 7: Architecture — Same as Market Research (Standard Template)
- **Skill:** `dev-swarm-stage-architecture`
- **Folder:** `07-architecture`

### Stage 8: Tech Specs — Same as Market Research (Standard Template)
- **Skill:** `dev-swarm-stage-tech-specs`
- **Folder:** `08-tech-specs`

---

### Stage 9: DevOps (DevOps Template)

**Progress steps:** `Proposal` → `Stage Files`

Same as Standard Template with skill `dev-swarm-stage-devops` and folder `09-devops`, **but** under Stage Files there are two extra buttons:

- `Execute` → AI action:
  ```
  Use agent skill `dev-swarm-stage-devops` to execute any local and remote actions based on the stages files, then commit all to git for the result
  ```
- `Finalize` → Same as Standard Template finalize

---

### Stage 10: Sprints (Sprints Template)

**Progress steps:** `Proposal` → `Plan` → `Backlogs`

#### Progress: Proposal
- **Display:** Content of `10-sprints/README.md` in markdown edit + preview (if exists)
- **Buttons:**
  - `Update` — If file exists, save content
  - `Create Proposal` — If file does NOT exist → AI action:
    ```
    Use agent skill `dev-swarm-stage-sprints` to create `10-sprints/README.md` only, then commit to git
    ```
  - `Create Plan` → AI action:
    ```
    Use agent skill `dev-swarm-stage-sprints` to create development plan file `development-plan.md`, then commit all to git
    ```

#### Progress: Plan (after `development-plan.md` exists)
- **Display:** Content of `10-sprints/development-plan.md` in markdown edit + preview
- **Buttons:**
  - `Update` — Save plan content
  - `Create Backlogs` → AI action:
    ```
    Use agent skill `dev-swarm-stage-sprints` to create all the sprints and backlogs files, then commit all to git
    ```

#### Progress: Backlogs (after sprint/backlog files created)
- **Top-level button:**
  - `Develop all the sprints` → AI action:
    ```
    Use agent skill `dev-swarm-stage-sprints` do all the code development, review and test for each backlog one by one.
    Once finish one sprint, conduct the sprint test by the readme file, then the next sprint until finish the whole project
    ```

- **Display:** Sprint folders and markdown files under them as stage files editor/preview
  - **Excluded files:** `10-sprints/README.md` and `10-sprints/development-plan.md`
  - **When opening a sprint `README.md`:** Buttons:
    - `Update` — Save file
    - `Develop this sprint` → AI action:
      ```
      Use agent skill `dev-swarm-stage-sprints` do all the code development, review and test for each backlog one by one in this sprint {{sprint folder name}} and conduct the sprint test by the readme file
      ```
  - **When opening a backlog file (non-README `.md`):** Buttons:
    - `Update` — Save file
    - `Develop this backlog` → AI action:
      ```
      Use agent skill `dev-swarm-stage-sprints` do the code development, review and test for this backlog name {{backlog file name without .md}}
      ```

---

### Stage 11: Deployment — Same as DevOps (DevOps Template)
- **Skill:** `dev-swarm-stage-deployment`
- **Folder:** `11-deployment`

---

### Stage 12: Archive

- **Display:** Single button only
- **Button:**
  - `Archive` → AI action:
    ```
    Use agent skill `dev-swarm-stage-archive` to archive the current project, and ready to start a new project
    ```

---

## Right Panel — AI Agent Output Log

- **Streaming:** Real-time output from the headless AI agent process
- **Buttons:**
  - `Interrupt` — Kills the running AI agent process
  - `Clear` — Clears the log history
- **Auto-clean:** Before each new AI agent request, the output log auto-clears

---

## Skip Stage Behavior

- If a stage folder contains `SKIP.md`, the main panel shows only one button: `Unskip Stage`
- `Unskip Stage` removes `SKIP.md` from the folder, then shows the normal stage view

---

## AUTO Sync

The WebUI syncs files from disk when:
1. User presses the **Sync** button
2. After any API call completes (including agent API calls)
3. On page refresh / initial load

---

## Project Structure Plan

```
dev-swarm/webui/
├── package.json           # pnpm, next.js, typescript
├── pnpm-lock.yaml
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts     # Tailwind CSS (matching claude-mockup design)
├── postcss.config.mjs
├── public/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (3-panel structure)
│   │   ├── page.tsx            # Main page (redirects to first stage)
│   │   └── globals.css         # Global styles (dark theme)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── LeftMenu.tsx         # Stage navigation sidebar
│   │   │   ├── TopBar.tsx           # Sync button + Agent dropdown
│   │   │   ├── ProgressMenu.tsx     # Horizontal progress indicator/selector
│   │   │   └── RightPanel.tsx       # AI agent log panel
│   │   ├── editor/
│   │   │   ├── MarkdownEditor.tsx   # Code editor + live preview
│   │   │   ├── HtmlViewer.tsx       # Iframe-based HTML preview
│   │   │   └── FileList.tsx         # Horizontal file tabs with folder navigation
│   │   ├── stages/
│   │   │   ├── StageContainer.tsx   # Main stage view orchestrator
│   │   │   ├── SkipStage.tsx        # Skip/Unskip view
│   │   │   ├── InitIdeas.tsx        # Stage 0 specific logic
│   │   │   ├── StandardStage.tsx    # Shared: Market Research, Personas, MVP, PRD, Architecture, Tech Specs
│   │   │   ├── ResearchStage.tsx    # Stage 4: Tech Research (dynamic research tabs)
│   │   │   ├── UxStage.tsx          # Stage 6: UX (with UI Mockup)
│   │   │   ├── DevOpsStage.tsx      # Stage 9 & 11: DevOps / Deployment
│   │   │   ├── SprintsStage.tsx     # Stage 10: Sprints (Proposal/Plan/Backlogs)
│   │   │   └── ArchiveStage.tsx     # Stage 12: Archive
│   │   └── common/
│   │       ├── ActionButton.tsx     # AI-action button with loading state
│   │       └── StageFilesBrowser.tsx # Reusable stage files editor/preview
│   ├── lib/
│   │   ├── api.ts              # API client (file read/write, agent execution)
│   │   ├── stages.ts           # Stage config (names, folders, skills, types)
│   │   ├── types.ts            # TypeScript interfaces
│   │   └── sync.ts             # Auto-sync logic
│   ├── hooks/
│   │   ├── useStage.ts         # Stage state management
│   │   ├── useAgent.ts         # AI agent execution + streaming log
│   │   └── useSync.ts          # File sync hook
│   └── config/
│       └── agents.ts           # AI agent configurations (Claude, Codex, Gemini)
```

---

## API Layer

The WebUI needs a backend API (Next.js API routes or existing FastAPI backend at port 8001) to:

1. **File operations:** Read/write/delete markdown files, list directory contents
2. **Agent execution:** Start headless AI agent with prompt, stream output, interrupt process
3. **Sync:** Fetch current state of all stage folders and files
4. **Git status:** Check for `SKIP.md`, `README.md` existence to determine progress state

### Key API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/stages` | GET | List all stages with status (skip, progress) |
| `/api/stages/:id/files` | GET | List files in a stage folder (recursive) |
| `/api/files/read` | GET | Read a file's content |
| `/api/files/write` | POST | Write/update a file |
| `/api/files/delete` | DELETE | Delete a file |
| `/api/agent/run` | POST | Start AI agent with prompt (returns stream) |
| `/api/agent/interrupt` | POST | Kill running agent process |
| `/api/agents` | GET | List configured AI agents |
| `/api/sync` | GET | Full sync of all stage data |

---

## Key Design Decisions

1. **Single-page app** — All stage views rendered within the same page; left menu and right panel persist
2. **Progress state detection** — Determined by checking file existence on disk (e.g., `README.md` exists → Proposal step complete; more than `README.md` → Stage Files step complete)
3. **Streaming logs** — Use Server-Sent Events (SSE) or WebSocket for real-time agent output
4. **Design system** — Reuse claude-mockup dark theme (indigo/slate) with Tailwind CSS
5. **Markdown editor** — Use a code editor library (e.g., CodeMirror or Monaco) with markdown preview via `react-markdown`
6. **HTML preview** — Sandboxed iframe pointing to the HTML file served statically
7. **Agent configuration** — Stored in config file; supports Claude Code, Codex, Gemini CLI with extensible format

---

## Implementation Order

1. Project scaffolding (Next.js + pnpm + Tailwind + TypeScript)
2. Three-panel layout with dark theme
3. Left menu (stage list)
4. API routes (file ops, sync)
5. Stage files browser component (file tabs, markdown editor, HTML viewer)
6. Progress menu component
7. Standard stage template (covers 6 stages)
8. Init Ideas stage (special 3-step flow)
9. Research stage (dynamic sub-progress)
10. UX stage (UI Mockup sub-progress)
11. DevOps stage (Execute button)
12. Sprints stage (Proposal/Plan/Backlogs with sprint/backlog actions)
13. Archive stage
14. Skip stage handling
15. Agent execution + streaming log panel
16. Agent selector dropdown
17. Sync button + auto-sync logic
18. Polish and testing
