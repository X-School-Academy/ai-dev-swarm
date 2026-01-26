# FEATURE-06-document-viewer

## Status
Done

## Keywords
`document-list-ui`, `markdown-renderer`, `html-viewer`

## User Story
As a user, I want to read documentation formatted nicely.

## Related Documentation
- 05-prd/functional-requirements.md
- 06-ux/wireframe_descriptions.md

## Acceptance Criteria
- [x] Stage document list is visible within the stage detail view.
- [x] Markdown documents render in a formatted view.
- [x] HTML documents render in a safe embedded view.

## Technical Implementation Notes
- Keep rendering consistent with design system typography.
- Use a markdown renderer that preserves headings and lists.

## Developer Test Plan
- [x] Open ideas.md and confirm formatting is readable.
- [x] Open an HTML document and confirm it renders safely.

## Dependencies
- FEATURE-05-backend-files-api

## Complexity Estimate
M

## Status Checklist
- [x] Document list component complete
- [x] Markdown renderer implemented
- [x] HTML viewer implemented
- [x] Styling applied

## Development Notes
- Files modified: dev-swarm/js_scripts/webui/src/app/page.tsx, dev-swarm/js_scripts/webui/src/app/globals.css
- Files added: features/document-viewer.md, features/impl/document-viewer.md
- Dependency: react-markdown added in dev-swarm/js_scripts/webui/package.json
- Approach: clickable document list fetches content; markdown rendered via ReactMarkdown; HTML rendered in sandboxed iframe with srcDoc styling.
- Implementation Commit: 3b6b0db

## Code Review Notes
- Review summary: Implementation aligns with feature design and acceptance criteria.
- Issues found: 0
- Decision: Approved for testing.

## Testing Notes
- Test summary: 2 manual checks passed (markdown + HTML rendering).
- Issues found: 0
- Decision: Passed.
