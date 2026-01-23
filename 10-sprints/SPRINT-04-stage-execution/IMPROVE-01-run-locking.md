# IMPROVE-01-run-locking

## Keywords

run-locking, action-blocks

## User Story

As Sarah (PM), I want conflicting actions blocked during a run so that I do not corrupt state.

## Acceptance Criteria

- Only one run can be active at a time.
- Document writes and sync are blocked during active runs.

## Technical Notes

- Enforce run locking in backend and surface UI state.
- Return a clear error code on conflicts.

## Developer Test Plan

- Attempt to start a second run and confirm rejection.
- Attempt write and sync during a run and confirm rejection.

## Dependencies

FEATURE-13-run-start-stop

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
