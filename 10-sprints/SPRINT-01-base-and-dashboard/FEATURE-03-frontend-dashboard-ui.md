# FEATURE-03-frontend-dashboard-ui

## Keywords
`dashboard-ui`, `stage-sidebar`, `status-badges`

## User Story
As a user, I want to see an overview of all stages so I know the project status.

## Related Documentation
- `06-ux/wireframe_descriptions.md`
- `06-ux/design-system-guide.md`

## Acceptance Criteria
- [ ] Sidebar component listing all stages with icons/badges.
- [ ] Main panel showing selected stage details.
- [ ] Status badges use colors from design system (Cyan, Neon Green, Amber, etc.).
- [ ] Dashboard is responsive for desktop widths.

## Technical Implementation Notes
- Use Tailwind CSS for styling as per Next.js defaults.
- Use `lucide-react` for icons.
- Implement a `StageCard` or `StageListItem` component.

## Developer Test Plan
- Verify layout matches wireframe at 1440px and 1920px.
- Verify status colors match the design system.

## Dependencies
- FEATURE-01-project-scaffolding
- FEATURE-02-backend-stage-api

## Complexity Estimate
M

## Status Checklist
- [ ] Layout shell complete
- [ ] Stage list implemented
- [ ] Status badges styled
- [ ] Responsive check passed
