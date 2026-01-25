# Feature: sse-streaming

## What
Stream run output over Server-Sent Events with categorized event types.

## Why
The UI needs real-time visibility into run progress with clear system/output/error/status messages.

## Scope
- SSE endpoint for run output stream.
- Event categories: system, output, error, status.
- Stream closes cleanly when the run finishes.

## Non-Goals
- UI rendering of the output panel (handled in console UI).
- Multi-run streaming multiplexing.

## Acceptance Criteria
- GET /api/runs/{runId}/stream provides SSE output for the run.
- Events include system, output, error, and status categories.
- Stream closes cleanly when the run ends.

## References
- Implement: impl/sse-streaming.md
