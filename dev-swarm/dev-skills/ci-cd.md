# CI/CD Standard Process Specification

This document outlines the standard Continuous Integration (CI) and Continuous Deployment (CD) workflows to be implemented across the project lifecycle, specifically bridging Stage 8 (DevOps) and Stage 11 (Deployment).

## 1. Objectives
- Establish robust automated testing and quality checks (CI).
- Enable reliable, automated deployment pipelines (CD).
- Standardize workflows using GitHub Actions.
- Ensure seamless integration with `dev-swarm-devops` and `dev-swarm-deployment` skills.

## 2. Process Overview

The CI/CD process is divided into two distinct phases corresponding to the project development stages.

### Phase 1: Continuous Integration (Stage 08-DevOps)
**Focus:** Code Quality, Testing, Build Verification.

**Workflow in `dev-swarm-devops` skill:**
1.  **Requirement Gathering**:
    - In `08-devops/README.md`, explicitly add a selection for "GitHub Actions for Continuous Integration (CI)".
2.  **Design & Approval**:
    - If selected, create `08-devops/ci-pipeline.md` detailing the CI strategy.
    - **Key Components to Define:**
        - **Triggers:** Push to `main`/`master`, Pull Requests.
        - **Jobs:** Linting (code style), Unit Tests, Build verification, Static Analysis.
        - **Runner:** Ubuntu-latest (standard), MacOS/Windows (if platform-specific).
3.  **Implementation** (after user approval):
    - Generate workflow file: `{SRC}/.github/workflows/ci.yml` (should link {SRC}/ to github repo first before create ci.yaml).
    - Configure necessary secrets if external services are involved in testing.
4.  **Verification**:
    - Trigger a run by pushing a commit.
    - Verify all checks pass.

### Phase 2: Continuous Deployment (Stage 11-Deployment)
**Focus:** Automated Release, Environment Management, Deployment.

**Workflow in `dev-swarm-deployment` skill:**
1.  **Requirement Gathering**:
    - In `11-deployment/README.md`, explicitly add options for CD strategies (e.g., Release to GitHub, Deploy to Cloud, Publish Package).
2.  **Design & Approval**:
    - Create `11-deployment/cd-pipeline.md` detailing the CD strategy.
    - **Key Components to Define:**
        - **Triggers:** Tag creation (`v*`), Release publication, Manual workflow dispatch.
        - **Environments:** Staging, Production (with approval gates if needed).
        - **Actions:** Docker build/push, Cloud provider deployment (AWS/GCP/Azure), NPM/PyPI publishing depending project type and user cho.
3.  **Implementation** (after user approval):
    - Generate workflow files: `{SRC}/.github/workflows/cd.yml`.
    - Configure GitHub Repository Secrets (API Keys, Credentials).
    - Configure GitHub Environments for protection rules.


## 4. Tools & Technologies
- **Orchestration:** GitHub Actions (Primary).
- **Configuration:** YAML workflows in `{SRC}/.github/workflows/`.
- **Automation Support:**
    - **Playwright:** For browser-based configuration (creating secrets/environments if MCP tool is insufficient or not configured).
    - **GitHub MCP/AWS API MCP:** For programmatic repository management.
