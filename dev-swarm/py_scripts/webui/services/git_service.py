"""Git operations service."""

import subprocess
from pathlib import Path
from typing import Optional
from ..models import GitStatus, CommitRequest


class GitService:
    """Service for git operations."""

    def __init__(self, repo_path: Path):
        self.repo_path = repo_path

    def _run_git(self, *args: str) -> subprocess.CompletedProcess:
        """Run a git command."""
        return subprocess.run(
            ["git", *args],
            cwd=self.repo_path,
            capture_output=True,
            text=True,
        )

    def get_status(self) -> GitStatus:
        """Get git repository status."""
        # Get current branch
        result = self._run_git("branch", "--show-current")
        branch = result.stdout.strip()

        # Get status
        result = self._run_git("status", "--porcelain")
        lines = result.stdout.strip().split("\n") if result.stdout.strip() else []

        staged = []
        modified = []
        untracked = []

        for line in lines:
            if not line:
                continue
            status_code = line[:2]
            file_path = line[3:]

            if status_code[0] in "MADRC":
                staged.append(file_path)
            if status_code[1] == "M":
                modified.append(file_path)
            if status_code == "??":
                untracked.append(file_path)

        return GitStatus(
            branch=branch,
            is_clean=len(lines) == 0,
            staged=staged,
            modified=modified,
            untracked=untracked,
        )

    def add_files(self, files: list[str]) -> bool:
        """Stage files for commit."""
        if not files:
            return True
        result = self._run_git("add", *files)
        return result.returncode == 0

    def add_all(self) -> bool:
        """Stage all changes."""
        result = self._run_git("add", "-A")
        return result.returncode == 0

    def commit(self, message: str, files: Optional[list[str]] = None) -> tuple[bool, str]:
        """Create a commit."""
        if files:
            self.add_files(files)

        result = self._run_git("commit", "-m", message)
        if result.returncode == 0:
            return True, result.stdout.strip()
        return False, result.stderr.strip()

    def create_skip_file(self, stage_folder: str, reason: str = "Skipped by user") -> Path:
        """Create a SKIP.md file in a stage folder."""
        skip_path = self.repo_path / stage_folder / "SKIP.md"
        skip_path.parent.mkdir(parents=True, exist_ok=True)
        skip_path.write_text(f"# Stage Skipped\n\nReason: {reason}\n")
        return skip_path

    def get_recent_commits(self, count: int = 10) -> list[dict]:
        """Get recent commits."""
        result = self._run_git(
            "log",
            f"-{count}",
            "--pretty=format:%H|%s|%an|%ai",
        )
        commits = []
        for line in result.stdout.strip().split("\n"):
            if not line:
                continue
            parts = line.split("|", 3)
            if len(parts) == 4:
                commits.append({
                    "hash": parts[0],
                    "message": parts[1],
                    "author": parts[2],
                    "date": parts[3],
                })
        return commits
