"""Skill prompt loading service."""

from pathlib import Path


class SkillService:
    """Service for loading skill prompt content."""

    def __init__(self, dev_swarm_root: Path):
        self.dev_swarm_root = dev_swarm_root

    def load_skill_prompt(self, skill_name: str) -> str:
        """Load the SKILL.md content for a given skill."""
        candidates = [
            self.dev_swarm_root / "skills" / skill_name / "SKILL.md",
            self.dev_swarm_root / "mcp-skills" / skill_name / "SKILL.md",
        ]

        for path in candidates:
            if path.exists():
                return path.read_text()

        raise FileNotFoundError(f"Skill prompt not found for: {skill_name}")
