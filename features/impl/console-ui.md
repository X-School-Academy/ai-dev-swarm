# Implementation: console-ui

## Files Changed
- dev-swarm/js_scripts/webui/src/app/page.tsx: console panel, SSE client, auto-scroll handling.
- features/console-ui.md: feature definition.
- features/features-index.md: feature listing.

## Implementation Details
- Starts runs from the header and streams events via EventSource.
- Console keeps output for the current run in local state.
- Auto-scroll respects user scroll position; pin toggle is provided.
- Event categories map to distinct styling for quick scanning.

## Code Structure
- Console logic lives alongside dashboard state for now.

## Key Functions/Components
- `startRun`: triggers a run and resets console state.
- `handleConsoleScroll`: determines pinned/unpinned state.
- EventSource listeners for system/output/error/status categories.
