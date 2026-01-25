# Implementation: skip-management

## Files Changed
- dev-swarm/py_scripts/webui/skip_service.py: skip toggle logic and validation.
- dev-swarm/py_scripts/webui/main.py: /api/stages/{stageId}/skip endpoint.
- dev-swarm/js_scripts/webui/src/app/page.tsx: skip button and request handling.

## Implementation Details
- Backend rejects non-skippable stages and missing stage directories.
- Skip toggle creates or removes SKIP.md and returns updated stage data.
- Frontend calls the toggle endpoint, surfaces backend error detail, and refreshes stage state.

## Code Structure
- Skip logic lives alongside stage list logic in stage_service.py.
