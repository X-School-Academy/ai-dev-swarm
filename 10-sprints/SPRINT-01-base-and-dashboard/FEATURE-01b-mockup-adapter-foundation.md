# FEATURE-01b-mockup-adapter-foundation

## Keywords
`agent-adapter-abc`, `mock-provider-stream`, `provider-env-switch`

## User Story
As a developer, I want to use mock services during development to save time and costs.

## Related Documentation
- 08-tech-specs/api-mockup-adapter.md

## Acceptance Criteria
- [x] Abstract base class defined for agent execution adapters.
- [x] Mock adapter yields deterministic streaming output.
- [x] Live adapter stub exists for future integration.
- [x] AGENT_CLI_PROVIDER selects mock or live adapter at runtime.

## Technical Implementation Notes
- Use Python abc for interface definitions.
- Keep mock output predictable for UI testing.
- Load provider selection from environment configuration.

## Developer Test Plan
- [x] Set AGENT_CLI_PROVIDER to mock and confirm mock output stream.
- [x] Set AGENT_CLI_PROVIDER to live and confirm the live stub is selected.

## Dependencies
- FEATURE-01-project-scaffolding

## Complexity Estimate
M

## Status Checklist
- [x] Base class defined
- [x] Mock adapter implemented
- [x] Provider factory implemented
- [x] Env switching verified

## Development Notes
- Added adapter interface, mock adapter, live stub, and factory in dev-swarm/py_scripts/webui/ai_adapters.py.
- Mock output supports optional MOCK_DELAY_MS and MOCK_ERROR via environment variables.
- Commit: b81c4b2

## Code Review Notes
- Review Summary: Adapter interface and factory align with tech specs.
- Issues Found: 0
- Decision: Approved

## Testing Notes
- Test Summary: Verified mock output and live adapter selection via env switch.
- Results: Passed. Mock stream emitted deterministic lines; live adapter selected when AGENT_CLI_PROVIDER=live.
- Decision: Passed
