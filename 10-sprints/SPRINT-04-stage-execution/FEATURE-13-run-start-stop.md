# FEATURE-13-run-start-stop

## Keywords

run-start-stop, stage-run-control

## User Story

As Sarah (PM), I want to start and stop a stage so that I can control execution.

## Acceptance Criteria

- Start endpoint kicks off a run with a runId.
- Stop endpoint halts the run and updates status.

## Technical Notes

- Ensure run start fails when another run is active.
- Stop should attempt graceful shutdown before force kill.

## Developer Test Plan

- Start and stop a run and verify status transitions.

## Dependencies

FEATURE-16-agent-runner-headless

## Complexity

L

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
