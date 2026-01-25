# Feature: document-viewer

## What
Render stage documentation files in a formatted view within the stage detail panel.

## Why
Users need to read project documentation directly in the WebUI without opening files externally.

## Scope
- Display a clickable list of stage documents.
- Load document content from the backend document API.
- Render markdown with headings, lists, and readable typography.
- Render HTML inside a sandboxed viewer with consistent styling.

## Non-Goals
- Editing or saving documents (handled by document-editor).
- Running stage workflows or streaming output.

## Acceptance Criteria
- Stage document list remains visible in the stage detail view.
- Markdown documents render formatted headings and lists.
- HTML documents render inside a safe embedded view.

## References
- Implement: impl/document-viewer.md
