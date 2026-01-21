"""Configuration management for WebUI server."""

from pathlib import Path
from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict

# Path to dev-swarm/.env
DEV_SWARM_ROOT = Path(__file__).parent.parent.parent.resolve()
ENV_FILE = DEV_SWARM_ROOT / ".env"


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE),
        env_prefix="WEBUI_",
        extra="ignore",
    )

    # Server settings
    host: str = "127.0.0.1"
    port: int = 8001
    debug: bool = False

    # Project paths
    project_root: Path = DEV_SWARM_ROOT.parent
    dev_swarm_root: Path = DEV_SWARM_ROOT

    # AI Agent settings
    default_agent: str = "claude"  # claude, codex, gemini
    agent_timeout: int = 300  # seconds

    # Git settings
    auto_commit: bool = False


@lru_cache
def get_settings() -> Settings:
    """Get cached settings instance."""
    return Settings()


# Stage definitions
STAGES = {
    "00": {"name": "init-ideas", "skill": "dev-swarm-stage-init-ideas", "skippable": False},
    "01": {"name": "market-research", "skill": "dev-swarm-stage-market-research", "skippable": True},
    "02": {"name": "personas", "skill": "dev-swarm-stage-personas", "skippable": True},
    "03": {"name": "mvp", "skill": "dev-swarm-stage-mvp", "skippable": True},
    "04": {"name": "prd", "skill": "dev-swarm-stage-prd", "skippable": False},
    "05": {"name": "ux", "skill": "dev-swarm-stage-ux", "skippable": True},
    "06": {"name": "architecture", "skill": "dev-swarm-stage-architecture", "skippable": True},
    "07": {"name": "tech-specs", "skill": "dev-swarm-stage-tech-specs", "skippable": False},
    "08": {"name": "devops", "skill": "dev-swarm-stage-devops", "skippable": True},
    "09": {"name": "sprints", "skill": "dev-swarm-stage-sprints", "skippable": False},
    "10": {"name": "deployment", "skill": "dev-swarm-stage-deployment", "skippable": True},
    "99": {"name": "archive", "skill": "dev-swarm-stage-archive", "skippable": True},
}

# Backlog types for stage 09
BACKLOG_TYPES = ["FEATURE", "CHANGE", "BUG", "IMPROVE"]
