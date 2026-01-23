# FEATURE-13-error-handling

## Keywords
`error-boundary`, `toast-notifications`, `api-error-handling`

## User Story
As a user, I want to know when something goes wrong.

## Related Documentation
- `08-tech-specs/error-handling.md`

## Acceptance Criteria
- [ ] Global React Error Boundary to catch UI crashes.
- [ ] Toast notifications for backend errors (e.g., file write failed).
- [ ] 404 page for invalid stage/file paths.
- [ ] User-friendly error messages (no raw stack traces).

## Technical Implementation Notes
- Use a library like `react-hot-toast` or `sonner`.
- Map backend error codes to localized strings.

## Developer Test Plan
- Trigger a backend error (e.g., stop the server) and verify a toast appears.
- Navigate to a non-existent URL and verify the 404 page.

## Dependencies
- FEATURE-03-frontend-dashboard-ui

## Complexity Estimate
S

## Status Checklist
- [ ] Error boundary implemented
- [ ] Toast system integrated
- [ ] API error interceptors complete
- [ ] Error pages styled
