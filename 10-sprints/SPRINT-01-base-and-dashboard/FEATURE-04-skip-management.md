# FEATURE-04-skip-management

## Keywords
`skip-toggle`, `file-ops-api`

## User Story
As a user, I want to skip optional stages so I can focus on relevant work.

## Related Documentation
- `05-prd/functional-requirements.md`

## Acceptance Criteria
- [ ] POST `/api/stages/{id}/skip` creates/removes `SKIP.md`.
- [ ] Toggle switch in UI is disabled for non-skippable stages.
- [ ] UI refreshes or optimistic updates on toggle.

## Technical Implementation Notes
- Backend should handle file creation/deletion safely.
- Use a simple boolean toggle in the request body.

## Developer Test Plan
- Toggle skip in UI and verify `SKIP.md` appears/disappears in the file system.
- Verify error returned if trying to skip a non-skippable stage.

## Dependencies
- FEATURE-03-frontend-dashboard-ui

## Complexity Estimate
S

## Status Checklist
- [ ] Backend toggle endpoint complete
- [ ] Frontend toggle component complete
- [ ] Error handling for non-skippable stages
