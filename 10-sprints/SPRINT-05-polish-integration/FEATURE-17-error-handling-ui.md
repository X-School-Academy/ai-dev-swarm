# FEATURE-17-error-handling-ui

## Keywords

error-ui, user-guidance

## User Story

As Marcus (BA), I want clear error messages so that I know how to recover.

## Acceptance Criteria

- Blocking errors display a banner with a stable error code.
- Transient errors display a toast.

## Technical Notes

- Map backend error codes to UI messages.
- Keep messages short and actionable.

## Developer Test Plan

- Trigger validation and run conflicts and verify UI handling.

## Dependencies

FEATURE-05-stage-list-api

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
