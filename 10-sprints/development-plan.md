# Development Plan

## Sprint Breakdown

### SPRINT-01-foundation

- Sprint goal: Establish backend API foundation, safe file access, and stage visibility in the UI.
- Backlogs included: FEATURE-01-stage-state-api, FEATURE-02-file-safety, FEATURE-03-stage-dashboard-ui
- Dependencies: PRD, Tech Specs, UX design system
- Demo criteria: Stage list loads from backend and renders with correct status and skip indicators.
- QA test plan: Validate stage list accuracy against file system fixtures and confirm skip rules for non-skippable stages.

### SPRINT-02-workflows

- Sprint goal: Enable document workflows, run control, streaming output, and sync.
- Backlogs included: FEATURE-04-document-view-edit, FEATURE-05-run-control, FEATURE-06-streaming-output, FEATURE-07-project-sync
- Dependencies: SPRINT-01 foundation APIs and UI state model
- Demo criteria: User can open a stage, edit a document, run a stage, see streaming output, stop the run, and sync changes.
- QA test plan: Verify stream latency, stop behavior, and document save persistence.

### SPRINT-03-ux-polish

- Sprint goal: Finalize UX behavior, error handling, and end-to-end validation.
- Backlogs included: IMPROVE-01-error-ux, IMPROVE-02-responsive-layout, IMPROVE-03-e2e-validation
- Dependencies: SPRINT-02 workflows complete
- Demo criteria: UI shows consistent error states, output panel adapts to width, and core user flows pass end-to-end tests.
- QA test plan: Run UI regression checks on core flows and verify error presentations.

## Backlog Details

### FEATURE-01-stage-state-api

- Keywords: stage-state, stage-list-api
- User story: As a user, I can see all stages with accurate status so I can understand project progress.
- Acceptance criteria:
  - API returns stages 00-11 and 99 with derived status.
  - Skipped stages are reported when SKIP.md exists.
  - Non-skippable stages are flagged as such.
- Developer test plan: Unit test stage derivation rules and API response structure.
- Related files: `05-prd/functional-requirements.md`, `08-tech-specs/api-specifications.md`, `08-tech-specs/backend-specs.md`
- Dependencies: None
- Complexity: M

### FEATURE-02-file-safety

- Keywords: path-safety, root-scope
- User story: As a system, I only access files within the project root to prevent unsafe operations.
- Acceptance criteria:
  - Path traversal and absolute paths are rejected.
  - Writes are limited to known stage folders.
  - Errors return stable codes and messages.
- Developer test plan: Unit tests for path validation and error mapping.
- Related files: `05-prd/non-functional-requirements.md`, `08-tech-specs/security-specifications.md`
- Dependencies: None
- Complexity: S

### FEATURE-03-stage-dashboard-ui

- Keywords: stage-dashboard, status-badges
- User story: As a user, I can view stage status and open a stage from the dashboard.
- Acceptance criteria:
  - Dashboard renders stages with correct status badges.
  - Selecting a stage updates the detail panel.
  - Skip toggle appears only for skippable stages.
- Developer test plan: UI tests for rendering, selection, and skip visibility.
- Related files: `05-prd/acceptance-criteria.md`, `06-ux/wireframe_descriptions.md`, `08-tech-specs/frontend-specs.md`
- Dependencies: FEATURE-01-stage-state-api
- Complexity: M

### FEATURE-04-document-view-edit

- Keywords: doc-viewer, doc-editor
- User story: As a user, I can read and edit stage documents with live preview.
- Acceptance criteria:
  - Markdown renders formatted in view mode.
  - HTML documents render in the UI.
  - Save writes to disk and reports success or failure.
- Developer test plan: Integration tests for read and write endpoints, UI save flow.
- Related files: `05-prd/functional-requirements.md`, `08-tech-specs/frontend-specs.md`, `08-tech-specs/api-specifications.md`
- Dependencies: FEATURE-01-stage-state-api, FEATURE-02-file-safety
- Complexity: M

### FEATURE-05-run-control

- Keywords: run-control, process-lifecycle
- User story: As a user, I can start and stop stage execution safely.
- Acceptance criteria:
  - Run starts and returns a runId.
  - Stop ends the run and updates status.
  - Conflicting runs are rejected.
- Developer test plan: Integration tests for run start, stop, and status transitions.
- Related files: `05-prd/error-handling-and-edge-cases.md`, `08-tech-specs/backend-specs.md`, `08-tech-specs/api-specifications.md`
- Dependencies: FEATURE-02-file-safety
- Complexity: L

### FEATURE-06-streaming-output

- Keywords: streaming-output, sse-feed
- User story: As a user, I can see run output in real time.
- Acceptance criteria:
  - SSE stream delivers system and agent output events.
  - UI displays output within 500ms.
  - Stream closes on run completion.
- Developer test plan: Stream latency tests and UI output rendering tests.
- Related files: `05-prd/non-functional-requirements.md`, `08-tech-specs/observability-spec.md`, `08-tech-specs/openapi.yaml`
- Dependencies: FEATURE-05-run-control
- Complexity: M

### FEATURE-07-project-sync

- Keywords: project-sync, rescan-state
- User story: As a user, I can refresh project state when files change outside the UI.
- Acceptance criteria:
  - Sync re-scans the file system and updates stage state.
  - Sync is blocked during active runs.
  - UI shows a success or error message.
- Developer test plan: API tests for sync response and UI state refresh.
- Related files: `05-prd/functional-requirements.md`, `08-tech-specs/api-specifications.md`
- Dependencies: FEATURE-01-stage-state-api
- Complexity: S

### IMPROVE-01-error-ux

- Keywords: error-ux, toast-banner
- User story: As a user, I receive clear error messages and recovery options.
- Acceptance criteria:
  - Blocking errors show a banner and disable actions.
  - Transient errors show a toast with retry guidance.
  - Error codes are visible for troubleshooting.
- Developer test plan: UI tests for error presentation and state recovery.
- Related files: `05-prd/error-handling-and-edge-cases.md`, `08-tech-specs/error-handling.md`, `06-ux/accessibility.md`
- Dependencies: FEATURE-06-streaming-output, FEATURE-04-document-view-edit
- Complexity: S

### IMPROVE-02-responsive-layout

- Keywords: responsive-layout, output-panel
- User story: As a user, the UI adapts to different desktop widths without losing critical controls.
- Acceptance criteria:
  - Output panel collapses at 1280px and reopens at wider widths.
  - Primary actions remain visible without horizontal scroll.
  - Typography scales according to UX guidance.
- Developer test plan: Manual checks at 1280px, 1440px, and 1920px widths.
- Related files: `06-ux/responsive-design.md`, `08-tech-specs/frontend-specs.md`
- Dependencies: FEATURE-03-stage-dashboard-ui, FEATURE-06-streaming-output
- Complexity: S

### IMPROVE-03-e2e-validation

- Keywords: e2e-validate, workflow-checks
- User story: As a team, we can validate the full workflow before delivery.
- Acceptance criteria:
  - End-to-end flow covers stage selection, doc edit, run, stop, and sync.
  - Core acceptance criteria from PRD are verified.
  - Failures are logged with runId context.
- Developer test plan: Run the end-to-end suite and record results.
- Related files: `05-prd/acceptance-criteria.md`, `08-tech-specs/testing-strategy.md`
- Dependencies: FEATURE-07-project-sync, IMPROVE-01-error-ux
- Complexity: M
