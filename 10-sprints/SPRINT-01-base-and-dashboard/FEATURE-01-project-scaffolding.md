# FEATURE-01-project-scaffolding

## Keywords
`project-scaffold`, `nextjs-setup`, `fastapi-setup`

## User Story
As a developer, I want the project structure set up so I can start building features.

## Related Documentation
- `README.md`
- `08-tech-specs/tech-specs-overview.md`

## Acceptance Criteria
- [ ] Next.js (TypeScript) project created in `dev-swarm/js_scripts/webui/`.
- [ ] FastAPI project created in `dev-swarm/py_scripts/webui/`.
- [ ] Frontend running on port 3001.
- [ ] Backend running on port 8001.
- [ ] Proxy or CORS configured for frontend-backend communication.
- [ ] `pnpm` used for JS and `uv` used for Python.

## Technical Implementation Notes
- Use `npx create-next-app@latest` for frontend.
- Use `uv init` and `pip install fastapi uvicorn` for backend.
- Ensure project root `.gitignore` covers new build artifacts.

## Developer Test Plan
- Run `pnpm dev` in `js_scripts/webui/` and check `localhost:3001`.
- Run `uvicorn main:app` in `py_scripts/webui/` and check `localhost:8001/docs`.

## Dependencies
None

## Complexity Estimate
M

## Status Checklist
- [ ] Scaffolding complete
- [ ] Ports verified
- [ ] Dependencies installed
