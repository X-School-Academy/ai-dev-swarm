# Out of Scope (Post-MVP)

Features explicitly deferred from the MVP release. These will be considered for future iterations based on user feedback and priorities.

---

## Deferred Features

### 1. Multi-Agent Support

**Feature:** Support for Codex, Gemini CLI, and other AI agents beyond Claude Code.

**Rationale:** Claude Code is the primary agent used in dev-swarm. Adding multi-agent support increases complexity (different execution models, config formats). MVP validates the core concept with one agent first.

**When to Add:** After MVP validates the headless execution approach with Claude Code.

---

### 2. Sprint Automation (One-Click)

**Feature:** Run a full backlog (dev → review → test) or entire sprint with one click.

**Rationale:** Sprint management is the most complex workflow. MVP focuses on basic stage execution. Once that works reliably, sprint automation can be layered on top.

**When to Add:** After basic stage execution is stable and user feedback confirms demand.

---

### 3. Run All Sprints

**Feature:** Execute all sprints in sequence automatically.

**Rationale:** Power-user feature for Alex (Dev). Primary personas (Sarah, Marcus) are served by basic execution. Full automation is a nice-to-have.

**When to Add:** After sprint automation is implemented.

---

### 4. Proposal Approval Workflow

**Feature:** Explicit approval step in UI before AI generates stage files.

**Rationale:** Currently P1. MVP can work with implicit approval (user runs stage, reviews output, reruns if needed). Explicit approval UI adds complexity.

**When to Add:** When user feedback indicates the need for more control over the workflow.

---

### 5. Auto-Commit After Steps

**Feature:** Automatically commit changes to git after each step completes.

**Rationale:** Useful but not critical for MVP. Users can commit manually or via terminal. Adds complexity around commit message generation and error handling.

**When to Add:** After core execution flow is stable.

---

### 6. Error Recovery Guidance

**Feature:** User-friendly error messages with suggested actions.

**Rationale:** MVP will show raw error output. Translating errors into actionable guidance requires significant effort and understanding of common failure modes.

**When to Add:** After collecting data on common errors from MVP usage.

---

### 7. Mobile/Tablet Support

**Feature:** Responsive design for mobile and tablet devices.

**Rationale:** Development work happens on desktop/laptop. Mobile support adds design and testing overhead without clear value.

**When to Add:** Only if user feedback strongly indicates mobile usage.

---

### 8. Multi-Project Support

**Feature:** Switch between multiple projects within the UI.

**Rationale:** MVP focuses on single project workflow. Multi-project adds state management complexity.

**When to Add:** When users need to manage multiple dev-swarm projects.

---

### 9. User Preferences/Settings

**Feature:** Configurable settings (AI agent selection, theme, etc.).

**Rationale:** MVP uses sensible defaults. Settings UI adds complexity without solving core pain points.

**When to Add:** After MVP when users request customization.

---

### 10. Prompt Customization UI

**Feature:** Edit AI prompts directly in the UI.

**Rationale:** Power-user feature. MVP uses prompts from config files. UI for editing adds significant complexity.

**When to Add:** When advanced users need prompt customization without editing files.

---

## Summary

| Feature | Priority | Complexity | Defer Reason |
|---------|----------|------------|--------------|
| Multi-Agent Support | P2 | High | Validate with Claude Code first |
| Sprint Automation | P2 | High | Focus on basic execution first |
| Run All Sprints | P2 | Medium | Power-user feature |
| Proposal Approval | P1 | Medium | Implicit approval works for MVP |
| Auto-Commit | P1 | Medium | Manual commit is acceptable |
| Error Recovery Guidance | P1 | High | Need error data first |
| Mobile Support | P3 | Medium | No clear demand |
| Multi-Project | P2 | High | Single project sufficient |
| User Settings | P2 | Medium | Defaults are fine |
| Prompt Customization UI | P3 | High | Power-user feature |
