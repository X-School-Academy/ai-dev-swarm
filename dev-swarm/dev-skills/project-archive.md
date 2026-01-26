Create a new agent skill under `dev-swarm/skills/` following
`dev-swarm/docs/agent-skill-specification.md`.

Skill name: `dev-swarm-project-archive` (use `dev-swarm-project-archive` in the frontmatter name).

## Purpose
Archive the current project so the repo is ready for a brand-new project start
from `ideas.md` or when the user explicitly asks to archive.

## Triggers
- User asks to archive the project
- User asks to start a new project from the current `ideas.md`

## Required behavior (skill instructions)
1. Determine the current project name:
   - Prefer the title in `{SRC}/README.md` if it exists.
   - Else use the title in `00-init-ideas/README.md` if it exists.
   - Else use the repo root `README.md` title.
   - If none exist, ask the user for a name.

2. Create a new archive folder under `99-archive/` using the project name.
   - If the folder already exists, append a `-YYYYMMDD` suffix to avoid collisions.

3. Move the current project artifacts into the archive folder using `git mv`:
   - All stage folders `00-*` through `10-*`
   - `features/`
   - `{SRC}/`
   - `ideas.md`
   - Leave `99-archive/` in place and do not touch unrelated files.

4. Recreate empty stage folders for a fresh project:
   - Create new `00-init-ideas/` through `11-deployment/`, `features/`, and `{SRC}/`.
   - Add a `.gitkeep` file in each new folder so git tracks them.

5. If the user wants to start a new project from `ideas.md`:
   - Ensure `ideas.md` remains at repo root.
   - Do not auto-generate new docs unless requested.

6. Ask the user for confirmation before committing, then:
   - `git add` changes
   - Commit message: `Archive project and reset structure`

## References
- `dev-swarm/docs/repository-structure.md`
- `dev-swarm/skills/dev-swarm-init-ideas/SKILL.md`
