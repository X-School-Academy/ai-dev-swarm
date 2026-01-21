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
            "args": ["--ask-for-approval", "never", "--sandbox", "workspace-write", "exec"],
        },
        "gemini": {
            "command": "gemini",
            "args": ["--yolo", "--sandbox"],
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
        loop = asyncio.get_running_loop()
        start_time = loop.time()
        timeout = execution.timeout

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

            queue: asyncio.Queue[Optional[AgentOutput]] = asyncio.Queue()
            stream_done = 0

            async def read_stream(stream: asyncio.StreamReader, stream_type: str):
                nonlocal stream_done
                while True:
                    line = await stream.readline()
                    if not line:
                        break
                    await queue.put(
                        AgentOutput(
                            type=stream_type,
                            content=line.decode().rstrip(),
                        )
                    )
                stream_done += 1
                await queue.put(None)

            stdout_task = asyncio.create_task(read_stream(process.stdout, "stdout"))
            stderr_task = asyncio.create_task(read_stream(process.stderr, "stderr"))

            while True:
                if timeout and loop.time() - start_time > timeout:
                    process.terminate()
                    yield AgentOutput(
                        type="error",
                        content=f"Agent execution timed out after {timeout} seconds",
                    )
                    break

                if process.returncode is not None and stream_done >= 2 and queue.empty():
                    break

                try:
                    item = await asyncio.wait_for(queue.get(), timeout=0.1)
                except asyncio.TimeoutError:
                    continue

                if item is None:
                    continue
                yield item

            await asyncio.gather(stdout_task, stderr_task, return_exceptions=True)

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
