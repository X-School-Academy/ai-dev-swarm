import asyncio
import os
from abc import ABC, abstractmethod
from typing import AsyncIterator, Dict


class AIAgentAdapter(ABC):
    @abstractmethod
    async def execute_command(self, command: str, context: Dict[str, str]) -> AsyncIterator[str]:
        raise NotImplementedError


class MockAIAdapter(AIAgentAdapter):
    def __init__(self) -> None:
        self._delay_ms = _parse_int_env("MOCK_DELAY_MS", 0)
        self._error = _parse_bool_env("MOCK_ERROR", False)
        self._cycles = _parse_int_env("MOCK_CYCLES", 1)

    async def execute_command(self, command: str, context: Dict[str, str]) -> AsyncIterator[str]:
        if self._error:
            raise RuntimeError("Mock adapter forced error")

        cycles = max(1, self._cycles)
        for _ in range(cycles):
            for line in _mock_output_lines(command):
                if self._delay_ms > 0:
                    await asyncio.sleep(self._delay_ms / 1000)
                yield line


class LiveAIAdapter(AIAgentAdapter):
    async def execute_command(self, command: str, context: Dict[str, str]) -> AsyncIterator[str]:
        raise NotImplementedError("Live adapter not implemented")


def get_ai_adapter() -> AIAgentAdapter:
    provider = os.getenv("AGENT_CLI_PROVIDER", "mock").strip().lower()
    if provider == "mock":
        return MockAIAdapter()
    if provider == "live":
        return LiveAIAdapter()
    raise ValueError(f"Unsupported AGENT_CLI_PROVIDER: {provider}")


def _mock_output_lines(command: str) -> list[str]:
    return [
        "Starting mock execution...\n",
        f"Mock output for: {command}\n",
        "Execution completed successfully.\n",
    ]


def _parse_bool_env(key: str, default: bool) -> bool:
    value = os.getenv(key)
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


def _parse_int_env(key: str, default: int) -> int:
    value = os.getenv(key)
    if value is None:
        return default
    try:
        return int(value)
    except ValueError:
        return default
