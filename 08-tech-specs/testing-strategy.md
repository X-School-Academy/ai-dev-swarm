# Testing Strategy

## Objectives

- Validate stage workflow correctness end to end
- Ensure file operations are safe and scoped
- Confirm streaming latency and stop behavior
- Prevent UI regressions for core workflows

## Unit Tests

- Path validation and project root scoping
- Stage state derivation logic
- Run state transitions and stop handling
- Error mapping to stable error codes

## Integration Tests

- Stage list and sync responses
- Document read and write round trips
- Run start, stop, and status retrieval
- SSE stream emits system and output events

## UI Tests

- Dashboard renders all stages with correct badges
- Skip toggle obeys non-skippable rules
- Document viewer and editor behaviors
- Run output streaming and stop controls

## Test Data

- Use a fixed sample project structure
- Include cases with SKIP.md and missing README.md
- Include large output samples to validate responsiveness
