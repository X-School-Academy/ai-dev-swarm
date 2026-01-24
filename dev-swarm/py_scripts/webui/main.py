from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from stage_service import list_stages

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
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
