# FEATURE-01b-mockup-adapter-foundation

## Keywords
`agent-adapter-abc`, `mock-provider-stream`, `provider-env-switch`

## User Story
As a developer, I want to use mock services during development to save time and costs.

## Related Documentation
- 08-tech-specs/api-mockup-adapter.md

## Acceptance Criteria
- [ ] Abstract base class defined for agent execution adapters.
- [ ] Mock adapter yields deterministic streaming output.
- [ ] Live adapter stub exists for future integration.
- [ ] AGENT_CLI_PROVIDER selects mock or live adapter at runtime.

## Technical Implementation Notes
- Use Python abc for interface definitions.
- Keep mock output predictable for UI testing.
- Load provider selection from environment configuration.

## Developer Test Plan
- Set AGENT_CLI_PROVIDER to mock and confirm mock output stream.
- Set AGENT_CLI_PROVIDER to live and confirm the live stub is selected.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [x] Base class defined
- [x] Mock adapter implemented
- [x] Provider factory implemented
- [ ] Env switching verified

## Development Notes
- Added adapter interface, mock adapter, live stub, and factory in dev-swarm/py_scripts/webui/ai_adapters.py.
- Mock output supports optional MOCK_DELAY_MS and MOCK_ERROR via environment variables.
