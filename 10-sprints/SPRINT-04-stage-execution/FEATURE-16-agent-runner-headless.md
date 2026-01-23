# FEATURE-16-agent-runner-headless

## Keywords

headless-agent-runner, process-execution

## User Story

As Alex (Dev), I want stages to run via headless AI agents so that execution is automated.

## Acceptance Criteria

- Runner executes the configured agent without interactive input.
- Output is captured and streamed to the UI.

## Technical Notes

- Use allowlisted agent binaries only.
- Capture stdout and stderr separately.

## Developer Test Plan

- Execute a dry run with a sample stage and verify output capture.

## Dependencies

FEATURE-01-backend-health

## Complexity

L

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
