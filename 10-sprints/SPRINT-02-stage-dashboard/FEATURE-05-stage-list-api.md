# FEATURE-05-stage-list-api

## Keywords

stage-list-api, stage-derivation

## User Story

As Sarah (PM), I want to see all stages and their status so that I understand project progress.

## Acceptance Criteria

- API returns all stages with status and file summary.
- Status matches skip and README.md presence rules.

## Technical Notes

- Derive status from SKIP.md and README.md presence.
- Include file summary to support the UI details view.

## Developer Test Plan

- Add and remove SKIP.md and README.md and verify API output.

## Dependencies

FEATURE-01-backend-health

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
