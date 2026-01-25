# Feature: document-editor

## What
Provide a markdown editor with live preview and save feedback inside the stage detail view.

## Why
Users need to update documentation directly in the WebUI without leaving the app.

## Scope
- Editable markdown text area.
- Live preview pane showing formatted markdown.
- Save action that writes to disk and reports success or failure.
- Undo/redo within the current editing session.

## Non-Goals
- Rich-text editing or HTML editing.
- Multi-user editing or version history.

## Acceptance Criteria
- Markdown editor supports live preview.
- Save action writes to disk with success or failure feedback.
- Undo and redo are available within the edit session.

## References
- Implement: impl/document-editor.md
