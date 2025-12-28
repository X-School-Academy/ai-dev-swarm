---
description: Skip a development stage (1-10) by creating SKIP.md
argument-hint: [stage-number-or-name]
---

Create an empty `SKIP.md` file in the specified stage folder to mark it as skipped.

The argument can be:
- A number: 1, 2, 3, etc.
- A two-digit number: 01, 02, 03, etc.
- A folder name contains: market-research, personas, mvp, prd, ux, architecture, tech-specs, devops, sprints, deployment

Stage to folder mapping:
- 1 or 01 or market-research → 01-market-research/SKIP.md
- 2 or 02 or personas → 02-personas/SKIP.md
- 3 or 03 or mvp → 03-mvp/SKIP.md
- 4 or 04 or prd → 04-prd/SKIP.md
- 5 or 05 or ux → 05-ux/SKIP.md
- 6 or 06 or architecture → 06-architecture/SKIP.md
- 7 or 07 or tech-specs → 07-tech-specs/SKIP.md
- 8 or 08 or devops → 08-devops/SKIP.md
- 9 or 09 or sprints → 09-sprints/SKIP.md
- 10 or deployment → 10-deployment/SKIP.md

Requested stage: $ARGUMENTS

Please identify the correct stage folder and create an empty SKIP.md file in it using the Write tool.
