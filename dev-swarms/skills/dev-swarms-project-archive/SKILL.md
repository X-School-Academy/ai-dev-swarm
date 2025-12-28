---
name: dev-swarms-project-archive
description: Archive the current project so the repo is ready for a brand-new project start from ideas.md. Use when user asks to archive the project or start a new project from ideas.md.
---

# AI Builder - Project Archive

This skill archives the current project and resets the repository structure for a brand-new project start, preserving all existing work in an organized archive.

## When to Use This Skill

- User asks to archive the current project
- User asks to start a new project from the current `ideas.md`
- User wants to reset the repository structure while preserving existing work

## Your Roles in This Skill

- **Project Manager**: Coordinate the archiving process, organize project artifacts, and ensure clean transition. Track project structure and dependencies.
- **DevOps Engineer**: Execute git operations, manage repository structure, and ensure version control integrity.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Project Manager, I will determine the current project name from documentation
- As a DevOps Engineer, I will create archive folder and move project artifacts using git mv
- As a DevOps Engineer, I will recreate empty project structure with .gitkeep files
- As a Project Manager, I will ask user to confirm before committing changes
- As a DevOps Engineer, I will commit the archive changes to git

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 1: Determine the Current Project Name

Determine the project name in this priority order:

1. **First priority:** Use the title from `src/README.md` if it exists
2. **Second priority:** Use the title from `00-init-ideas/README.md` if it exists
3. **Third priority:** Use the title from the repo root `README.md` if it exists
4. **If none exist:** Ask the user to provide a project name

Extract the title from the first `# Title` or `## Title` heading in these files.

### Step 2: Create Archive Folder

1. **Create the archive folder path:**
   - Base path: `99-archive/{project-name}`
   - If the folder already exists, append `-YYYYMMDD` suffix (e.g., `99-archive/my-project-20250115`)
   - Use the current date for the suffix

2. **Create the archive folder:**
   ```bash
   mkdir -p 99-archive/{archive-folder-name}
   ```

### Step 3: Move Project Artifacts to Archive

Use `git mv` to move the following items into the archive folder:

1. **All stage folders:** `00-*` through `10-*` (e.g., `00-init-ideas/`, `01-market-research/`, etc.)
2. **Features folder:** `features/`
3. **Source code folder:** `src/`
4. **Ideas file:** `ideas.md` (if it exists)

**Important:**
- Leave `99-archive/` in place (do not move it into itself)
- Do not touch unrelated files (e.g., `.*`, `dev-swarms/`, `README.md`, etc.)
- Use `git mv` for all move operations to preserve git history

Example commands:
```bash
git mv 00-init-ideas 99-archive/{archive-folder-name}/
git mv 01-market-research 99-archive/{archive-folder-name}/
# ... continue for all stage folders that exist
git mv features 99-archive/{archive-folder-name}/
git mv src 99-archive/{archive-folder-name}/
git mv ideas.md 99-archive/{archive-folder-name}/  # if it exists
```

### Step 4: Recreate Empty Project Structure

Create fresh empty folders for the new project:

1. **Create all required folders and add `.gitkeep` files:**
   ```bash
   for dir in 00-init-ideas 01-market-research 02-personas 03-mvp 04-prd 05-ux 06-architecture 07-tech-specs 08-devops 09-sprints 10-deployment features src; do
     mkdir -p "$dir"
     touch "$dir/.gitkeep"
   done
   ```

### Step 5: Handle ideas.md

**If the user wants to start a new project from ideas.md:**
- Ensure `ideas.md` remains at the repo root (do not archive it or move it back if already archived)
- The user can then update `ideas.md` with new project ideas
- Do not auto-generate any new documentation unless explicitly requested

**If the user only wants to archive:**
- The `ideas.md` file will have been archived in Step 3
- The user can create a new `ideas.md` later

### Step 6: Ask for User Confirmation

Before committing, show the user:
1. What has been archived (list the folders/files moved)
2. The archive location (e.g., `99-archive/my-project/`)
3. The new empty structure that has been created

Ask the user:
- "The project has been archived. Do you want to commit these changes to git?"

### Step 7: Commit to Git (if user confirms)

**If the user confirms:**

1. **Stage all changes:**
   ```bash
   git add .
   ```

2. **Commit with the message:**
   ```bash
   git commit -m "Archive project and reset structure"
   ```

3. **Confirm completion:**
   - Let the user know the archive is complete
   - Remind them they can now start a new project with `ideas.md` or by running the init-ideas skill

## Expected Output Structure

After running this skill, the repository structure should look like:

```
project-root/
├── README.md (unchanged)
├── ideas.md (optional - kept if user wants to start new project from it)
├── 00-init-ideas/ (empty with .gitkeep)
├── 01-market-research/ (empty with .gitkeep)
├── 02-personas/ (empty with .gitkeep)
├── 03-mvp/ (empty with .gitkeep)
├── 04-prd/ (empty with .gitkeep)
├── 05-ux/ (empty with .gitkeep)
├── 06-architecture/ (empty with .gitkeep)
├── 07-tech-specs/ (empty with .gitkeep)
├── 08-devops/ (empty with .gitkeep)
├── 09-sprints/ (empty with .gitkeep)
├── 10-deployment/ (empty with .gitkeep)
├── features/ (empty with .gitkeep)
├── src/ (empty with .gitkeep)
└── 99-archive/
    └── {project-name}/
        ├── 00-init-ideas/
        ├── 01-market-research/
        ├── ... (all archived stage folders)
        ├── features/
        ├── src/
        └── ideas.md (if it existed)
```

## Key Principles

- Preserve all existing work in a clearly named archive folder
- Use git operations to maintain history
- Reset the repository to a clean state ready for a new project
- Give the user control over when to commit changes
- Support seamless transition to a new project while keeping the old one accessible
