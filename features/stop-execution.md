# Feature: stop-execution

## What
Stop an active run with graceful termination and status updates.

## Why
Users must be able to halt long-running or erroneous runs safely.

## Scope
- Stop endpoint for the active run.
- Attempt graceful termination before forced kill.
- Update run status and clear active run state.

## Non-Goals
- UI stop controls (handled in console UI enhancements later).
- Multi-run cancellation.

## Acceptance Criteria
- POST /api/stages/{stageId}/stop terminates the active run.
- Backend attempts graceful termination before forcing kill.
- UI reflects stopped status immediately and allows restart.

## References
- Implement: impl/stop-execution.md
