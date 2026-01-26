# Implementation: project-sync

## Files Changed
- dev-swarm/py_scripts/webui/main.py: /api/sync endpoint and active-run guard.
- dev-swarm/js_scripts/webui/src/app/page.tsx: sync on load + manual sync request wiring.

## Implementation Details
- Sync endpoint reuses stage list derivation and returns a syncedAt timestamp.
- Frontend uses sync response to refresh stages and selected stage.

## Key Functions/Components
- `sync_project`: returns stage list for sync requests.
- `fetchStages`: triggers sync on load and via manual action.
