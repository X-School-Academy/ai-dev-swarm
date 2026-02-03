# CI Pipeline (Stage 08 - DevOps)

Use this reference when the user selects GitHub Actions for CI in `08-devops/README.md`.

## Scope
- Continuous Integration only (quality checks, tests, build verification).
- Implemented during Stage 08 (DevOps).

## Plan Requirements (ci-pipeline.md)
- **Triggers**: Push to `main`/`master`, Pull Requests.
- **Jobs**:
  - Linting (code style)
  - Unit tests
  - Build verification
  - Static analysis (if relevant to the stack)
- **Runner**: `ubuntu-latest` by default; add macOS/Windows only if required by the stack.
- **Workflow location**: `src/.github/workflows/ci.yml`.
  - If `src/` is a submodule, ensure it is linked to the GitHub repo before creating the workflow.
- **Secrets**: Document any required CI secrets (only if external services are used in tests).

## Verification (when executing)
- Trigger a workflow run by pushing a commit.
- Confirm all checks pass.
