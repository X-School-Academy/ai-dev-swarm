# Stage 10 - Sprints

## Stage Goal

This stage converts the technical specifications into an actionable sprint plan and backlog set. The goal is to define demo-able increments, with each backlog independently testable, reviewable, and traceable to PRD requirements and acceptance criteria.

The sprint structure prioritizes the needs of non-technical users (Sarah, Marcus) who must complete the full workflow in the WebUI, while still covering Alex's automation, streaming, and control needs. Every backlog includes clear acceptance criteria and developer test plans to reduce ambiguity during implementation.

By the end of this stage, all sprint folders and backlog files are ready for AI-driven implementation, with each sprint building toward the full MVP without scope drift.

## Sprint Overview

**Total Sprints:** 5

**Sprint Naming Convention:** `SPRINT-XX-descriptive-name/`

### Sprint Summary

**SPRINT-01-foundation**
Establish project infrastructure: frontend shell, backend service, health endpoint, and frontend-backend connectivity.

**SPRINT-02-stage-dashboard**
Implement the stage dashboard with stage list display, status badges, skip management, and project sync.

**SPRINT-03-document-management**
Build document viewing and editing with markdown rendering, live preview, and file save operations.

**SPRINT-04-stage-execution**
Implement stage workflow execution: run stages in headless mode, stream output in real time via SSE, and enable stop functionality.

**SPRINT-05-polish-integration**
Final integration, UI polish, error handling improvements, and end-to-end testing of all workflows.

## Backlog Naming Convention

**Format:** `[BACKLOG_TYPE]-XX-[feature-name]-<sub-feature>.md`

- **BACKLOG_TYPE:** `FEATURE`, `CHANGE`, `BUG`, or `IMPROVE`
- **XX:** Two-digit sequence number (01, 02, etc.)
- **feature-name:** The feature this backlog relates to
- **sub-feature:** Optional sub-feature specifier

**Examples:**
- `FEATURE-01-backend-health.md`
- `FEATURE-02-stage-list-api.md`
- `BUG-01-path-traversal-fix.md`

## Traceability

All backlogs trace to:
- **PRD Functional Requirements:** FR1-FR8 in `05-prd/functional-requirements.md`
- **PRD Acceptance Criteria:** `05-prd/acceptance-criteria.md`
- **MVP Features:** Core features defined in `03-mvp/mvp-scope.md`
- **User Stories:** Stories defined in `02-personas/user-stories.md`
- **Tech Specs:** Implementation details in `08-tech-specs/`
- **Testing Strategy:** `08-tech-specs/testing-strategy.md`

---

**Please review this Stage Proposal. Update it directly or tell me how to update it.**
