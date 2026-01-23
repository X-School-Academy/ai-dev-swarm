# FEATURE-02-project-root-guard

## Keywords

path-guard, project-root-scope

## User Story

As Sarah (PM), I want file access to be safe so that the UI cannot modify files outside the project.

## Acceptance Criteria

- Absolute paths and parent traversal are rejected.
- Reads and writes are restricted to the project root.

## Technical Notes

- Normalize and validate all paths before access.
- Reject any path that resolves outside the project root.

## Developer Test Plan

- Attempt read and write outside project root and expect rejection.

## Dependencies

FEATURE-01-backend-health

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
