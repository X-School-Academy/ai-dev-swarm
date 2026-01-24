# Feature: skip-management

## What
Allow users to skip or unskip stages from the dashboard UI.

## Why
Skipping optional stages is required to focus on relevant work and reflect actual stage status.

## Scope
- POST /api/stages/{stageId}/skip toggles SKIP.md.
- UI button disables for non-skippable stages.
- UI reflects updated skip status.

## Non-Goals
- No bulk skip actions.
- No additional validation beyond stage existence and non-skippable rules.

## Acceptance Criteria
- Skippable stages create or remove SKIP.md.
- Non-skippable stages return a clear error.
- UI updates status after skip changes.
