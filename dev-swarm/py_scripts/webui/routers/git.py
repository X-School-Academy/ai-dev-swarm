"""Git operations API endpoints."""

from fastapi import APIRouter, HTTPException, Depends

from ..config import get_settings, Settings
from ..models import GitStatus, CommitRequest
from ..services.git_service import GitService

router = APIRouter(prefix="/git", tags=["git"])


def get_git_service(settings: Settings = Depends(get_settings)) -> GitService:
    return GitService(settings.project_root)


@router.get("/status", response_model=GitStatus)
async def get_status(service: GitService = Depends(get_git_service)):
    """Get git repository status."""
    return service.get_status()


@router.post("/add")
async def add_files(
    files: list[str],
    service: GitService = Depends(get_git_service),
):
    """Stage files for commit."""
    success = service.add_files(files)
    return {"success": success}


@router.post("/add-all")
async def add_all(service: GitService = Depends(get_git_service)):
    """Stage all changes."""
    success = service.add_all()
    return {"success": success}


@router.post("/commit")
async def commit(
    request: CommitRequest,
    service: GitService = Depends(get_git_service),
):
    """Create a git commit."""
    success, message = service.commit(request.message, request.files)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return {"success": True, "message": message}


@router.get("/commits")
async def get_commits(
    count: int = 10,
    service: GitService = Depends(get_git_service),
):
    """Get recent commits."""
    commits = service.get_recent_commits(count)
    return {"commits": commits}
