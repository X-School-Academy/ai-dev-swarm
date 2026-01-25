# Feature: backend-files-api

## What
Provide backend endpoints to list, read, and write documents within stage folders.

## Why
The UI needs deterministic file access to render documents and save edits without relying on client-side file system access.

## Scope
- GET /api/stages/{stageId}/documents returns stage-local document paths.
- GET /api/documents reads a file by relative path.
- PUT /api/documents writes content to a file by relative path.
- Enforce project-root scoping and stage-only write rules.
- Block writes when a run is active.

## Non-Goals
- No editor UI changes.
- No run lifecycle implementation beyond a guard.
- No support for non-markdown/HTML file writes.

## Acceptance Criteria
- Document list, read, and write endpoints respond as defined in tech specs.
- Path traversal and out-of-root access are rejected.
- Writes are blocked during active runs.

## References
- 08-tech-specs/api-specifications.md
- 08-tech-specs/backend-specs.md
- features/contracts/backend-files-api.md
- features/impl/backend-files-api.md
