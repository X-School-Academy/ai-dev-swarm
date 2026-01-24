from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parents[3]


@dataclass(frozen=True)
class StageDefinition:
    stage_id: str
    name: str
    directory: str


STAGES: list[StageDefinition] = [
    StageDefinition("00", "Init Ideas", "00-init-ideas"),
    StageDefinition("01", "Market Research", "01-market-research"),
    StageDefinition("02", "Personas", "02-personas"),
    StageDefinition("03", "MVP", "03-mvp"),
    StageDefinition("04", "Tech Research", "04-tech-research"),
    StageDefinition("05", "PRD", "05-prd"),
    StageDefinition("06", "UX", "06-ux"),
    StageDefinition("07", "Architecture", "07-architecture"),
    StageDefinition("08", "Tech Specs", "08-tech-specs"),
    StageDefinition("09", "DevOps", "09-devops"),
    StageDefinition("10", "Sprints", "10-sprints"),
    StageDefinition("11", "Deployment", "11-deployment"),
    StageDefinition("99", "Archive", "99-archive"),
]

NON_SKIPPABLE = {"00", "05", "08", "10"}


def list_stages(run_active: bool = False) -> list[dict[str, Any]]:
    stages: list[dict[str, Any]] = []
    for stage in STAGES:
        stage_path = PROJECT_ROOT / stage.directory
        skip_file = stage_path / "SKIP.md"
        readme_file = stage_path / "README.md"
        has_skip = skip_file.exists()
        status = derive_status(has_skip, readme_file.exists(), run_active)
        stages.append(
            {
                "stageId": stage.stage_id,
                "name": stage.name,
                "status": status,
                "isSkippable": stage.stage_id not in NON_SKIPPABLE,
                "hasSkipFile": has_skip,
                "files": list_stage_documents(stage_path),
            }
        )
    return stages

def find_stage(stage_id: str) -> StageDefinition:
    for stage in STAGES:
        if stage.stage_id == stage_id:
            return stage
    raise KeyError("Invalid stage")


def derive_status(has_skip: bool, has_readme: bool, run_active: bool) -> str:
    if has_skip:
        return "skipped"
    if run_active:
        return "in-progress"
    if has_readme:
        return "completed"
    return "not-started"


def list_stage_documents(stage_path: Path) -> list[str]:
    if not stage_path.exists():
        return []

    docs = []
    for path in stage_path.rglob("*"):
        if path.is_file() and path.suffix.lower() in {".md", ".html"}:
            docs.append(path.relative_to(PROJECT_ROOT).as_posix())
    return sorted(docs)
