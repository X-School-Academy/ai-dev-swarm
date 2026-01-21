"""Pydantic models for WebUI API."""

from typing import Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime


# Ideas models
class IdeasConfig(BaseModel):
    """Configuration for ideas.md creation."""
    project_name: str
    repo_type: Literal["dev-swarm", "github", "local"] = "github"
    skipped_stages: list[str] = Field(default_factory=list)
    problem_statement: str
    solution: str
    additional_notes: Optional[str] = None


# Stage models
class StageInfo(BaseModel):
    """Information about a development stage."""
    stage_id: str
    name: str
    skill: str
    skippable: bool
    status: Literal["pending", "skipped", "in_progress", "completed"] = "pending"
    folder_exists: bool = False


class StageAction(BaseModel):
    """Action to perform on a stage."""
    action: Literal["start", "skip", "complete"]
    stage_id: str


# File models
class FileInfo(BaseModel):
    """Information about a file."""
    path: str
    name: str
    is_markdown: bool
    is_html: bool
    modified_at: Optional[datetime] = None
    size: int = 0


class FileContent(BaseModel):
    """File content for reading/writing."""
    path: str
    content: str


class FileUpdate(BaseModel):
    """File update request."""
    path: str
    content: str
    commit_message: Optional[str] = None


# Git models
class GitStatus(BaseModel):
    """Git repository status."""
    branch: str
    is_clean: bool
    staged: list[str] = Field(default_factory=list)
    modified: list[str] = Field(default_factory=list)
    untracked: list[str] = Field(default_factory=list)


class CommitRequest(BaseModel):
    """Request to create a git commit."""
    message: str
    files: Optional[list[str]] = None  # None means all staged


# Agent models
class AgentType(BaseModel):
    """AI Agent type configuration."""
    name: Literal["claude", "codex", "gemini"]
    command: str
    args: list[str] = Field(default_factory=list)


class AgentExecution(BaseModel):
    """AI Agent execution request."""
    agent: Literal["claude", "codex", "gemini"] = "claude"
    prompt: str
    working_dir: Optional[str] = None
    timeout: int = 300


class AgentOutput(BaseModel):
    """AI Agent execution output chunk."""
    type: Literal["stdout", "stderr", "status", "done", "error"]
    content: str
    timestamp: datetime = Field(default_factory=datetime.now)


# Sprint/Backlog models (Stage 09)
class BacklogItem(BaseModel):
    """Backlog item for sprint management."""
    id: str
    type: Literal["FEATURE", "CHANGE", "BUG", "IMPROVE"]
    feature_name: str
    sub_feature: Optional[str] = None
    title: str
    status: Literal["pending", "in_progress", "review", "testing", "completed"] = "pending"
    file_path: str


class SprintInfo(BaseModel):
    """Sprint information."""
    name: str
    folder_path: str
    backlogs: list[BacklogItem] = Field(default_factory=list)
    status: Literal["planning", "active", "completed"] = "planning"


class BacklogAction(BaseModel):
    """Action on a backlog item."""
    backlog_id: str
    action: Literal["dev", "review", "test"]
    agent: Literal["claude", "codex", "gemini"] = "claude"


# Workflow models
class WorkflowState(BaseModel):
    """State of a LangGraph workflow."""
    workflow_id: str
    stage_id: str
    current_step: str
    status: Literal["running", "waiting_for_review", "completed", "error"]
    files_created: list[str] = Field(default_factory=list)
    files_modified: list[str] = Field(default_factory=list)
    error: Optional[str] = None
