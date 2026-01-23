# Development Plan - Stage 10

## Sprint Breakdown

### SPRINT-01-base-and-dashboard
- **Goal:** Establish the project foundation and deliver a functional dashboard that accurately reflects the project's stage status.
- **Features/Backlogs:**
  - `FEATURE-01-project-scaffolding`: Setup Next.js and FastAPI projects with required dependencies.
  - `FEATURE-01b-mockup-adapter-foundation`: Implement the adapter pattern and mock providers for external services.
  - `FEATURE-02-backend-stage-api`: Implement API to list stages and derive status from file system.
  - `FEATURE-03-frontend-dashboard-ui`: Implement the main dashboard layout and stage list with status badges.
  - `FEATURE-04-skip-management`: Implement toggle logic for creating/removing `SKIP.md`.
- **Dependencies:** None.
- **Demo Criteria:** User can launch the app, see the list of stages with correct statuses, and toggle skip on valid stages.
- **QA Test Plan:**
  - Verify strict separation of frontend (3001) and backend (8001).
  - Verify stage status updates immediately upon skip toggle.
  - Verify non-skippable stages cannot be skipped.
  - Verify backend can switch between `mock` and `live` providers via `.env`.

### SPRINT-02-document-management
- **Goal:** Enable users to view and edit project documentation directly within the UI.
- **Features/Backlogs:**
  - `FEATURE-05-backend-files-api`: Implement API for safe file reading and writing within project root.
  - `FEATURE-06-document-viewer`: Implement Markdown rendering and HTML file embedding.
  - `FEATURE-07-document-editor`: Implement text editor with live preview and save functionality.
- **Dependencies:** SPRINT-01 (Backend foundation).
- **Demo Criteria:** User can navigate to a stage, open a markdown file, edit it, save it, and see the changes persist.
- **QA Test Plan:**
  - Verify file access is restricted to project root.
  - Verify markdown formatting renders correctly.
  - Verify save operations handle errors (e.g., permission issues).

### SPRINT-03-execution-and-streaming
- **Goal:** Implement the core AI agent execution workflow with real-time feedback.
- **Features/Backlogs:**
  - `FEATURE-08-headless-runner`: Implement backend service to spawn and manage AI agent processes.
  - `FEATURE-09-sse-streaming`: Implement Server-Sent Events (SSE) for real-time output delivery.
  - `FEATURE-10-console-ui`: Implement the output console panel with auto-scroll and status indicators.
  - `FEATURE-11-stop-execution`: Implement logic to gracefully terminate running processes.
- **Dependencies:** SPRINT-01 (UI Shell), SPRINT-02 (File APIs for inputs).
- **Demo Criteria:** User can click "Run" on a stage, see the output stream in real-time, and stop the execution.
- **QA Test Plan:**
  - Verify process termination cleans up resources.
  - Verify output latency is under 500ms.
  - Verify concurrent run attempts are blocked.

### SPRINT-04-sync-and-polish
- **Goal:** Ensure system resilience, state consistency, and visual polish.
- **Features/Backlogs:**
  - `FEATURE-12-project-sync`: Implement manual and auto-sync to reconcile external file changes.
  - `FEATURE-13-error-handling`: Implement comprehensive error boundaries and toast notifications.
  - `IMPROVE-14-ui-polish`: Refine UI components to match the Design System (colors, typography, spacing).
- **Dependencies:** SPRINT-03 (Execution flow).
- **Demo Criteria:** User can modify files externally and see updates via Sync; UI looks professional and handles errors gracefully.
- **QA Test Plan:**
  - Verify sync detects external file creations/deletions.
  - Verify error toasts appear for backend failures.
  - Verify responsive layout on intended screen sizes.

---

## Backlog Details

### SPRINT-01

**FEATURE-01-project-scaffolding**
- **User Story:** As a developer, I want the project structure set up so I can start building features.
- **Acceptance Criteria:** Next.js app running on port 3001; FastAPI app running on port 8001; proxies configured; `pnpm` and `uv` setup complete.
- **Complexity:** M

**FEATURE-01b-mockup-adapter-foundation**
- **User Story:** As a developer, I want to use mock services during development to save time and costs.
- **Acceptance Criteria:** Abstract base classes defined for AI agents and file operations; Mock providers implemented; `PROVIDER_TYPE` env variable switches between mock and live.
- **Complexity:** M

**FEATURE-02-backend-stage-api**
- **User Story:** As a frontend, I want to fetch stage data so I can display the dashboard.
- **Acceptance Criteria:** GET `/api/stages` returns list of 13 stages; Status derived correctly (skipped, completed, etc.); `SKIP.md` checks are accurate.
- **Complexity:** M

**FEATURE-03-frontend-dashboard-ui**
- **User Story:** As a user, I want to see an overview of all stages so I know the project status.
- **Acceptance Criteria:** Sidebar lists all stages; Status badges match design; Clicking a stage selects it.
- **Complexity:** M

**FEATURE-04-skip-management**
- **User Story:** As a user, I want to skip optional stages so I can focus on relevant work.
- **Acceptance Criteria:** Toggle switch visible for skippable stages; POST `/api/stages/{id}/skip` toggles `SKIP.md`; UI updates immediately.
- **Complexity:** S

### SPRINT-02

**FEATURE-05-backend-files-api**
- **User Story:** As a frontend, I want to read/write files so I can support the editor.
- **Acceptance Criteria:** GET `/api/files/{path}` returns content; POST `/api/files/{path}` writes content; Path traversal attacks blocked.
- **Complexity:** M

**FEATURE-06-document-viewer**
- **User Story:** As a user, I want to read documentation formatted nicely.
- **Acceptance Criteria:** Markdown renders with headers/lists; HTML files render in frame/div; File list shows available docs for stage.
- **Complexity:** M

**FEATURE-07-document-editor**
- **User Story:** As a user, I want to edit documents to update requirements or plans.
- **Acceptance Criteria:** Text area for editing; "Save" button writes to disk; Success/Error feedback.
- **Complexity:** M

### SPRINT-03

**FEATURE-08-headless-runner**
- **User Story:** As a system, I need to run AI agents as background processes.
- **Acceptance Criteria:** Backend can spawn `python -m ...`; Process ID tracked; Stdout/Stderr captured.
- **Complexity:** L

**FEATURE-09-sse-streaming**
- **User Story:** As a user, I want to see progress in real-time.
- **Acceptance Criteria:** GET `/api/stream` endpoint; Events for `system`, `stdout`, `stderr`, `done`.
- **Complexity:** M

**FEATURE-10-console-ui**
- **User Story:** As a user, I want a console view to monitor execution.
- **Acceptance Criteria:** Console panel receives SSE; Auto-scrolls; ANSI color support (optional but nice).
- **Complexity:** M

**FEATURE-11-stop-execution**
- **User Story:** As a user, I want to stop a run if it goes wrong.
- **Acceptance Criteria:** "Stop" button available during run; Backend kills process tree; UI reflects "Stopped" state.
- **Complexity:** S

### SPRINT-04

**FEATURE-12-project-sync**
- **User Story:** As a user, I want the UI to update if I change files outside the app.
- **Acceptance Criteria:** "Sync" button triggers re-scan; Stage status updates if files added/removed externally.
- **Complexity:** M

**FEATURE-13-error-handling**
- **User Story:** As a user, I want to know when something goes wrong.
- **Acceptance Criteria:** Global error boundary; Toast notifications for API errors; 404/500 pages.
- **Complexity:** S

**IMPROVE-14-ui-polish**
- **User Story:** As a user, I want a professional-looking interface.
- **Acceptance Criteria:** Colors match `06-ux/design-system-guide.md`; Spacing is consistent; Fonts correct.
- **Complexity:** S
