"""API routers for WebUI."""

from .stages import router as stages_router
from .files import router as files_router
from .agents import router as agents_router
from .ideas import router as ideas_router
from .sprints import router as sprints_router
from .git import router as git_router

__all__ = [
    "stages_router",
    "files_router",
    "agents_router",
    "ideas_router",
    "sprints_router",
    "git_router",
]
