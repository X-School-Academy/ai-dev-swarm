# FEATURE-05-run-control

## Keywords

run-control, process-lifecycle

## User Story

As a user, I can start and stop stage execution safely.

## Related Documentation

- `05-prd/error-handling-and-edge-cases.md`
- `08-tech-specs/backend-specs.md`
- `08-tech-specs/api-specifications.md`

## Acceptance Criteria

- Run starts and returns a runId
- Stop ends the run and updates status
- Conflicting runs are rejected

## Technical Implementation Notes

- Enforce single active run at a time
- Capture run start and end timestamps
- Emit system messages for status transitions

## Developer Test Plan

- Integration tests for run start and stop
- Tests for conflict errors and status updates

## Dependencies

FEATURE-02-file-safety

## Complexity

L

## Status Checklist

- [ ] Ready
- [ ] In progress
- [ ] In review
- [ ] Done
