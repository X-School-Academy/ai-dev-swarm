# Development Plan - Stage 10

## Sprint Breakdown

### SPRINT-01-base-and-dashboard
- Sprint goal: establish the project foundation and deliver a functional dashboard with accurate stage status and skip control.
- Backlogs: FEATURE-01, FEATURE-01b, FEATURE-02, FEATURE-03, FEATURE-04.
- Dependencies: none.
- Demo criteria: app launches on 3001 and 8001, stages render with correct status, skip toggles update state.
- QA test plan: verify scaffolding, stage list API, status derivation, and skip restrictions.

### SPRINT-02-document-management
- Sprint goal: enable users to list, view, and edit project documents in the UI.
- Backlogs: FEATURE-05, FEATURE-06, FEATURE-07.
- Dependencies: SPRINT-01.
- Demo criteria: user opens a stage, views markdown and HTML documents, edits and saves markdown.
- QA test plan: verify path safety, document render fidelity, and save feedback.

### SPRINT-03-execution-and-streaming
- Sprint goal: implement headless execution with live streaming and stop controls.
- Backlogs: FEATURE-08, FEATURE-09, FEATURE-10, FEATURE-11.
- Dependencies: SPRINT-01, SPRINT-02.
- Demo criteria: user starts a stage run, sees streaming output, and stops the run cleanly.
- QA test plan: verify run lifecycle, stream event delivery, and stop behavior.

### SPRINT-04-sync-and-polish
- Sprint goal: ensure state consistency, error handling, and UI polish.
- Backlogs: FEATURE-12, FEATURE-13, IMPROVE-14.
- Dependencies: SPRINT-03.
- Demo criteria: external file changes appear after sync, errors surface clearly, UI matches design system.
- QA test plan: verify sync reconciliation, error surfaces, and visual audit.

## Backlog Details

### FEATURE-01-project-scaffolding
- Keywords: `scaffold-nextjs`, `scaffold-fastapi`, `dev-env-bootstrap`.
- User story: as a developer, I want the project structure set up so I can start building features.
- Acceptance criteria: Next.js app at dev-swarm/js_scripts/webui and FastAPI app at dev-swarm/py_scripts/webui, both running on ports 3001 and 8001, with pnpm and uv configured and frontend-backend communication allowed.
- Developer test plan: run the frontend and backend dev servers and confirm basic health endpoints load.
- Related docs: 00-init-ideas/tech-requirements.md, 08-tech-specs/tech-specs-overview.md.
- Dependencies: none.
- Complexity: M.

### FEATURE-01b-mockup-adapter-foundation
- Keywords: `agent-adapter-abc`, `mock-provider-stream`, `provider-env-switch`.
- User story: as a developer, I want to use mock services during development to save time and costs.
- Acceptance criteria: abstract base class for agent execution, mock adapter with deterministic streaming output, live adapter stub, and provider selection via AGENT_CLI_PROVIDER.
- Developer test plan: switch AGENT_CLI_PROVIDER between mock and live and confirm the selected adapter.
- Related docs: 08-tech-specs/api-mockup-adapter.md.
- Dependencies: FEATURE-01.
- Complexity: M.

### FEATURE-02-backend-stage-api
- Keywords: `stage-list-endpoint`, `stage-status-derivation`, `stage-files-summary`.
- User story: as a frontend, I want to fetch stage data so I can display the dashboard.
- Acceptance criteria: GET /api/stages returns stages 00-11 and 99 with stageId, name, status, isSkippable, hasSkipFile, and files; status derives from SKIP.md, README.md, and active run state; non-skippable stages are 00, 05, 08, 10.
- Developer test plan: add and remove SKIP.md and README.md in a stage folder and confirm status changes.
- Related docs: 08-tech-specs/backend-specs.md, 08-tech-specs/api-specifications.md, 05-prd/functional-requirements.md.
- Dependencies: FEATURE-01.
- Complexity: M.

### FEATURE-03-frontend-dashboard-ui
- Keywords: `dashboard-layout`, `stage-list-ui`, `stage-detail-panel`.
- User story: as a user, I want to see an overview of all stages so I know the project status.
- Acceptance criteria: stage list shows all stages with status badges, selecting a stage updates the detail panel, and layout matches the UX wireframe for desktop widths.
- Developer test plan: verify layout at 1440px and 1920px and confirm stage selection updates details.
- Related docs: 06-ux/wireframe_descriptions.md, 06-ux/design-system-guide.md.
- Dependencies: FEATURE-02.
- Complexity: M.

### FEATURE-04-skip-management
- Keywords: `skip-toggle-endpoint`, `skip-toggle-ui`, `skip-guardrails`.
- User story: as a user, I want to skip optional stages so I can focus on relevant work.
- Acceptance criteria: POST /api/stages/{stageId}/skip toggles SKIP.md; non-skippable stages return a clear error; UI updates status immediately after the action.
- Developer test plan: toggle skip for a skippable stage and verify file changes and UI state; attempt to skip a non-skippable stage and verify error handling.
- Related docs: 05-prd/functional-requirements.md, 08-tech-specs/api-specifications.md.
- Dependencies: FEATURE-03.
- Complexity: S.

### FEATURE-05-backend-files-api
- Keywords: `documents-list-endpoint`, `document-read-write`, `path-scope-guard`.
- User story: as a frontend, I want to read and write files so I can support the editor.
- Acceptance criteria: GET /api/stages/{stageId}/documents lists stage documents, GET /api/documents reads a file by path, PUT /api/documents writes content, and path validation blocks traversal or out-of-root access.
- Developer test plan: attempt to read a file outside the root, write a file within a stage, and confirm writes are blocked during active runs.
- Related docs: 08-tech-specs/backend-specs.md, 08-tech-specs/api-specifications.md.
- Dependencies: FEATURE-01.
- Complexity: M.

### FEATURE-06-document-viewer
- Keywords: `document-list-ui`, `markdown-renderer`, `html-viewer`.
- User story: as a user, I want to read documentation formatted nicely.
- Acceptance criteria: stage document list is visible, markdown renders in formatted view, and HTML renders in a safe embedded view.
- Developer test plan: open ideas.md and a UX HTML file and verify formatting.
- Related docs: 05-prd/functional-requirements.md, 06-ux/wireframe_descriptions.md.
- Dependencies: FEATURE-05.
- Complexity: M.

### FEATURE-07-document-editor
- Keywords: `markdown-editor`, `live-preview-pane`, `save-feedback`.
- User story: as a user, I want to edit documents to update requirements or plans.
- Acceptance criteria: markdown editor supports live preview, save confirmation, and undo/redo within the session.
- Developer test plan: edit a markdown file, save changes, refresh, and confirm persistence.
- Related docs: 05-prd/functional-requirements.md.
- Dependencies: FEATURE-06.
- Complexity: M.

### FEATURE-08-headless-runner
- Keywords: `headless-runner`, `process-lifecycle-guard`, `run-state-tracking`.
- User story: as a system, I need to run AI agents as background processes.
- Acceptance criteria: POST /api/stages/{stageId}/run starts a run and returns runId, GET /api/runs/{runId} returns status, only one run is active at a time, and stdout and stderr are captured for streaming.
- Developer test plan: start a mock run, confirm status transitions, and verify process cleanup on completion.
- Related docs: 08-tech-specs/backend-specs.md, 08-tech-specs/api-specifications.md.
- Dependencies: FEATURE-01b.
- Complexity: L.

### FEATURE-09-sse-streaming
- Keywords: `sse-run-stream`, `event-categorization`, `stream-cleanup`.
- User story: as a user, I want to see progress in real time.
- Acceptance criteria: GET /api/runs/{runId}/stream returns SSE with system, output, error, and status events, and the stream closes cleanly when the run ends.
- Developer test plan: connect to the stream, start a run, and verify event sequence and closure.
- Related docs: 08-tech-specs/api-specifications.md, 08-tech-specs/observability-spec.md.
- Dependencies: FEATURE-08.
- Complexity: M.

### FEATURE-10-console-ui
- Keywords: `console-panel-ui`, `sse-client-hook`, `auto-scroll-behavior`.
- User story: as a user, I want a console view to monitor execution.
- Acceptance criteria: console panel shows system and output messages distinctly, auto-scrolls when pinned to bottom, and preserves history for the current run.
- Developer test plan: run a stream with multiple events and verify formatting and scroll behavior.
- Related docs: 06-ux/design-system-guide.md, 08-tech-specs/observability-spec.md.
- Dependencies: FEATURE-03, FEATURE-09.
- Complexity: M.

### FEATURE-11-stop-execution
- Keywords: `run-stop-control`, `process-terminate`, `stop-status-sync`.
- User story: as a user, I want to stop a run if it goes wrong.
- Acceptance criteria: POST /api/stages/{stageId}/stop terminates the run, backend sends graceful then forced termination if needed, and UI reflects stopped status immediately.
- Developer test plan: start a long run, click stop, and confirm process termination and status change.
- Related docs: 05-prd/functional-requirements.md, 08-tech-specs/backend-specs.md.
- Dependencies: FEATURE-08, FEATURE-10.
- Complexity: S.

### FEATURE-12-project-sync
- Keywords: `project-sync-endpoint`, `sync-on-load`, `state-reconcile`.
- User story: as a user, I want the UI to update if I change files outside the app.
- Acceptance criteria: POST /api/sync re-scans the project and returns updated stage data, UI performs sync on page load, and manual sync updates stage list and documents.
- Developer test plan: add or remove SKIP.md and documents via the terminal, then sync and confirm UI updates.
- Related docs: 05-prd/functional-requirements.md, 08-tech-specs/backend-specs.md.
- Dependencies: FEATURE-02.
- Complexity: M.

### FEATURE-13-error-handling
- Keywords: `error-boundary-ui`, `toast-messaging`, `api-error-mapping`.
- User story: as a user, I want to know when something goes wrong.
- Acceptance criteria: global error boundary prevents UI crashes, toast notifications surface backend errors, and error pages exist for invalid routes.
- Developer test plan: simulate backend failures and verify error messaging and fallback UI.
- Related docs: 08-tech-specs/error-handling.md.
- Dependencies: FEATURE-03.
- Complexity: S.

### IMPROVE-14-ui-polish
- Keywords: `design-system-audit`, `type-scale-apply`, `interaction-polish`.
- User story: as a user, I want a professional-looking interface.
- Acceptance criteria: colors and typography match the design system, spacing scale is consistent, and interactive states feel responsive.
- Developer test plan: verify font usage, color tokens, and hover states across key screens.
- Related docs: 06-ux/design-system-guide.md.
- Dependencies: FEATURE-03.
- Complexity: S.
