"""Sprint management API endpoints (Stage 09)."""

from fastapi import APIRouter, HTTPException, Depends
from sse_starlette.sse import EventSourceResponse
import json
import uuid

from ..config import get_settings, Settings
from ..models import SprintInfo, BacklogItem, BacklogAction
from ..services.stage_service import StageService
from ..services.agent_service import AgentService

router = APIRouter(prefix="/sprints", tags=["sprints"])


def get_stage_service(settings: Settings = Depends(get_settings)) -> StageService:
    return StageService(settings.project_root)


# Reuse agent service from agents router
_agent_service: AgentService = None


def get_agent_service(settings: Settings = Depends(get_settings)) -> AgentService:
    global _agent_service
    if _agent_service is None:
        _agent_service = AgentService(settings.project_root)
    return _agent_service


@router.get("/", response_model=list[SprintInfo])
async def list_sprints(service: StageService = Depends(get_stage_service)):
    """List all sprints in stage 09."""
    return service.get_sprints()


@router.get("/{sprint_name}", response_model=SprintInfo)
async def get_sprint(
    sprint_name: str,
    service: StageService = Depends(get_stage_service),
):
    """Get a specific sprint with its backlogs."""
    sprints = service.get_sprints()
    for sprint in sprints:
        if sprint.name == sprint_name:
            return sprint
    raise HTTPException(status_code=404, detail=f"Sprint {sprint_name} not found")


@router.get("/{sprint_name}/backlogs", response_model=list[BacklogItem])
async def list_backlogs(
    sprint_name: str,
    service: StageService = Depends(get_stage_service),
):
    """List all backlogs for a sprint."""
    return service.get_sprint_backlogs(sprint_name)


@router.post("/{sprint_name}/backlogs/{backlog_id}/execute")
async def execute_backlog_action(
    sprint_name: str,
    backlog_id: str,
    action: BacklogAction,
    stage_service: StageService = Depends(get_stage_service),
    agent_service: AgentService = Depends(get_agent_service),
):
    """Execute a backlog action (dev, review, test) using AI agent."""
    # Find the backlog
    backlogs = stage_service.get_sprint_backlogs(sprint_name)
    backlog = next((b for b in backlogs if b.id == backlog_id), None)

    if not backlog:
        raise HTTPException(status_code=404, detail=f"Backlog {backlog_id} not found")

    # Build the prompt based on action
    skill_map = {
        "dev": "dev-swarm-code-development",
        "review": "dev-swarm-code-review",
        "test": "dev-swarm-code-test",
    }

    skill = skill_map.get(action.action)
    if not skill:
        raise HTTPException(status_code=400, detail=f"Invalid action: {action.action}")

    prompt = f"/skill {skill} {backlog.file_path}"
    execution_id = str(uuid.uuid4())

    from ..models import AgentExecution

    execution = AgentExecution(
        agent=action.agent,
        prompt=prompt,
    )

    async def event_generator():
        async for output in agent_service.execute_agent(execution, execution_id):
            yield {
                "event": output.type,
                "data": json.dumps({
                    "content": output.content,
                    "timestamp": output.timestamp.isoformat(),
                    "backlog_id": backlog_id,
                    "action": action.action,
                }),
            }

    return EventSourceResponse(event_generator())


@router.get("/{sprint_name}/backlogs/{backlog_id}")
async def get_backlog(
    sprint_name: str,
    backlog_id: str,
    service: StageService = Depends(get_stage_service),
):
    """Get a specific backlog item."""
    backlogs = service.get_sprint_backlogs(sprint_name)
    for backlog in backlogs:
        if backlog.id == backlog_id:
            return backlog
    raise HTTPException(status_code=404, detail=f"Backlog {backlog_id} not found")
