# FEATURE-12-project-sync

## Keywords
`project-sync`, `state-reconciliation`, `manual-sync`

## User Story
As a user, I want the UI to update if I change files outside the app.

## Related Documentation
- `05-prd/functional-requirements.md`

## Acceptance Criteria
- [ ] "Sync" button in global header.
- [ ] Auto-sync on page load.
- [ ] Backend re-scans stages and files on sync request.
- [ ] Frontend updates all state (stages, skip status, file list) from sync response.

## Technical Implementation Notes
- Reuse the status derivation logic from FEATURE-02.
- Ensure sync is efficient (only scan project root).

## Developer Test Plan
- Manually create a `SKIP.md` in terminal, then click Sync in UI; verify status changes.
- Delete a file and verify it disappears from the file list after sync.

## Dependencies
- FEATURE-01-project-scaffolding
- FEATURE-02-backend-stage-api

## Complexity Estimate
M

## Status Checklist
- [ ] Sync endpoint implemented
- [ ] Global sync action in UI
- [ ] Auto-sync integrated
- [ ] State update verified
