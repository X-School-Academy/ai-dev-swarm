---
description: Start a development stage (0-99)
argument-hint: [stage-number-or-name]
---

Start the development stage based on the argument provided.

The argument can be:
- A number: 0, 1, 2, etc.
- A two-digit number: 00, 01, 02, etc.
- A folder name contains: init-ideas, market-research, archive, etc.
- "restore {archive-folder-name}" to restore a project from 99-archive
- "restore git {repo-url} [ref]" to restore a project from a remote git repo
- "restore local {path}" to restore a project from a non-archived local codebase

Stage mapping:
- 0 or 00 or init-ideas → Use agent skill `dev-swarm-stage-init-ideas`
- 1 or 01 or market-research → Use agent skill `dev-swarm-stage-market-research`
- 2 or 02 or personas → Use agent skill `dev-swarm-stage-personas`
- 3 or 03 or mvp → Use agent skill `dev-swarm-stage-mvp`
- 4 or 04 or tech-research → Use agent skill `dev-swarm-stage-tech-research`
- 5 or 05 or prd → Use agent skill `dev-swarm-stage-prd`
- 6 or 06 or ux → Use agent skill `dev-swarm-stage-ux`
- 7 or 07 or architecture → Use agent skill `dev-swarm-stage-architecture`
- 8 or 08 or tech-specs → Use agent skill `dev-swarm-stage-tech-specs`
- 9 or 09 or devops → Use agent skill `dev-swarm-stage-devops`
- 10 or sprints → Use agent skill `dev-swarm-stage-sprints`
- 11 or deployment → Use agent skill `dev-swarm-stage-deployment`
- 99 or archive → Use agent skill `dev-swarm-stage-archive`
- restore {archive-folder-name} → Use agent skill `dev-swarm-project-restore` (match {archive-folder-name} under `99-archive/`)
- restore git {repo-url} [ref] → Use agent skill `dev-swarm-project-restore`
- restore local {path} → Use agent skill `dev-swarm-project-restore`

Requested stage: $ARGUMENTS

Please identify the stage and invoke the corresponding skill.
