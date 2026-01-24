# FEATURE-12-project-sync

## Keywords
`project-sync-endpoint`, `sync-on-load`, `state-reconcile`

## User Story
As a user, I want the UI to update if I change files outside the app.

## Related Documentation
- 05-prd/functional-requirements.md
- 08-tech-specs/backend-specs.md

## Acceptance Criteria
- [ ] POST /api/sync re-scans the project and returns updated stage data.
- [ ] UI triggers sync on page load and via a manual button.
- [ ] Stage list and document list update from sync response.

## Technical Implementation Notes
- Reuse stage status derivation logic from stage list API.
- Keep sync response lightweight and deterministic.

## Developer Test Plan
- Create or delete SKIP.md and documents outside the UI, then sync and verify updates.
- Confirm sync is blocked while a run is active.

## Dependencies
- FEATURE-02-backend-stage-api

## Complexity Estimate
M

## Status Checklist
- [ ] Sync endpoint implemented
- [ ] UI sync action implemented
- [ ] Auto-sync on load implemented
- [ ] State update verified
