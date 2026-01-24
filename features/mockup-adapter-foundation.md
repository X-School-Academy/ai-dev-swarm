# Feature: mockup-adapter-foundation

## What
Provide a base adapter interface for AI agent execution with a deterministic mock adapter and a live adapter stub, selected via environment configuration.

## Why
Mock execution enables fast, predictable development and UI testing without requiring live AI agents, while keeping the production interface stable.

## Scope
- Define an abstract adapter interface for agent execution.
- Implement a mock adapter that yields deterministic streaming output.
- Provide a live adapter stub that matches the interface.
- Implement a factory to select the adapter based on AGENT_CLI_PROVIDER.
- Support optional mock delay and error toggles via environment variables.

## Non-Goals
- No real agent execution logic in the live adapter.
- No changes to API endpoints or run orchestration yet.
- No integration with UI streaming in this backlog.

## Interface
- Adapter method signature: execute_command(command: str, context: dict) -> AsyncIterator[str].
- Factory reads AGENT_CLI_PROVIDER with default "mock".

## Behavior
- Mock adapter yields a start line, an echo of the command, and a completion line.
- MOCK_DELAY_MS optionally adds a per-line delay in milliseconds.
- MOCK_ERROR=true raises a runtime error before output.

## Acceptance Criteria Trace
- ABC defined for agent execution adapters.
- Mock adapter yields deterministic streaming output.
- Live adapter stub exists for future integration.
- AGENT_CLI_PROVIDER selects mock or live adapter at runtime.
