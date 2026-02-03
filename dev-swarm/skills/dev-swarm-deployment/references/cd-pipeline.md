# CD Pipeline (Stage 10 - Deployment)

Use this reference when defining `10-deployment/cd-pipeline.md`.

## Scope
- Continuous Deployment only (release automation, environment promotion).
- Implemented during Stage 10 (Deployment).

## Plan Requirements (cd-pipeline.md)
- **Triggers**:
  - Tag creation: `v*`
  - Release publication
  - Manual workflow dispatch
- **Environments**:
  - Staging and Production
  - Use approval gates for Production if required
- **Actions** (choose based on project type):
  - Docker build/push
  - Cloud deployment (AWS/GCP/Azure)
  - Package publishing (npm/PyPI)
- **Workflow location**: `src/.github/workflows/cd.yml`.
- **Secrets**:
  - Document required GitHub Secrets (API keys, credentials)
  - Document GitHub Environments and protection rules

## Verification (when executing)
- Run a tagged release or manual dispatch.
- Confirm deployments and checks succeed in Staging, then Production.
