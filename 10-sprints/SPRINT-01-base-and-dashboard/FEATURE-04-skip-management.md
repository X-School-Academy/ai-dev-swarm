# FEATURE-04-skip-management

## Keywords
`skip-toggle-endpoint`, `skip-toggle-ui`, `skip-guardrails`

## User Story
As a user, I want to skip optional stages so I can focus on relevant work.

## Related Documentation
- 05-prd/functional-requirements.md
- 08-tech-specs/api-specifications.md

## Acceptance Criteria
- [ ] POST /api/stages/{stageId}/skip toggles SKIP.md creation or removal.
- [ ] Non-skippable stages return a clear error and UI disables the toggle.
- [ ] UI updates the stage status immediately after the action.

## Technical Implementation Notes
- Validate stageId before file operations.
- Use safe file operations and handle existing SKIP.md gracefully.

## Developer Test Plan
- Toggle skip for a skippable stage and confirm file changes.
- Attempt to skip a non-skippable stage and confirm error handling.

## Dependencies
- FEATURE-03-frontend-dashboard-ui

## Complexity Estimate
S

## Status Checklist
- [ ] Backend toggle endpoint complete
- [ ] Frontend toggle UI complete
- [ ] Error handling verified
