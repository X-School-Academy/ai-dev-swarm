# Feature: headless-runner

## What
Start and track a single headless AI agent run from the backend.

## Why
Stage execution requires a deterministic backend runner with status tracking and output capture.

## Scope
- Start run endpoint returning a runId.
- Run status endpoint with timestamps and state.
- Single active run guard.
- Capture stdout and stderr for streaming.

## Non-Goals
- UI controls for run output (handled in console UI).
- Multi-run concurrency.

## Acceptance Criteria
- POST /api/stages/{stageId}/run starts a run and returns a runId.
- GET /api/runs/{runId} returns run status and timestamps.
- Only one run can be active at a time.
- Stdout and stderr are captured for streaming.

## References
- Implement: impl/headless-runner.md
