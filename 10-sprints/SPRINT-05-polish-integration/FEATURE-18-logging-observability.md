# FEATURE-18-logging-observability

## Keywords

observability-logs, run-logging

## User Story

As Alex (Dev), I want structured logs so that I can debug runs.

## Acceptance Criteria

- Logs include category, stageId or runId, and timestamps.
- System and agent output are distinguishable.

## Technical Notes

- Keep logs local and scoped to the project root.
- Use consistent field names across events.

## Developer Test Plan

- Run a stage and confirm logs include required fields.

## Dependencies

FEATURE-13-run-start-stop

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
