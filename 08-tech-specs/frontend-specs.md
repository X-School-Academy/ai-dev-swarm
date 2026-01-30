# Frontend Specs

## Application Structure

- Framework: Next.js
- UI shell provides three main panels: stage list, content, output
- The output panel collapses below 1440px width

## State Model

- Stage list stored in client state and refreshed on sync
- Selected stage drives document list and run controls
- Run state is global and blocks conflicting actions

## Stage Dashboard Behavior

- Show all stages 00-11 and 99 with status badges
- Skip toggle only appears for skippable stages
- Stage detail view shows key files and primary actions

## Document Viewer and Editor

- Markdown renders in formatted view
- HTML files render in a safe embedded view
- Editor provides live preview and save confirmation
- Undo and redo are scoped to the active edit session

## Run Output

- SSE stream connects on run start and closes on completion
- Output auto-scrolls while user is at bottom
- System messages are visually separated from agent output

## Action Constraints

- Run button disabled when a run is active
- Sync button disabled when a run is active
- Document writes disabled during a run

## Error Presentation

- Inline error banner for blocking failures
- Toast notifications for transient failures
- Errors reference stable error codes for troubleshooting
