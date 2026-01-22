---
name: dev-swarm-stage-tech-research
description: Validate technical feasibility through proof of concepts, technology spikes, and prototypes before committing to full development. Use when starting stage 04 (tech-research) or when user asks to validate technical assumptions or create PoCs.
---

# Stage 04 - Tech Research

Validate technical feasibility and reduce project risk by conducting proof of concepts (PoCs), technology spikes, API evaluations, and performance benchmarks before committing to full product development.

## When to Use This Skill

- User asks to start stage 04 (tech-research)
- User wants to validate technical assumptions or feasibility
- User asks about proof of concepts, technology spikes, or prototypes
- User needs to evaluate third-party APIs or services
- User wants to test critical technical paths before full development

## Your Roles in This Skill

See `dev-swarm/docs/general-dev-stage-rule.md` for role selection guidance.

## Role Communication

See `dev-swarm/docs/general-dev-stage-rule.md` for the required role announcement format.

## Pre-Stage Check

Before starting, verify previous stages:

1. Check if `00-init-ideas/`, `01-market-research/`, `02-personas/`, `03-mvp/` folders have content (not just `.gitkeep`)
2. If any previous stage is empty and has no `SKIP.md`:
   - Ask user: "Stage {XX} is not complete. Would you like to skip it or start from that stage first?"

## Instructions

### Step 1: Context Review

Read all files to understand the project:

- `ideas.md`
- `00-init-ideas/*.md` through `03-mvp/*.md` - All markdown files

Identify:
- Core technical requirements from MVP features
- Critical technical assumptions that need validation
- Third-party services or APIs mentioned
- Performance-sensitive operations
- Novel or unfamiliar technologies in scope

### Step 2: Create Stage Proposal

**General Rules:** See `dev-swarm/docs/general-dev-stage-rule.md` → "Create Stage Proposal Rules" section.

If this stage is skipped (has SKIP.md), execute the next non-skipped stage's agent skill. Otherwise, create the file `04-tech-research/README.md` with the following content:

#### 2.1 Stage Goal

Brief the goal in 2-3 paragraphs:
- What technical risks or assumptions need validation
- Why this research is critical before committing to full development
- How this will inform architecture and technical decisions
- What go/no-go decisions will be made based on findings

#### 2.2 File Selection

Select files from these options based on project needs:

**Feasibility Studies:**
- `feasibility-assessment.md` - Overall technical feasibility analysis with go/no-go recommendations
- `risk-matrix.md` - Technical risks identified and their mitigation strategies

**Proof of Concepts:**
- `poc/` - Directory containing proof of concept code and documentation
- `poc-results.md` - Summary of PoC outcomes with findings and recommendations

**Technology Evaluation:**
- `tech-evaluation.md` - Evaluation of candidate technologies, frameworks, or libraries
- `api-evaluation.md` - Assessment of third-party APIs and services (capabilities, limits, costs)

**Performance Research:**
- `performance-benchmarks.md` - Benchmark results for performance-critical operations
- `scalability-analysis.md` - Analysis of scalability constraints and solutions

**Integration Testing:**
- `integration-tests.md` - Results from testing key system integrations
- `compatibility-notes.md` - Compatibility findings across platforms, browsers, or devices

For each selected file, provide:
- Short description
- Why it's essential for this project
- What technical question or risk it addresses

#### 2.3 Request User Approval

Ask user: "Please check the Stage Proposal in `04-tech-research/README.md`. Update it directly or tell me how to update it."

### Step 3: Execute Stage Plan

Once user approves `04-tech-research/README.md`:

#### 3.1 Create All Planned Files

Create each file listed in the approved README:

- **For `.md` files:** Write comprehensive content based on actual research and testing
- **For `poc/` directory:** Create working proof of concept code with documentation

**Quality Guidelines:**
- Focus on validating the most critical assumptions first
- Document both successful and failed approaches
- Include quantitative data where possible (benchmarks, metrics, limits)
- Provide clear go/no-go recommendations with rationale
- Keep PoC code minimal but functional - just enough to validate the assumption
- Document any discovered constraints that will affect architecture decisions

#### 3.2 Request User Approval for Files

After creating all files:
- Provide a summary of what was researched and created
- Highlight critical findings and recommendations
- List any blocking issues or concerns discovered
- Present go/no-go recommendation with supporting evidence
- Ask: "Please review the tech research findings. You can update or delete files, or let me know how to modify them."

### Step 4: Finalize Stage

Once user approves all files:

#### 4.1 Documentation Finalization
- Sync `04-tech-research/README.md` to remove any deleted files
- Ensure all files are complete and well-formatted
- Verify all PoC code runs and demonstrates its purpose

#### 4.2 Prepare for Next Stage
- Summarize validated technical decisions for architecture stage
- Document any constraints discovered that affect PRD or UX
- List technology choices confirmed by research

#### 4.3 Announce Completion

Inform user:
- "Stage 04 (Tech Research) is complete"
- Summary of deliverables created
- Key findings and validated assumptions
- Any blocking issues or pivots needed
- "Ready to proceed to Stage 05 (PRD) when you are"

## Stage Completion Rules

See `dev-swarm/docs/general-dev-stage-rule.md` for stage completion, commit, and skip rules.

## Key Principles

- Validate high-risk assumptions early
- Fail fast - better to discover blockers now than after full development
- Document findings thoroughly for future reference
- Keep PoCs minimal but sufficient to prove the point
- Make clear go/no-go recommendations based on evidence
