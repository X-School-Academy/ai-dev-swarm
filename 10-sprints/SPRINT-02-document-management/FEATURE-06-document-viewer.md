# FEATURE-06-document-viewer

## Keywords
`markdown-renderer`, `html-viewer`, `file-list`

## User Story
As a user, I want to read documentation formatted nicely.

## Related Documentation
- `06-ux/wireframe_descriptions.md`

## Acceptance Criteria
- [ ] Component to list all files in a stage folder.
- [ ] Markdown files rendered using a library (e.g., `react-markdown`).
- [ ] HTML files rendered in an `iframe` or `dangerouslySetInnerHTML`.
- [ ] Tabbed or toggled view for "View" vs "Edit" (Sprint 03).

## Technical Implementation Notes
- Use `react-markdown` with `remark-gfm` for tables.
- Style the markdown output to match the design system.

## Developer Test Plan
- Open `ideas.md` and verify it looks correct.
- Open `06-ux/design-ui-preview.html` and verify it renders.

## Dependencies
- FEATURE-03-frontend-dashboard-ui
- FEATURE-05-backend-files-api

## Complexity Estimate
M

## Status Checklist
- [ ] File list component complete
- [ ] Markdown renderer implemented
- [ ] HTML viewer implemented
- [ ] Styling applied
