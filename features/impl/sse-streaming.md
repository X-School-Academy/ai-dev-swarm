# Implementation: sse-streaming

## Files Changed
- dev-swarm/py_scripts/webui/run_service.py: event log capture for run lifecycle and output.
- dev-swarm/py_scripts/webui/main.py: SSE endpoint for run streaming.
- features/sse-streaming.md: feature definition.
- features/features-index.md: feature listing.

## Implementation Details
- Events are stored in-memory per run with timestamp, category, and message.
- SSE stream emits historical events then polls for new ones until run end.
- Categories: system, output, error, status.

## Code Structure
- run_service.py handles event recording for consistent ordering.
- main.py exposes the stream endpoint and formats SSE frames.

## Key Functions/Components
- `get_event_snapshot`: returns event list for a run.
- `is_run_finished`: indicates when the stream should close.
- `/api/runs/{runId}/stream`: SSE response generator.
