# AI-Driven Development Sprint and Backlog Guidelines

## Purpose

This guideline defines a workflow designed for AI-driven development.
Unlike traditional agile methods that split work into small technical tasks for human developers, this approach leverages AI’s ability to handle larger scopes and more context.

Goals:
- Treat AI as the primary builder.
- Focus on delivering complete user value rather than incremental code changes.
- Ensure every iteration results in a tangible, demoable product.

## Core principles

### 1) Backlogs are features
- Do not split work into “backend tasks,” “frontend tasks,” or “database tasks.”
- Each backlog item is a feature (see: dev-swarm/docs/what-is-a-feature.md).
- The AI implements the entire feature end-to-end across the stack.

### 2) Sprints are cumulative, demoable milestones
- A sprint is a scoped, cumulative milestone, not just a timebox.
- The first sprint delivers a minimum demoable product.
- Each subsequent sprint adds features while keeping the product cohesive and demoable.

### 3) Managerial collaboration
- Project Manager (PM): defines value and scope (what and why).
- Tech Manager (TM): assesses feasibility and architecture (how).
- PM and TM work together to define a sprint that is both valuable and technically achievable by the AI.

## Backlog guidelines

Each backlog item is a feature.

### Definition
- A backlog item is not a technical task (example: “Create an API endpoint”).
- A backlog item is a user-facing capability (example: “Allow users to log in with Google”).
- Use the “What is a Feature?” definition (./what-is-a-feature.md).
- **Testable**: Must be verifiable via automated tests (unit, integration, or E2E) and from the user’s perspective.
- **Reviewable**: The implementation must be easy for a human to review in several minutes. It must be treated as normal code development.
- **Atomic**: Avoid large chunks of code. Keep changes small to ensure high-quality human review.

### Scope and completeness
- Self-contained: includes all necessary changes (DB, backend, frontend, tests) to make the feature work.

### Backlog types
Each backlog item should be one of the following:
- A small slice of the sprint feature, or
- A step in the sprint feature that a user can take, or
- A small, user-visible and user-testable feature.

### How to split a sprint into backlogs
Start with the user story.

Ask: “If I’m a user, what are the steps I take?”

Example journey for “Register a DNS domain”:
- Check domain availability.
- Register the domain.
- See it in my domain list.

Convert each step into a backlog item.

## Sprint guidelines

A sprint is a committed scope of work that results in a verifiable milestone.

### Sprint definition
- PM and TM jointly define the sprint.
- Selected backlogs should form a cohesive narrative (example: “User Authentication Sprint”).
- A sprint can be defined as a user story.
- The first sprint must produce a working mini product (a “Hello World” experience).
- Every sprint after that adds value without breaking what already works.

### Sprint outcome: the cumulative increment
- Demoable: the output is not just merged code; it is an updated version of the application.
- End-user ready: focus on product evolution, not only unit tests.
- Review: walk through the updated product to verify new features in context.

## Summary
- Backlog = feature (end-to-end implementation).
- Sprint = cumulative milestone (progressive product evolution).
- PM + TM = sprint architects (joint definition of scope and feasibility).
- AI = builder (executes the full-stack implementation).
