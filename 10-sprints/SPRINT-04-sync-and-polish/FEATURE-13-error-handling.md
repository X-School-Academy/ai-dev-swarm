# FEATURE-13-error-handling

## Status
Done

## Keywords
`error-boundary-ui`, `toast-messaging`, `api-error-mapping`

## User Story
As a user, I want to know when something goes wrong.

## Related Documentation
- 08-tech-specs/error-handling.md

## Acceptance Criteria
- [x] Global error boundary prevents UI crashes.
- [x] Toast notifications surface backend errors.
- [x] Error pages exist for invalid routes.
- [x] Messages are user-friendly and do not expose stack traces.

## Technical Implementation Notes
- Map backend error codes to user-facing messages.
- Keep error UI consistent with the design system.

## Developer Test Plan
- [x] Trigger backend errors and verify toast messages.
- [x] Navigate to invalid routes and verify error pages.

## Dependencies
- FEATURE-03-frontend-dashboard-ui

## Complexity Estimate
S

## Status Checklist
- [x] Error boundary implemented
- [x] Toast system integrated
- [x] Error pages implemented
- [x] Message mapping verified

## Development Notes
- Files modified: dev-swarm/js_scripts/webui/src/app/page.tsx, dev-swarm/js_scripts/webui/README.md, features/features-index.md
- Files added: dev-swarm/js_scripts/webui/src/app/error.tsx, dev-swarm/js_scripts/webui/src/app/not-found.tsx, features/error-handling.md, features/impl/error-handling.md
- Approach: map API status codes to user-friendly messaging, surface errors via toast, and add global error/404 pages aligned to design system.

## Code Review Notes
- Review summary: Error boundary, 404 page, and toast messaging align with specs and keep messages user-friendly.
- Issues found: 0
- Decision: Approved for testing.

## Testing Notes
- Test summary: Playwright confirmed toast message when sync blocked during active run and 404 page renders for invalid routes.
- Issues found: 0
- Decision: Passed.
