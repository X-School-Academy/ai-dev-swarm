"""File operations API endpoints."""

from fastapi import APIRouter, HTTPException, Depends

from ..config import get_settings, Settings
from ..models import FileInfo, FileContent, FileUpdate
from ..services.file_service import FileService
from ..services.git_service import GitService

router = APIRouter(prefix="/files", tags=["files"])


def get_file_service(settings: Settings = Depends(get_settings)) -> FileService:
    return FileService(settings.project_root)


def get_git_service(settings: Settings = Depends(get_settings)) -> GitService:
    return GitService(settings.project_root)


@router.get("/stage/{stage_folder:path}", response_model=list[FileInfo])
async def list_stage_files(
    stage_folder: str,
    service: FileService = Depends(get_file_service),
):
    """List all files in a stage folder."""
    return service.list_stage_files(stage_folder)


@router.get("/read/{file_path:path}", response_model=FileContent)
async def read_file(
    file_path: str,
    service: FileService = Depends(get_file_service),
):
    """Read file content."""
    content = await service.read_file_async(file_path)
    if not content:
        raise HTTPException(status_code=404, detail=f"File not found: {file_path}")
    return content


@router.post("/write")
async def write_file(
    update: FileUpdate,
    file_service: FileService = Depends(get_file_service),
    git_service: GitService = Depends(get_git_service),
):
    """Write content to a file and optionally commit."""
    await file_service.write_file_async(update.path, update.content)

    if update.commit_message:
        git_service.add_files([update.path])
        success, msg = git_service.commit(update.commit_message)
        return {
            "success": True,
            "committed": success,
            "commit_message": msg if success else None,
        }

    return {"success": True, "committed": False}


@router.delete("/{file_path:path}")
async def delete_file(
    file_path: str,
    commit_message: str = None,
    file_service: FileService = Depends(get_file_service),
    git_service: GitService = Depends(get_git_service),
):
    """Delete a file and optionally commit."""
    if not file_service.file_exists(file_path):
        raise HTTPException(status_code=404, detail=f"File not found: {file_path}")

    file_service.delete_file(file_path)

    if commit_message:
        git_service.add_files([file_path])
        success, msg = git_service.commit(commit_message)
        return {
            "success": True,
            "committed": success,
            "commit_message": msg if success else None,
        }

    return {"success": True, "committed": False}


@router.post("/render-markdown")
async def render_markdown(
    content: str,
    service: FileService = Depends(get_file_service),
):
    """Render markdown content to HTML."""
    html = service.render_markdown(content)
    return {"html": html}


@router.get("/exists/{file_path:path}")
async def check_file_exists(
    file_path: str,
    service: FileService = Depends(get_file_service),
):
    """Check if a file exists."""
    return {"exists": service.file_exists(file_path)}
