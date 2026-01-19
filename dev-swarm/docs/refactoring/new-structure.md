# Document Structure for AI-Driven Software Development Lifecycle

## Stage 00: init-ideas (Business Requirements)
```
00-init-ideas/
├─ README.md                      # Stage proposal & execution plan
├─ problem-statement.md           # Problem identification
├─ solution-overview.md           # Proposed solution
├─ brainstorm-mindmap.mmd         # Mermaid mindmap expanding user's ideas
├─ feature-opportunities.md       # New features/ideas from brainstorm for user review
├─ quick-questions.md             # Unknowns the AI must clarify
├─ tech-requirements.md           # Tech requirements extracted from ideas.md
├─ target-users.md                # Target audience definition
├─ success-metrics.md             # KPIs and success criteria
└─ assumptions-risks.md           # Key assumptions and risks
```

## Stage 01: market-research
```
01-market-research/
├─ README.md                      # Stage proposal & execution plan
├─ competitive-analysis.md        # Competitor analysis
├─ similar-products.md           # Similar products research
├─ market-size-opportunity.md    # Market size and opportunity
├─ swot-analysis.md              # SWOT analysis
├─ market-trends.md              # Current market trends
├─ pricing-strategy.md           # Pricing research
├─ feature-comparison.md         # Feature comparison matrix
└─ market-gaps.md                # Market gap analysis
```

## Stage 02: personas
```
02-personas/
├─ README.md                     # Stage proposal & execution plan
├─ personas.md                   # User personas
├─ user-stories.md               # User stories
├─ user-journey-maps.mmd         # Mermaid journey diagrams
├─ pain-points.md                # User pain points
├─ use-cases.md                  # Key use cases
└─ empathy-maps.mmd              # Visualizing what the user says, thinks, does, and feels
```

## Stage 03: mvp
```
03-mvp/
├─ README.md                     # Stage proposal & execution plan
├─ mvp-features.md               # Core MVP features
├─ feature-prioritization.md     # Feature priority matrix
├─ mvp-roadmap.mmd               # Mermaid roadmap diagram
├─ mvp-scope.md                  # In-scope features
├─ out-of-scope.md               # Out-of-scope features
├─ success-criteria.md           # MVP success criteria
└─ release-plan.md               # MVP release plan
```

## Stage 04: prd (Product Requirements Document)
```
04-prd/
├─ README.md                     # Stage proposal & execution plan
├─ functional-requirements.md    # Functional requirements
├─ non-functional-requirements.md # Performance, security, etc.
├─ user-flows.mmd                # Mermaid user flow diagrams
├─ acceptance-criteria.md        # Acceptance criteria
├─ analytics-and-events.md
├─ error-handling-and-edge-cases.md
├─ compliance-and-legal-notes.md
└─ dependencies.md               # External dependencies
```

## Stage 05: ux (UX Design)
```
05-ux/
├─ README.md                     # Stage proposal & execution plan
├─ design-system-guide.md        # Color palette, typography choices, and button styles.
├─ wireframe_descriptions.md     # Textual descriptions of UI layout
├─ user-flows.mmd                # Mermaid user flow diagrams
├─ responsive-design.md          # Responsive design guidelines
├─ accessibility.md              # Accessibility requirements (WCAG)
└─ design-ui-preview.html        # A sample html/css/js page for design system/ui preview
```

## Stage 06: architecture (Architecture Design)
```
06-architecture/
├─ README.md                     # Stage proposal & execution plan
├─ system-architecture.md        # Overall system architecture
├─ architecture-diagram.mmd      # Mermaid architecture diagram
├─ C4-component-diagram.mmd      # Context - Level 1, Containers - Level 2, Components - Level 3
├─ tech-stack.md                 # languages/frameworks
├─ tech-stack-rationale.md       # Why each technology chosen
├─ database-design.md            # Database schema design
├─ database-schema.mmd           # Mermaid ER diagram
├─ api-design.md                 # API architecture
├─ api-endpoints.md              # API endpoint listing
├─ infrastructure-design.md      # Infrastructure overview
├─ infrastructure-diagram.mmd    # Mermaid infrastructure diagram
├─ security-architecture.md      # Security design
├─ scalability-plan.md           # Scalability considerations
├─ data-flow-diagram.mmd         # Mermaid data flow diagram - How data moves between the User, Server, AWS S3, and RunPod etc
└─ integration-architecture.md   # Third-party integrations
```

## Stage 07: tech-specs (Technical Specifications)
```
07-tech-specs/
├─ README.md                     # Stage proposal & execution plan
├─ tech-specs-overview.md        # Technical specifications overview
├─ api-specifications.md         # Detailed API specs
├─ openapi.yaml                  # OpenAPI/Swagger spec
├─ database-migrations.md        # Migration strategy
├─ frontend-specs.md             # Frontend technical specs (language/framework/coding standard/repos structure etc)
├─ backend-specs.md              # Backend technical specs (language/framework/coding standard/repos structure tec)
├─ service-specs/                # Individual component, service, serverless specs
│  ├─ auth-service.md
│  ├─ payment-service.md
│  ├─ video-creator-service.md
│  └─ ...
├─ state-management-strategy.md  # How the frontend handles state (e.g., Bloc/Provider for Flutter).
├─ dependencies-list.md          # Planned pip/npm/dart/flutter packages.
├─ third-party-integration-guide.md  # Third-party integration specs & APIs
├─ testing-strategy.md           # unit/integration/e2e
├─ security-specifications.md    # Security implementation details
├─ observability-spec.md         # logs/metrics/traces
├─ performance-specs.md          # Performance requirements
└─ error-handling.md             # Error handling strategy
```

## Stage 08: devops (DevOps Setup)
```
08-devops/
├─ README.md                     # Stage proposal & execution plan
├─ devops-overview.md            # DevOps strategy overview
├─ execution-plan.md             # Checklist: Stage 08 (dev) vs Stage 10 (prod) tasks
├─ github-setup.md               # GitHub repository setup
├─ ssh-access-policy.md          # How SSH keys are generated and managed for EC2/GitHub.
├─ ci-cd-pipeline.md             # CI/CD pipeline design
├─ ci-workflow.yml               # GitHub Actions CI workflow
├─ cd-workflow.yml               # GitHub Actions CD workflow
├─ docker_strategy.md            # Plan for Dockerfile and docker-compose.yml (Dev vs. Prod)
├─ aws-setup.md                  # AWS account & services setup
├─ ec2-setup.md                  # EC2 instance configuration
├─ nginx-setup.md                # Nginx configuration
├─ nginx.conf                    # Nginx config file
├─ mysql-setup.md                # MySQL setup documentation
├─ s3-setup.md                   # S3 bucket configuration
├─ runpod-setup.md               # RunPod GPU setup
├─ infrastructure/               # Infrastructure as Code
│  ├─ terraform/
│  │  ├─ main.tf
│  │  ├─ variables.tf
│  │  └─ outputs.tf
│  └─ cloudformation/
├─ monitoring-setup.md           # Monitoring & logging setup
├─ secrets-management.md         # Env vars, vault approach, Secrets management strategy
├─ environment-config.md         # Environment configurations
├─ app-store-setup.md            # Apple App Store Connect setup (iOS)
├─ google-play-setup.md          # Google Play Console setup (Android)
└─ mobile-signing-setup.md       # Code signing certificates, provisioning profiles, keystores
```

## Stage 09: sprints (Development Sprints)
```
09-sprints/
├─ README.md                    # Stage proposal & execution plan
├─ development-plan.md          # Sprint & backlog plan in agile development strategy
├─ SPRINT-01-user-auth/            # Each sprint
│  ├─ README.md                    # Sprint overview, status of each backlog, and sprint test plan
│  ├─ FEATURE-01-auth-login.md     # feature(backlog) description, related feature, test plan
│  └─ ...
│
└─ SPRINT-02-profile-basics/
    └─ ...
```

## Stage 10: deployment (Production Deployment)
```
10-deployment/
├─ README.md                      # Stage proposal & execution plan
├─ deployment-plan.md            # Detailed deployment plan
├─ production-config.md          # Production configuration
├─ deployment-diagram.mmd        # Mermaid deployment diagram
├─ execution-plan.md             # Checklist: Pre-deploy, Deploy, Verify, Go-live tasks
├─ aws-production-setup.md       # AWS production setup
├─ runpod-production-setup.md    # RunPod production setup
├─ ssl-certificate-setup.md      # SSL/TLS setup
├─ domain-dns-setup.md           # Domain & DNS configuration
├─ monitoring-alerting.md        # Production monitoring
├─ backup-strategy.md            # Backup & disaster recovery
├─ rollback-plan.md              # Rollback procedures
├─ security-hardening.md         # Production security measures
├─ performance-optimization.md   # Performance tuning
├─ post-deployment-verification.md # Verification tests
├─ go-live-checklist.md          # Final go-live checklist
├─ user-documentation.md         # End-user documentation
├─ admin-documentation.md        # Admin/ops documentation
├─ api-documentation.md          # Public API documentation
├─ marketing-readiness.md        # Marketing materials checklist
├─ launch-announcement.md        # Launch communication plan
├─ app-store-release.md          # Apple App Store submission and release
├─ google-play-release.md        # Google Play Store submission and release
└─ mobile-release-checklist.md   # Pre-submission checklist for mobile apps
```

## Cross-Stage Documents (Root Level)
```
project-root/
├─ ideas.md                      # Initial ideas document
├─ project-overview.md           # High-level project summary
├─ changelog.md                  # Project-wide changes
├─ release-notes.md              # PRelease notes per sprint
└─ glossary.md                   # Project-wide terminology
```

## Code structure
```
src/
├─ frontend/                     
└─ backend/
```