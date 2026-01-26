# Implementation: error-handling

## Files Changed
- dev-swarm/js_scripts/webui/src/app/page.tsx: toast notifications and API error mapping.
- dev-swarm/js_scripts/webui/src/app/error.tsx: global error boundary UI.
- dev-swarm/js_scripts/webui/src/app/not-found.tsx: 404 page for invalid routes.

## Implementation Details
- API errors map to user-friendly messages by status code with a run-active override.
- Toasts surface transient errors while banners remain for blocking errors.
- Error routes use the design system palette and avoid stack traces.

## Key Functions/Components
- `mapApiError`: maps response status to user-facing messages.
- `parseErrorMessage`: extracts and sanitizes API error responses.
