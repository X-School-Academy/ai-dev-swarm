# Acceptance Criteria

## Stage Dashboard

- Given the app loads, when the dashboard renders, then all stages 00-11 are visible with their current state.
- Given a stage has `SKIP.md`, when the dashboard renders, then the stage is marked as skipped.
- Given a stage is selected, when the user opens it, then its documents and actions are shown.

## Stage Skip Management

- Given a skippable stage, when the user toggles skip, then `SKIP.md` is created or removed and the UI updates.
- Given a non-skippable stage, when the user attempts to skip it, then the action is blocked and an error is shown.

## Document Viewer

- Given a markdown document, when the user opens it, then it renders with formatted headings and lists.
- Given an HTML document, when the user opens it, then it renders in the UI without raw markup.

## Document Editor

- Given a markdown document, when the user edits and saves, then the file system reflects the changes.
- Given an edit session, when the user triggers undo/redo, then the editor state updates accordingly.

## Stage Execution

- Given a stage is idle, when the user clicks run, then execution starts and the run button is disabled.
- Given a stage execution completes, when the output ends, then the UI shows completion status.

## Real-Time Output

- Given execution is running, when output is produced, then the UI displays it within 500ms.
- Given output streams, when new lines arrive, then the view auto-scrolls to the latest output.

## Stop Execution

- Given execution is running, when the user clicks stop, then the process terminates and status is updated.
- Given a stopped execution, when the user clicks run again, then a new execution begins.

## Project Sync

- Given external file changes, when the user clicks sync, then stage states and file lists update.
- Given the app loads, when initialization completes, then a sync has run.
