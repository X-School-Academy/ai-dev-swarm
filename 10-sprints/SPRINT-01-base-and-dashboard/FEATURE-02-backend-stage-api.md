# FEATURE-02-backend-stage-api

## Keywords
`stage-list-endpoint`, `stage-status-derivation`, `stage-files-summary`

## User Story
As a frontend, I want to fetch stage data so I can display the dashboard.

## Related Documentation
- 08-tech-specs/backend-specs.md
- 08-tech-specs/api-specifications.md
- 05-prd/functional-requirements.md

## Acceptance Criteria
- [x] GET /api/stages returns stages 00-11 and 99.
- [x] Each stage includes stageId, name, status, isSkippable, hasSkipFile, and files.
- [x] Status derives from SKIP.md, README.md, and active run state.
- [x] Non-skippable stages are 00, 05, 08, and 10.

## Technical Implementation Notes
- Use a fixed stage list to avoid missing folders.
- Derive file lists per stage from known markdown and HTML files.
- Ensure status values align with the tech specs.

## Developer Test Plan
- [x] Create and remove SKIP.md and README.md in a stage folder and confirm status changes.
- [x] Validate file lists for a stage with multiple documents.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [x] Endpoint implemented
- [x] Status derivation complete
- [x] Skippable rules applied
- [x] File list included

## Development Notes
- Added stage definitions and status/file derivation in dev-swarm/py_scripts/webui/stage_service.py.
- Implemented GET /api/stages in dev-swarm/py_scripts/webui/main.py.
- Commit: cbfde5b

## Code Review Notes
- Review Summary: Stage derivation and payload fields align with backend specs.
- Issues Found: 0
- Decision: Approved

## Testing Notes
- Test Summary: Verified /api/stages returns all stage IDs and required fields.
- Results: Passed. 13 stages returned with stageId, name, status, isSkippable, hasSkipFile, and files.
- Decision: Passed
