"""File operations service."""

import os
from pathlib import Path
from datetime import datetime
from typing import Optional
import markdown
import aiofiles

from ..models import FileInfo, FileContent


class FileService:
    """Service for file operations."""

    def __init__(self, project_root: Path):
        self.project_root = project_root

    def _get_file_info(self, path: Path) -> FileInfo:
        """Get file information."""
        stat = path.stat()
        return FileInfo(
            path=str(path.relative_to(self.project_root)),
            name=path.name,
            is_markdown=path.suffix.lower() == ".md",
            is_html=path.suffix.lower() in [".html", ".htm"],
            modified_at=datetime.fromtimestamp(stat.st_mtime),
            size=stat.st_size,
        )

    def list_stage_files(self, stage_folder: str) -> list[FileInfo]:
        """List files in a stage folder."""
        stage_path = self.project_root / stage_folder
        if not stage_path.exists():
            return []

        files = []
        for item in stage_path.rglob("*"):
            if item.is_file() and not item.name.startswith("."):
                files.append(self._get_file_info(item))
        return sorted(files, key=lambda f: f.path)

    def read_file(self, file_path: str) -> Optional[FileContent]:
        """Read file content."""
        full_path = self.project_root / file_path
        if not full_path.exists():
            return None
        return FileContent(
            path=file_path,
            content=full_path.read_text(),
        )

    async def read_file_async(self, file_path: str) -> Optional[FileContent]:
        """Read file content asynchronously."""
        full_path = self.project_root / file_path
        if not full_path.exists():
            return None
        async with aiofiles.open(full_path, "r") as f:
            content = await f.read()
        return FileContent(path=file_path, content=content)

    def write_file(self, file_path: str, content: str) -> bool:
        """Write content to file."""
        full_path = self.project_root / file_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        full_path.write_text(content)
        return True

    async def write_file_async(self, file_path: str, content: str) -> bool:
        """Write content to file asynchronously."""
        full_path = self.project_root / file_path
        full_path.parent.mkdir(parents=True, exist_ok=True)
        async with aiofiles.open(full_path, "w") as f:
            await f.write(content)
        return True

    def delete_file(self, file_path: str) -> bool:
        """Delete a file."""
        full_path = self.project_root / file_path
        if full_path.exists():
            full_path.unlink()
            return True
        return False

    def file_exists(self, file_path: str) -> bool:
        """Check if file exists."""
        return (self.project_root / file_path).exists()

    def folder_exists(self, folder_path: str) -> bool:
        """Check if folder exists."""
        return (self.project_root / folder_path).is_dir()

    def create_folder(self, folder_path: str) -> bool:
        """Create a folder."""
        full_path = self.project_root / folder_path
        full_path.mkdir(parents=True, exist_ok=True)
        return True

    def render_markdown(self, content: str) -> str:
        """Render markdown to HTML."""
        return markdown.markdown(
            content,
            extensions=["tables", "fenced_code", "codehilite", "toc"],
        )

    def read_ideas_template(self) -> Optional[str]:
        """Read the ideas-template.md file."""
        template_path = self.project_root / "ideas-template.md"
        if template_path.exists():
            return template_path.read_text()
        return None

    def create_ideas_file(self, content: str) -> bool:
        """Create ideas.md file."""
        return self.write_file("ideas.md", content)

    def get_ideas_content(self) -> Optional[str]:
        """Get ideas.md content if exists."""
        ideas_path = self.project_root / "ideas.md"
        if ideas_path.exists():
            return ideas_path.read_text()
        return None
