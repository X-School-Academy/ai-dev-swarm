# FEATURE-02-backend-stage-api

## Keywords
`stage-api`, `status-derivation`, `skip-logic`

## User Story
As a frontend, I want to fetch stage data so I can display the dashboard.

## Related Documentation
- `08-tech-specs/backend-specs.md`
- `05-prd/functional-requirements.md`

## Acceptance Criteria
- [ ] GET `/api/stages` returns all stages (00-11, 99).
- [ ] Each stage includes `id`, `name`, `status`, `isSkippable`.
- [ ] Status is derived: `skipped` (SKIP.md), `completed` (README.md), `not-started` (otherwise).
- [ ] `isSkippable` is false for 00, 05, 08, 10.

## Technical Implementation Notes
- Use `os.path.exists` to check for `SKIP.md` and `README.md` in each stage directory.
- Hardcode the non-skippable stage IDs.

## Developer Test Plan
- Manually create/delete `SKIP.md` in a folder and call the API to verify status change.
- Verify response structure matches frontend expectations.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [ ] API endpoint implemented
- [ ] Status derivation logic complete
- [ ] Skip restrictions applied
