from __future__ import annotations

import asyncio
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone
from threading import Event, Lock, Thread
from typing import Any, Dict, Optional

from ai_adapters import get_ai_adapter


@dataclass
class RunRecord:
    run_id: str
    stage_id: str
    status: str
    started_at: str
    ended_at: Optional[str] = None
    exit_code: Optional[int] = None
    stdout: list[str] = field(default_factory=list)
    stderr: list[str] = field(default_factory=list)
    events: list[Dict[str, Any]] = field(default_factory=list)
    stop_event: Event = field(default_factory=Event)

    def to_dict(self) -> Dict[str, Any]:
        return {
            "runId": self.run_id,
            "stageId": self.stage_id,
            "status": self.status,
            "startedAt": self.started_at,
            "endedAt": self.ended_at,
            "exitCode": self.exit_code,
        }


_runs: Dict[str, RunRecord] = {}
_active_run_id: Optional[str] = None
_lock = Lock()


def start_run(stage_id: str) -> RunRecord:
    with _lock:
        if _active_run_id is not None and _runs[_active_run_id].status in {
            "queued",
            "running",
        }:
            raise RuntimeError("Run already active")

        run_id = str(uuid.uuid4())
        record = RunRecord(
            run_id=run_id,
            stage_id=stage_id,
            status="queued",
            started_at=_iso_now(),
        )
        _append_event(record, "system", "Run queued")
        _append_event(record, "status", record.status)
        _runs[run_id] = record
        _set_active_run(run_id)

    Thread(target=_run_worker, args=(run_id,), daemon=True).start()
    return record


def get_run(run_id: str) -> RunRecord:
    with _lock:
        if run_id not in _runs:
            raise KeyError("Run not found")
        return _runs[run_id]


def has_active_run() -> bool:
    with _lock:
        if _active_run_id is None:
            return False
        return _runs[_active_run_id].status in {"queued", "running"}


def stop_active_run(stage_id: str) -> RunRecord:
    with _lock:
        if _active_run_id is None:
            raise RuntimeError("No active run")
        record = _runs[_active_run_id]
        if record.stage_id != stage_id:
            raise RuntimeError("Active run does not match stage")
        if record.status not in {"queued", "running"}:
            raise RuntimeError("Run is not active")
        record.status = "stopping"
        _append_event(record, "system", "Stop requested")
        _append_event(record, "status", record.status)
        record.stop_event.set()
    return record


def _run_worker(run_id: str) -> None:
    with _lock:
        record = _runs[run_id]
        record.status = "running"
        _append_event(record, "system", "Run started")
        _append_event(record, "status", record.status)

    async def _consume_output() -> None:
        adapter = get_ai_adapter()
        async for line in adapter.execute_command(
            command=f"run_stage_{record.stage_id}",
            context={"stageId": record.stage_id},
        ):
            if record.stop_event.is_set():
                break
            with _lock:
                record.stdout.append(line)
                _append_event(record, "output", line.rstrip("\n"))

    try:
        asyncio.run(_consume_output())
        with _lock:
            if record.stop_event.is_set():
                record.status = "stopped"
                record.exit_code = 130
            else:
                record.status = "succeeded"
                record.exit_code = 0
            _append_event(record, "status", record.status)
    except Exception as exc:  # noqa: BLE001 - surface run errors in stderr
        with _lock:
            record.status = "failed"
            record.exit_code = 1
            record.stderr.append(str(exc))
            _append_event(record, "error", str(exc))
            _append_event(record, "status", record.status)
    finally:
        with _lock:
            record.ended_at = _iso_now()
            _append_event(record, "system", "Run finished")
            if _active_run_id == run_id:
                _set_active_run(None)


def _set_active_run(run_id: Optional[str]) -> None:
    global _active_run_id
    _active_run_id = run_id


def get_event_snapshot(run_id: str) -> list[Dict[str, Any]]:
    with _lock:
        if run_id not in _runs:
            raise KeyError("Run not found")
        return list(_runs[run_id].events)


def is_run_finished(run_id: str) -> bool:
    with _lock:
        if run_id not in _runs:
            raise KeyError("Run not found")
        return _runs[run_id].ended_at is not None


def _append_event(record: RunRecord, category: str, message: str) -> None:
    record.events.append(
        {
            "timestamp": _iso_now(),
            "category": category,
            "message": message,
        }
    )


def _iso_now() -> str:
    return datetime.now(timezone.utc).isoformat()
