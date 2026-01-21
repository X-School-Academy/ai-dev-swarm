"""Sprint management API endpoints (Stage 09)."""

from fastapi import APIRouter, HTTPException, Depends

from ..config import get_settings, Settings
from ..models import SprintInfo, BacklogItem, BacklogAction
from ..services.stage_service import StageService

router = APIRouter(prefix="/sprints", tags=["sprints"])


def get_stage_service(settings: Settings = Depends(get_settings)) -> StageService:
    return StageService(settings.project_root)




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


@router.post("/{sprint_name}/backlogs/{backlog_id}/status")
async def update_backlog_status(
    sprint_name: str,
    backlog_id: str,
    action: BacklogAction,
    stage_service: StageService = Depends(get_stage_service),
):
    """Update backlog status using code-driven workflow (no AI)."""
    status_map = {
        "dev": "in_progress",
        "review": "review",
        "test": "testing",
    }

    status = status_map.get(action.action)
    if not status:
        raise HTTPException(status_code=400, detail=f"Invalid action: {action.action}")

    success, message = stage_service.update_backlog_status(sprint_name, backlog_id, status)
    if not success:
        raise HTTPException(status_code=404, detail=message)

    backlog = stage_service.get_sprint_backlogs(sprint_name)
    updated = next((b for b in backlog if b.id == backlog_id), None)
    return {"success": True, "message": message, "backlog": updated}


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
