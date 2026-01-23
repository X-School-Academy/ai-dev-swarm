# FEATURE-07-project-sync

## Keywords

project-sync, rescan-state

## User Story

As a user, I can refresh project state when files change outside the UI.

## Related Documentation

- `05-prd/functional-requirements.md`
- `08-tech-specs/api-specifications.md`

## Acceptance Criteria

- Sync re-scans the file system and updates stage state
- Sync is blocked during active runs
- UI shows a success or error message

## Technical Implementation Notes

- Sync returns updated stage list
- UI refreshes state after sync completes
- Record sync timestamp for display

## Developer Test Plan

- API tests for sync response and updated stage list
- UI test for sync action and notification

## Dependencies

FEATURE-01-stage-state-api

## Complexity

S

## Status Checklist

- [ ] Ready
- [ ] In progress
- [ ] In review
- [ ] Done
