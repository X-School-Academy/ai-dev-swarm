"""Stage workflow state management using LangGraph."""

from pathlib import Path
from typing import Optional

from ..workflows.stage_workflow import StageWorkflow, StageState


class WorkflowService:
    """Manage stage workflow state in memory."""

    def __init__(self, project_root: Path):
        self.stage_workflow = StageWorkflow(project_root)
        self._states: dict[str, StageState] = {}

    def get_or_create(self, stage_id: str) -> StageState:
        """Get existing workflow state or create a new one."""
        if stage_id in self._states:
            return self._states[stage_id]

        workflow_id, _compiled, initial_state = self.stage_workflow.create_workflow(stage_id)
        self._states[stage_id] = initial_state
        return initial_state

    def update_state(self, stage_id: str, **kwargs) -> StageState:
        """Update stored workflow state with new values."""
        state = self.get_or_create(stage_id)
        updated = {**state, **kwargs}
        self._states[stage_id] = updated
        return updated

    def get_state(self, stage_id: str) -> Optional[StageState]:
        """Get workflow state for a stage."""
        return self._states.get(stage_id)
