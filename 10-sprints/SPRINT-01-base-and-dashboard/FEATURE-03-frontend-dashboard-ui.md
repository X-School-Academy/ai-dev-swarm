# FEATURE-03-frontend-dashboard-ui

## Keywords
`dashboard-layout`, `stage-list-ui`, `stage-detail-panel`

## User Story
As a user, I want to see an overview of all stages so I know the project status.

## Related Documentation
- 06-ux/wireframe_descriptions.md
- 06-ux/design-system-guide.md

## Acceptance Criteria
- [ ] Sidebar lists all stages with status badges.
- [ ] Selecting a stage updates the detail panel.
- [ ] Layout matches the UX wireframes at desktop widths.

## Technical Implementation Notes
- Keep layout to three main panels per UX.
- Use design system colors for status indicators.

## Developer Test Plan
- Verify layout at 1440px and 1920px.
- Confirm stage selection updates the detail panel state.

## Dependencies
- FEATURE-02-backend-stage-api

## Complexity Estimate
M

## Status Checklist
- [x] Layout shell complete
- [x] Stage list implemented
- [x] Status badges styled
- [x] Detail panel functional

## Development Notes
- Replaced the Next.js starter page with a dashboard shell in dev-swarm/js_scripts/webui/src/app/page.tsx.
- Added stage list, status badges, detail panel, and loading/error states.
