---
name: ai-builder-deployment
description: Deploy application to staging/production environments, setup CI/CD pipelines, manage cloud infrastructure, and configure monitoring. Use when user asks to deploy application, setup production environment, or configure automated deployment.
---

# AI Builder - Deployment

This skill handles the deployment of applications to various environments (staging, production), sets up CI/CD pipelines, manages cloud infrastructure, and configures monitoring and logging systems.

## When to Use This Skill

- User asks to deploy the application
- User wants to setup production or staging environment
- User needs CI/CD pipeline configuration
- User wants to configure cloud infrastructure (AWS, Azure, GCP, etc.)
- User needs to setup monitoring, logging, or alerting
- User wants to configure domain names and SSL certificates
- When application is ready for production deployment
- When `09-sprints/` development is complete and ready for release

## Your Roles in This Skill

- **Deployment Engineer**: Execute and manage application deployments to various environments. Identify the best deployment strategy (blue-green, canary, rolling updates) based on project requirements and ensure zero-downtime deployments.
- **Cloud Infrastructure Architect**: Design and implement scalable, cost-effective cloud infrastructure solutions. Make decisions on cloud provider selection, infrastructure as code approach, and resource optimization.
- **DevOps Engineer**: Setup and maintain CI/CD pipelines for automated testing and deployment. Ensure proper integration between development, testing, and production environments.
- **SysOps Engineer**: Provision and manage cloud resources (compute, storage, networking). Configure web servers, load balancers, and security groups. Implement system-wide logging, monitoring, and alerting. Manage infrastructure security and scaling strategies. Ensure high availability and disaster recovery. Optimize cloud costs and resource utilization.
- **Site Reliability Engineer (SRE)**: Implement monitoring, logging, and alerting systems. Ensure application reliability, performance, and quick incident response. Define and track SLIs, SLOs, and error budgets. Implement automated remediation and incident response procedures.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Deployment Engineer, I will assess current application state and deployment requirements
- As a Cloud Infrastructure Architect, I will design cloud infrastructure plan with resource specifications and cost estimates
- As a DevOps Engineer, I will create CI/CD pipeline configuration for automated testing and deployment
- As a SysOps Engineer, I will provision cloud resources and configure networking, security groups, and load balancers
- As a Site Reliability Engineer, I will setup monitoring, logging, and alerting systems with dashboards
- As a Deployment Engineer, I will ask user to confirm deployment plans and cost implications before executing infrastructure setup
- As a Deployment Engineer, I will ask user to confirm production deployment approval before deploying to production environment

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 1: Assess Current State

1. **Check if `10-deployment/` folder exists:**
   - If exists: Read all existing files to understand current deployment state
   - If NOT exists: Will create new structure

2. **Check application readiness:**
   - Verify build process works (`npm run build`, `docker build`, etc.)
   - Check if tests pass
   - Review tech specs from `07-tech-specs/` for deployment requirements
   - Check if application has production configuration files

3. **Check existing cloud infrastructure:**
   - Look for existing cloud configurations (AWS, Azure, GCP credentials)
   - Check for infrastructure as code files (Terraform, CloudFormation, etc.)
   - Review existing deployment scripts or CI/CD configurations

4. **Check existing CI/CD setup:**
   - Look for `.github/workflows/` (GitHub Actions)
   - Check for other CI/CD configurations (Jenkins, GitLab CI, CircleCI, etc.)
   - Review existing deployment automation

5. Proceed to Step 2 with gathered context

### Step 2: Analyze Deployment Requirements

Based on the tech stack (from `07-tech-specs/`) and project requirements:

1. Determine deployment needs:
   - **Hosting Platform**: Static hosting (Netlify, Vercel), PaaS (Heroku, Railway), IaaS (AWS EC2, Azure VMs), Container (ECS, Kubernetes), Serverless (Lambda, Cloud Functions)
   - **Database Hosting**: Managed database service vs self-hosted
   - **Storage**: Object storage (S3, Azure Blob), CDN requirements
   - **Compute**: Serverless, containers, or VMs
   - **Environments**: Development, staging, production (number of environments needed)

2. Identify complexity level:
   - **Basic**: Simple static sites or single PaaS deployment
   - **Standard**: Multi-environment setup with managed services, basic CI/CD
   - **Complex**: Multi-region deployment, microservices, advanced CI/CD, infrastructure as code, auto-scaling

3. Determine CI/CD requirements:
   - Automated testing before deployment
   - Deployment approval process
   - Rollback strategy
   - Deployment frequency and schedule

4. Identify monitoring and observability needs:
   - Application performance monitoring (APM)
   - Error tracking and logging
   - Uptime monitoring
   - Alerting channels (email, Slack, PagerDuty)
   - Analytics and metrics

### Step 3: Create Deployment Plan Files

**IMPORTANT**: These files serve dual purposes:
1. **Initially**: Deployment plans/instructions for user approval
2. **Finally**: Documentation of the actual deployment setup (source of truth for future updates)

1. **Create folder structure:**
   ```
   10-deployment/
   ├── README.md
   ├── infrastructure-plan.md
   ├── cicd-pipeline.md
   ├── deployment-strategy.md
   ├── monitoring-logging.md
   └── environment-config.md
   ```

2. **Create deployment plan files with proposed configurations:**

**10-deployment/README.md:**
- Specify the owner: Deployment Engineer
- Specify attendances: Cloud Infrastructure Architect, DevOps Engineer, Site Reliability Engineer (SRE)
- Overview of deployment stage
- Links to all deployment documentation files
- Current deployment status (will be updated after execution)
- Quick links to deployed environments

**infrastructure-plan.md (Deployment Plan):**
Write as a deployment plan with:
- Proposed cloud provider and services to use
- Infrastructure architecture diagram (text description)
- Resource specifications (compute, memory, storage)
- Network configuration (VPC, subnets, security groups)
- Database configuration and backup strategy
- Storage and CDN setup
- Domain name and DNS configuration
- SSL/TLS certificate setup
- Cost estimation
- Infrastructure as code approach (Terraform, CloudFormation, etc.)
- Clear step-by-step setup instructions
- Security considerations (IAM roles, secrets management)

**cicd-pipeline.md (Deployment Plan):**
Write as a deployment plan with:
- CI/CD platform to use (GitHub Actions, GitLab CI, etc.)
- Pipeline workflow diagram (text description)
- Build process steps
- Testing stages (unit, integration, e2e)
- Deployment stages (dev, staging, production)
- Approval gates and manual intervention points
- Environment variables and secrets management
- Deployment triggers (push, PR, manual, scheduled)
- Rollback procedures
- Pipeline configuration files to create
- Clear step-by-step setup instructions

**deployment-strategy.md (Deployment Plan):**
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
- Clear step-by-step deployment instructions

**monitoring-logging.md (Deployment Plan):**
Write as a deployment plan with:
- Monitoring tools to use (CloudWatch, Datadog, New Relic, etc.)
- Logging solution (CloudWatch Logs, ELK Stack, etc.)
- Error tracking (Sentry, Rollbar, etc.)
- Uptime monitoring (Pingdom, UptimeRobot, etc.)
- Performance metrics to track
- Alerting rules and thresholds
- Alert notification channels
- Dashboard configuration
- Log retention policies
- Clear step-by-step setup instructions

**environment-config.md (Deployment Plan):**
Write as a deployment plan with:
- Environment variables for each environment
- Secrets management strategy (AWS Secrets Manager, Vault, etc.)
- Configuration differences between environments
- API endpoints and service URLs
- Database connection strings (template)
- Third-party service credentials (template)
- Feature flags per environment
- Clear step-by-step configuration instructions

### Step 4: Get User Confirmation

1. Present all deployment plan files to the user
2. Explain what will be deployed and configured
3. Highlight cost implications if applicable
4. Ask user to review and confirm before proceeding
5. Make any adjustments based on user feedback
6. **DO NOT PROCEED** until user explicitly confirms

### Step 5: Execute Infrastructure Setup

**ONLY AFTER USER CONFIRMATION**, execute each setup:

1. **Execute Infrastructure Setup:**
   - Follow steps in `infrastructure-plan.md`
   - Create cloud accounts if needed (guide user)
   - Setup infrastructure as code (Terraform, CloudFormation, etc.)
   - Create and configure cloud resources
   - Setup VPC, subnets, security groups
   - Provision compute resources (servers, containers, serverless)
   - Setup databases and configure backups
   - Configure storage and CDN
   - Setup domain name and DNS records
   - Configure SSL/TLS certificates
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections
   - Document any manual steps user needs to complete

2. **Execute CI/CD Pipeline Setup:**
   - Follow steps in `cicd-pipeline.md`
   - Create CI/CD configuration files
   - Configure build steps
   - Setup testing stages
   - Configure deployment stages for each environment
   - Setup secrets and environment variables in CI/CD platform
   - Configure approval gates
   - Test pipeline with a sample deployment
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections
   - Document any manual approvals required

3. **Execute Monitoring and Logging Setup:**
   - Follow steps in `monitoring-logging.md`
   - Setup monitoring tools and agents
   - Configure logging aggregation
   - Setup error tracking service
   - Configure uptime monitoring
   - Create monitoring dashboards
   - Setup alerting rules
   - Configure notification channels
   - Test alerts and notifications
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections

4. **Configure Environments:**
   - Follow steps in `environment-config.md`
   - Setup environment variables in each environment
   - Configure secrets management
   - Store credentials securely
   - Configure feature flags
   - Verify configuration in each environment
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections

### Step 6: Initial Deployment

1. **Deploy to Development/Staging First:**
   - Follow deployment strategy from `deployment-strategy.md`
   - Execute pre-deployment checklist
   - Trigger deployment via CI/CD pipeline
   - Monitor deployment progress
   - Verify deployment success
   - Execute post-deployment verification
   - **Fix any errors encountered during deployment**
   - Adjust configuration as needed
   - Document any issues and resolutions

2. **Deploy to Production (if approved):**
   - Get explicit user confirmation for production deployment
   - Execute pre-deployment checklist
   - Trigger production deployment
   - Monitor deployment closely
   - Verify all services are running
   - Check monitoring dashboards
   - Verify application functionality
   - **Fix any errors encountered during deployment**
   - Be prepared to rollback if issues occur
   - Document deployment completion

### Step 7: Verification and Testing

For each deployed environment:

1. **Verify Infrastructure:**
   - All resources are running
   - Network connectivity is working
   - DNS resolution is correct
   - SSL certificates are valid
   - Security groups are properly configured
   - Backups are configured and working

2. **Verify Application:**
   - Application is accessible via public URL
   - All features are working correctly
   - Database connections are successful
   - API endpoints respond correctly
   - Static assets are served via CDN
   - Performance is acceptable

3. **Verify CI/CD Pipeline:**
   - Pipeline executes successfully
   - Tests run and pass
   - Deployment completes without errors
   - Approval gates work correctly
   - Secrets are properly injected

4. **Verify Monitoring and Logging:**
   - Metrics are being collected
   - Logs are being aggregated
   - Errors are being tracked
   - Alerts are triggered correctly
   - Notifications are received
   - Dashboards display data correctly

### Step 8: Update Documentation Files

**CRITICAL**: Update all deployment files to reflect actual environment:

1. **Update infrastructure-plan.md:**
   - Change from "deployment plan" to "current infrastructure"
   - Document actual resources created with IDs/ARNs
   - Document actual costs (if available)
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document how to access and manage infrastructure

2. **Update cicd-pipeline.md:**
   - Change from "deployment plan" to "current pipeline configuration"
   - Document actual pipeline setup and workflow
   - Add links to pipeline runs
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document how to trigger and monitor deployments

3. **Update deployment-strategy.md:**
   - Change from "deployment plan" to "current deployment process"
   - Document actual deployment steps executed
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document successful deployment timeline
   - Update rollback procedures based on actual setup

4. **Update monitoring-logging.md:**
   - Change from "deployment plan" to "current monitoring setup"
   - Document actual monitoring tools configured
   - Add dashboard URLs
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document how to access logs and metrics

5. **Update environment-config.md:**
   - Change from "deployment plan" to "current environment configuration"
   - Document actual environment variables (without sensitive values)
   - Document where secrets are stored
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document how to update configuration

6. **Update 10-deployment/README.md:**
   - Update current deployment status to "Deployed"
   - Add environment URLs for each deployed environment
   - Add summary of deployed infrastructure
   - Add links to monitoring dashboards
   - Add links to CI/CD pipelines
   - Note date of deployment completion
   - Add quick troubleshooting guide

**These updated files now serve as the source of truth for:**
- Future deployments and updates
- Infrastructure modifications
- Troubleshooting deployment issues
- Onboarding new team members
- Disaster recovery procedures

### Step 9: Security and Compliance Check

1. **Security Review:**
   - Verify all secrets are stored securely
   - Check that no credentials are in code or logs
   - Verify SSL/TLS is configured correctly
   - Review security group rules
   - Check for unnecessary public access
   - Verify backup encryption

2. **Cost Optimization:**
   - Review actual costs vs estimates
   - Identify optimization opportunities
   - Setup cost alerts
   - Document cost breakdown

3. **Compliance:**
   - Document compliance requirements met
   - Verify data residency requirements
   - Check backup and retention policies

### Step 10: Final User Review

1. Present the updated documentation showing actual deployment
2. Show verification results for all environments
3. Provide URLs to access deployed application
4. Share monitoring dashboard links
5. Confirm everything is working as expected
6. Provide handoff documentation for ongoing maintenance
7. Ask if they want any adjustments or additional configurations

### Step 11: Commit to Git

1. **Ask user if they want to commit the deployment documentation:**
   - Stage all changes in `10-deployment/`
   - Stage any infrastructure as code files created
   - Stage CI/CD configuration files
   - Commit with message: "Setup deployment infrastructure and CI/CD pipeline"

2. **Optionally push to remote**

## Expected Output Structure

```
project-root/
├── 10-deployment/
│   ├── README.md (with owner and attendances)
│   ├── infrastructure-plan.md
│   ├── cicd-pipeline.md
│   ├── deployment-strategy.md
│   ├── monitoring-logging.md
│   └── environment-config.md
├── .github/workflows/ (if using GitHub Actions)
│   ├── deploy-dev.yml
│   ├── deploy-staging.yml
│   └── deploy-production.yml
├── terraform/ or cloudformation/ (if using IaC)
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
└── scripts/ (deployment scripts)
    ├── deploy.sh
    └── rollback.sh
```

## Key Principles

- **Dual-purpose documentation**: Deployment files serve as both initial plans and final documentation
- **Get confirmation first**: Always get user approval before executing deployment tasks
- **Security first**: Never expose credentials, always use secrets management
- **Cost awareness**: Keep user informed of infrastructure costs
- **Fix errors proactively**: When errors occur during deployment, fix them and retry automatically
- **Update documentation**: After execution, update files to reflect actual deployment state
- **Source of truth**: Final documentation becomes the authoritative reference for deployment management
- **Zero-downtime**: Prioritize deployment strategies that minimize service interruption
- **Monitoring first**: Ensure monitoring is in place before production deployment
- **Rollback ready**: Always have a tested rollback plan before deploying to production
- All configurations should be version-controlled
- Infrastructure as code should be preferred over manual configuration
- Deployment should be automated and repeatable
- Documentation should be clear for both humans and AI agents
