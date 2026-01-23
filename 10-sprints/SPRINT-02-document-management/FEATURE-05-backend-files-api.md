# FEATURE-05-backend-files-api

## Keywords
`file-reader`, `file-writer`, `path-safety`

## User Story
As a frontend, I want to read/write files so I can support the editor.

## Related Documentation
- `08-tech-specs/backend-specs.md`

## Acceptance Criteria
- [ ] GET `/api/files?path={path}` returns file content.
- [ ] POST `/api/files?path={path}` writes content to file.
- [ ] Path validation prevents reading/writing outside the project root.
- [ ] Error returned if file not found or access denied.

## Technical Implementation Notes
- Use `pathlib` for safe path joining and verification.
- Implement a helper to check if a path is within the allowed root.

## Developer Test Plan
- Try to read a file outside the project (e.g., `/etc/passwd`) and verify it's blocked.
- Read and write a test file in `src/` to verify success.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [ ] Path validation helper implemented
- [ ] Read endpoint complete
- [ ] Write endpoint complete
- [ ] Safety tests passed
