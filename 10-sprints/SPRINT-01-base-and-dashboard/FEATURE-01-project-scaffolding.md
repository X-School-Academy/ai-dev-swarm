# FEATURE-01-project-scaffolding

## Keywords
`scaffold-nextjs`, `scaffold-fastapi`, `dev-env-bootstrap`

## User Story
As a developer, I want the project structure set up so I can start building features.

## Related Documentation
- 00-init-ideas/tech-requirements.md
- 08-tech-specs/tech-specs-overview.md

## Acceptance Criteria
- [ ] Next.js app created in dev-swarm/js_scripts/webui.
- [ ] FastAPI app created in dev-swarm/py_scripts/webui.
- [ ] Frontend runs on port 3001 and backend runs on port 8001.
- [ ] Frontend-backend communication is allowed (proxy or CORS).
- [ ] pnpm is used for JS and uv is used for Python.

## Technical Implementation Notes
- Use a TypeScript Next.js scaffold with pnpm.
- Use a FastAPI scaffold with uv and uvicorn.
- Ensure repo .gitignore covers build artifacts and virtual environments.

## Developer Test Plan
- Start the frontend and backend dev servers and verify basic health pages load.
- Confirm the frontend can reach the backend without CORS errors.

## Dependencies
None

## Complexity Estimate
M

## Status Checklist
- [ ] Scaffolding complete
- [ ] Ports verified
- [ ] Dependencies installed
