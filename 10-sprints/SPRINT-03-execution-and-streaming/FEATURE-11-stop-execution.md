# FEATURE-11-stop-execution

## Keywords
`run-stop-control`, `process-terminate`, `stop-status-sync`

## User Story
As a user, I want to stop a run if it goes wrong.

## Related Documentation
- 05-prd/functional-requirements.md
- 08-tech-specs/backend-specs.md

## Acceptance Criteria
- [ ] POST /api/stages/{stageId}/stop terminates the active run.
- [ ] Backend attempts graceful termination before forcing kill.
- [ ] UI reflects stopped status immediately and allows restart.

## Technical Implementation Notes
- Terminate process tree and confirm exit status.
- Clear active run state after stop.

## Developer Test Plan
- Start a long-running run and stop it from the UI.
- Confirm the run status updates to stopped and resources are released.

## Dependencies
- FEATURE-08-headless-runner
- FEATURE-10-console-ui

## Complexity Estimate
S

## Status Checklist
- [ ] Stop endpoint implemented
- [ ] Termination logic complete
- [ ] UI status update verified
