# FEATURE-05-backend-files-api

## Keywords
`documents-list-endpoint`, `document-read-write`, `path-scope-guard`

## User Story
As a frontend, I want to read and write files so I can support the editor.

## Related Documentation
- 08-tech-specs/backend-specs.md
- 08-tech-specs/api-specifications.md

## Acceptance Criteria
- [ ] GET /api/stages/{stageId}/documents lists all documents in the stage.
- [ ] GET /api/documents reads a file by path.
- [ ] PUT /api/documents writes content to a file by path.
- [ ] Path validation blocks traversal and access outside the project root.

## Technical Implementation Notes
- Use pathlib for path normalization and root checks.
- Restrict writes to known stage folders.
- Block writes while a run is active.

## Developer Test Plan
- Attempt to read a path outside the root and verify rejection.
- Write a markdown file within a stage and verify changes persist.
- Attempt a write during an active run and verify it is blocked.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [ ] Path validation helper implemented
- [ ] Document list endpoint complete
- [ ] Read and write endpoints complete
- [ ] Run-state write guard verified
