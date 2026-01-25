# Implementation: document-viewer

## Files Changed
- dev-swarm/js_scripts/webui/package.json: add react-markdown dependency.
- dev-swarm/js_scripts/webui/src/app/page.tsx: document selection, fetch, and viewer rendering.
- dev-swarm/js_scripts/webui/src/app/globals.css: markdown typography styles.
- dev-swarm/js_scripts/webui/README.md: document viewer overview.

## Implementation Details
- Stage document list is clickable and drives a document fetch via the backend API.
- Markdown documents render with React Markdown and shared typography styles.
- HTML documents render in a sandboxed iframe using srcDoc with a minimal style reset.

## Code Structure
- Viewer state lives in the dashboard page component to keep interactions local.
- Styling is defined in globals to avoid inline markdown overrides.

## Key Functions/Components
- `fetchDocument`: loads document payloads from the backend.
- `ReactMarkdown`: renders markdown content in the viewer panel.
- `iframe` with `sandbox`: isolates HTML rendering for safety.
