# Feature: backend-stage-api

## What
Provide a backend API that lists all stages with derived status, skip metadata, and document summaries.

## Why
The dashboard needs a single endpoint to render the stage list and status without duplicating filesystem logic in the frontend.

## Scope
- GET /api/stages returns stages 00-11 and 99.
- Derive status from README.md and SKIP.md.
- Include isSkippable, hasSkipFile, and files list per stage.

## Non-Goals
- No run lifecycle state tracking beyond the current placeholder.
- No document read/write endpoints.

## Data Contract
- stageId, name, status, isSkippable, hasSkipFile, files.

## Acceptance Criteria
- Stage list covers all stage IDs and names.
- Status is skipped when SKIP.md exists and completed when README.md exists.
- File list includes markdown and HTML documents relative to project root.
