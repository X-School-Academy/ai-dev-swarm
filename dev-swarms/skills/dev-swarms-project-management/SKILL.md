---
name: dev-swarms-project-management
description: Manage sprints and backlogs in a feature-driven AI development workflow. Create, prioritize, schedule backlogs (feature/change/bug/improve), archive completed sprints, and maintain features knowledge base. Use when managing development lifecycle, creating sprints, or organizing backlogs.
---

# AI Builder - Project Management

This skill manages the complete sprint and backlog lifecycle for AI-driven feature development. As a Project Manager expert, you'll create and organize backlogs, schedule sprints, prioritize work, and maintain the features knowledge base for efficient AI-driven development.

## When to Use This Skill

- User asks to create or manage sprints
- User requests to create, update, or prioritize backlogs
- User wants to schedule work or plan a sprint
- User asks to archive completed sprints
- User needs to organize features into the knowledge base
- User wants to view sprint status or backlog priorities
- After code review or testing phases identify new backlogs (change/bug/improve)

## Prerequisites

This skill works with the following folder structure:
- `02-personas/` - User personas and user stories that drive backlog scope
- `03-mvp/` - MVP scope and success criteria for initial sprint planning
- `04-prd/` - Product requirements and non-functional constraints
- `05-ux/` - UX flows, states, and mockups that shape backlog acceptance
- `06-architecture/` - System structure and dependencies that affect sequencing

- `09-sprints/` - Active sprint and backlog management
- `features/` - Coding knowledge base (feature index and implementations)
- `99-archive/` - Archived completed sprints (same structure as project root)

## Your Roles in This Skill

- **Project Manager**: Lead sprint planning and backlog management across the entire project. Break down epics and user stories into implementable backlogs. Prioritize work based on dependencies, business value, and technical constraints. Schedule backlogs across sprints to maintain steady delivery. Track progress, identify blockers, and adjust plans. Archive completed sprints and organize features into the knowledge base. Maintain project velocity and ensure sprint goals are achievable.

- **Tech Manager (Architect)**: Create backlogs for system architecture, infrastructure, and technical foundations. Define technical stack, frameworks, and development standards. Plan database architecture, API design patterns, and integration strategies. Identify technical dependencies and advise on backlog sequencing (infrastructure before features, backend before frontend). Flag technical risks, complexity estimates, and architectural constraints. Create backlogs for DevOps, CI/CD, monitoring, and system scalability.

- **Product Manager**: Create backlogs that deliver core user value and business objectives. Define MVP scope and prioritize features based on user impact. Ensure backlog descriptions include clear user stories and business rationale. Write well-defined, testable acceptance criteria. Balance feature requests with business goals. Create backlogs for user onboarding, feature discovery, and product analytics. Validate that sprint goals deliver measurable user-facing value.

- **AI Engineer**: Create backlogs for AI/ML features, model architecture, and intelligent system capabilities. Plan LLM integration, prompt engineering strategies, and AI-powered features. Design vector database, embeddings, and semantic search functionality. Create backlogs for model training, evaluation, and monitoring pipelines. Plan AI cost optimization, latency management, and fallback strategies. Design content generation, summarization, and AI moderation systems. Define AI safety, bias detection, and quality assurance processes.

- **Legal Advisor**: Create backlogs for all legal compliance and policy pages. Write Terms of Service, Privacy Policy, Cookie Policy, and GDPR/CCPA compliance documentation. Create disclaimers, liability statements, and user agreements. Plan age verification, consent management, and data handling workflows. Design legal notices, copyright statements, and licensing information. Ensure regulatory compliance for target markets. Create backlogs for user data rights (access, deletion, portability).

- **Customer Support**: Create backlogs for user support infrastructure and self-service resources. Design FAQ pages, help centers, and troubleshooting guides. Plan contact forms, support ticket systems, and user feedback mechanisms. Create knowledge base structure and search functionality. Write onboarding tutorials, feature guides, and best practice documentation. Design chatbot scripts, canned responses, and support automation. Anticipate common user issues and create preventive help content.

- **Content Moderator**: Create backlogs for content moderation systems and community safety features. Design reporting mechanisms, flagging interfaces, and user safety tools. Plan moderation queue, review dashboards, and moderator workflows. Write community guidelines, content policies, and acceptable use terms. Design automated content filtering and manual review processes. Create user communication templates for moderation actions (warnings, suspensions, bans). Plan appeals, dispute resolution, and account restoration workflows.

- **UI Designer**: Create backlogs for user interface design, visual layout, and user experience flows. Design component libraries, design systems, and branding guidelines. Plan responsive layouts, mobile-first designs, and accessibility features. Create navigation structures, information architecture, and user flow diagrams. Design call-to-action buttons, form layouts, and interactive elements. Ensure visual consistency across all pages and components. Plan animations, transitions, and micro-interactions. Make complex information (legal docs, technical content) readable and user-friendly.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Project Manager, I will create backlogs by breaking down user stories into implementable tasks
- As a Tech Manager, I will create technical architecture and infrastructure backlogs with dependency sequencing
- As a Product Manager, I will define acceptance criteria and test plans for each backlog
- As a AI Engineer, I will create backlogs for AI/ML features and integration strategies
- As a Legal Advisor, I will create backlogs for compliance documentation and policy pages
- As a Customer Support, I will create backlogs for help documentation and support infrastructure
- As a Content Moderator, I will create backlogs for moderation systems and community guidelines
- As a UI Designer, I will create backlogs for UI components and design system implementation
- As a Project Manager, I will prioritize backlogs and schedule them across sprints based on dependencies and business value
- As a Project Manager, I will ask user to confirm sprint plan and backlog priorities before starting development

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Backlog Types

There are 4 types of backlogs:

1. **feature** - New functionality (initial development)
2. **change** - Modifications to existing features (initial implementation didn't meet design requirements)
3. **bug** - Defects found during code review or testing
4. **improve** - Optimization or enhancement of existing code

## Instructions

Follow these steps in order:

### Step 0: Verify Prerequisites and Gather Context

0. **Review planning inputs before initializing sprints/backlogs:**
   - `02-personas/` for personas and prioritized user stories
   - `03-mvp/` for scope boundaries and MVP success metrics
   - `04-prd/` for functional and non-functional requirements
   - `05-ux/` for user flows, UI states, and mockup constraints
   - `06-architecture/` for sequencing dependencies and system boundaries
   - `07-tech-specs/` for technology choices and standards
   - `08-devops/` for environment/tooling readiness and constraints

1. **Check if `09-sprints/` folder exists:**
   - If NOT found: Create new folder structure with `sprints-index.md`
   - If found: Read `sprints-index.md` to understand current sprint status

2. **Check if `features/` folder exists:**
   - If NOT found: Create folder with `features-index.md`
   - If found: Read `features-index.md` to understand implemented features

3. **Use templates for consistency:**
   - Templates are located in this skill's `templates/` folder
   - Use templates when creating sprints, backlogs, sprints-index, and test plans
   - Templates provide standard formats for consistency

4. **Understand user request:**
   - Are they creating a new backlog?
   - Are they scheduling a sprint?
   - Are they archiving completed work?
   - Are they adding to features knowledge base?

### Step 1: Managing Backlogs

#### Creating a New Backlog

When creating backlogs, each must include:

1. **Title and Type:**
   - Clear, descriptive title
   - Type: feature, change, bug, or improve
   - If modifying existing feature, type should be `change`, `bug`, or `improve`

2. **Task Description:**
   - What needs to be done from user perspective
   - Why this work is needed
   - Success criteria

3. **Reference Features:**
   - List features from `features/` that are related
   - These provide context without reading entire project
   - Reference `features/features-index.md` to find relevant features

4. **Test Plan:**
   - How to verify the backlog is complete
   - Should be testable by non-technical users when possible
   - Include curl commands, CLI steps, or web UI tests

5. **Priority:**
   - Set initial priority (will be refined during sprint planning)
   - Consider dependencies and business value

#### Updating Backlog Status

Track backlog lifecycle:
- **Not Started** - Backlog created but not in active sprint
- **In Progress** - Currently being worked on
- **In Review** - Code complete, awaiting review
- **Testing** - Under test
- **Done** - Completed and verified
- **Blocked** - Cannot proceed (identify blocker)

### Step 2: Sprint Planning

#### Creating a Sprint

Each sprint should have:

1. **Sprint Goals:**
   - Clear objectives for the sprint
   - What will be delivered to end users

2. **Backlog Selection (5-7 backlogs recommended):**
   - Mix of feature, change, bug, and improve types
   - Consider dependencies between backlogs
   - Ensure backlogs are properly sized

3. **End User Test Plan:**
   - Comprehensive test plan for the entire sprint
   - Should be executable by non-technical users
   - Could be used in a customer showcase/demo meeting
   - Include curl, web UI, or CLI commands
   - NOT just unit tests or log checks

4. **Sprint Timeline:**
   - Estimated duration
   - Key milestones

#### Sprint Structure

```
09-sprints/
├── sprints-index.md (links to all sprints, sorted by priority)
├── sprint-01/
│   ├── README.md (sprint goals, timeline, status)
│   ├── backlog-01-feature-user-auth.md
│   ├── backlog-02-bug-login-error.md
│   ├── backlog-03-improve-api-performance.md
│   └── test-plan.md (end user test plan for sprint)
├── sprint-02/
│   └── ...
```

### Step 3: Archiving Completed Sprints

When a sprint is completed:

1. **Move Sprint to Archive:**
   - Move entire sprint folder from `09-sprints/` to `99-archive/09-sprints/`
   - Maintain exact same structure in archive
   - Update `sprints-index.md` to mark sprint as archived

2. **Create Feature Entries:**
   - For each completed feature in the sprint
   - Create entry in `features/` folder
   - Update `features/features-index.md` with new features

3. **Feature Entry Should Include:**
   - Feature name and description
   - Reference to archived sprint/backlog
   - Key implementation details
   - Contracts/flows if necessary
   - Implementation documentation location

### Step 4: Maintaining Features Knowledge Base

The `features/` folder serves as a coding knowledge base (RAG for LLM):

1. **features-index.md:**
   - Index of all features with brief descriptions
   - Serves as LLM RAG index for quick reference
   - Should be concise but comprehensive
   - Include links to feature details

2. **Feature Files:**
   - `features/{feature-name}.md` - Design and approach
   - `features/flows/{feature-name}.md` - User flows and process flows (when needed)
   - `features/contracts/{feature-name}.md` - API contracts and interfaces (when needed)
   - `features/impl/{feature-name}.md` - Implementation tracking and coding notes

3. **Usage Pattern:**
   - Developers read `features-index.md` first
   - Only read detailed feature files when needed
   - Avoids reading entire project for each backlog

### Step 5: Prioritizing and Scheduling

#### Prioritization Criteria

When new backlogs are created (by code review or test skills):

1. **Assess Priority:**
   - Critical bugs: highest priority
   - Blocking changes: high priority
   - Improvements: medium priority
   - New features: based on business value

2. **Assign to Sprint:**
   - Add to current sprint if capacity allows
   - Otherwise, add to next planned sprint
   - Update `sprints-index.md` with priority order

3. **Check Dependencies:**
   - Ensure prerequisite backlogs are complete
   - Schedule dependent work in logical order

### Step 6: Status Reporting

Keep stakeholders informed:

1. **Sprint Progress:**
   - Update sprint README with current status
   - Track completed vs. remaining backlogs
   - Highlight any blockers or risks

2. **Overall Project Status:**
   - Update `sprints-index.md` with:
     - Current sprint status
     - Completed sprints count
     - Upcoming sprint plans
     - Backlog pipeline

3. **Features Delivered:**
   - Maintain count in `features-index.md`
   - Celebrate milestone deliveries

## Expected Project Structure

```
project-root/
├── 09-sprints/
│   ├── sprints-index.md (all sprints with priority sorted links)
│   ├── sprint-01/
│   │   ├── README.md
│   │   ├── backlog-01-feature-*.md
│   │   ├── backlog-02-change-*.md
│   │   ├── backlog-03-bug-*.md
│   │   ├── backlog-04-improve-*.md
│   │   └── test-plan.md
│   └── sprint-02/
│       └── ...
├── features/
│   ├── features-index.md (LLM RAG index)
│   ├── feature-user-auth.md
│   ├── feature-payment-processing.md
│   ├── flows/
│   │   └── feature-checkout-flow.md
│   ├── contracts/
│   │   └── api-contracts.md
│   └── impl/
│       └── feature-user-auth-impl.md
└── 99-archive/
    ├── 09-sprints/
    │   └── sprint-01/ (completed sprints)
    └── features/
        └── (optional archived features)
```

**Note**: Templates for sprints and backlogs are located in:
`dev-swarms-skills/dev-swarms-project-management/templates/`

## Available Templates

This skill provides the following templates in the `templates/` folder:

1. **sprint-template.md** - Template for creating new sprint folders
   - Sprint goals and timeline
   - Backlog tracking
   - Progress reporting structure

2. **backlog-template.md** - Template for creating backlog items
   - Comprehensive backlog structure
   - All backlog types (feature/change/bug/improve)
   - Test plan section

3. **sprints-index-template.md** - Template for sprints index file
   - Overall project tracking
   - Sprint pipeline
   - Statistics and metrics

Use these templates when creating new sprints and backlogs to ensure consistency across the project.

## Key Project Management Principles

1. **Small Batches**: 5-7 backlogs per sprint keeps velocity steady
2. **User Focus**: Test plans should be executable by end users
3. **Knowledge Base**: Features folder prevents context overload
4. **Clear Priorities**: Backlog order reflects business value and dependencies
5. **Sprint Goals**: Each sprint should deliver demonstrable user value
6. **Documentation**: Every feature has a home in the knowledge base
7. **Showcase Ready**: Sprint test plans should support demo meetings

## Sprint Planning Best Practices

1. **Balance Backlog Types:**
   - Don't fill sprint with only new features
   - Include bug fixes and improvements
   - Address technical debt regularly

2. **Consider Dependencies:**
   - Backend before frontend
   - Infrastructure before features
   - Core features before enhancements

3. **Realistic Sizing:**
   - Better to under-commit and over-deliver
   - Leave buffer for unexpected issues
   - Track velocity over time

4. **End User Focus:**
   - Sprint test plans should demonstrate real user value
   - Think about what you'd show in a customer demo
   - Every sprint should have a "story" to tell
