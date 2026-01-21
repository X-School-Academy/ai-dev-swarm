"""AI Agent execution API endpoints."""

import uuid
from fastapi import APIRouter, HTTPException, Depends
from sse_starlette.sse import EventSourceResponse
import json

from ..config import get_settings, Settings
from ..models import AgentExecution
from ..services.agent_service import AgentService

router = APIRouter(prefix="/agents", tags=["agents"])

# Global agent service instance (for process tracking)
_agent_service: AgentService = None


def get_agent_service(settings: Settings = Depends(get_settings)) -> AgentService:
    global _agent_service
    if _agent_service is None:
        _agent_service = AgentService(settings.project_root)
    return _agent_service


@router.post("/execute")
async def execute_agent(
    execution: AgentExecution,
    service: AgentService = Depends(get_agent_service),
):
    """Execute an AI agent and stream output via SSE."""
    execution_id = str(uuid.uuid4())

    async def event_generator():
        async for output in service.execute_agent(execution, execution_id):
            yield {
                "event": output.type,
                "data": json.dumps({
                    "content": output.content,
                    "timestamp": output.timestamp.isoformat(),
                }),
            }

    return EventSourceResponse(event_generator())


@router.post("/execute/{execution_id}/interrupt")
async def interrupt_execution(
    execution_id: str,
    service: AgentService = Depends(get_agent_service),
):
    """Interrupt a running agent execution (send SIGINT)."""
    success = service.interrupt_execution(execution_id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail=f"Execution {execution_id} not found or already completed",
        )
    return {"success": True, "message": "Interrupt signal sent"}


@router.post("/execute/{execution_id}/terminate")
async def terminate_execution(
    execution_id: str,
    service: AgentService = Depends(get_agent_service),
):
    """Terminate a running agent execution."""
    success = service.terminate_execution(execution_id)
    if not success:
        raise HTTPException(
            status_code=404,
            detail=f"Execution {execution_id} not found or already completed",
        )
    return {"success": True, "message": "Execution terminated"}


@router.get("/active")
async def list_active_executions(
    service: AgentService = Depends(get_agent_service),
):
    """List all active agent executions."""
    return {"executions": service.get_active_executions()}


@router.get("/available")
async def list_available_agents():
    """List available AI agents and their configuration."""
    return {
        "agents": [
            {
                "name": "claude",
                "description": "Claude Code CLI",
                "command": "claude",
            },
            {
                "name": "codex",
                "description": "OpenAI Codex CLI",
                "command": "codex",
            },
            {
                "name": "gemini",
                "description": "Google Gemini CLI",
                "command": "gemini",
            },
        ]
    }
