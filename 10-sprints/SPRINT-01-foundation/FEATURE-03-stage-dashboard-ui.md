# FEATURE-03-stage-dashboard-ui

## Keywords

stage-dashboard, status-badges

## User Story

As a user, I can view stage status and open a stage from the dashboard.

## Related Documentation

- `05-prd/acceptance-criteria.md`
- `06-ux/wireframe_descriptions.md`
- `08-tech-specs/frontend-specs.md`

## Acceptance Criteria

- Dashboard renders stages with correct status badges
- Selecting a stage updates the detail panel
- Skip toggle appears only for skippable stages

## Technical Implementation Notes

- Fetch stage list on load and on sync
- Drive UI state from selected stage id
- Use design system tokens for badges

## Developer Test Plan

- UI tests for rendering and selection
- Unit tests for skip visibility rules

## Dependencies

FEATURE-01-stage-state-api

## Complexity

M

## Status Checklist

- [ ] Ready
- [ ] In progress
- [ ] In review
- [ ] Done
