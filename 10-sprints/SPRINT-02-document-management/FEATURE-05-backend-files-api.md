# FEATURE-05-backend-files-api

## Keywords
`documents-list-endpoint`, `document-read-write`, `path-scope-guard`

## User Story
As a frontend, I want to read and write files so I can support the editor.

## Related Documentation
- 08-tech-specs/backend-specs.md
- 08-tech-specs/api-specifications.md

## Acceptance Criteria
- [x] GET /api/stages/{stageId}/documents lists all documents in the stage.
- [x] GET /api/documents reads a file by path.
- [x] PUT /api/documents writes content to a file by path.
- [x] Path validation blocks traversal and access outside the project root.

## Technical Implementation Notes
- Use pathlib for path normalization and root checks.
- Restrict writes to known stage folders.
- Block writes while a run is active.

## Developer Test Plan
- [x] Attempt to read a path outside the root and verify rejection.
- [x] Write a markdown file within a stage and verify changes persist.
- [x] Attempt a write during an active run and verify it is blocked.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [x] Path validation helper implemented
- [x] Document list endpoint complete
- [x] Read and write endpoints complete
- [x] Run-state write guard verified

## Development Notes
- Added document_service.py for list/read/write helpers with root scoping.
- Added run_state.py with RUN_ACTIVE guard for writes.
- Added document endpoints in main.py for list/read/write operations.
- Document payloads return contentType and lastModified per API spec.
- Backend now loads environment variables from dev-swarm/.env.

## Code Review Notes
- Review Summary: Implementation aligns with backend specs and response fields.
- Issues Found: 0
- Decision: Approved

## Testing Notes
- Test Summary: Verified list/read/write endpoints and traversal rejection.
- Results: Passed. Read/write persisted, traversal returned 400, and RUN_ACTIVE blocked writes with 409.
- Decision: Passed
