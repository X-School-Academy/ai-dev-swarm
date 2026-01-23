# Wireframe Descriptions

## Dashboard

- Top header with project name and global actions (sync, settings placeholder).
- Left column: vertical list of stages with status badges and quick actions.
- Main panel: selected stage summary, key files list, and primary action button (run stage).
- Right panel: output console preview with latest execution status.

## Stage Detail View

- Breadcrumb back to dashboard.
- Stage header with state badge and skip toggle (if allowed).
- Two-column layout:
  - Left: document list with type icons.
  - Right: document viewer/editor with tabs for view and edit.
- Execution controls anchored at top-right of content panel.

## Document Viewer/Editor

- Split view option: editor on left, preview on right.
- Single view toggle for smaller screens.
- Sticky save bar with last saved timestamp and primary save action.

## Execution Console

- Dedicated panel on the right side of the layout.
- Start/stop controls at top with status indicator.
- Scrollable output area with monospace text.
- Clear separation between system messages and AI output.

## Sync Feedback

- Sync button in global header.
- Inline toast notification on completion or error.
