# 00-init-ideas deliverables

Only present files that are suitable for the project's type and level; omit the rest.

## Deliverable list

- README.md: Stage overview, scope, and required files. Needed for all projects.
- problem-solution.md: Clear problem definition and constraints. Needed for L2+.
- target-users.md: Primary users and needs. Needed for L2+.
- value-proposition.md: Why the solution matters and key benefits. Needed for L2+.
- owner-requirement.md: Owner constraints and requirements. Needed for L2+.
- cost-budget.md: Budget and cost approval. Needed for L2+.

## File content guidance

### README.md

- Project title
- Owner: Business Owner
- Attendances: Product Manager
- Overview of this initialization stage
- Use the Stage files checklist in the README template to list docs; do not add a separate Documents section
- If listing options or solutions, use checkbox lists with a default selected

### problem-solution.md

- Translate ideas.md into a business-level problem and solution statement
- Focus on the problem domain and value (not tech stack or implementation)
- Current pain points and why the problem matters
- Business constraints and limitations (non-technical)

### target-users.md

- Who are the target users (high-level)
- Primary audience
- User needs and expectations

### value-proposition.md

- What value does this project provide
- How it solves the problem
- Core benefits to users
- Why this solution matters

### owner-requirement.md

- Non-problem requirements extracted from ideas.md (e.g., preferred language, framework, tooling)
- Owner constraints for later stages
- Organized by priority or category
- Clear and actionable items

### cost-budget.md

- **Token Budget Estimation Per Stage:**
  - Estimate tokens needed for each stage based on project scale
  - Consider: research depth, documentation thoroughness, code complexity, testing coverage
  - Breakdown by stage for only the stages that are NOT skipped: 01-market-research, 02-personas, 03-mvp, 04-prd, 05-ux, 06-architecture, 07-tech-specs, 08-devops, 09-sprints, 10-deployment
  - If a stage is skipped, its cost is $0 and should be omitted from the breakdown

- **Estimated Cost in USD:**
  - Calculate based on current LLM pricing (e.g., Claude Sonnet rates)
  - Include buffer for iterations and refinements (typically 20-30%)
  - Total estimated cost range (min-max)

- **Budget Impact on Project Scope:**
  - How budget affects research time (market research, competitor analysis)
  - How budget affects code quality (testing thoroughness, code reviews)
  - How budget affects documentation completeness
  - Trade-offs if budget is limited

- **Budget Allocation Strategy:**
  - Which stages get more budget allocation based on project priorities
  - Critical vs optional activities per stage

- **Budget Guidelines by Scale:**
  - **L2 (Tool)**: 50k-200k tokens (~$2-$10)
  - **L3 (Single Service)**: 200k-500k tokens (~$10-$25)
  - **L4 (MVP)**: 500k-1M tokens (~$25-$50)
  - **L5 (Multi-Platform)**: 1M-2M tokens (~$50-$100)
  - **L6-L7 (Growth/Platform)**: 2M+ tokens (~$100+)

- **User Approval Required:**
  - User must review and approve the budget before proceeding to later stages
  - Budget acts as a constraint for all subsequent AI agent activities
