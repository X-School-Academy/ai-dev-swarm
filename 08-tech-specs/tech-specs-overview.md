# Tech Specs Overview

## Scope

These specifications define how the Dev Swarm WebUI is implemented for the MVP. They cover backend APIs, frontend behavior, execution workflow, file access, streaming output, and operational safeguards.

## In Scope

- Stage state derivation from the file system
- Deterministic stage workflow execution (proposal then files)
- Document viewing and editing for markdown and HTML
- Real-time output streaming for agent runs
- Run interruption and safe recovery
- Project sync behavior and conflict handling

## Out of Scope

- Multi-user collaboration
- Remote hosting or cloud deployment
- Mobile-first UX
- Additional AI agents beyond the initial configured one

## Core Components

- Frontend web UI (Next.js)
- Backend API service (Python)
- Local file system access scoped to project root
- Agent execution runner with streaming output

## Interfaces

- REST endpoints for stage state, documents, sync, and run control
- SSE stream for run output

## Constraints

- All file operations are restricted to the project root
- Non-skippable stages: 00, 05, 08, 10
- UI is desktop-focused with responsive behavior from 1280px to 2560px

## Success Criteria

- Stage state is accurate after every sync
- Run output appears in the UI within 500ms
- Runs can be safely stopped without leaving orphaned processes
- UI behavior matches PRD acceptance criteria
