"""AI Agent execution service."""

import asyncio
import subprocess
import signal
from pathlib import Path
from typing import AsyncGenerator, Optional
from datetime import datetime

from ..models import AgentExecution, AgentOutput


class AgentService:
    """Service for AI agent headless execution."""

    # Agent command configurations
    AGENT_CONFIGS = {
        "claude": {
            "command": "claude",
            "args": ["--print", "--dangerously-skip-permissions"],
        },
        "codex": {
            "command": "codex",
            "args": ["--quiet", "--auto-edit"],
        },
        "gemini": {
            "command": "gemini",
            "args": ["--non-interactive"],
        },
    }

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self._active_processes: dict[str, subprocess.Popen] = {}

    def _get_agent_command(self, agent: str, prompt: str) -> list[str]:
        """Build command for agent execution."""
        config = self.AGENT_CONFIGS.get(agent)
        if not config:
            raise ValueError(f"Unknown agent: {agent}")

        cmd = [config["command"]]
        cmd.extend(config["args"])
        cmd.append(prompt)
        return cmd

    async def execute_agent(
        self,
        execution: AgentExecution,
        execution_id: str,
    ) -> AsyncGenerator[AgentOutput, None]:
        """Execute an AI agent and stream output."""
        working_dir = Path(execution.working_dir) if execution.working_dir else self.project_root

        try:
            cmd = self._get_agent_command(execution.agent, execution.prompt)

            yield AgentOutput(
                type="status",
                content=f"Starting {execution.agent} agent...",
            )

            process = await asyncio.create_subprocess_exec(
                *cmd,
                cwd=working_dir,
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )

            self._active_processes[execution_id] = process

            # Read stdout and stderr concurrently
            async def read_stream(stream, stream_type: str):
                while True:
                    line = await stream.readline()
                    if not line:
                        break
                    yield AgentOutput(
                        type=stream_type,
                        content=line.decode().rstrip(),
                    )

            # Create tasks for both streams
            stdout_task = asyncio.create_task(self._collect_stream(process.stdout, "stdout"))
            stderr_task = asyncio.create_task(self._collect_stream(process.stderr, "stderr"))

            # Process output as it comes
            done = set()
            pending = {stdout_task, stderr_task}

            while pending:
                newly_done, pending = await asyncio.wait(
                    pending,
                    timeout=0.1,
                    return_when=asyncio.FIRST_COMPLETED,
                )
                for task in newly_done:
                    outputs = task.result()
                    for output in outputs:
                        yield output
                    done.add(task)

                # Check if process is still running
                if process.returncode is not None:
                    break

            # Wait for process to complete
            try:
                await asyncio.wait_for(process.wait(), timeout=execution.timeout)
            except asyncio.TimeoutError:
                process.terminate()
                yield AgentOutput(
                    type="error",
                    content=f"Agent execution timed out after {execution.timeout} seconds",
                )

            # Final status
            if process.returncode == 0:
                yield AgentOutput(type="done", content="Agent execution completed successfully")
            else:
                yield AgentOutput(
                    type="error",
                    content=f"Agent exited with code {process.returncode}",
                )

        except FileNotFoundError:
            yield AgentOutput(
                type="error",
                content=f"Agent '{execution.agent}' not found. Please ensure it's installed.",
            )
        except Exception as e:
            yield AgentOutput(type="error", content=str(e))
        finally:
            self._active_processes.pop(execution_id, None)

    async def _collect_stream(
        self,
        stream: asyncio.StreamReader,
        stream_type: str,
    ) -> list[AgentOutput]:
        """Collect all output from a stream."""
        outputs = []
        while True:
            line = await stream.readline()
            if not line:
                break
            outputs.append(
                AgentOutput(
                    type=stream_type,
                    content=line.decode().rstrip(),
                )
            )
        return outputs

    def interrupt_execution(self, execution_id: str) -> bool:
        """Interrupt a running agent execution."""
        process = self._active_processes.get(execution_id)
        if process:
            process.send_signal(signal.SIGINT)
            return True
        return False

    def terminate_execution(self, execution_id: str) -> bool:
        """Terminate a running agent execution."""
        process = self._active_processes.get(execution_id)
        if process:
            process.terminate()
            self._active_processes.pop(execution_id, None)
            return True
        return False

    def get_active_executions(self) -> list[str]:
        """Get list of active execution IDs."""
        return list(self._active_processes.keys())
