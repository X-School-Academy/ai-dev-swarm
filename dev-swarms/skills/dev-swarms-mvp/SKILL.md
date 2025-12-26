---
name: ai-builder-mvp
description: Define MVP scope, success metrics, and explicit out-of-scope items to focus on the smallest testable product. Use when user asks to define MVP, scope MVP, or start Stage 3 after personas.
---

# AI Builder - MVP Definition

This skill creates/updates the MVP (Minimum Viable Product) definition by identifying the smallest testable product that delivers core value, explicitly defining what NOT to build, and establishing success metrics for validation.

## When to Use This Skill

- User asks to "define MVP" or "scope MVP"
- User requests to start Stage 3 or the next stage after personas
- User wants to identify core features for MVP
- User wants to define success metrics
- User needs to clarify what should be excluded from MVP

## Prerequisites

This skill requires **02-personas** to be completed. The MVP scope will build upon user personas and prioritized user stories (P0/P1/P2) defined in that stage.

## Your Roles in This Skill

- **Product Manager**: Define MVP scope by selecting only P0 (must-have) features. Create success criteria and key metrics for MVP validation. Identify what "viable" means for the specific product. Define learning objectives and what needs to be validated.
- **Tech Manager (Architect)**: Design MVP architecture with future scalability in mind. Identify technical shortcuts acceptable for MVP and document technical debt. Plan for instrumentation and analytics from day one. Define what can be manual vs. automated in MVP.
- **UX Designer**: Simplify designs to MVP essentials. Create streamlined user flows for core features only. Focus on usability over polish. Ensure core user journey is intuitive.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Product Manager, I will define MVP scope by selecting only P0 features from user stories
- As a Product Manager, I will create success metrics and validation criteria for the MVP
- As a Tech Manager, I will identify technical shortcuts acceptable for MVP and document technical debt
- As a UX Designer, I will simplify user flows to MVP essentials while maintaining usability
- As a Product Manager, I will ask user to confirm MVP scope and success metrics before proceeding to PRD creation

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 0: Verify Prerequisites and Gather Context

1. **Check if `02-personas/` folder exists (mandatory):**
   - If NOT found: Inform user they need to create personas first, then STOP
   - If found: Read all files to understand:
     - User personas and their needs
     - User stories (especially P0 stories)
     - Acceptance criteria
     - Problem statement reference

2. **Check if `00-init-ideas/` folder exists (recommended):**
   - If found: Read to understand:
     - Problem statement
     - Value proposition
     - Owner requirements

3. **Check if `01-market-research/` folder exists (optional):**
   - If found: Read to understand:
     - Market gaps
     - Competitor features
     - Validation findings

4. **Check if `03-mvp/` folder exists:**
   - If exists: Read all existing files to understand current MVP definition
   - If NOT exists: Will create new structure

5. Proceed to Step 1 with gathered context

### Step 1: Create/Update MVP Structure

1. **Create/Update folder structure:**
   ```
   03-mvp/
   ├── README.md
   ├── mvp-scope.md
   ├── out-of-scope.md
   └── success-metrics.md
   ```

### Step 2: Create/Update MVP Scope Documentation

**If files already exist:** Update them based on latest context from personas and user feedback. Refine scope, adjust metrics, and ensure alignment with user stories.

**If files don't exist:** Create new files with comprehensive MVP definition.

**03-mvp/README.md:**
- Stage overview and objectives
- Specify the owners: Product Manager, Tech Manager, UX Designer
- Summary of MVP scope and approach
- Links to all MVP documentation files
- Why this MVP scope was chosen

**mvp-scope.md:**

Define the MVP scope following these principles:

1. **MVP Definition:**
   - What is the Minimum Viable Product for this project?
   - What is the smallest version that delivers the core value proposition?
   - What does "viable" mean for this specific product?

2. **Core Value Proposition:**
   - What is the ONE main problem this MVP solves?
   - How does it solve the problem differently than alternatives?
   - Why would early adopters choose this MVP?

3. **P0 Features Only (Must-Have):**
   - Extract P0 user stories from 02-personas/user-stories.md
   - List each P0 feature with:
     - Feature name and description
     - Which persona(s) it serves
     - Why it's essential for MVP (core value delivery)
     - Acceptance criteria from user stories
   - **Rule**: Only include features that are absolutely necessary to solve the core problem
   - Typically 5-10 P0 features maximum

4. **MVP User Journey:**
   - Describe the end-to-end user journey for the primary persona
   - Identify the critical path through the MVP
   - Ensure journey is complete and testable

5. **Target Users for MVP:**
   - Who are the early adopters/beta testers?
   - How many users are needed to validate the MVP?
   - What characteristics make them ideal for MVP testing?

6. **MVP Timeline:**
   - Estimated sprints to build MVP (typically 1-3 sprints with AI assistance)
   - Key milestones and checkpoints

**out-of-scope.md:**

Explicitly define what will NOT be in the MVP:

1. **P1 Features Deferred (Should-Have, but not MVP):**
   - List each P1 feature from user stories
   - Explain why it's deferred to post-MVP
   - When it should be added (e.g., "after MVP validation", "v1.1")

2. **P2 Features Excluded (Nice-to-Have):**
   - List each P2 feature from user stories
   - Confirm these are post-MVP enhancements

3. **Technical Shortcuts Acceptable for MVP:**
   - What technical debt is acceptable? (document it)
   - What can be manual instead of automated?
   - What third-party services can replace custom development?
   - What optimizations can be deferred?

4. **Design Polish Deferred:**
   - What design refinements are not MVP-critical?
   - What can use basic UI instead of polished design?

5. **Explicit Exclusions:**
   - Features that might seem related but are definitely out of scope
   - Common feature requests to explicitly reject for MVP
   - Integrations or platforms deferred to later

**Purpose**: This document prevents scope creep and keeps the team focused on core value.

**success-metrics.md:**

Define how MVP success will be measured:

1. **Learning Objectives:**
   - What do we need to learn from this MVP?
   - What assumptions are we testing?
   - What questions do we need answered?

2. **Key Metrics (Quantitative):**

   **Activation Metrics:**
   - What does "activated user" mean for this product?
   - Target activation rate (e.g., "60% of signups complete onboarding")

   **Engagement Metrics:**
   - How do we measure engagement? (DAU, WAU, MAU, feature usage, etc.)
   - Target engagement level (e.g., "users perform core action 3x per week")

   **Retention Metrics:**
   - What defines a retained user? (e.g., "returns within 7 days")
   - Target retention rate (e.g., "40% week-1 retention")

   **Conversion Metrics (if applicable):**
   - What conversions matter? (signup, payment, referral, etc.)
   - Target conversion rates

   **Performance Metrics:**
   - Page load time targets
   - API response time targets
   - Uptime targets (e.g., "99% uptime")

3. **Success Criteria (What "Success" Looks Like):**
   - Define minimum thresholds for each key metric
   - What results would indicate "Proceed to Full Product"?
   - What results would indicate "Iterate MVP"?
   - What results would indicate "Pivot"?

4. **Validation Milestones:**
   - Week 1: What should we observe?
   - Week 2-3: What patterns should emerge?
   - Week 4+: What validates product-market fit?

5. **Qualitative Feedback Goals:**
   - How many user interviews? (target: 20-50 users)
   - What feedback mechanisms? (surveys, support tickets, interviews)
   - What questions to ask users?
   - What user behaviors to observe?

6. **Analytics Implementation:**
   - What analytics tools will be used? (Google Analytics, Mixpanel, etc.)
   - What events need to be tracked?
   - What dashboards need to be created?

### Step 3: Ensure Traceability

Make sure MVP scope maps back to:
- P0 user stories from 02-personas/user-stories.md
- Primary persona needs from 02-personas/persona-primary.md
- Problem statement from 00-init-ideas (if available)
- Value proposition from 00-init-ideas (if available)

Ensure out-of-scope clearly excludes P1 and P2 features.

### Step 4: User Review

1. Present the MVP definition to the user
2. Highlight key insights:
   - Number of P0 features in MVP scope
   - What's explicitly excluded (P1/P2 features deferred)
   - Success metrics and validation approach
   - Estimated timeline (sprints)
3. Explain the rationale: why this is the smallest testable product
4. Ask if they want to proceed to the next stage (PRD creation)
5. Make adjustments based on user feedback

### Step 5: Commit to Git (if user confirms)

1. **If user confirms MVP definition is complete:**
   - Ask if they want to commit to git
2. **If user wants to commit:**
   - Stage all changes in `03-mvp/`
   - Commit with message: "Define MVP scope and success metrics (Stage 3)"

## Expected Project Structure

```
project-root/
├── 00-init-ideas/
│   └── [existing files]
├── 01-market-research/ (optional)
│   └── [existing files if present]
├── 02-personas/
│   └── [existing files]
└── 03-mvp/
    ├── README.md (with owners and summary)
    ├── mvp-scope.md (P0 features, user journey, timeline)
    ├── out-of-scope.md (P1/P2 deferred, exclusions)
    └── success-metrics.md (quantitative + qualitative metrics)
```

## Key MVP Principles

1. **Focus on Core Value**: Only features that deliver the central value proposition
2. **Smallest Testable Product**: If you can remove it and still solve the problem, it's not MVP
3. **Learn Fast**: Prioritize speed to market over perfection
4. **Measure Everything**: Define metrics before building
5. **Accept Imperfection**: Technical debt and rough edges are acceptable if documented
6. **Manual is OK**: Don't automate everything - some things can be manual in MVP
7. **Explicit Exclusions**: Clearly state what will NOT be built to prevent scope creep

## MVP Feature Selection Criteria

A feature is MVP only if ALL of these are true:
- ✅ **Must solve the core problem** for your target user
- ✅ **Must be testable** - can you measure if it works?
- ✅ **Must be achievable** in 1-3 sprints with AI assistance
- ✅ **Must differentiate** your product from alternatives
- ❌ **Cannot be nice-to-have** - if you can remove it and still solve the problem, it's NOT MVP

## Success Metrics Guidelines

1. **Keep metrics simple**: 3-5 key metrics maximum for MVP
2. **Focus on learning**: Metrics should answer your key questions
3. **Balance quant + qual**: Numbers tell you what, user feedback tells you why
4. **Set realistic targets**: Base targets on research and industry benchmarks
5. **Plan instrumentation**: Analytics must be implemented from day one
6. **Define decision criteria**: What results lead to Proceed/Iterate/Pivot/Perish?

## Deliverables

By the end of this stage, you should have:
- Clear MVP scope with P0 features only (5-10 features typically)
- Complete user journey for primary persona
- Explicit list of what's excluded (P1/P2 features, technical shortcuts)
- Quantitative success metrics with targets
- Qualitative feedback collection plan
- Learning objectives and validation questions
- Analytics implementation plan
- Foundation for PRD creation (next stage)
