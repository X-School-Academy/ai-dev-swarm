"""Stage management API endpoints."""

from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional
from datetime import datetime
import json
import uuid
from sse_starlette.sse import EventSourceResponse

from ..config import get_settings, Settings
from ..models import StageInfo, AgentExecution
from ..services.stage_service import StageService
from ..services.file_service import FileService
from ..services.git_service import GitService
from ..services.agent_service import AgentService
from ..services.skill_service import SkillService
from ..services.workflow_service import WorkflowService

router = APIRouter(prefix="/stages", tags=["stages"])


def get_stage_service(settings: Settings = Depends(get_settings)) -> StageService:
    return StageService(settings.project_root)


def get_file_service(settings: Settings = Depends(get_settings)) -> FileService:
    return FileService(settings.project_root)


def get_git_service(settings: Settings = Depends(get_settings)) -> GitService:
    return GitService(settings.project_root)


_agent_service: AgentService = None


def get_agent_service(settings: Settings = Depends(get_settings)) -> AgentService:
    global _agent_service
    if _agent_service is None:
        _agent_service = AgentService(settings.project_root)
    return _agent_service


def get_skill_service(settings: Settings = Depends(get_settings)) -> SkillService:
    return SkillService(settings.dev_swarm_root)


_workflow_service: WorkflowService = None


def get_workflow_service(settings: Settings = Depends(get_settings)) -> WorkflowService:
    global _workflow_service
    if _workflow_service is None:
        _workflow_service = WorkflowService(settings.project_root)
    return _workflow_service


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


def _build_stage_prompt(skill_prompt: str, task: str) -> str:
    return f"{skill_prompt}\n\nTask:\n{task}\n"


@router.get("/{stage_id}/actions/readme")
async def generate_stage_readme(
    stage_id: str,
    agent: str = Query("claude"),
    stage_service: StageService = Depends(get_stage_service),
    file_service: FileService = Depends(get_file_service),
    git_service: GitService = Depends(get_git_service),
    agent_service: AgentService = Depends(get_agent_service),
    skill_service: SkillService = Depends(get_skill_service),
    workflow_service: WorkflowService = Depends(get_workflow_service),
):
    """Generate README.md for a stage using AI and stream output."""
    stage = stage_service.get_stage(stage_id)
    if not stage:
        raise HTTPException(status_code=404, detail=f"Stage {stage_id} not found")

    folder_name = f"{stage.stage_id}-{stage.name}"
    file_service.create_folder(folder_name)
    workflow_service.get_or_create(stage_id)

    try:
        skill_prompt = skill_service.load_skill_prompt(stage.skill)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    task = (
        f"Create README.md for stage folder `{folder_name}`. "
        "Return only markdown content, no code fences, no extra commentary."
    )
    prompt = _build_stage_prompt(skill_prompt, task)

    execution = AgentExecution(agent=agent, prompt=prompt)
    execution_id = str(uuid.uuid4())

    async def event_generator():
        yield {
            "event": "meta",
            "data": json.dumps({
                "execution_id": execution_id,
                "timestamp": datetime.now().isoformat(),
            }),
        }

        stdout_lines: list[str] = []
        had_error = False

        async for output in agent_service.execute_agent(execution, execution_id):
            if output.type == "stdout":
                stdout_lines.append(output.content)
            if output.type == "error":
                had_error = True
            yield {
                "event": output.type,
                "data": json.dumps({
                    "content": output.content,
                    "timestamp": output.timestamp.isoformat(),
                }),
            }

        if had_error:
            return

        content = "\n".join(stdout_lines).strip()
        if not content:
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": "No README content generated.",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return

        file_service.write_file(f"{folder_name}/README.md", content)
        git_service.add_files([f"{folder_name}/README.md"])
        success, msg = git_service.commit(f"Generate README for stage {folder_name}")
        if not success:
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": f"Git commit failed: {msg}",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return
        workflow_service.update_state(
            stage_id,
            current_step="wait_readme_review",
            status="waiting_for_review",
            readme_created=True,
        )

        yield {
            "event": "status",
            "data": json.dumps({
                "content": "README.md created and committed.",
                "timestamp": datetime.now().isoformat(),
            }),
        }

    return EventSourceResponse(event_generator())


@router.get("/{stage_id}/actions/files")
async def generate_stage_files(
    stage_id: str,
    agent: str = Query("claude"),
    stage_service: StageService = Depends(get_stage_service),
    file_service: FileService = Depends(get_file_service),
    git_service: GitService = Depends(get_git_service),
    agent_service: AgentService = Depends(get_agent_service),
    skill_service: SkillService = Depends(get_skill_service),
    workflow_service: WorkflowService = Depends(get_workflow_service),
):
    """Generate stage-specific files using AI and stream output."""
    stage = stage_service.get_stage(stage_id)
    if not stage:
        raise HTTPException(status_code=404, detail=f"Stage {stage_id} not found")

    folder_name = f"{stage.stage_id}-{stage.name}"
    file_service.create_folder(folder_name)
    workflow_service.get_or_create(stage_id)

    try:
        skill_prompt = skill_service.load_skill_prompt(stage.skill)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    task = (
        f"Create all stage files (excluding README.md) for `{folder_name}`. "
        "Return a JSON object with a top-level key `files`, "
        "where each item has `path` (relative to the stage folder) and `content`. "
        "Do not include README.md. Do not add extra text outside JSON."
    )
    prompt = _build_stage_prompt(skill_prompt, task)

    execution = AgentExecution(agent=agent, prompt=prompt)
    execution_id = str(uuid.uuid4())

    async def event_generator():
        yield {
            "event": "meta",
            "data": json.dumps({
                "execution_id": execution_id,
                "timestamp": datetime.now().isoformat(),
            }),
        }

        stdout_lines: list[str] = []
        had_error = False

        async for output in agent_service.execute_agent(execution, execution_id):
            if output.type == "stdout":
                stdout_lines.append(output.content)
            if output.type == "error":
                had_error = True
            yield {
                "event": output.type,
                "data": json.dumps({
                    "content": output.content,
                    "timestamp": output.timestamp.isoformat(),
                }),
            }

        if had_error:
            return

        raw_output = "\n".join(stdout_lines).strip()
        json_start = raw_output.find("{")
        json_end = raw_output.rfind("}")
        if json_start == -1 or json_end == -1:
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": "No valid JSON output found for stage files.",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return

        json_text = raw_output[json_start:json_end + 1]
        try:
            payload = json.loads(json_text)
        except json.JSONDecodeError as exc:
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": f"Invalid JSON output: {exc}",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return

        files = payload.get("files", [])
        if not isinstance(files, list):
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": "JSON output must include a list under `files`.",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return

        written_files = []
        stage_root = (file_service.project_root / folder_name).resolve()
        for item in files:
            path = item.get("path")
            content = item.get("content", "")
            if not path or path.endswith("README.md"):
                continue
            candidate = (stage_root / path.lstrip("/")).resolve()
            if not str(candidate).startswith(str(stage_root)):
                continue
            safe_path = str(candidate.relative_to(file_service.project_root))
            file_service.write_file(safe_path, content)
            written_files.append(safe_path)

        if not written_files:
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": "No stage files were written.",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return

        git_service.add_files(written_files)
        success, msg = git_service.commit(f"Generate stage files for {folder_name}")
        if not success:
            yield {
                "event": "error",
                "data": json.dumps({
                    "content": f"Git commit failed: {msg}",
                    "timestamp": datetime.now().isoformat(),
                }),
            }
            return
        workflow_service.update_state(
            stage_id,
            current_step="wait_files_review",
            status="waiting_for_review",
            stage_files_created=True,
        )

        yield {
            "event": "status",
            "data": json.dumps({
                "content": f"Created and committed {len(written_files)} files.",
                "timestamp": datetime.now().isoformat(),
            }),
        }

    return EventSourceResponse(event_generator())
