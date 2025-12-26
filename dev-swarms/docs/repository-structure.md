project-root/
├─ README.md                         # What this repo is, AI agent should update this file from time to time
├─ ideas.md                          # The start engine of the AI builder
│
├─ 00-init-ideas/                    # Stage 0: define the problem 
│  ├─ README.md                      # Folder overview and guide
│  ├─ problem-statement.md           
│  ├─ target-users.md                # Who has the problem (high-level), primary audience
│  ├─ value-proposition.md 
│  └─ owner-requirement.md           # from ideas.md, any other requirments for the late stage
│ 
├─ 01-market-research/               # Stage 1: validate problem + understand landscape
│  ├─ README.md                      # Folder overview and guide
│  ├─ market-overview.md             # Market size, trends, growth drivers
│  ├─ competitor-analysis.md         # Direct/indirect competitors, their strengths/weaknesses
│  ├─ gap-analysis.md                # Unmet needs, opportunities competitors miss
│  ├─ pricing-research.md            # How competitors price, willingness to pay signals
│  └─ validation-findings.md         # Evidence the problem is real (interviews, surveys, data)

├─ 02-personas/                      # Stage 2: who uses it + user stories (business language)
│  ├─ README.md                      # Folder overview and guide
│  ├─ persona-primary.md             # 1st main persona
│  ├─ persona-secondary.md           # 2nd persona (optional)
│  └─ user-stories.md                # Prioritized user stories (no technical design)
│
├─ 03-mvp/                           # Stage 3: MVP scope and success metrics (what NOT to build)
│  ├─ README.md                      # Folder overview and guide
│  ├─ mvp-scope.md                   # MVP definition: smallest testable product
│  ├─ out-of-scope.md                # Explicit exclusions (prevents PRD bloat)
│  └─ success-metrics.md             # Usage/retention/conversion/learning metrics
│
├─ 04-prd/                           # Stage 4: product behavior locked here (still not tech stack)
│  ├─ README.md                      # Folder overview and guide
│  ├─ prd.md                         # Product overview/goals/users/journeys + MVP alignment
│  ├─ functional-requirements.md     # What the product must do (behaviors)
│  ├─ non-functional-requirements.md # Performance/security/compliance requirements
│  └─ out-of-scope.md                # PRD-level exclusions
│
├─ 05-ux/                            # Stage 5: how it feels to use (flows, states, errors)
│  ├─ README.md                      # Folder overview and guide
│  ├─ user-flows.md                  # UX flow diagrams (can include Mermaid)
│  ├─ interaction-specs.md           # States, transitions, interaction rules
│  ├─ edge-cases.md                  # Edge cases + expected outcomes
│  ├─ accessibility.md               # Accessibility requirements/checklist
│  └─ mockup folder or single html fil (optional - for UI based web/mobile/desktop apps)      # use static html/css/js file(s), show case/define/ the theme/style/ basic ui userflow - most just as a project proposal for non tech customer to understand the product they will have
 │
├─ 06-architecture/                  # Stage 6: system shape (structure, not frameworks)
│  ├─ README.md                      # Folder overview and guide
│  ├─ system-overview.md             # Major components + responsibilities
│  ├─ architecture-diagram.md        # Diagram (Mermaid or image link) showing system components
│  ├─ data-flow.md                   # Request/data flow across frontend/backend/db/external services
│  └─ deployment-boundaries.md       # What runs local vs cloud, trust boundaries, high-level scaling assumptions
│
├─ 07-tech-specs/                    # Stage 7: engineering decisions & standards (policy level)
│  ├─ README.md                      # Folder overview and guide
│  ├─ tech-stack.md                  # Languages/frameworks/db/cloud provider choices
│  ├─ security.md                    # Security posture (auth approach, secrets handling, threat notes)
│  ├─ theme-standards.md             # UI theme rules (fonts/sizes/colors) if doing infographic/UI consistency - based on the approved ux - mockup
│  ├─ coding-standards.md            # Code style rules, repo conventions, naming, formatting
│  ├─ testing-standards.md           # What tests are required, how to name/run them, minimum gates
│  └─ security-standards.md          # Secure coding rules, dependency scanning, logging redaction rules
│
├─ 08-devops/                        # Stage 8: AI setup: local or cloud development environment foundation (tooling + dev stack)
│  ├─ README.md                      # Folder overview and guide
│  ├─ github-setup.md        # GitHub repo settings, branch protection, PR templates
│  ├─ mcp-setup.md           # MCP tool setup: Playwright/GitHub/AWS + permissions model
│  ├─ vscode-devcontainer.md # VS Code Dev Container + Docker configuration
│
├─ 09-sprints/                       # Stage 9: AI-accelerated development execution (3–6 hour sprints)
│  ├─ README.md                      # Folder overview and guide
│  │
│  ├─ user-auth/                      # Sprint folder named by ID + goal (recommended)
│  │  ├─ README.md                    # Sprint overview, status, and plan
│  │  ├─ FEATURE-auth-login.md        # New capability
│  │  ├─ CHANGE-login-error.md        # Bug fix
│  │  ├─ BUG-login-error.md           # Bug fix
│  │  └─ IMPROVE-rate-limits.md       # Improvement/refactor
│  │
│  └─ profile-basics/
│     └─ ...
│
├─ 10-deployment/                    # Stage 10: Cloud infra + deploy process + release verification
│  ├─ README.md                      # Folder overview and guide
│  ├─ deployment-index.md            # Entry point: staging/prod deploy paths + checklists
│  │
│  ├─ _templates/                    # Deployment templates (repeatable and safe)
│  │  ├─ README.md                    # Templates overview and usage guide
│  │  ├─ deploy-plan.template.md      # Plan: goal, infra changes, steps, validation, rollback
│  │  ├─ infra.template.md            # Infra summary for a service/environment
│  │  └─ rollback.template.md         # Rollback procedure template
│  │
│  ├─ infra/                         # Cloud architecture/runbooks (what exists in AWS and why)
│  │  ├─ README.md                    # Infrastructure overview and index
│  │  ├─ aws-overview.md              # High-level AWS layout and boundaries
│  │  ├─ ec2.md                       # EC2 deployment approach (systemd/docker, ports, security groups)
│  │  ├─ lambda.md                    # Lambda functions approach (packaging, triggers, limits)
│  │  ├─ iam-security.md              # IAM principles, least privilege, credential handling rules
│  │  ├─ networking.md                # VPC/subnets/security groups/load balancer (if used)
│  │  └─ storage.md                   # S3/CloudFront/RDS choices (if used)
│  │
│  ├─ releases/                      # Versioned releases (production-ready output)
│  │  ├─ README.md                    # Releases index and versioning guide
│  │  ├─ v0.1.0/                      # One release = deployable bundle + proof
│  │  │  ├─ README.md                  # Release overview and summary
│  │  │  ├─ release-notes.md           # What changed, highlights
│  │  │  ├─ verification.md            # Smoke tests, URLs, screenshots, key metrics
│  │  │  └─ rollback.md                # Rollback plan for this release
│  │  └─ changelog.md                 # Running changelog across releases
│  │
│  └─ evidence/                      # Proof of deployments (commands, console screenshots, URLs)
│     ├─ README.md                    # Evidence index and guide
│     ├─ E-deploy-staging.md          # Staging deployment evidence
│     └─ E-deploy-production.md       # Production deployment evidence
│
├─ 99-archive/                       # Finished/deprecated docs and sprints (keep repo clean)
│
├─ features/                         # AI compressed product knowledge (AI loads on-demand per backlog)
│  ├─ README.md                      # Features index and overview
│  ├─ features-index.md              # Entry point: list of feature files + short descriptions (must stay small)
│  │
│  ├─ flows/                         # Cross-feature flows (only when behavior spans multiple features)
│  │  ├─ README.md                   # Flows index and guide
│  │  └─ auth-login.md               # Example flow doc (can be renamed to FLOW-xxx-*.md if you want IDs)
│  │
│  ├─ contracts/                     # Interfaces/contracts (HTTP APIs, internal interfaces, DB schema contracts)
│  │  ├─ README.md                   # Contracts index and guide
│  │  └─ auth-login.md               # Example contract doc
│  │
│  ├─ impl/                          # Implementation notes (how it is built, pitfalls, code pointers)
│  │  ├─ README.md                   # Implementation docs index and guide
│  │  └─ auth-login.md               # Example impl doc
│  │
│  └─ auth-login.md                  # Feature definition (WHAT/WHY/SCOPE) for the auth-login feature
│
├─ src/                              # The codebase (AI modifies this)
│  ├─ README.md                      # Codebase overview and structure guide
│  ├─ frontend/                      # UI code
│  │  └─ README.md                   # Frontend structure and getting started
│  └─ backend/                       # API/services code
│     └─ README.md                   # Backend structure and getting started
│