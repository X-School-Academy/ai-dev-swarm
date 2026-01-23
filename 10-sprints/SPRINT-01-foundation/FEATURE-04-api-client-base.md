# FEATURE-04-api-client-base

## Keywords

api-client, frontend-backend-bridge

## User Story

As Alex (Dev), I want a shared API client so that frontend calls are consistent and reusable.

## Acceptance Criteria

- API client wraps base URL and error handling.
- Client supports GET, POST, PUT as needed for the MVP.

## Technical Notes

- Centralize base URL configuration for local dev.
- Normalize error mapping for UI handling.

## Developer Test Plan

- Call health endpoint using the client and verify response handling.

## Dependencies

FEATURE-01-backend-health

## Complexity

S

## Status

- [ ] Not started
- [ ] In progress
- [ ] Blocked
- [ ] Done
