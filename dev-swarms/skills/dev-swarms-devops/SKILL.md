---
name: ai-builder-devops
description: Setup development environment, MCP tools, GitHub repository, and Docker configurations. Use when user asks to setup devops, configure development environment, or start Stage 8 after tech specs.
---

# AI Builder - DevOps Setup

This skill sets up the development environment foundation, including local/cloud environment setup, MCP tools configuration, GitHub repository settings, and Docker/Dev Container configurations.

## When to Use This Skill

- User asks to setup devops or development environment
- User wants to configure GitHub repository
- User needs MCP tools setup for AI agent
- User wants Docker or Dev Container configuration
- Start Stage 8 after tech specs are defined
- When `git remote -v` shows no remote repository linked

## Your Roles in This Skill

- **DevOps Engineer**: Setup and configure development environments, CI/CD pipelines, and deployment infrastructure. Identify the best local or cloud development setup based on project requirements and ensure all tools are properly configured for AI agent usage.
- **Infrastructure Architect**: Design and implement scalable, secure infrastructure solutions. Make decisions on containerization, environment isolation, and development workflow optimization.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a DevOps Engineer, I will assess current environment and identify required MCP tools and configurations
- As a Infrastructure Architect, I will design development container configuration with appropriate tools and dependencies
- As a DevOps Engineer, I will create setup plan files for GitHub repository, MCP tools, and dev containers
- As a DevOps Engineer, I will ask user to confirm setup plans before executing any configuration changes
- As a DevOps Engineer, I will execute setup tasks and fix any errors encountered during configuration
- As a DevOps Engineer, I will verify all setups are working and update documentation to reflect actual environment

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 1: Assess Current Environment

1. **Check if `08-devops/` folder exists:**
   - If exists: Read all existing files to understand current state
   - If NOT exists: Will create new structure

2. **Check current git configuration:**
   - Run `git remote -v` to check if remote repository is linked
   - Check if `.git` directory exists

3. **Check existing MCP configuration:**
   - Look for existing MCP tools configuration
   - Check if Claude Desktop or other MCP clients are configured

4. **Check existing Docker/Dev Container setup:**
   - Look for `.devcontainer/` folder
   - Check for `Dockerfile` or `docker-compose.yml`

5. Proceed to Step 2 with gathered context

### Step 2: Analyze Project Requirements

Based on the tech stack (from `07-tech-specs/`) and project requirements:

1. Determine if project needs:
   - Local development only
   - Cloud development environment
   - Containerized development
   - Specific MCP tools (Playwright, GitHub, AWS, etc.)

2. Identify complexity level:
   - **Basic**: Simple projects with minimal setup
   - **Standard**: Projects requiring GitHub + basic MCP tools
   - **Complex**: Projects requiring full cloud setup, multiple MCP tools, advanced Docker configurations

### Step 3: Create Setup Plan Files

**IMPORTANT**: These files serve dual purposes:
1. **Initially**: Setup plans/instructions for user approval
2. **Finally**: Documentation of the actual environment (source of truth for future reset/update)

1. **Create folder structure:**
   ```
   08-devops/
   ├── README.md
   ├── github-setup.md
   ├── mcp-setup.md
   └── vscode-devcontainer.md
   ```

2. **Create setup plan files with proposed configurations:**

**08-devops/README.md:**
- Specify the owner: DevOps Engineer
- Specify attendances: Infrastructure Architect
- Overview of this stage
- Links to all setup documentation files
- Current environment status (will be updated after execution)

**github-setup.md (Setup Plan):**
Write as a setup plan with:
- Proposed GitHub repository settings
- Branch protection rules to be configured
- PR template to be created
- GitHub Actions workflows (if applicable)
- Issue templates (if needed)
- Repository permissions plan
- Clear step-by-step setup instructions

**mcp-setup.md (Setup Plan):**
Write as a setup plan with:
- List of MCP tools to be installed/configured
- Installation steps for each MCP tool
- Configuration details (file locations, settings)
- Required environment variables and credentials
- Permission requirements
- Test commands to verify each tool
- Clear step-by-step setup instructions

**vscode-devcontainer.md (Setup Plan):**
Write as a setup plan with:
- Dev Container configuration to be created
- Dockerfile contents
- docker-compose.yml contents (if needed)
- VS Code extensions to install
- Environment variables to set
- Port forwarding configuration
- Volume mounts specification
- Post-create commands
- Clear step-by-step setup instructions

### Step 4: Get User Confirmation

1. Present all three setup plan files to the user
2. Explain what will be configured/installed
3. Ask user to review and confirm before proceeding
4. Make any adjustments based on user feedback
5. **DO NOT PROCEED** until user explicitly confirms

### Step 5: Execute Setup Tasks

**ONLY AFTER USER CONFIRMATION**, execute each setup:

1. **Execute GitHub Setup:**
   - Follow steps in `github-setup.md`
   - If no remote: Guide/help user create GitHub repository
   - Link local repository to remote using `git remote add`
   - Create branch protection rules (via GitHub CLI or web)
   - Create PR templates in `.github/PULL_REQUEST_TEMPLATE.md`
   - Create issue templates if specified
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections

2. **Execute MCP Tools Setup:**
   - Follow steps in `mcp-setup.md`
   - Install/configure each MCP tool specified
   - Setup required credentials and environment variables
   - Create/update MCP configuration files
   - Test each MCP tool connectivity
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections
   - Document any manual steps user needs to complete

3. **Execute Dev Container Setup:**
   - Follow steps in `vscode-devcontainer.md`
   - Create `.devcontainer/` folder
   - Create `devcontainer.json` with specified configuration
   - Create `Dockerfile` with specified contents
   - Create `docker-compose.yml` if specified
   - Build container to test
   - **Fix any errors encountered during setup**
   - Retry failed steps with corrections
   - Fix Dockerfile or configuration issues as needed

### Step 6: Verification and Testing

For each completed setup:

1. **Verify GitHub setup:**
   - Run `git remote -v` to confirm remote is linked
   - Check branch protection rules are applied
   - Verify PR templates exist and are formatted correctly
   - Test creating a test PR (if applicable)

2. **Verify MCP tools:**
   - Test each configured MCP tool with simple commands
   - Ensure AI agent can access MCP tools
   - Verify permissions are correctly set
   - Check environment variables are loaded
   - Document any issues or limitations

3. **Verify Dev Container:**
   - Successfully build container without errors
   - Start container and verify it runs
   - Check all specified tools/extensions are available
   - Test volume mounts work correctly
   - Verify port forwarding is configured
   - Test development workflow inside container

### Step 7: Update Documentation Files

**CRITICAL**: Update all setup files to reflect actual environment:

1. **Update github-setup.md:**
   - Change from "setup plan" to "current configuration"
   - Document actual repository URL, settings applied
   - Document actual branch protection rules in place
   - Note any deviations from original plan
   - Add verification results
   - Add troubleshooting notes for any issues encountered

2. **Update mcp-setup.md:**
   - Change from "setup plan" to "current configuration"
   - Document actual MCP tools installed and versions
   - Document actual configuration file locations and contents
   - Document actual environment variables set
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document how to reset/reinstall each tool

3. **Update vscode-devcontainer.md:**
   - Change from "setup plan" to "current configuration"
   - Document actual container configuration
   - Add notes about successful build settings
   - Document any modifications made during setup
   - Add verification results
   - Add troubleshooting notes for any issues encountered
   - Document how to rebuild/reset the container

4. **Update 08-devops/README.md:**
   - Update current environment status to "Configured"
   - Add summary of what was set up
   - Add links to verification results
   - Note date of setup completion

**These updated files now serve as the source of truth for:**
- Future environment resets
- Environment updates
- Onboarding new team members
- Debugging environment issues

### Step 8: Final User Review

1. Present the updated documentation showing actual configuration
2. Show verification results for all setups
3. Confirm everything is working as expected
4. Ask if they want to proceed to `09-sprints/` (next stage)
5. Make any final adjustments if needed

### Step 9: Commit to Git

1. **Ask user if they want to commit the setup:**
   - Stage all changes in `08-devops/`
   - Stage `.devcontainer/` files (if created)
   - Stage `.github/` files (if created)
   - Stage any configuration files (MCP configs, etc.)
   - Commit with message: "Setup DevOps environment and configurations"

2. **Optionally push to remote** (if GitHub was set up)

## Expected Output Structure

```
project-root/
├── 08-devops/
│   ├── README.md (with owner and attendances)
│   ├── github-setup.md
│   ├── mcp-setup.md
│   └── vscode-devcontainer.md
├── .devcontainer/ (if applicable)
│   ├── devcontainer.json
│   ├── Dockerfile
│   └── docker-compose.yml (optional)
└── .github/ (if GitHub setup)
    ├── PULL_REQUEST_TEMPLATE.md
    └── ISSUE_TEMPLATE/ (optional)
```

## Key Principles

- **Dual-purpose documentation**: Setup files serve as both initial plans and final documentation
- **Get confirmation first**: Always get user approval before executing setup tasks
- **Fix errors proactively**: When errors occur during setup, fix them and retry automatically
- **Update documentation**: After execution, update files to reflect actual environment state
- **Source of truth**: Final documentation becomes the authoritative reference for environment reset/update
- Identify the right level of complexity for the project
- Setup should enable AI agent to work autonomously
- All configurations should be version-controlled
- Security and permissions should be properly configured
- Development environment should be reproducible
- MCP tools should be tested and verified
- Documentation should be clear for both humans and AI agents
