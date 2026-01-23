# FEATURE-01b-mockup-adapter-foundation

## Keywords
`mockup-adapter`, `provider-factory`, `mock-ai-agent`

## User Story
As a developer, I want to use mock services during development to save time and costs.

## Related Documentation
- `08-tech-specs/api-mockup-adapter.md`

## Acceptance Criteria
- [ ] Abstract base classes (ABC) defined for AI Agent execution.
- [ ] `MockAIAdapter` implemented with sample streaming output.
- [ ] `LiveAIAdapter` skeleton implemented (actual logic in Sprint 03).
- [ ] `AGENT_CLI_PROVIDER` env variable controls provider selection.
- [ ] Provider factory returns correct instance based on env.

## Technical Implementation Notes
- Use Python's `abc` module for interfaces.
- Use `asyncio.sleep` to simulate latency in mocks.
- Load environment variables using `python-dotenv`.

## Developer Test Plan
- Set `AGENT_CLI_PROVIDER=mock` and verify `MockAIAdapter` is used.
- Set `AGENT_CLI_PROVIDER=live` and verify `LiveAIAdapter` is used.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [ ] Base classes defined
- [ ] Mock implementation complete
- [ ] Factory implemented
- [ ] Env switching verified
