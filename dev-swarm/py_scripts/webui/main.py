from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from skip_service import toggle_skip
from stage_service import list_stages

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
    return list_stages(run_active=False)


class SkipRequest(BaseModel):
    skip: bool | None = None


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
