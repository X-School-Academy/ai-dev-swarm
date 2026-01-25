# Implementation: document-editor

## Files Changed
- dev-swarm/js_scripts/webui/src/app/page.tsx: editor state, undo/redo history, save action, live preview layout.
- dev-swarm/js_scripts/webui/README.md: editor usage notes.
- features/document-editor.md: feature definition.
- features/features-index.md: feature listing.

## Implementation Details
- Editor is enabled only for markdown documents loaded from the backend.
- Undo/redo uses an in-memory history list scoped to the current document.
- Save writes via PUT /api/documents and shows success or error feedback.
- Live preview renders markdown using ReactMarkdown in a side-by-side panel.

## Code Structure
- Editor logic lives in the dashboard page to keep document interactions localized.

## Key Functions/Components
- `handleEditorChange`: updates editor content and history.
- `handleUndo` / `handleRedo`: navigates edit history for the current session.
- `handleSave`: persists markdown changes to the backend.
