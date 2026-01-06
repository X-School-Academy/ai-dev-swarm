# 10-deployment deliverables

Only present files that are suitable for the project's type and level; omit the rest.

## Deliverable list

- deployment.md: Deployment plan for L2 projects.
- deployment-info.md: Deployment plan for independently runnable packages/MCP servers.
- infrastructure-plan.md: Cloud infrastructure and setup plan.
- cd-pipeline.md: Continuous delivery pipeline plan.
- deployment-strategy.md: Deployment strategy and rollout plan.
- monitoring-logging.md: Monitoring, logging, and alerting plan.
- environment-config.md: Environment configuration and secrets plan.

## File content guidance

### README.md

- Owner: Deployment Engineer
- Attendances: Cloud Infrastructure Architect, DevOps Engineer, SRE
- Overview of deployment stage
- Links to all deployment documentation files
- Current deployment status (updated after execution)
- Quick links to deployed environments

### deployment.md (Deployment Plan - for L2 Projects)

Write as a deployment plan with:
- Target location: `dev-swarm/py_scripts`, `dev-swarm/js_scripts`, or `dev-swarm/skills`
- Files to deploy
- Dependencies to package/install
- Configuration changes needed for target
- Step-by-step deployment instructions

### deployment-info.md (Deployment Plan - for Independently Runnable Packages/MCP Servers)

Write as a deployment plan with:
- Project type (package or MCP server)
- Publishing strategy (GitHub release with version)
- Installation commands for end users:
  - Node.js:
    - `pnpm dlx github:username/repo-name#v1.0.0 [command] [options]`
    - `npx github:username/repo-name@latest [command] [options]`
  - Python:
    - `uvx --from 'git+https://github.com/username/repo-name.git@v1.0.0' package-name [command] [options]`
- User documentation update:
  - Update `src/README.md` with no-install usage
  - Include usage examples and command-line options
  - Document available commands and purposes
- Publishing steps:
  - Ask for explicit user approval before publishing or creating releases
  - Push code to GitHub remote
  - Use playwright-browser-* agent skills to open GitHub website
  - Create a release with a version number (e.g., v1.0.0)
  - Verify installation works from GitHub release
- Version management for releases
- Clear step-by-step instructions

After user approves this plan, the `10-deployment/README.md` should reference this file to keep it clean and organized.

### infrastructure-plan.md (Deployment Plan)

Write as a deployment plan with:
- Proposed cloud provider and services
- Infrastructure architecture diagram (text description)
- Resource specs (compute, memory, storage)
- Network configuration (VPC, subnets, security groups)
- Database configuration and backup strategy
- Storage and CDN setup
- Domain name and DNS configuration
- SSL/TLS certificate setup
- Cost estimation
- Infrastructure as code approach (Terraform, CloudFormation, etc.)
- Security considerations (IAM roles, secrets management)
- Step-by-step setup instructions

### cd-pipeline.md (Deployment Plan)

Write as a deployment plan with:
- CD platform (GitHub Actions, GitLab CI, etc.)
- Pipeline workflow diagram (text description)
- Build process steps
- Testing stages (unit, integration, e2e)
- Deployment stages (dev, staging, production)
- Approval gates and manual intervention points
- Environment variables and secrets management
- Deployment triggers (push, PR, manual, scheduled)
- Rollback procedures
- Pipeline configuration files to create
- Step-by-step setup instructions

Use `references/cd-pipeline.md` for CD-specific requirements and triggers.

### deployment-strategy.md (Deployment Plan)

Write as a deployment plan with:
- Deployment approach (blue-green, canary, rolling, recreate)
- Zero-downtime deployment plan
- Database migration strategy
- Feature flags configuration (if applicable)
- Deployment checklist
- Pre-deployment steps
- Post-deployment verification steps
- Rollback plan and criteria
- Disaster recovery procedures
- Maintenance window planning
- Step-by-step deployment instructions

### monitoring-logging.md (Deployment Plan)

Write as a deployment plan with:
- Monitoring tools (CloudWatch, Datadog, New Relic, etc.)
- Logging solution (CloudWatch Logs, ELK Stack, etc.)
- Error tracking (Sentry, Rollbar, etc.)
- Uptime monitoring (Pingdom, UptimeRobot, etc.)
- Performance metrics to track
- Alerting rules and thresholds
- Alert notification channels
- Dashboard configuration
- Log retention policies
- Step-by-step setup instructions

### environment-config.md (Deployment Plan)

Write as a deployment plan with:
- Environment variables for each environment
- Secrets management strategy (AWS Secrets Manager, Vault, etc.)
- Configuration differences between environments
- API endpoints and service URLs
- Database connection strings (template)
- Third-party service credentials (template)
- Feature flags per environment
- Step-by-step configuration instructions
