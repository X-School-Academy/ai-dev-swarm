---
name: dev-swarms-draft-commit-message
description: Draft a conventional commit message when the user asks to commit code.
metadata:
  short-description: Draft an informative commit message.
---

Draft a conventional commit message that matches the change summary by git diff.

Requirements:
- Use `git diff` command first, then summary the changes
- Use the Conventional Commits format: `type(scope): summary`
- Use the imperative mood in the summary (for example, "Add", "Fix", "Refactor")
- Keep the summary under 72 characters
- If there are breaking changes, include a `BREAKING CHANGE:` footer