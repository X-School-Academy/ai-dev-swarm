# FEATURE-08-headless-runner

## Status
Done

## Keywords
`headless-runner`, `process-lifecycle-guard`, `run-state-tracking`

## User Story
As a system, I need to run AI agents as background processes.

## Related Documentation
- 08-tech-specs/backend-specs.md
- 08-tech-specs/api-specifications.md

## Acceptance Criteria
- [x] POST /api/stages/{stageId}/run starts a run and returns a runId.
- [x] GET /api/runs/{runId} returns run status and timestamps.
- [x] Only one run can be active at a time.
- [x] Stdout and stderr are captured for streaming.

## Technical Implementation Notes
- Use async process execution with safe cancellation.
- Track run state in memory with a single active run lock.

## Developer Test Plan
- [x] Start a mock run and verify status transitions.
- [x] Confirm run cleanup on completion or failure.

## Dependencies
- FEATURE-01b-mockup-adapter-foundation

## Complexity Estimate
L

## Status Checklist
- [x] Run start endpoint implemented
- [x] Run status endpoint implemented
- [x] Single-run guard enforced
- [x] Output capture verified

## Development Notes
- Files modified: dev-swarm/py_scripts/webui/main.py
- Files added: dev-swarm/py_scripts/webui/run_service.py, features/headless-runner.md, features/impl/headless-runner.md
- Approach: in-memory run tracking with a background worker and stdout/stderr capture.
- Implementation Commit: 57fb78a

## Code Review Notes
- Review summary: Implementation matches the backlog requirements and API specs for run start/status.
- Issues found: 0
- Decision: Approved for testing.

## Testing Notes
- Test summary: mock run transitions from running to succeeded with timestamps.
- Issues found: 0
- Decision: Passed.
