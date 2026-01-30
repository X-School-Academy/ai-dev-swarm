# FEATURE-04-skip-management

## Keywords
`skip-toggle-endpoint`, `skip-toggle-ui`, `skip-guardrails`

## User Story
As a user, I want to skip optional stages so I can focus on relevant work.

## Related Documentation
- 05-prd/functional-requirements.md
- 08-tech-specs/api-specifications.md

## Acceptance Criteria
- [x] POST /api/stages/{stageId}/skip toggles SKIP.md creation or removal.
- [x] Non-skippable stages return a clear error and UI disables the toggle.
- [x] UI updates the stage status immediately after the action.

## Technical Implementation Notes
- Validate stageId before file operations.
- Use safe file operations and handle existing SKIP.md gracefully.

## Developer Test Plan
- [x] Toggle skip for a skippable stage and confirm file changes.
- [x] Attempt to skip a non-skippable stage and confirm error handling.

## Dependencies
- FEATURE-03-frontend-dashboard-ui

## Complexity Estimate
S

## Status Checklist
- [x] Backend toggle endpoint complete
- [x] Frontend toggle UI complete
- [x] Error handling verified

## Development Notes
- Added POST /api/stages/{stageId}/skip with validation and SKIP.md updates.
- Added skip/unskip button in the dashboard UI that refreshes stage data.
- Commit: 5590526
- Frontend now surfaces backend error detail for failed skip actions.

## Code Review Notes
- Review Summary: Frontend error handling aligns with backend error messaging.
- Issues Found: 0
- Decision: Approved

## Testing Notes
- Test Summary: Playwright skip toggle for a skippable stage and disabled state for non-skippable stage.
- Results: Passed. Stage 01 toggled skip on/off; Stage 00 skip button remained disabled.
- Decision: Passed
