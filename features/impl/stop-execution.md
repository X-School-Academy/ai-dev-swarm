# Implementation: stop-execution

## Files Changed
- dev-swarm/py_scripts/webui/run_service.py: stop event handling and stopped status tracking.
- dev-swarm/py_scripts/webui/main.py: stop endpoint for active runs.
- dev-swarm/py_scripts/webui/ai_adapters.py: mock cycles for long-running tests.
- features/stop-execution.md: feature definition.
- features/features-index.md: feature listing.

## Implementation Details
- Stop endpoint sets a stop event and marks run status as stopping.
- Runner checks the stop event to exit gracefully and marks status as stopped.
- Mock adapter supports repeated output cycles for stop testing.

## Code Structure
- stop logic lives in run_service to keep API handlers thin.

## Key Functions/Components
- `stop_active_run`: validates and signals the active run to stop.
