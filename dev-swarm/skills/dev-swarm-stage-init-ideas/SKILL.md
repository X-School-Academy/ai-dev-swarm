---
name: dev-swarm-stage-init-ideas
description: Transform raw ideas into structured business requirements by clarifying the problem, defining the solution, and identifying target users. Use when starting stage 00 (init-ideas) or when user asks to define business requirements from ideas.
---

# Stage 00 - Init Ideas

Transform raw ideas into structured business requirements by clarifying the problem, defining the solution, identifying target users, and establishing success metrics.

## When to Use This Skill

- User asks to start stage 00 (init-ideas)
- User wants to transform ideas into business requirements
- User wants to clarify problem statement or define solution

## Your Roles in This Skill

See `dev-swarm/docs/general-dev-stage-rule.md` for role selection guidance.

## Role Communication

See `dev-swarm/docs/general-dev-stage-rule.md` for the required role announcement format.

## Pre-Stage Check

This is the first stage. Verify `ideas.md` exists with content before proceeding.

## Instructions

### Step 1: Context Review

Read the ideas file to understand the user's initial concept:

- `ideas.md`

### Step 2: Create Stage Proposal

**General Rules:** See `dev-swarm/docs/general-dev-stage-rule.md` → "Create Stage Proposal Rules" section.

Create the file `00-init-ideas/README.md` with the following content:

#### 2.1 Stage Goal

Brief the goal in 2-3 paragraphs:
- What this stage aims to achieve (transforming raw ideas into actionable business requirements)
- Why clarifying the problem and solution is critical before proceeding
- What deliverables will be produced

#### 2.2 File Selection

Select files from these options based on project needs:

**Problem & Solution Definition:**
- `problem-statement.md` - Clear articulation of the problem being solved
- `solution-overview.md` - High-level description of the proposed solution

**Brainstorm:**
- `brainstorm-mindmap/` - Diagrams expanding user's initial ideas
- `feature-opportunities.md` - New features discovered through brainstorming

**Requirements & Users:**
- `quick-questions.md` - List of unknowns and clarification questions
- `tech-requirements.md` - Technical requirements extracted from the ideas
- `target-users.md` - Initial definition of target audience segments

**Success & Risk:**
- `success-metrics.md` - KPIs and criteria for measuring success
- `assumptions-risks.md` - Key assumptions and potential risks

For each selected file, provide:
- Short description
- Why it's essential for this project
- Key information it should include

#### 2.3 Request User Approval

Ask user: "Please check the Stage Proposal in `00-init-ideas/README.md`. Update it directly or tell me how to update it."

### Step 3: Execute Stage Plan

Once user approves `00-init-ideas/README.md`:

#### 3.1 Create All Planned Files

Create each file listed in the approved README:

- **For `.md` files:** Write comprehensive content based on the ideas.md file
- **For diagram folders:** Follow `dev-swarm/docs/mermaid-diagram-guide.md` to create related diagrams files

**Quality Guidelines:**
- Extract and clarify implicit requirements from the ideas
- Ask clarifying questions rather than making assumptions
- Ensure problem statement is specific and measurable
- Define target users with enough detail for persona creation in Stage 02

#### 3.2 Request User Approval for Files

After creating all files:
- Provide a summary of what was created
- Highlight key insights and clarifications made
- Ask: "Please review the init-ideas documents. You can update or delete files, or let me know how to modify them."

### Step 4: Finalize Stage

Once user approves all files:

#### 4.1 Documentation Finalization
- Sync `00-init-ideas/README.md` to remove any deleted files
- Ensure all files are complete and well-formatted
- Check that all diagrams render correctly

#### 4.2 Prepare for Next Stage
- Summarize key findings for reference in later stages
- Identify areas that need market research validation (Stage 01)

#### 4.3 Announce Completion

Inform user:
- "Stage 00 (Init Ideas) is complete"
- Summary of deliverables created
- Key insights discovered
- "Ready to proceed to Stage 01 (Market Research) when you are"

## Stage Completion Rules

See `dev-swarm/docs/general-dev-stage-rule.md` for stage completion, commit, and skip rules.

## Key Principles

- Extract and clarify implicit requirements
- Ask clarifying questions rather than assuming
- Focus on specific, measurable outcomes
- Support smooth transition to market research
