# Functional Requirements

## FR1 Stage Dashboard

The system must display all stages (00-11) with their current state, including not started, in-progress, completed, and skipped.

The system must allow users to open a stage to view its documents and available actions.

## FR2 Stage Skip Management

The system must allow users to skip or unskip a stage by creating or removing `SKIP.md` in the stage folder.

The system must prevent skipping non-skippable stages: 00, 05, 08, and 10.

The system must reflect skip changes immediately in the UI after the action.

## FR3 Document Viewer

The system must render markdown documents in a readable, formatted view.

The system must render HTML documentation files in the UI.

The system must list all documents available within a selected stage.

## FR4 Document Editor

The system must provide a text editor for markdown documents with a live preview.

The system must save edits to the file system and confirm success or failure.

The system must allow undo and redo within the editor session.

## FR5 Stage Execution

The system must allow users to trigger a stage workflow with one action.

The system must run AI agents in headless mode from the backend using configured prompts.

The system must follow standard stage workflow order: proposal generation then stage files generation.

The system must disable conflicting actions while a stage is executing.

## FR6 Real-Time Output Streaming

The system must stream AI agent output to the UI in real time.

The system must preserve output history for the current execution session.

The system must clearly separate system messages from AI output.

## FR7 Stop Execution

The system must allow users to stop an in-progress execution.

The system must terminate the AI process cleanly and report the final status.

The system must allow the user to restart execution after stopping.

## FR8 Project Sync

The system must provide a manual sync action to re-scan the file system.

The system must update stage states, file lists, and skip indicators based on the scan results.

The system must run a sync on page load.
