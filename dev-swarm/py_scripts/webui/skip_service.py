from __future__ import annotations

from typing import Any

from .stage_service import (
    NON_SKIPPABLE,
    PROJECT_ROOT,
    derive_status,
    find_stage,
    list_stage_documents,
)


def toggle_skip(stage_id: str, skip: bool | None) -> dict[str, Any]:
    stage = find_stage(stage_id)
    if stage.stage_id in NON_SKIPPABLE:
        raise ValueError("Stage is not skippable")

    stage_path = PROJECT_ROOT / stage.directory
    if not stage_path.exists():
        raise FileNotFoundError("Stage directory not found")

    skip_file = stage_path / "SKIP.md"
    current = skip_file.exists()
    desired = (not current) if skip is None else skip

    if desired:
        skip_file.write_text("# Stage Skipped\n\nSkipped via WebUI.\n")
    elif current:
        skip_file.unlink()

    return {
        "stageId": stage.stage_id,
        "name": stage.name,
        "status": derive_status(desired, (stage_path / "README.md").exists(), False),
        "isSkippable": True,
        "hasSkipFile": desired,
        "files": list_stage_documents(stage_path),
    }
