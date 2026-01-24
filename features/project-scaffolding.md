# Feature: project-scaffolding

## What
Set up the initial frontend and backend project scaffolding for Dev Swarm WebUI so the team can start implementing stage and document workflows.

## Why
A consistent, working base (Next.js + FastAPI) is required before any UI, API, or execution features can be built or tested.

## Scope
- Scaffold Next.js TypeScript app under dev-swarm/js_scripts/webui.
- Scaffold FastAPI app under dev-swarm/py_scripts/webui.
- Ensure local dev ports: 3001 (frontend) and 8001 (backend).
- Enable frontend-backend communication via proxy or CORS.
- Use pnpm for frontend and uv for backend.

## Non-Goals
- No UI features beyond a default landing page.
- No production deployment configuration.
- No AI agent execution logic in this feature.

## Acceptance Criteria
- Next.js app runs on port 3001.
- FastAPI app runs on port 8001.
- Frontend can reach backend without CORS errors.
- pnpm and uv are the package managers used.
