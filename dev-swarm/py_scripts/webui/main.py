"""Main entry point for WebUI server."""

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import get_settings
from .routers import (
    stages_router,
    files_router,
    agents_router,
    ideas_router,
    sprints_router,
    git_router,
)


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""
    settings = get_settings()

    app = FastAPI(
        title="AI Dev Swarm WebUI",
        description="WebUI server for AI-driven software development workflow",
        version="0.1.0",
    )

    # Configure CORS for Next.js frontend
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3001",
            "http://127.0.0.1:3001",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routers
    app.include_router(stages_router)
    app.include_router(files_router)
    app.include_router(agents_router)
    app.include_router(ideas_router)
    app.include_router(sprints_router)
    app.include_router(git_router)

    @app.get("/")
    async def root():
        return {
            "name": "AI Dev Swarm WebUI",
            "version": "0.1.0",
            "project_root": str(settings.project_root),
        }

    @app.get("/health")
    async def health():
        return {"status": "healthy"}

    return app


app = create_app()


def main():
    """Run the server."""
    settings = get_settings()
    uvicorn.run(
        "webui.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )


if __name__ == "__main__":
    main()
