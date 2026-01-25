# Feature: console-ui

## What
Render a console panel that streams run output in real time with system/output/error/status styling.

## Why
Users need immediate visibility into stage execution progress and logs.

## Scope
- Output panel in the dashboard layout.
- SSE client connection for run output.
- Auto-scroll when pinned to bottom, respect manual scroll position.
- Preserve output for the current run session.

## Non-Goals
- Historical run archive.
- Filtering or search across runs.

## Acceptance Criteria
- Console panel displays system and agent output distinctly.
- Auto-scroll keeps the latest output in view when pinned.
- Output history persists for the current run.

## References
- Implement: impl/console-ui.md
