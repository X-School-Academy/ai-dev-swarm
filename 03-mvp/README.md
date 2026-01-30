# Stage 03 - MVP

## Stage Goal

This stage defines the Minimum Viable Product scope for Dev Swarm WebUI—the smallest feature set that validates the core hypothesis: non-technical users can operate dev-swarm through a web interface without CLI knowledge.

The MVP eliminates Critical pain points (CLI barrier, technical intimidation) and addresses High pain points (no visual feedback, no execution control) for primary personas (Sarah, Marcus).

## Stage Files

- `mvp-scope.md` - 8 in-scope features with acceptance criteria
- `out-of-scope.md` - 10 deferred features with rationale
- `success-criteria.md` - 14 measurable success criteria

## MVP Features Summary

**In Scope (8 features):**
1. Stage Dashboard - visual overview of all stages
2. Stage Skip Management - toggle skip via UI
3. Document Viewer - rendered markdown and HTML
4. Document Editor - edit with live preview
5. Stage Execution - one-click start
6. Real-Time Output - streaming AI output
7. Stop Execution - interrupt at any time
8. Project Sync - manual refresh

**Out of Scope (deferred):**
- Multi-agent support (Codex, Gemini CLI)
- Sprint automation (one-click backlog/sprint)
- Auto-commit after steps
- Error recovery guidance
- Mobile support

## Key Decisions

- **Claude Code only** for MVP - validate headless execution before adding agents
- **Manual sync** - user controls when UI updates
- **Implicit approval** - no explicit approval workflow in MVP

## Success Threshold

MVP succeeds if a non-technical user can complete ideas → stage execution without using the terminal.

## Next Stage

Stage 04 (Tech Research) - Research technical solutions for headless AI execution and real-time streaming
