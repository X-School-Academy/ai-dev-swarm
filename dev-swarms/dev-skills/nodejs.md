Use this skill when you need to install Node.js, npm, or pnpm.

This project uses:

### nvm (Node Version Manager)
**macOS/Linux:**
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

**Windows:**
https://github.com/coreybutler/nvm-windows/releases/download/1.2.2/nvm-setup.exe

### Node version
lts/jod -> v22.20.0

### pnpm
We use pnpm instead of npm.

npm install --global corepack@latest
corepack enable pnpm
pnpm --version

Before any installation, the agent should check the existing installation and ask the user for confirmation.

For any `npx package`, we should use `pnpm dlx package` in this project

This skill helps the user install and setup nvm/Node.js/pnpm, and updates the `AGENTS.md` file in the root of the project to inform the AI Agent that pnpm will be used for this project.
