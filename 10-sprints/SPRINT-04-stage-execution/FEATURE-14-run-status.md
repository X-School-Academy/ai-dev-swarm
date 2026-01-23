# FEATURE-14-run-status

## Keywords

run-status, run-tracking

## User Story

As Alex (Dev), I want to see run status so that I know the current execution state.

## Acceptance Criteria

- Run status endpoint returns current state and timestamps.
- UI updates run status in near real time.

## Technical Notes

- Status should be derived from run lifecycle records.
- Provide exit status when a run completes or fails.

## Developer Test Plan

- Start a run and poll status until completion.

## Dependencies

FEATURE-13-run-start-stop

## Complexity

M

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
