from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .stage_service import PROJECT_ROOT, STAGES, find_stage

ALLOWED_EXTENSIONS = {".md", ".html"}


@dataclass(frozen=True)
class DocumentPayload:
    path: str
    content: str
    content_type: str
    last_modified: str

    def to_dict(self) -> dict[str, Any]:
        return {
            "path": self.path,
            "content": self.content,
            "contentType": self.content_type,
            "lastModified": self.last_modified,
        }


def list_stage_documents(stage_id: str) -> list[str]:
    stage = find_stage(stage_id)
    stage_path = PROJECT_ROOT / stage.directory
    if not stage_path.exists():
        raise FileNotFoundError("Stage directory not found")

    docs: list[str] = []
    for path in stage_path.rglob("*"):
        if path.is_file() and path.suffix.lower() in ALLOWED_EXTENSIONS:
            docs.append(path.relative_to(PROJECT_ROOT).as_posix())
    return sorted(docs)


def read_document(path: str) -> DocumentPayload:
    resolved = _resolve_document_path(path)
    if not resolved.exists():
        raise FileNotFoundError("Document not found")
    if resolved.suffix.lower() not in ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported document type")

    content = resolved.read_text()
    return DocumentPayload(
        path=resolved.relative_to(PROJECT_ROOT).as_posix(),
        content=content,
        content_type=_content_type_for(resolved),
        last_modified=_iso_timestamp(resolved),
    )


def write_document(path: str, content: str) -> DocumentPayload:
    resolved = _resolve_document_path(path)
    if resolved.suffix.lower() not in ALLOWED_EXTENSIONS:
        raise ValueError("Unsupported document type")

    _ensure_write_scope(resolved)
    resolved.parent.mkdir(parents=True, exist_ok=True)
    resolved.write_text(content)
    return DocumentPayload(
        path=resolved.relative_to(PROJECT_ROOT).as_posix(),
        content=content,
        content_type=_content_type_for(resolved),
        last_modified=_iso_timestamp(resolved),
    )


def _resolve_document_path(path: str) -> Path:
    if not path or path.strip() == "":
        raise ValueError("Path is required")

    candidate = Path(path)
    if candidate.is_absolute():
        raise ValueError("Absolute paths are not allowed")
    if ".." in candidate.parts:
        raise ValueError("Path traversal is not allowed")

    resolved = (PROJECT_ROOT / candidate).resolve()
    if PROJECT_ROOT not in resolved.parents and resolved != PROJECT_ROOT:
        raise PermissionError("Path is outside project root")
    return resolved


def _ensure_write_scope(path: Path) -> None:
    relative = path.relative_to(PROJECT_ROOT)
    if not relative.parts:
        raise PermissionError("Writes must target stage directories")

    allowed_dirs = {stage.directory for stage in STAGES}
    if relative.parts[0] not in allowed_dirs:
        raise PermissionError("Writes must target stage directories")


def _content_type_for(path: Path) -> str:
    return "text/html" if path.suffix.lower() == ".html" else "text/markdown"


def _iso_timestamp(path: Path) -> str:
    modified = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    return modified.isoformat()
