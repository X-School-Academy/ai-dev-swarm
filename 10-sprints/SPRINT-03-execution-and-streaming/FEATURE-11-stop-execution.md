# FEATURE-11-stop-execution

## Keywords
`stop-run`, `process-kill`, `graceful-termination`

## User Story
As a user, I want to stop a run if it goes wrong.

## Related Documentation
- `05-prd/functional-requirements.md`

## Acceptance Criteria
- [ ] "Stop" button in UI triggers DELETE/POST to terminate.
- [ ] Backend sends `SIGINT` then `SIGKILL` if needed.
- [ ] UI reflects "Stopped" status immediately.

## Technical Implementation Notes
- Implement a `terminate_process` method in the runner.
- Ensure all child processes are killed.

## Developer Test Plan
- Start a long-running process (e.g., `sleep 100`) and click stop.
- Verify the process is no longer in the system (e.g., `ps aux | grep sleep`).

## Dependencies
- FEATURE-08-headless-runner
- FEATURE-10-console-ui

## Complexity Estimate
S

## Status Checklist
- [ ] Stop endpoint implemented
- [ ] Process termination logic complete
- [ ] UI button integration verified
