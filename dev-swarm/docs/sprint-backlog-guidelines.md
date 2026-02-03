# AI-Driven Development Sprint & Backlog Guidelines

## Purpose

This guideline defines a workflow specifically designed for **AI-Driven Development**.
Unlike traditional human-centric agile methods where work is broken down into minute technical tasks for human developers, this approach leverages the AI's ability to handle larger scopes and context.

The goal is to:
*   Treat **AI as the primary builder**
*   Focus on **delivering complete user value** rather than incremental code changes
*   Ensure every iteration results in a **tangible, demo-able product**

## Core Principles

1.  **Backlogs are Features**
    *   We do not split work into "backend task," "frontend task," or "database task."
    *   Each backlog item corresponds directly to a **Feature** as defined in `dev-swarm/docs/what-is-a-feature.md`.
    *   The AI implements the *entire* feature across the stack in one go.

2.  **Sprints are Cumulative Demo-able Milestones**
    *   A sprint is not just a timebox; it is a scoped **Cumulative Demo-able Milestone**.
    *   The first sprint delivers a minimum demo-able product. Each subsequent sprint adds new features, progressively evolving the product. At the end of every sprint, the result must be a cohesive, demo-able update to the software.

3.  **Managerial Collaboration**
    *   **Project Manager (PM)** defines the *Value* and *Scope* (What & Why).
    *   **Tech Manager (TM)** assesses *Feasibility* and *Architecture* (How).
    *   These two roles must work closely to define a sprint that is both valuable and technically achievable by the AI.

## Backlog Guidelines

Each backlog item is a **Feature**.

### 1. Definition

*   A backlog item is **NOT** a technical task (e.g., "Create API endpoint").
*   A backlog item **IS** a user-facing capability (e.g., "Allow users to log in with Google").
*   Refer strictly to **[What is a Feature?](./what-is-a-feature.md)** for the definition.

### 2. Scope & Completeness

*   **Self-Contained**: A backlog item must include all necessary changes (DB, Backend, Frontend, Tests) to make the feature work.
*   **Testable**: It must be verified by the "User Perspective" criteria (Visible & Operable).

## Sprint Guidelines

A sprint is a committed scope of work that results in a verifiable milestone.

### 1. Sprint Definition

*   The **Project Manager** and **Tech Manager** jointly define the sprint.
*   The selection of backlogs should form a cohesive narrative (e.g., "The User Authentication Sprint" or "The Reporting Dashboard Sprint").

### 2. Sprint Outcome: The Cumulative Increment

*   **Demo-able**: The output is not just merged code, but an updated version of the application.
*   **End-User Ready**: The focus is on the *product* evolution, not just passing unit tests.
*   **Review**: The review process involves walking through the updated product to verify the new features in context.

## Summary

*   **Backlog = Feature** (End-to-end implementation)
*   **Sprint = Cumulative Milestone** (Progressive product evolution)
*   **PM + TM = Sprint Architects** (Joint definition of scope and feasibility)
*   **AI = Builder** (Executes the full stack implementation)
