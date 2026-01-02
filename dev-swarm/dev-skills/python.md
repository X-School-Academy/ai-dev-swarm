Use this skill when you need to install Python, pip, or uv.

This project uses `uv` to manage Python versions, packages, etc.

### Install uv
**On macOS and Linux:**
curl -LsSf https://astral.sh/uv/install.sh | sh

**On Windows:**
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

`uv init`

Default Python version: 3.12

Before any installation, the agent should check the existing installation and ask the user for confirmation.

This skill helps the user install and setup uv/Python, and updates the `AGENTS.md` file in the root of the project to inform the AI Agent that uv will be used.