# FEATURE-03-frontend-dashboard-ui

## Keywords
`dashboard-layout`, `stage-list-ui`, `stage-detail-panel`

## User Story
As a user, I want to see an overview of all stages so I know the project status.

## Related Documentation
- 06-ux/wireframe_descriptions.md
- 06-ux/design-system-guide.md

## Acceptance Criteria
- [x] Sidebar lists all stages with status badges.
- [x] Selecting a stage updates the detail panel.
- [x] Layout matches the UX wireframes at desktop widths.

## Technical Implementation Notes
- Keep layout to three main panels per UX.
- Use design system colors for status indicators.

## Developer Test Plan
- [x] Verify layout at 1440px and 1920px.
- [x] Confirm stage selection updates the detail panel state.

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
- Commit: ae0ddce
- Updated dashboard layout to match UX wireframes with a header and output panel placeholder.
- Applied design system palette and typography updates for the control-deck feel.

## Code Review Notes
- Review Summary: Layout and styling now align with the UX wireframe and design system.
- Issues Found: 0
- Decision: Approved

## Testing Notes
- Test Summary: Playwright UI checks for header, stage list, and detail panel.
- Results: Passed on http://localhost:3001 with stages loaded and selection updates.
- Notes: Loading http://127.0.0.1:3001 failed due to CORS on http://localhost:8001.
- Decision: Passed with environment note.
