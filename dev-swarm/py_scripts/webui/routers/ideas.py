"""Ideas management API endpoints."""

from fastapi import APIRouter, HTTPException, Depends

from ..config import get_settings, Settings
from ..models import IdeasConfig
from ..services.file_service import FileService
from ..services.git_service import GitService

router = APIRouter(prefix="/ideas", tags=["ideas"])


def get_file_service(settings: Settings = Depends(get_settings)) -> FileService:
    return FileService(settings.project_root)


def get_git_service(settings: Settings = Depends(get_settings)) -> GitService:
    return GitService(settings.project_root)


@router.get("/template")
async def get_ideas_template(service: FileService = Depends(get_file_service)):
    """Get the ideas-template.md content."""
    content = service.read_ideas_template()
    if not content:
        raise HTTPException(status_code=404, detail="ideas-template.md not found")
    return {"content": content}


@router.get("/current")
async def get_current_ideas(service: FileService = Depends(get_file_service)):
    """Get current ideas.md content if exists."""
    content = service.get_ideas_content()
    return {"content": content, "exists": content is not None}


@router.post("/create")
async def create_ideas(
    config: IdeasConfig,
    file_service: FileService = Depends(get_file_service),
    git_service: GitService = Depends(get_git_service),
):
    """Create ideas.md from configuration."""
    # Build ideas content from template
    template = file_service.read_ideas_template()
    if not template:
        raise HTTPException(status_code=404, detail="ideas-template.md not found")

    # Replace placeholders in template
    content = template.replace("[Your Project Name]", config.project_name)

    # Set repo type checkbox
    content = content.replace(
        "- [ ] Use dev-swarm root project",
        f"- [{'x' if config.repo_type == 'dev-swarm' else ' '}] Use dev-swarm root project",
    )
    content = content.replace(
        "- [x] Create new GitHub remote repo",
        f"- [{'x' if config.repo_type == 'github' else ' '}] Create new GitHub remote repo",
    )
    content = content.replace(
        "- [ ] Create local git repo",
        f"- [{'x' if config.repo_type == 'local' else ' '}] Create local git repo",
    )

    # Update skipped stages
    for stage_id in config.skipped_stages:
        # Uncheck the stage
        stage_patterns = [
            f"- [x] **{stage_id}",
            f"- [ ] **{stage_id}",
        ]
        for pattern in stage_patterns:
            if pattern in content:
                content = content.replace(pattern, f"- [ ] **{stage_id}")

    # Add problem statement
    content = content.replace(
        "<!-- Describe the problem you want to solve -->",
        config.problem_statement,
    )

    # Add solution
    content = content.replace(
        "<!-- Describe your solution ideas, features, and notes below -->",
        config.solution,
    )

    # Add additional notes
    if config.additional_notes:
        content = content.replace(
            "<!-- Any constraints, preferences, or technology choices (language, frameworks, packages) -->",
            config.additional_notes,
        )

    # Write ideas.md
    file_service.create_ideas_file(content)

    # Commit
    git_service.add_files(["ideas.md"])
    success, msg = git_service.commit(f"Create ideas.md for {config.project_name}")

    return {
        "success": True,
        "committed": success,
        "content": content,
    }


@router.put("/update")
async def update_ideas(
    content: str,
    commit_message: str = None,
    file_service: FileService = Depends(get_file_service),
    git_service: GitService = Depends(get_git_service),
):
    """Update ideas.md content."""
    file_service.create_ideas_file(content)

    if commit_message:
        git_service.add_files(["ideas.md"])
        success, msg = git_service.commit(commit_message)
        return {"success": True, "committed": success}

    return {"success": True, "committed": False}
