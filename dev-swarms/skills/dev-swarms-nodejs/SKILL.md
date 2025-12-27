---
name: dev-swarms-nodejs
description: Install and configure Node.js, npm, and pnpm using nvm. Use when setting up a Node.js environment or updating AGENTS.md.
---

# Node.js Environment Setup

This skill assists in installing and configuring the Node.js environment, including `nvm` (Node Version Manager), Node.js (LTS), and `pnpm`.

## Prerequisites

- For macOS/Linux: `curl` or `wget`.
- For Windows: PowerShell.

## Instructions

### 1. Check Existing Installation

Before installing, check if Node.js or pnpm are already installed.

```bash
node --version
pnpm --version
```

If they are installed and meet requirements, you may skip installation steps. Always ask the user for confirmation before overwriting or modifying existing installations.

### 2. Install nvm (Node Version Manager)

**macOS and Linux:**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```
*Note: You may need to restart the shell or source the profile file (e.g., `source ~/.zshrc`) to use `nvm`.*

**Windows:**

Download and run the installer from:
https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe

### 3. Install Node.js

Install the latest LTS (Long Term Support) version of Node.js.

```bash
nvm install lts/jod
nvm use lts/jod
```
*(As of this writing, `lts/jod` points to v22.x. Adjust if a specific version is required).*

### 4. Install pnpm

We use `pnpm` instead of `npm` for this project.

Enable `pnpm` via `corepack` (included with recent Node.js versions):

```bash
npm install --global corepack@latest
corepack enable pnpm
```

verify:
```bash
pnpm --version
```

### 5. Executing Packages (dlx)

For any command that typically uses `npx package`, use `pnpm dlx package` in this project.

### 6. Update Project Configuration

After successful installation, update the `AGENTS.md` file in the root of the project to indicate that `pnpm` will be used for package management.

**Example update to `AGENTS.md`:**

```markdown
...
## Package Manager
- **pnpm**: Enabled and configured.
...
```
