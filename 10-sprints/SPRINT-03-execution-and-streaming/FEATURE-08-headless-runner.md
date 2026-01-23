# FEATURE-08-headless-runner

## Keywords
`process-manager`, `agent-runner`, `headless-mode`

## User Story
As a system, I need to run AI agents as background processes.

## Related Documentation
- `08-tech-specs/backend-specs.md`

## Acceptance Criteria
- [ ] Backend can launch a shell command (e.g., `claude --headless`).
- [ ] Process stdout/stderr captured in real-time.
- [ ] Only one run allowed at a time.
- [ ] Exit code captured on completion.

## Technical Implementation Notes
- Use `asyncio.create_subprocess_exec` for non-blocking execution.
- Maintain a global state for the active process.
- Use the `LiveAIAdapter` from Sprint 01.

## Developer Test Plan
- Trigger a mock run and verify process start/stop.
- Trigger a real command (e.g., `ls -R`) and verify output capture.

## Dependencies
- FEATURE-01b-mockup-adapter-foundation

## Complexity Estimate
L

## Status Checklist
- [ ] Process spawning implemented
- [ ] Output capture logic complete
- [ ] Concurrency lock implemented
- [ ] Cleanup on exit verified
