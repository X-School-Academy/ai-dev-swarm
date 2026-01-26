# Project Sync API Contract

## Endpoint
- POST /api/sync

## Response
- stages: list of stage objects (same shape as GET /api/stages)
- syncedAt: ISO timestamp string

## Error Cases
- 409 state error when a run is active (sync blocked)
- 500 io error for unexpected filesystem failures
