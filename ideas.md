# Ideas

> **Instructions**: Copy this template to `ideas.md` and customize based on your project needs.
> Check/uncheck stages based on project size and your preferences.

---


## Project Overview

**Project Name**: Dev Swarm WebUI

---

## Project Repository Setup

Select ONE option:

- [x] Use dev-swarm root project
- [ ] Create new GitHub remote repo for root of source code (recommended for production projects)
- [ ] Create local git repo for root of source code (for small experiments/prototypes)

## Source Code Location

- `dev-swarm/js_scripts/webui/`
- `dev-swarm/py_scripts/webui/`

---

## Development Stages

Uncheck the stages you want to exclude:

### Discovery & Planning
- **00-init-ideas** - Transform raw ideas into structured business requirements
- [ ] **01-market-research** - Competitive analysis and market validation
- [x] **02-personas** - User personas, stories, and journey maps

### Product Definition
- [x] **03-mvp** - Define MVP scope and prioritize features
- [x] **04-tech-research** - Research and evaluate technical solutions and libraries
- **05-prd** - Product Requirements Document with acceptance criteria

### Design
- [x] **06-ux** - UI/UX design, wireframes, and design system

### Technical Planning
- [ ] **07-architecture** - System architecture, tech stack, database schema
- **08-tech-specs** - Technical specifications, API design, migrations

### Implementation
- [ ] **09-devops** - CI/CD, containerization, cloud infrastructure
- **10-sprints** - Agile sprints, backlog implementation, testing

### Release
- [ ] **11-deployment** - Production deployment, monitoring, launch

**00-init-ideas, 05-prd, 08-tech-specs, and 10-sprints are non-skippable stages**
---

## Problem Statement

<!-- Describe the problem you want to solve -->

This project is using a terminal console-based AI agent with agent skills and slash commands `.claude/commands`, which is not user-friendly for non-technical users.
Some AI agents cannot follow the AI agent skills well.

---

## Your Solution

<!-- Describe your solution ideas, features, and notes below -->

1. Create a web UI for non-technical users to use
2. Use code to control the logic and workflow instead of depending on AI agent skills

workflow:

start with `ideas.md` by `ideas-template.md`, then slash command `ideas-refine`

Instead of using prompts and AI agents to create and check the SKIP.md file for each step, we use HTML forms and code to create the SKIP.md file and check if the steps are skipped

We can create and remove SKIP.md files for each step from the web UI at any time

For stages 00, 01, 02, 03, 05, 07, 08, we have two steps:
step1: Create stage proposal by creating README.md file
step2: Create stage files if proposal is approved by user

For stage 04, we have at least two steps if not skipped:
step1: Create stage proposal by creating README.md file
step1-n: Execute each research topic

For stage 06, we have at least three steps if not skipped:
step1: Create stage proposal by creating README.md file
step2: Create stage files if proposal is approved by user
step3: Create UI mockup if needed

For stages 09 and 10, we have 3 steps if not skipped:
step1: Create stage proposal by creating README.md file
step2: Create stage files if proposal is approved by user
step3: Execute the stage files (local install or remote setup, etc.)

For the 10-sprints stage:
Design a web UI to simulate backlog and sprint commands (dev, review, test should use code to control the workflow, not rely on AI)

Use cases:
- User can finish a backlog (including dev, review and test) by one click or by 3 clicks to do dev, review and test for the backlog
- User can finish a sprint (run the sprint's backlogs automatically one by one including dev, review and test)
- User can finish all the sprints (run all sprint backlogs automatically one by one including dev, review and test) 

For stage 99, we have only 1 step - archive the project
For stage restore command, we have only 1 step - restore one archived project

For each step, we use AI agent's headless mode to create the content/files or execute the plan with Python code
In the Python code, we should have a config file for the AI prompts used for each step which needs to be extracted from the agent skill file
After each step, we commit the code to git using AI agent's headless mode with the git commit message skill via Python code
For any AI agent's headless mode execution, the UI should stream the output in real time and can interrupt the process at any time from the web UI

For web UI, only consider desktop computer layout
For any markdown document, users can edit and view from the web UI
---

## Additional Notes

<!-- Any constraints, preferences, or technology choices (language, frameworks, packages) -->

- `dev-swarm/js_scripts/webui/`
  * Frontend using Next.js, frontend project root `dev-swarm/js_scripts/webui/`
  * Using pnpm and `dev-swarm/js_scripts/` as the pnpm project's root 
- `dev-swarm/py_scripts/webui/`
  * Backend using Python, `dev-swarm/py_scripts/webui/` as backend server's project root
  * Using uv as package manager, `dev-swarm/py_scripts/` as uv project's Python venv's root

