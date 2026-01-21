"""LangGraph workflow for stage processing."""

from typing import TypedDict, Literal, Optional
from pathlib import Path
from langgraph.graph import StateGraph, END
import uuid

from ..config import STAGES
from ..services.file_service import FileService
from ..services.git_service import GitService
from ..services.agent_service import AgentService
from ..models import AgentExecution


class StageState(TypedDict):
    """State for stage workflow."""
    workflow_id: str
    stage_id: str
    stage_name: str
    skill: str
    current_step: str
    status: Literal["running", "waiting_for_review", "completed", "error"]
    files_created: list[str]
    files_modified: list[str]
    readme_created: bool
    stage_files_created: bool
    user_approved: bool
    error: Optional[str]


class StageWorkflow:
    """LangGraph workflow for processing a development stage."""

    def __init__(self, project_root: Path):
        self.project_root = project_root
        self.file_service = FileService(project_root)
        self.git_service = GitService(project_root)
        self.agent_service = AgentService(project_root)
        self._workflows: dict[str, StateGraph] = {}

    def create_workflow(self, stage_id: str) -> tuple[str, StateGraph]:
        """Create a new workflow for a stage."""
        config = STAGES.get(stage_id)
        if not config:
            raise ValueError(f"Unknown stage: {stage_id}")

        workflow_id = str(uuid.uuid4())

        # Define the workflow graph
        workflow = StateGraph(StageState)

        # Add nodes
        workflow.add_node("create_folder", self._create_folder)
        workflow.add_node("create_readme", self._create_readme)
        workflow.add_node("wait_readme_review", self._wait_readme_review)
        workflow.add_node("create_stage_files", self._create_stage_files)
        workflow.add_node("wait_files_review", self._wait_files_review)
        workflow.add_node("execute_ai_actions", self._execute_ai_actions)
        workflow.add_node("commit_changes", self._commit_changes)

        # Define edges
        workflow.set_entry_point("create_folder")

        workflow.add_edge("create_folder", "create_readme")
        workflow.add_edge("create_readme", "wait_readme_review")
        workflow.add_conditional_edges(
            "wait_readme_review",
            self._check_approval,
            {
                "approved": "create_stage_files",
                "waiting": "wait_readme_review",
            },
        )
        workflow.add_edge("create_stage_files", "wait_files_review")
        workflow.add_conditional_edges(
            "wait_files_review",
            self._check_approval,
            {
                "approved": "execute_ai_actions",
                "waiting": "wait_files_review",
            },
        )
        workflow.add_edge("execute_ai_actions", "commit_changes")
        workflow.add_edge("commit_changes", END)

        # Compile the workflow
        compiled = workflow.compile()
        self._workflows[workflow_id] = compiled

        # Create initial state
        initial_state: StageState = {
            "workflow_id": workflow_id,
            "stage_id": stage_id,
            "stage_name": config["name"],
            "skill": config["skill"],
            "current_step": "create_folder",
            "status": "running",
            "files_created": [],
            "files_modified": [],
            "readme_created": False,
            "stage_files_created": False,
            "user_approved": False,
            "error": None,
        }

        return workflow_id, compiled, initial_state

    def _create_folder(self, state: StageState) -> StageState:
        """Create the stage folder."""
        folder_name = f"{state['stage_id']}-{state['stage_name']}"
        self.file_service.create_folder(folder_name)
        return {
            **state,
            "current_step": "create_readme",
            "files_created": [folder_name],
        }

    def _create_readme(self, state: StageState) -> StageState:
        """Create README.md using AI agent."""
        # This will be executed by the AI agent
        return {
            **state,
            "current_step": "wait_readme_review",
            "status": "waiting_for_review",
            "readme_created": True,
        }

    def _wait_readme_review(self, state: StageState) -> StageState:
        """Wait for user to review README."""
        return state

    def _check_approval(self, state: StageState) -> str:
        """Check if user has approved."""
        if state["user_approved"]:
            return "approved"
        return "waiting"

    def _create_stage_files(self, state: StageState) -> StageState:
        """Create stage-specific files using AI agent."""
        return {
            **state,
            "current_step": "wait_files_review",
            "status": "waiting_for_review",
            "stage_files_created": True,
            "user_approved": False,  # Reset for next review
        }

    def _wait_files_review(self, state: StageState) -> StageState:
        """Wait for user to review stage files."""
        return state

    def _execute_ai_actions(self, state: StageState) -> StageState:
        """Execute any AI-required actions (e.g., MCP operations)."""
        # Stages like 08-devops and 10-deployment may need AI execution
        return {
            **state,
            "current_step": "commit_changes",
            "status": "running",
        }

    def _commit_changes(self, state: StageState) -> StageState:
        """Commit all changes."""
        folder_name = f"{state['stage_id']}-{state['stage_name']}"
        self.git_service.add_all()
        success, msg = self.git_service.commit(
            f"Complete stage {state['stage_id']}-{state['stage_name']}"
        )

        return {
            **state,
            "current_step": "completed",
            "status": "completed" if success else "error",
            "error": None if success else msg,
        }

    def approve_review(self, workflow_id: str, state: StageState) -> StageState:
        """Mark review as approved."""
        return {
            **state,
            "user_approved": True,
        }

    def get_workflow(self, workflow_id: str):
        """Get a workflow by ID."""
        return self._workflows.get(workflow_id)

    def remove_workflow(self, workflow_id: str):
        """Remove a completed workflow."""
        self._workflows.pop(workflow_id, None)
