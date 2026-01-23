# FEATURE-09-sse-streaming

## Keywords
`sse-endpoint`, `real-time-output`, `event-stream`

## User Story
As a user, I want to see progress in real-time.

## Related Documentation
- `08-tech-specs/api-specifications.md`

## Acceptance Criteria
- [ ] GET `/api/stages/{id}/run/stream` returns SSE stream.
- [ ] Events: `system` (start/stop), `stdout` (agent output), `stderr` (errors), `done`.
- [ ] Stream closes cleanly when process ends.

## Technical Implementation Notes
- Use FastAPI's `EventSourceResponse`.
- Use a queue or broadcaster to pipe process output to the SSE handler.

## Developer Test Plan
- Connect to the endpoint via `curl` and trigger a run; verify events arrive.
- Verify multiple tabs can (or cannot) connect to the same stream.

## Dependencies
- FEATURE-08-headless-runner

## Complexity Estimate
M

## Status Checklist
- [ ] SSE endpoint implemented
- [ ] Event categorization complete
- [ ] Stream cleanup verified
