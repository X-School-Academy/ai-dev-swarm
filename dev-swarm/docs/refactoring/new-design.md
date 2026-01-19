In a full AI-driven software development lifecycle—from ideas to a commercially-ready product—we have designed stages from 00 to 10:

├─ ideas.md            # Initial raw ideas
│
├─ 00-init-ideas/      # Transform ideas into business requirements
│
├─ 01-market-research/ # Conduct market and competitive analysis
│
├─ 02-personas/        # Define user personas and user stories
│
├─ 03-mvp/             # Define the Minimum Viable Product scope
│
├─ 04-prd/             # Create the Product Requirements Document
│
├─ 05-ux/              # Design user experience and visual systems
│
├─ 06-architecture/    # Design system architecture and tech stack
│
├─ 07-tech-specs/      # Create detailed technical specifications
│
├─ 08-devops/          # Set up infrastructure and CI/CD pipelines
│
├─ 09-sprints/         # Plan and execute development sprints
│
├─ 10-deployment/      # Deploy to production and prepare for launch

### Core Concepts

1. The process begins with initial user ideas.
2. AI handles the work from stage 00 (init-ideas) through stage 10 (deployment).
3. For each stage, the AI generates a proposal by creating a `README.md` file within the stage folder. Once the user approves this `README.md`, the AI executes the plan defined in it.
4. Each stage must be reviewed and approved by the user before proceeding to the next stage.

### Major AI Tasks

0.  Define the problem, solution, and target users.
1.  Conduct market research.
2.  Create personas and user stories.
3.  Define the MVP.
4.  Define the PRD.
5.  Design the UX.
6.  Design the system architecture.
7.  Write technical specifications.
8.  Configure DevOps.
9.  Manage sprints.
10. Execute deployment.

### Key Deliverables

*   Problem identification and solution definition.
*   Competitive product research.
*   User stories and personas.
*   Selection of programming languages and frameworks.
*   UI style guides and workflow design for approval.
*   GitHub repository creation.
*   GitHub SSH key setup.
*   GitHub Actions:
    *   **CI:** Automated builds and testing when creating pull requests to the main branch.
    *   **CD:** Automated deployment to AWS and RunPod when creating a new release.
*   Local Docker development container setup.
*   Sprints and backlogs for development.
*   AWS EC2 setup.
*   Nginx and MySQL configuration on AWS EC2 instances.
*   AWS S3 integration.
*   RunPod GPU pod setup for GPU-intensive instances.
*   Mermaid diagrams to visualize designs in various stages for user review.
*   AI agent interaction with third-party services via web browsers using the Playwright MCP or official MCP servers (GitHub, AWS API, RunPod).

Common document files will be produced in each stage for most project types—refer to `dev-swarm/docs/refactoring/new-structure.md`.

System prompts for stages `00` to `10` are located in `dev-swarm/docs/refactoring/00.md` through `10.md`.

### Agent Skill Implementation

We need to create an agent skill file (`SKILL.md`) for each stage in the folders `dev-swarm/skills/dev-swarm-stage-*` (stages 00 to 10). These folders have already been created. Guidelines for implementation:

1.  Follow the agent skill creation guidelines.
2.  Copy system prompts from the corresponding file to each skill file, updating them as needed.
3.  For any `.mmd` (Mermaid) files mentioned in the system prompt, update the skill file to create a corresponding directory as described in `dev-swarm/docs/mermaid-diagram-guide.md`.
4.  If a user asks to skip a stage, create a `SKIP.md` file in that stage's folder, or follow the instructions in the system prompt.
5.  When a user starts a stage, if any previous stage folder is empty (or only contains `.gitkeep`) and no `SKIP.md` exists, ask the user if they wish to skip it or start from that stage.
6.  After each step or stage, ask the user if they want to commit and push changes to the remote repository.
7.  If all files for a stage have been created and there are no uncommitted changes, inform the user that the stage is complete. If the user provides additional instructions, refine the files accordingly.
8.  Keep the `SKILL.md` file as concise as possible.


