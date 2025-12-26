---
name: dev-swarms-personas
description: Create/Updates detailed user personas and prioritized user stories based on target users and market research. Use when user asks to create personas, define user stories, or start Stage 2 after market research or init-ideas.
---

# AI Builder - Personas & User Stories

This skill creates/updates detailed user personas and prioritized user stories to define who will use the product and what they need to accomplish.

## When to Use This Skill

- User asks to "create personas" or "define user stories"
- User requests to start Stage 2 or the next stage after market-research
- User wants to define target users in detail
- User wants to create/update user stories

## Prerequisites

This skill requires **00-init-ideas** to be completed. Market research (01-market-research) is optional.

## Your Roles in This Skill

- **Product Manager**: Create user stories in "As a [role], I want [feature] so that [benefit]" format. Prioritize features based on user needs and business goals (P0/P1/P2). Define acceptance criteria for each feature.
- **UX Designer**: Create user personas based on target user research. Map user journeys and identify user needs and pain points. Ensure personas reflect real user behaviors and goals.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Product Manager, I will create user stories based on the problem statement and target users
- As a Product Manager, I will prioritize features into P0/P1/P2 categories based on business value
- As a UX Designer, I will create detailed personas from market research and user data
- As a UX Designer, I will map user journeys to identify pain points and needs
- As a Product Manager, I will ask user to confirm personas and user stories before proceeding to MVP definition

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 0: Verify Prerequisites and Gather Context

1. **Check if `00-init-ideas/` exists (mandatory):**
   - If NOT found: Inform user they need to init ideas first, then STOP
   - If found: Read all files to understand:
     - Problem statement
     - Target users
     - Value proposition
     - Owner requirements

2. **Check if `01-market-research/` exists (optional):**
   - If found: Read files to understand:
     - Target audience segments
     - Competitor user bases
     - Market validation findings
     - Gap analysis
   - If NOT found: Continue with just init-ideas data (acceptable for test projects)

3. Proceed to Step 1 with gathered context

### Step 1: Create/Update Personas Structure

1. **Create/Update folder structure:**
   ```
   02-personas/
   ├── README.md
   ├── persona-primary.md
   ├── persona-secondary.md (optional)
   └── user-stories.md
   ```

### Step 2: Create/Update User Personas

**02-personas/README.md:**
- Stage overview and objectives
- Specify the owners: Product Manager, UX Designer
- Summary of personas created
- Links to persona and user stories documents
- Methodology used to create personas

**persona-primary.md:**

Create a detailed primary persona including:

- **Basic Information:**
  - Name (fictional but relatable)
  - Age range
  - Occupation/Role
  - Location/Context
  - Photo or avatar description (optional)

- **Background:**
  - Professional background
  - Technical proficiency level
  - Relevant experience

- **Goals & Motivations:**
  - Primary goals when using this product
  - What success looks like for them
  - Key motivations and drivers

- **Pain Points & Frustrations:**
  - Current challenges and problems
  - Frustrations with existing solutions
  - Unmet needs

- **Behaviors & Preferences:**
  - How they currently solve the problem
  - Preferred tools and platforms
  - Usage patterns and habits
  - Communication preferences

- **Needs from This Product:**
  - Must-have features (P0)
  - Important features (P1)
  - Nice-to-have features (P2)

- **Quote:**
  - A fictional quote that captures their mindset

**persona-secondary.md (optional):**

If there's a distinct secondary user segment, create a second persona following the same structure. Only create this if:
- There's a clearly different user segment
- Their needs differ significantly from primary persona
- They represent a meaningful portion of target users

If secondary persona is not needed, you can skip creating this file.

### Step 3: Create/Update User Stories

**user-stories.md:**

Create prioritized user stories using the format: "As a [role], I want [feature] so that [benefit]"

Organize stories by priority:

**P0 - Must Have (Core Features):**
- Critical features that deliver the core value proposition
- Without these, the product doesn't solve the problem
- 5-10 user stories typically

**P1 - Should Have (Important Features):**
- Important features that enhance the experience
- Significantly improve usability or value
- 5-15 user stories typically

**P2 - Nice to Have (Enhancement Features):**
- Features that add polish or convenience
- Not critical for initial launch
- Can be deferred to later versions
- 5-10 user stories typically

**Format for each user story:**
```
### [Priority] - [Story Title]

**User Story:**
As a [persona name/role],
I want [specific capability],
So that [benefit/value achieved].

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

**Notes:**
- Any additional context
- Related stories or dependencies
- Technical considerations (if any)
```

### Step 4: Ensure Traceability

Make sure user stories map back to:
- Problem statement from 00-init-ideas
- Value proposition from 00-init-ideas
- Gap analysis from 01-market-research (if available)
- Owner requirements from 00-init-ideas

### Step 5: User Review

1. Present the personas and user stories to the user
2. Highlight key insights:
   - Number of personas created
   - P0/P1/P2 story distribution
   - How stories address the core problem
3. Ask if they want to proceed to the next stage (MVP definition)
4. Make adjustments based on user feedback

### Step 6: Commit to Git (if user confirms)

1. **If user confirms personas and user stories are complete:**
   - Ask if they want to commit to git
2. **If user wants to commit:**
   - Stage all changes in `02-personas/`
   - Commit with message: "Define user personas and prioritized user stories (Stage 2)"

## Expected Project Structure

```
project-root/
├── 00-init-ideas/
│   └── [existing files]
├── 01-market-research/ (optional)
│   └── [existing files if present]
└── 02-personas/
    ├── README.md (with owners and summary)
    ├── persona-primary.md
    ├── persona-secondary.md (optional)
    └── user-stories.md (P0/P1/P2 prioritized)
```

## Key Principles

- Create realistic, relatable personas based on actual target users
- Focus on goals, pain points, and behaviors, not just demographics
- Write user stories from the user's perspective, not the business perspective
- Prioritize ruthlessly - P0 should be minimal core features only
- Use clear acceptance criteria that can be tested
- Ensure every story delivers user value
- Trace stories back to problem statement and value proposition
- Keep stories small and specific enough to implement

## User Story Best Practices

1. **Focus on user value**: Every story should deliver tangible benefit
2. **Keep stories independent**: Each story should be implementable separately
3. **Make stories testable**: Acceptance criteria should be verifiable
4. **Use persona names**: Reference specific personas in stories
5. **Avoid technical details**: Focus on "what" and "why", not "how"
6. **Prioritize based on value**: P0 = MVP, P1 = Important, P2 = Nice-to-have

## Deliverables

By the end of this stage, you should have:
- 1-2 detailed user personas representing target users
- 15-35 user stories organized by priority (P0/P1/P2)
- Clear acceptance criteria for each story
- Traceability from stories to problem statement and value proposition
- Foundation for MVP scope definition
