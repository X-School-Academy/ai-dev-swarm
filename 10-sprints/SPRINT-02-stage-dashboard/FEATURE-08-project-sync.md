# FEATURE-08-project-sync

## Keywords

project-sync, stage-refresh

## User Story

As Marcus (BA), I want to refresh the UI so that I see the latest project state.

## Acceptance Criteria

- Manual sync triggers a rescan of stage state.
- UI updates stage list after sync.

## Technical Notes

- Sync should be disabled while a run is active.
- Return updated stage list in the response.

## Developer Test Plan

- Modify stage files outside the UI and verify sync updates state.

## Dependencies

FEATURE-05-stage-list-api

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
