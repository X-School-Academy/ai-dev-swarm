# FEATURE-12-project-sync

## Status
Done

## Keywords
`project-sync-endpoint`, `sync-on-load`, `state-reconcile`

## User Story
As a user, I want the UI to update if I change files outside the app.

## Related Documentation
- 05-prd/functional-requirements.md
- 08-tech-specs/backend-specs.md

## Acceptance Criteria
- [x] POST /api/sync re-scans the project and returns updated stage data.
- [x] UI triggers sync on page load and via a manual button.
- [x] Stage list and document list update from sync response.

## Technical Implementation Notes
- Reuse stage status derivation logic from stage list API.
- Keep sync response lightweight and deterministic.

## Developer Test Plan
- [x] Create or delete SKIP.md and documents outside the UI, then sync and verify updates.
- [x] Confirm sync is blocked while a run is active.

## Dependencies
- FEATURE-02-backend-stage-api

## Complexity Estimate
M

## Status Checklist
- [x] Sync endpoint implemented
- [x] UI sync action implemented
- [x] Auto-sync on load implemented
- [x] State update verified

## Development Notes
- Files modified: dev-swarm/py_scripts/webui/main.py, dev-swarm/js_scripts/webui/src/app/page.tsx, dev-swarm/py_scripts/webui/README.md, dev-swarm/js_scripts/webui/README.md, features/features-index.md
- Files added: features/project-sync.md, features/contracts/project-sync.md, features/impl/project-sync.md
- Approach: add /api/sync endpoint with active-run guard and use it for initial load + manual refresh to keep stage state deterministic.

## Code Review Notes
- Review summary: Sync endpoint and UI integration meet acceptance criteria with active-run guard.
- Issues found: 0
- Decision: Approved for testing.

## Testing Notes
- Test summary: Playwright UI check confirmed stage list loads after initial sync and Sync button triggers refresh without errors.
- Issues found: 0
- Decision: Passed.
