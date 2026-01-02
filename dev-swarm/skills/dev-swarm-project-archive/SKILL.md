---
name: dev-swarm-project-archive
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

As a {Role} [and {Role}, ...], I will {action description}

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

### Step 3: Handle src/ Submodule (if applicable)

**Check if src/ is a git submodule:**

1. **Run `git submodule status` to check if src/ is a submodule**
2. **If src/ is a submodule:**
   - Remove the submodule from the root project while keeping the working tree so it can be archived:
     ```bash
     # Remove the submodule entry from .git/config
     git submodule deinit -f src

     # Remove the gitlink from the index but keep the working tree
     git rm -f --cached src

     # Remove the src entry from .gitmodules
     git config -f .gitmodules --remove-section submodule.src || true
     git add .gitmodules

     # Detach the submodule working tree so it becomes a normal folder
     rm -f src/.git

     # Remove the submodule's git metadata after detaching
     rm -rf .git/modules/src
     ```
   - Verify `git status -s` shows src/ as untracked (not a submodule)
   - The src/ directory will now be untracked, and can be moved like a normal folder
3. **If src/ is NOT a submodule:**
   - Continue to the next step

### Step 4: Move Project Artifacts to Archive

Use `git mv` to move the following items into the archive folder:

1. **All stage folders:** `00-*` through `10-*` (e.g., `00-init-ideas/`, `01-market-research/`, etc.)
2. **Features folder:** `features/`
3. **Source code folder:** `src/` (now untracked if it was a submodule)
4. **Ideas file:** `ideas.md` (if it exists)

**Important:**
- Leave `99-archive/` in place (do not move it into itself)
- Do not touch unrelated files (e.g., `.*`, `dev-swarm/`, `README.md`, etc.)
- Use `git mv` for folders that are tracked by git
- For `src/` that was a submodule (now untracked), use regular `mv` command and then `git add` to track it

Example commands:
```bash
git mv 00-init-ideas 99-archive/{archive-folder-name}/
git mv 01-market-research 99-archive/{archive-folder-name}/
# ... continue for all stage folders that exist
git mv features 99-archive/{archive-folder-name}/

# If src/ was a submodule (now untracked):
mv src 99-archive/{archive-folder-name}/
git add 99-archive/{archive-folder-name}/src

# If src/ was not a submodule:
git mv src 99-archive/{archive-folder-name}/

git mv ideas.md 99-archive/{archive-folder-name}/  # if it exists
```

### Step 5: Recreate Empty Project Structure

Create fresh empty folders for the new project:

1. **Create all required folders and add `.gitkeep` files:**
   ```bash
   for dir in 00-init-ideas 01-market-research 02-personas 03-mvp 04-prd 05-ux 06-architecture 07-tech-specs 08-devops 09-sprints 10-deployment features src; do
     mkdir -p "$dir"
     touch "$dir/.gitkeep"
   done
   ```

### Step 6: Handle ideas.md

**If the user wants to start a new project from ideas.md:**
- Ensure `ideas.md` remains at the repo root (do not archive it or move it back if already archived)
- The user can then update `ideas.md` with new project ideas
- Do not auto-generate any new documentation unless explicitly requested

**If the user only wants to archive:**
- The `ideas.md` file will have been archived in Step 4
- The user can create a new `ideas.md` later

### Step 7: Ask for User Confirmation

Before committing, show the user:
1. What has been archived (list the folders/files moved)
2. The archive location (e.g., `99-archive/my-project/`)
3. The new empty structure that has been created
4. If src/ was a submodule, note that it has been removed from submodule configuration

Ask the user:
- "The project has been archived. Do you want to commit these changes to git?"

### Step 8: Commit to Git (if user confirms)

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
