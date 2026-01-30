# User Personas

## Primary Persona 1: Sarah Chen - Product Manager

**Role:** Product Manager at a mid-size tech company
**Age:** 34
**Tech Comfort:** Low-to-moderate (comfortable with web apps, avoids command line)

**Background:**
Sarah has 8 years of product management experience. She works closely with engineering teams but doesn't write code herself. She's used tools like Jira, Figma, and Notion extensively. She's excited about AI-assisted development but frustrated that most AI coding tools require terminal knowledge.

**Goals:**
- Drive product ideation without depending on developers for every step
- Quickly prototype and validate ideas before committing engineering resources
- Maintain visibility into project progress without asking for status updates
- Review and approve AI-generated documentation in a familiar interface

**Frustrations:**
- Feels excluded from AI development tools because they're CLI-based
- Has to ask developers to run commands on her behalf
- Can't easily review or edit AI outputs without switching between apps
- Doesn't understand terminal error messages when things go wrong

**Quote:** "I want to use AI to build products faster, but I shouldn't need to learn bash to do it."

**Scenario:** Sarah has an idea for an internal tool. She opens Dev Swarm WebUI, writes her ideas, and clicks through each stage. She reviews proposals, provides feedback, and approves documents—all without opening a terminal.

---

## Primary Persona 2: Marcus Rivera - Business Analyst

**Role:** Business Analyst / Consultant
**Age:** 41
**Tech Comfort:** Low (uses spreadsheets and docs, minimal technical tools)

**Background:**
Marcus has 15 years of experience documenting business requirements and processes. He works with multiple clients and needs to quickly understand and document their needs. He's heard about AI code generation but assumes it's only for programmers.

**Goals:**
- Document business requirements in a structured way
- Generate initial technical specifications without deep technical knowledge
- Collaborate with developers by providing clear, AI-assisted documentation
- Track project progress visually across multiple phases

**Frustrations:**
- Technical tools feel intimidating and exclusive
- Can't participate in modern AI-assisted workflows
- Dependent on others to translate his requirements into technical specs
- No visibility into whether his requirements are being implemented correctly

**Quote:** "I know what the business needs, but I can't speak 'developer.' I need a tool that speaks my language."

**Scenario:** Marcus uses Dev Swarm WebUI to document a client's requirements. He works through the ideas and personas stages, generating structured documentation that developers can directly use for implementation.

---

## Secondary Persona: Alex Kim - Full-Stack Developer

**Role:** Senior Full-Stack Developer
**Age:** 29
**Tech Comfort:** High (comfortable with CLI, prefers efficiency)

**Background:**
Alex has 6 years of development experience and uses the terminal daily. They're proficient with Claude Code and other AI coding tools via CLI. They appreciate the power of command-line tools but sometimes want a visual overview, especially when managing multiple stages or debugging AI behavior.

**Goals:**
- Get a quick visual overview of project stage completion
- Interrupt and correct AI operations without hunting through terminal output
- Switch between UI and terminal based on the task at hand
- Run sprint backlogs efficiently with one-click automation

**Frustrations:**
- Mentally tracking which stages are complete across projects
- No easy way to interrupt a misbehaving AI agent mid-execution
- Switching between terminal, file browser, and editor constantly
- Re-running commands when AI produces inconsistent outputs

**Quote:** "I love the CLI, but sometimes I just want to click a button and see what's happening across all stages."

**Scenario:** Alex uses Claude Code in the terminal for detailed coding tasks but switches to Dev Swarm WebUI to get an overview of sprint progress and run backlogs with one-click automation. When the AI goes off track, they interrupt it from the UI and correct course.

---

## Persona Priority for MVP

1. **Sarah (PM)** - Primary focus. If the UI works for Sarah, it works for most non-technical users.
2. **Marcus (BA)** - Secondary focus. Similar needs to Sarah but even less technical.
3. **Alex (Dev)** - Tertiary focus. Nice-to-have features; they can fall back to CLI if needed.

The MVP should prioritize making the core workflow accessible to Sarah and Marcus. Alex's power-user features (like one-click sprint automation) can be added incrementally.
