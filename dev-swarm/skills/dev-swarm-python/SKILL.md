---
name: dev-swarm-python
description: Install and configure Python and uv. Use when setting up a Python environment or updating AGENTS.md.
---

# Python Environment Setup (uv)

This skill assists in installing and configuring the Python environment using `uv` for fast package and project management.

## When to Use This Skill

- User needs to set up Python development environment
- User wants to install or configure uv package manager
- User asks to initialize Python project
- User needs to update AGENTS.md with Python setup details

## Prerequisites

- `curl` (macOS/Linux) or PowerShell (Windows).

## Your Roles in This Skill

- **DevOps Engineer**: Install and configure Python environment using uv. Initialize Python projects with virtual environments. Manage Python versions and dependencies. Verify installations and troubleshoot setup issues. Update project documentation to reflect environment setup.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

As a {Role} [and {Role}, ...], I will {action description}

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.
## Instructions

### 1. Check Existing Installation

Before installing, check if `uv` is already installed.

```bash
uv --version
```

If installed, ask the user for confirmation before reinstalling or updating.

### 2. Install uv

**macOS and Linux:**

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**Windows:**

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

### 3. Initialize Project with uv

To initialize a new project or set up the current directory:

```bash
uv init
```

This will set up a virtual environment and `pyproject.toml`.

### 4. Python Version

`uv` manages Python versions automatically. The default targeted version is typically the latest stable or system default (e.g., Python 3.12).

To pin a specific version:
```bash
uv python pin 3.12
```

### 5. Update Project Configuration

After successful installation, update the `AGENTS.md` file in the root of the project to indicate that `uv` will be used for Python management.

**Example update to `AGENTS.md`:**

```markdown
...
## Python Management
- **uv**: Installed and configured for Python 3.12+.
...
```
