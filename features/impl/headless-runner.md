# Implementation: headless-runner

## Files Changed
- dev-swarm/py_scripts/webui/run_service.py: run tracking, single-run guard, background execution.
- dev-swarm/py_scripts/webui/main.py: run start/status endpoints and active run guard for writes.
- features/headless-runner.md: feature definition.
- features/features-index.md: feature listing.

## Implementation Details
- Runs are tracked in-memory with a single active run lock.
- Background thread executes the AI adapter and captures stdout/stderr in the run record.
- Endpoints return runId, status, timestamps, and exit code.

## Code Structure
- Runner logic lives in run_service.py to keep API handlers thin.

## Key Functions/Components
- `start_run`: creates a run record and starts the background worker.
- `get_run`: returns run status data for polling.
- `has_active_run`: enforces a single active run.
