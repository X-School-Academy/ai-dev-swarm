---
name: dev-swarm-project-restore
description: Restore a project from 99-archive back to the workspace root, including ideas.md and the src submodule. Use when the user asks to restore a previously archived project.
---

# AI Builder - Project Restore

This skill restores an archived project from `99-archive/` back to its original workspace structure, including re-adding the `src` submodule.

## When to Use This Skill

- User asks to restore a project from `99-archive/`
- User wants to undo the project archive and resume work
- User needs `ideas.md` and stage folders restored to the workspace root

## Your Roles in This Skill

- **Project Manager**: Coordinate the restore flow, confirm the target archive, and ensure the workspace is consistent after restore.
- **DevOps Engineer**: Handle git operations, submodule re-attachment, and repository integrity.
- **Technical Writer**: Document decisions and confirm restore outcomes for human approval.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

As a {Role} [and {Role}, ...], I will {action description}

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 1: Archive the Current Project

Archive the current project using agent skill `dev-swarm-project-archive`.

### Step 2: Restore the Archived Project

Follow the restore procedure in `references/restore-procedure.md`.

## Expected Output

- Archived project content restored to workspace root
- `ideas.md` present at the root
- `src/` re-added as a submodule at the correct commit
- `99-archive/` retains the archived snapshot

## Key Principles

- Keep the restore process reversible and traceable in git history
- Prefer existing git history to restore the `src` submodule state
- Ask for user approval before destructive or irreversible operations
