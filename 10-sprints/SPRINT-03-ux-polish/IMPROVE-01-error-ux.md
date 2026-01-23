# IMPROVE-01-error-ux

## Keywords

error-ux, toast-banner

## User Story

As a user, I receive clear error messages and recovery options.

## Related Documentation

- `05-prd/error-handling-and-edge-cases.md`
- `08-tech-specs/error-handling.md`
- `06-ux/accessibility.md`

## Acceptance Criteria

- Blocking errors show a banner and disable actions
- Transient errors show a toast with retry guidance
- Error codes are visible for troubleshooting

## Technical Implementation Notes

- Map backend error codes to UI display styles
- Preserve last error details for user reference
- Ensure accessibility for error messages

## Developer Test Plan

- UI tests for error presentation and dismissal
- Tests for recovery flows after failure

## Dependencies

FEATURE-06-streaming-output
FEATURE-04-document-view-edit

## Complexity

S

## Status Checklist

- [ ] Ready
- [ ] In progress
- [ ] In review
- [ ] Done
