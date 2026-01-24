# Feature: frontend-dashboard-ui

## What
Render the initial dashboard UI with stage list navigation and a detail panel.

## Why
Users need a visual overview of stage progress and quick access to stage details.

## Scope
- Sidebar lists all stages with status badges.
- Main panel shows selected stage metadata and document list.
- Error and loading states are visible.

## Non-Goals
- No document editing or run controls.
- No custom design system styling beyond baseline.

## Acceptance Criteria
- Stage list displays status badges for each stage.
- Selecting a stage updates the detail panel.
- Dashboard layout works at desktop widths.
