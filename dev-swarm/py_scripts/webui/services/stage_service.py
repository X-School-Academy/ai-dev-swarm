"""Stage management service."""

from pathlib import Path
from typing import Optional

from ..config import STAGES, BACKLOG_TYPES
from ..models import StageInfo, SprintInfo, BacklogItem
from .file_service import FileService
from .git_service import GitService


class StageService:
    """Service for managing development stages."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.file_service = FileService(project_root)
        self.git_service = GitService(project_root)

    def get_all_stages(self) -> list[StageInfo]:
        """Get information about all stages."""
        stages = []
        for stage_id, config in STAGES.items():
            folder_name = f"{stage_id}-{config['name']}"
            folder_exists = self.file_service.folder_exists(folder_name)

            # Determine status
            status = "pending"
            if folder_exists:
                skip_file = self.project_root / folder_name / "SKIP.md"
                if skip_file.exists():
                    status = "skipped"
                else:
                    readme = self.project_root / folder_name / "README.md"
                    if readme.exists():
                        status = "completed"
                    else:
                        status = "in_progress"

            stages.append(
                StageInfo(
                    stage_id=stage_id,
                    name=config["name"],
                    skill=config["skill"],
                    skippable=config["skippable"],
                    status=status,
                    folder_exists=folder_exists,
                )
            )
        return stages

    def get_stage(self, stage_id: str) -> Optional[StageInfo]:
        """Get information about a specific stage."""
        config = STAGES.get(stage_id)
        if not config:
            return None

        folder_name = f"{stage_id}-{config['name']}"
        folder_exists = self.file_service.folder_exists(folder_name)

        status = "pending"
        if folder_exists:
            skip_file = self.project_root / folder_name / "SKIP.md"
            if skip_file.exists():
                status = "skipped"
            else:
                readme = self.project_root / folder_name / "README.md"
                if readme.exists():
                    status = "completed"
                else:
                    status = "in_progress"

        return StageInfo(
            stage_id=stage_id,
            name=config["name"],
            skill=config["skill"],
            skippable=config["skippable"],
            status=status,
            folder_exists=folder_exists,
        )

    def get_current_stage(self) -> Optional[StageInfo]:
        """Get the current active stage (first non-completed stage)."""
        stages = self.get_all_stages()
        for stage in stages:
            if stage.status in ["pending", "in_progress"]:
                return stage
        return None

    def get_next_stage(self) -> Optional[StageInfo]:
        """Get the next stage to work on."""
        current = self.get_current_stage()
        if not current:
            return None

        stage_ids = list(STAGES.keys())
        try:
            current_idx = stage_ids.index(current.stage_id)
            if current_idx < len(stage_ids) - 1:
                return self.get_stage(stage_ids[current_idx + 1])
        except ValueError:
            pass
        return None

    def skip_stage(self, stage_id: str, reason: str = "Skipped by user") -> tuple[bool, str]:
        """Skip a stage by creating SKIP.md."""
        config = STAGES.get(stage_id)
        if not config:
            return False, f"Unknown stage: {stage_id}"

        if not config["skippable"]:
            return False, f"Stage {stage_id} cannot be skipped"

        folder_name = f"{stage_id}-{config['name']}"
        skip_path = self.git_service.create_skip_file(folder_name, reason)

        # Commit the skip file
        self.git_service.add_files([str(skip_path.relative_to(self.project_root))])
        success, msg = self.git_service.commit(f"Skip stage {stage_id}-{config['name']}")

        if success:
            return True, f"Stage {stage_id} skipped successfully"
        return False, msg

    def create_stage_folder(self, stage_id: str) -> tuple[bool, str]:
        """Create a stage folder."""
        config = STAGES.get(stage_id)
        if not config:
            return False, f"Unknown stage: {stage_id}"

        folder_name = f"{stage_id}-{config['name']}"
        self.file_service.create_folder(folder_name)
        return True, f"Created folder: {folder_name}"

    # Sprint management (Stage 09)
    def get_sprints(self) -> list[SprintInfo]:
        """Get all sprints in stage 09."""
        sprints_path = self.project_root / "09-sprints"
        if not sprints_path.exists():
            return []

        sprints = []
        for item in sprints_path.iterdir():
            if item.is_dir() and not item.name.startswith("_"):
                sprint = self._load_sprint(item)
                if sprint:
                    sprints.append(sprint)
        return sprints

    def _load_sprint(self, sprint_path: Path) -> Optional[SprintInfo]:
        """Load sprint information from folder."""
        readme = sprint_path / "README.md"
        if not readme.exists():
            return None

        backlogs = []
        for md_file in sprint_path.glob("*.md"):
            if md_file.name == "README.md":
                continue
            backlog = self._parse_backlog_file(md_file)
            if backlog:
                backlogs.append(backlog)

        return SprintInfo(
            name=sprint_path.name,
            folder_path=str(sprint_path.relative_to(self.project_root)),
            backlogs=backlogs,
        )

    def _parse_backlog_file(self, file_path: Path) -> Optional[BacklogItem]:
        """Parse a backlog file to extract information."""
        name = file_path.stem
        parts = name.split("-", 2)

        if len(parts) < 2:
            return None

        backlog_type = parts[0].upper()
        if backlog_type not in BACKLOG_TYPES:
            return None

        feature_name = parts[1] if len(parts) > 1 else "unknown"
        sub_feature = parts[2] if len(parts) > 2 else None

        # Read content to get title and status
        content = file_path.read_text()
        title = feature_name
        status = "pending"

        for line in content.split("\n"):
            if line.startswith("# "):
                title = line[2:].strip()
            elif "Status:" in line:
                status_text = line.split(":", 1)[1].strip().lower()
                if "progress" in status_text:
                    status = "in_progress"
                elif "review" in status_text:
                    status = "review"
                elif "test" in status_text:
                    status = "testing"
                elif "complete" in status_text or "done" in status_text:
                    status = "completed"

        return BacklogItem(
            id=name,
            type=backlog_type,
            feature_name=feature_name,
            sub_feature=sub_feature,
            title=title,
            status=status,
            file_path=str(file_path.relative_to(self.project_root)),
        )

    def get_sprint_backlogs(self, sprint_name: str) -> list[BacklogItem]:
        """Get all backlogs for a specific sprint."""
        sprint_path = self.project_root / "09-sprints" / sprint_name
        if not sprint_path.exists():
            return []

        backlogs = []
        for md_file in sprint_path.glob("*.md"):
            if md_file.name == "README.md":
                continue
            backlog = self._parse_backlog_file(md_file)
            if backlog:
                backlogs.append(backlog)
        return backlogs
