# Implementation: backend-stage-api

## Files Changed
- dev-swarm/py_scripts/webui/stage_service.py: stage definitions, status derivation, file listing.
- dev-swarm/py_scripts/webui/main.py: /api/stages endpoint wiring.

## Implementation Details
- Stage list is derived from a fixed stage definition list to ensure consistent ordering.
- Status uses SKIP.md and README.md presence with a placeholder run_active flag.
- Files include markdown and HTML paths relative to the project root.

## Code Structure
- Backend stage logic lives in stage_service.py with small helper functions.
