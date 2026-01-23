# API Mockup Adapter Specification

## Overview

To optimize development speed and reduce costs associated with third-party service calls (specifically LLMs and Headless AI Agents), the system implements a "Mockup Adapter" pattern. This allows developers to toggle between a `live` provider and a `mock` provider via environment configuration without changing the business logic.

## Core Requirements

1. **Interface Parity**: The `MockAdapter` and `LiveAdapter` MUST implement the exact same interface/class definition.
2. **Deterministic Mocks**: Mock responses should be realistic and support common success/failure scenarios defined in the PRD.
3. **Zero-Latency Option**: Mocks should have configurable delays to simulate network latency or process time, but defaults to near-instant for fast testing.
4. **Configuration-Driven**: The switch MUST be controlled via environment variables (e.g., in `.env`).

## Implementation Design

### Configuration Strategy

We use a `PROVIDER_TYPE` pattern for each external service.

```env
# Example .env configuration
AGENT_CLI_PROVIDER=mock  # Options: mock, claude, gemini, codex
```

### Adapter Interface Example (Python Backend)

```python
class IAIAgentAdapter(ABC):
    @abstractmethod
    async def execute_command(self, command: str, context: dict) -> AsyncIterator[str]:
        """Execute a command and stream the output."""
        pass

class MockAIAdapter(IAIAgentAdapter):
    async def execute_command(self, command: str, context: dict) -> AsyncIterator[str]:
        yield "Starting mock execution...\n"
        await asyncio.sleep(0.5)
        yield f"Mock output for: {command}\n"
        yield "Execution completed successfully.\n"

class LiveAIAdapter(IAIAgentAdapter):
    # Real implementation using subprocess or API calls
    ...
```

## Mock Scenarios

The `MockAdapter` should support different scenarios to test UI state handling:

| Scenario | Trigger | Mock Behavior |
| :--- | :--- | :--- |
| **Success** | Default | Return standard success payload + log stream. |
| **Slow Run** | Config: `MOCK_DELAY=5000` | Delay each stream chunk by 500ms. |
| **API Error** | Config: `MOCK_ERROR=true` | Immediately throw a 500/Connection error. |
| **Interrupt** | User cancel signal | Stop stream and yield "Process interrupted by user". |

## Switching Logic (Provider Factory)

The backend should use a factory or dependency injection to select the adapter at runtime:

```python
def get_ai_adapter() -> IAIAgentAdapter:
    provider = os.getenv("AGENT_CLI_PROVIDER", "mock")
    if provider == "mock":
        return MockAIAdapter()
    elif provider == "claude":
        return ClaudeLiveAdapter()
    # ...
```

## Deliverables for Implementation

- [ ] Define abstract base classes for all third-party integrations (LLM, Shell, FileOps).
- [ ] Implement `Mock` versions for each base class.
- [ ] Ensure `.env.example` includes the provider selection keys.
- [ ] Add unit tests that verify both Mock and Live adapters (where safe) satisfy the same interface.
