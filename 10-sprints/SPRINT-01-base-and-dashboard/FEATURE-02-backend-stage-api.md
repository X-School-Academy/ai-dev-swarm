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
- [ ] GET /api/stages returns stages 00-11 and 99.
- [ ] Each stage includes stageId, name, status, isSkippable, hasSkipFile, and files.
- [ ] Status derives from SKIP.md, README.md, and active run state.
- [ ] Non-skippable stages are 00, 05, 08, and 10.

## Technical Implementation Notes
- Use a fixed stage list to avoid missing folders.
- Derive file lists per stage from known markdown and HTML files.
- Ensure status values align with the tech specs.

## Developer Test Plan
- Create and remove SKIP.md and README.md in a stage folder and confirm status changes.
- Validate file lists for a stage with multiple documents.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [ ] Endpoint implemented
- [ ] Status derivation complete
- [ ] Skippable rules applied
- [ ] File list included
