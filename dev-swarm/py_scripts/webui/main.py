from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from env_loader import load_env
from document_service import list_stage_documents, read_document, write_document
from run_service import get_run, has_active_run, start_run
from skip_service import toggle_skip
from stage_service import list_stages

load_env()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict:
    return {"status": "ok"}


@app.get("/api/stages")
def get_stages() -> list[dict]:
    return list_stages(run_active=has_active_run())


class SkipRequest(BaseModel):
    skip: bool | None = None


class DocumentWriteRequest(BaseModel):
    path: str
    content: str


@app.post("/api/stages/{stage_id}/skip")
def set_stage_skip(stage_id: str, payload: SkipRequest) -> dict:
    try:
        return toggle_skip(stage_id, payload.skip)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.get("/api/stages/{stage_id}/documents")
def get_stage_documents(stage_id: str) -> list[str]:
    try:
        return list_stage_documents(stage_id)
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc


@app.get("/api/documents")
def get_document(path: str) -> dict:
    try:
        return read_document(path).to_dict()
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.put("/api/documents")
def put_document(payload: DocumentWriteRequest) -> dict:
    if has_active_run():
        raise HTTPException(status_code=409, detail="Writes blocked during active run")
    try:
        return write_document(payload.path, payload.content).to_dict()
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
    except PermissionError as exc:
        raise HTTPException(status_code=403, detail=str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/api/stages/{stage_id}/run")
def start_stage_run(stage_id: str) -> dict:
    try:
        record = start_run(stage_id)
        return record.to_dict()
    except RuntimeError as exc:
        raise HTTPException(status_code=409, detail=str(exc)) from exc


@app.get("/api/runs/{run_id}")
def get_run_status(run_id: str) -> dict:
    try:
        return get_run(run_id).to_dict()
    except KeyError as exc:
        raise HTTPException(status_code=404, detail=str(exc)) from exc
