# Implementation: mockup-adapter-foundation

## Files Changed
- dev-swarm/py_scripts/webui/ai_adapters.py: adapter interface, mock adapter, live stub, and provider factory.

## Implementation Details
- Adapter interface uses an async generator for streaming output lines.
- Mock adapter emits deterministic lines and supports MOCK_DELAY_MS and MOCK_ERROR env flags.
- Factory selects adapter based on AGENT_CLI_PROVIDER with mock as default.

## Code Structure
- Backend adapters live under dev-swarm/py_scripts/webui.
