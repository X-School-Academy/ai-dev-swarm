"""Stage management API endpoints."""

from fastapi import APIRouter, HTTPException, Depends
from typing import Optional

from ..config import get_settings, Settings
from ..models import StageInfo, StageAction
from ..services.stage_service import StageService

router = APIRouter(prefix="/stages", tags=["stages"])


def get_stage_service(settings: Settings = Depends(get_settings)) -> StageService:
    return StageService(settings.project_root)


@router.get("/", response_model=list[StageInfo])
async def list_stages(service: StageService = Depends(get_stage_service)):
    """Get all development stages with their status."""
    return service.get_all_stages()


@router.get("/current", response_model=Optional[StageInfo])
async def get_current_stage(service: StageService = Depends(get_stage_service)):
    """Get the current active stage."""
    return service.get_current_stage()


@router.get("/next", response_model=Optional[StageInfo])
async def get_next_stage(service: StageService = Depends(get_stage_service)):
    """Get the next stage to work on."""
    return service.get_next_stage()


@router.get("/{stage_id}", response_model=StageInfo)
async def get_stage(
    stage_id: str,
    service: StageService = Depends(get_stage_service),
):
    """Get information about a specific stage."""
    stage = service.get_stage(stage_id)
    if not stage:
        raise HTTPException(status_code=404, detail=f"Stage {stage_id} not found")
    return stage


@router.post("/{stage_id}/skip")
async def skip_stage(
    stage_id: str,
    reason: str = "Skipped by user",
    service: StageService = Depends(get_stage_service),
):
    """Skip a stage (create SKIP.md and commit)."""
    success, message = service.skip_stage(stage_id, reason)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return {"success": True, "message": message}


@router.post("/{stage_id}/create-folder")
async def create_stage_folder(
    stage_id: str,
    service: StageService = Depends(get_stage_service),
):
    """Create the folder for a stage."""
    success, message = service.create_stage_folder(stage_id)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return {"success": True, "message": message}
