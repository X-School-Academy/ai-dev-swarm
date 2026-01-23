# Stage 10 - Development Plan

## Sprint Breakdown

### SPRINT-01-foundation

Sprint goal: Stand up the frontend and backend skeleton with a safe API foundation.

Backlogs included:
- FEATURE-01-backend-health
- FEATURE-02-project-root-guard
- FEATURE-03-frontend-shell-layout
- FEATURE-04-api-client-base

Dependencies: none

Demo criteria:
- Health endpoint responds with basic status.
- Frontend loads the shell layout and can call the health endpoint.

QA test plan:
- Validate health endpoint response format.
- Confirm frontend renders and can reach backend on local ports.

### SPRINT-02-stage-dashboard

Sprint goal: Provide the stage list, skip control, and project sync on the dashboard.

Backlogs included:
- FEATURE-05-stage-list-api
- FEATURE-06-stage-list-ui
- FEATURE-07-skip-toggle
- FEATURE-08-project-sync

Dependencies: SPRINT-01-foundation

Demo criteria:
- Stage list displays all stages with status badges.
- Skip toggle updates SKIP.md for skippable stages only.
- Sync refreshes stage list from disk.

QA test plan:
- Verify stage state derivation rules.
- Confirm non-skippable stages cannot be skipped.
- Confirm manual sync updates UI state.

### SPRINT-03-document-management

Sprint goal: Deliver document list, read/render, and edit/save workflows.

Backlogs included:
- FEATURE-09-documents-list
- FEATURE-10-document-read-render
- FEATURE-11-document-edit-save
- FEATURE-12-html-viewer

Dependencies: SPRINT-02-stage-dashboard

Demo criteria:
- Stage document list populates for the selected stage.
- Markdown renders in a readable format.
- Editor saves changes and reflects updates.
- HTML documents render in the UI safely.

QA test plan:
- Validate markdown render and edit flows.
- Confirm HTML files render without script execution.
- Confirm write operations are blocked during active runs.

### SPRINT-04-stage-execution

Sprint goal: Support stage runs with output streaming and stop control.

Backlogs included:
- FEATURE-13-run-start-stop
- FEATURE-14-run-status
- FEATURE-15-run-stream-sse
- FEATURE-16-agent-runner-headless
- IMPROVE-01-run-locking

Dependencies: SPRINT-03-document-management

Demo criteria:
- Stage run can start and stop from the UI.
- Output streams in real time with system and error categories.
- Run status updates and blocks conflicting actions.

QA test plan:
- Confirm one active run at a time.
- Verify stop behavior and exit status reporting.
- Validate SSE stream stability on long output.

### SPRINT-05-polish-integration

Sprint goal: Finalize UX polish, error handling, and end-to-end validation.

Backlogs included:
- FEATURE-17-error-handling-ui
- FEATURE-18-logging-observability
- FEATURE-19-e2e-workflow-validation
- IMPROVE-02-ui-polish-accessibility

Dependencies: SPRINT-04-stage-execution

Demo criteria:
- Full workflow from stage selection to run output works end to end.
- Error states are clear and actionable.
- UI meets accessibility and responsiveness expectations.

QA test plan:
- Run end-to-end workflow scenarios from user stories.
- Validate error responses map to UI banners or toasts.
- Check accessibility basics on desktop sizes.

## Backlog Details

### FEATURE-01-backend-health

Keywords: health-endpoint, backend-status

User story: As Alex (Dev), I want a health endpoint so that I can verify the backend is running.

Acceptance criteria:
- Health endpoint returns status and version.
- Endpoint returns a stable response format.

Developer test plan:
- Call health endpoint and verify status and version fields.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/backend-specs.md

Complexity: S

### FEATURE-02-project-root-guard

Keywords: path-guard, project-root-scope

User story: As Sarah (PM), I want file access to be safe so that the UI cannot modify files outside the project.

Acceptance criteria:
- Absolute paths and parent traversal are rejected.
- Reads and writes are restricted to the project root.

Developer test plan:
- Attempt read and write outside project root and expect rejection.

Related files:
- 08-tech-specs/security-specifications.md
- 08-tech-specs/backend-specs.md

Complexity: M

### FEATURE-03-frontend-shell-layout

Keywords: ui-shell, layout-panels

User story: As Sarah (PM), I want a clear UI layout so that I can navigate stages, documents, and output.

Acceptance criteria:
- UI loads with stage list, content, and output areas.
- Layout adapts for desktop sizes per specs.

Developer test plan:
- Open the UI at common desktop widths and verify layout.

Related files:
- 06-ux/design-system-guide.md
- 08-tech-specs/frontend-specs.md

Complexity: M

### FEATURE-04-api-client-base

Keywords: api-client, frontend-backend-bridge

User story: As Alex (Dev), I want a shared API client so that frontend calls are consistent and reusable.

Acceptance criteria:
- API client wraps base URL and error handling.
- Client supports GET, POST, PUT as needed for the MVP.

Developer test plan:
- Call health endpoint using the client and verify response handling.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/frontend-specs.md

Complexity: S

### FEATURE-05-stage-list-api

Keywords: stage-list-api, stage-derivation

User story: As Sarah (PM), I want to see all stages and their status so that I understand project progress.

Acceptance criteria:
- API returns all stages with status and file summary.
- Status matches skip and README.md presence rules.

Developer test plan:
- Add and remove SKIP.md and README.md and verify API output.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/backend-specs.md

Complexity: M

### FEATURE-06-stage-list-ui

Keywords: stage-list-ui, status-badges

User story: As Sarah (PM), I want a stage dashboard so that I can see progress at a glance.

Acceptance criteria:
- UI displays all stages with status badges.
- Selected stage drives details panel content.

Developer test plan:
- Verify stage selection updates the detail view.

Related files:
- 06-ux/wireframe_descriptions.md
- 08-tech-specs/frontend-specs.md

Complexity: M

### FEATURE-07-skip-toggle

Keywords: skip-toggle, skip-file-control

User story: As Sarah (PM), I want to skip irrelevant stages so that I focus on what matters.

Acceptance criteria:
- Skip toggle appears only for skippable stages.
- Toggling creates or removes SKIP.md.
- Non-skippable stages reject skip attempts.

Developer test plan:
- Toggle skip on a skippable stage and verify SKIP.md changes.
- Attempt skip on non-skippable stage and verify error.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/frontend-specs.md

Complexity: M

### FEATURE-08-project-sync

Keywords: project-sync, stage-refresh

User story: As Marcus (BA), I want to refresh the UI so that I see the latest project state.

Acceptance criteria:
- Manual sync triggers a rescan of stage state.
- UI updates stage list after sync.

Developer test plan:
- Modify stage files outside the UI and verify sync updates state.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/backend-specs.md

Complexity: M

### FEATURE-09-documents-list

Keywords: documents-list, stage-docs

User story: As Sarah (PM), I want to see available documents for a stage so that I can review them.

Acceptance criteria:
- API returns document paths for selected stage.
- UI lists documents with type hints.

Developer test plan:
- Verify document list shows markdown and HTML files.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/frontend-specs.md

Complexity: M

### FEATURE-10-document-read-render

Keywords: document-read, markdown-render

User story: As Marcus (BA), I want markdown rendered properly so that I can focus on content.

Acceptance criteria:
- API returns document content and metadata.
- Markdown renders in a readable format.

Developer test plan:
- Load markdown documents and verify rendering matches content.

Related files:
- 08-tech-specs/frontend-specs.md
- 08-tech-specs/api-specifications.md

Complexity: M

### FEATURE-11-document-edit-save

Keywords: document-edit, save-changes

User story: As Sarah (PM), I want to edit documents in the UI so that I can correct content quickly.

Acceptance criteria:
- Editor supports markdown editing with live preview.
- Save writes content and updates modified time.
- Writes are blocked during active runs.

Developer test plan:
- Edit and save a markdown file and verify disk changes.
- Start a run and confirm saves are blocked.

Related files:
- 08-tech-specs/frontend-specs.md
- 08-tech-specs/api-specifications.md

Complexity: M

### FEATURE-12-html-viewer

Keywords: html-viewer, safe-embed

User story: As Sarah (PM), I want to view HTML documents so that I can review design assets.

Acceptance criteria:
- HTML documents render in a safe embedded view.
- Scripts are not executed.

Developer test plan:
- Load an HTML file and confirm scripts do not run.

Related files:
- 06-ux/design-ui-preview.html
- 08-tech-specs/frontend-specs.md

Complexity: M

### FEATURE-13-run-start-stop

Keywords: run-start-stop, stage-run-control

User story: As Sarah (PM), I want to start and stop a stage so that I can control execution.

Acceptance criteria:
- Start endpoint kicks off a run with a runId.
- Stop endpoint halts the run and updates status.

Developer test plan:
- Start and stop a run and verify status transitions.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/backend-specs.md

Complexity: L

### FEATURE-14-run-status

Keywords: run-status, run-tracking

User story: As Alex (Dev), I want to see run status so that I know the current execution state.

Acceptance criteria:
- Run status endpoint returns current state and timestamps.
- UI updates run status in near real time.

Developer test plan:
- Start a run and poll status until completion.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/backend-specs.md

Complexity: M

### FEATURE-15-run-stream-sse

Keywords: sse-stream, output-stream

User story: As Sarah (PM), I want to see output in real time so that I can monitor progress.

Acceptance criteria:
- SSE stream emits system, output, error, and status events.
- Output panel auto-updates while streaming.

Developer test plan:
- Run a stage and verify stream events and ordering.

Related files:
- 08-tech-specs/api-specifications.md
- 08-tech-specs/observability-spec.md

Complexity: L

### FEATURE-16-agent-runner-headless

Keywords: headless-agent-runner, process-execution

User story: As Alex (Dev), I want stages to run via headless AI agents so that execution is automated.

Acceptance criteria:
- Runner executes the configured agent without interactive input.
- Output is captured and streamed to the UI.

Developer test plan:
- Execute a dry run with a sample stage and verify output capture.

Related files:
- 04-tech-research/research-1-claude-headless-results.md
- 08-tech-specs/backend-specs.md

Complexity: L

### IMPROVE-01-run-locking

Keywords: run-locking, action-blocks

User story: As Sarah (PM), I want conflicting actions blocked during a run so that I do not corrupt state.

Acceptance criteria:
- Only one run can be active at a time.
- Document writes and sync are blocked during active runs.

Developer test plan:
- Attempt to start a second run and confirm rejection.
- Attempt write and sync during a run and confirm rejection.

Related files:
- 08-tech-specs/backend-specs.md
- 08-tech-specs/frontend-specs.md

Complexity: M

### FEATURE-17-error-handling-ui

Keywords: error-ui, user-guidance

User story: As Marcus (BA), I want clear error messages so that I know how to recover.

Acceptance criteria:
- Blocking errors display a banner with a stable error code.
- Transient errors display a toast.

Developer test plan:
- Trigger validation and run conflicts and verify UI handling.

Related files:
- 05-prd/acceptance-criteria.md
- 08-tech-specs/error-handling.md

Complexity: M

### FEATURE-18-logging-observability

Keywords: observability-logs, run-logging

User story: As Alex (Dev), I want structured logs so that I can debug runs.

Acceptance criteria:
- Logs include category, stageId or runId, and timestamps.
- System and agent output are distinguishable.

Developer test plan:
- Run a stage and confirm logs include required fields.

Related files:
- 08-tech-specs/observability-spec.md
- 08-tech-specs/backend-specs.md

Complexity: M

### FEATURE-19-e2e-workflow-validation

Keywords: e2e-workflow, mvp-validation

User story: As Sarah (PM), I want to validate the full workflow so that I can trust the MVP.

Acceptance criteria:
- End-to-end flow covers stage list, document edit, run execution, and output.
- Results map to PRD acceptance criteria.

Developer test plan:
- Execute the full workflow and confirm expected UI states.

Related files:
- 05-prd/acceptance-criteria.md
- 08-tech-specs/testing-strategy.md

Complexity: L

### IMPROVE-02-ui-polish-accessibility

Keywords: ui-polish, accessibility-basics

User story: As Sarah (PM), I want a polished UI so that I feel confident using the tool.

Acceptance criteria:
- UI meets basic accessibility needs for desktop use.
- Visual hierarchy matches the design guide.

Developer test plan:
- Review spacing, contrast, and focus states on desktop sizes.

Related files:
- 06-ux/design-system-guide.md
- 06-ux/accessibility.md

Complexity: M
