# 08-devops deliverables

Only present files that are suitable for the project's type and level; omit the rest.

## Deliverable list

- github-setup.md or github-repo.md: GitHub repo setup plan.
- mcp-setup.md: MCP tool installation and configuration plan.
- ci-pipeline.md: CI pipeline plan (if CI is selected).
- development-environment.md: Local dev environment setup (L2 projects).
- vscode-devcontainer.md: Dev container setup plan.

## File content guidance

### github-setup.md or github-repo.md (Setup Plan)

Write as a setup plan with:
- Git repository approach selected by user:
  - No Git repo: document decision and skip git setup
  - Using dev-swarm repo: use current repo without changes
  - Create a new GitHub repo (default):
    - Ask for user approval before opening the browser or creating the repo
    - Use playwright-browser-* agent skills to help create the repo
    - Add the remote repo to `src/` as the project source
    - Add `src/` as a git submodule to the root project
    - Record repository information in `08-devops/github-repo.md`
  - If user provides a remote repo URL: add it as a git submodule at `src/` (no separate clone)
- Proposed GitHub repository settings
- Branch protection rules to be configured
- PR template to be created
- GitHub Actions workflows (if applicable)
- Issue templates (if needed)
- Repository permissions plan
- Clear step-by-step setup instructions

### mcp-setup.md (Setup Plan)

Write as a setup plan with:
- List of MCP tools to be installed/configured
- Installation steps for each MCP tool
- Configuration details (file locations, settings)
- Required environment variables and credentials
- Permission requirements
- Test commands to verify each tool
- Clear step-by-step setup instructions

### ci-pipeline.md (Setup Plan - if CI selected)

Write the CI plan using `references/ci-pipeline.md`.

### development-environment.md (Setup Plan - for L2 Projects)

Write as a setup plan with:
- Python projects:
  - Setup using `uv` package manager (default)
  - Create virtual environment (`uv init`)
  - Install dependencies (`uv add package`)
  - Activation command
- Node.js projects:
  - Setup using `pnpm` (default)
  - `pnpm install`
- Final environment setup information should be integrated into the `src/` directory

### vscode-devcontainer.md (Setup Plan)

Write as a setup plan with:
- Dev container configuration to be created
- Dockerfile contents
- docker-compose.yml contents (if needed)
- VS Code extensions to install
- Environment variables to set
- Port forwarding configuration
- Volume mounts specification
- Post-create commands
- Clear step-by-step setup instructions
