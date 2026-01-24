# FEATURE-08-headless-runner

## Keywords
`headless-runner`, `process-lifecycle-guard`, `run-state-tracking`

## User Story
As a system, I need to run AI agents as background processes.

## Related Documentation
- 08-tech-specs/backend-specs.md
- 08-tech-specs/api-specifications.md

## Acceptance Criteria
- [ ] POST /api/stages/{stageId}/run starts a run and returns a runId.
- [ ] GET /api/runs/{runId} returns run status and timestamps.
- [ ] Only one run can be active at a time.
- [ ] Stdout and stderr are captured for streaming.

## Technical Implementation Notes
- Use async process execution with safe cancellation.
- Track run state in memory with a single active run lock.

## Developer Test Plan
- Start a mock run and verify status transitions.
- Confirm run cleanup on completion or failure.

## Dependencies
- FEATURE-01b-mockup-adapter-foundation

## Complexity Estimate
L

## Status Checklist
- [ ] Run start endpoint implemented
- [ ] Run status endpoint implemented
- [ ] Single-run guard enforced
- [ ] Output capture verified
