# FEATURE-07-skip-toggle

## Keywords

skip-toggle, skip-file-control

## User Story

As Sarah (PM), I want to skip irrelevant stages so that I focus on what matters.

## Acceptance Criteria

- Skip toggle appears only for skippable stages.
- Toggling creates or removes SKIP.md.
- Non-skippable stages reject skip attempts.

## Technical Notes

- Enforce non-skippable rules in the backend.
- UI should hide the toggle when skip is not allowed.

## Developer Test Plan

- Toggle skip on a skippable stage and verify SKIP.md changes.
- Attempt skip on non-skippable stage and verify error.

## Dependencies

FEATURE-05-stage-list-api

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
