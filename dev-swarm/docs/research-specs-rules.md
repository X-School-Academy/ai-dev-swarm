# Rules for AI Research and Technical Specifications

**Purpose**: This document defines the rules for AI agents when conducting research and designing technical specifications. The goal is to prevent over-engineering, ensure content is appropriate for the project scale, and respect the expertise of the target audience.

---

## 1. Core Principle: Context-Aware Scaling

**The Golden Rule**: The depth, length, and complexity of documentation must match the complexity of the project.

*   **Do not** treat a simple script (L2) like an enterprise platform (L5).
*   **Do not** treat an open-source tool like a VC-backed startup.
*   **Do not** generate documentation that exceeds the volume of the actual code, unless specifically requested.

### Project Scale Definitions & Expectations

| Scale | Type | Example | Documentation Expectation |
| :--- | :--- | :--- | :--- |
| **L1** | Script | `cleanup.sh` | **None** or 1-paragraph README. |
| **L2** | Simple Tool | `mcp-skill-bridge` | **Minimal**. 1-page Tech Spec. No Market Research. |
| **L3** | Library/Service | Auth Service | **Focused**. Public API docs, simple architecture diagram. |
| **L4** | Application | Task Manager App | **Standard**. PRD, Architecture, UI/UX flows. |
| **L5** | Enterprise System | Banking Core | **Comprehensive**. Detailed compliances, scaling strategies, etc. |

---

## 2. Audience Definition: The Expert Developer

**Target Audience**: Senior Software Engineer / Architect.

**What to Avoid (The "Junior Trap"):**
*   **No Tutorials**: Do not explain *how* `git`, `python`, or `react` works.
*   **No Generic Boilerplate**: Do not copy-paste standard PEP 8 rules or OWASP Top 10 lists. Reference them by name only.
*   **No "Why this tech" essays**: Unless it's a controversial choice, don't justify standard choices (e.g., "Why use Python for scripting?").

**What to Provide:**
*   **Decisions**: "We chose library X over Y because of Z constraint."
*   **Constraints**: "Must run on 128MB RAM", "No external network access".
*   **Interfaces**: "The API will look like this..."
*   **Gotchas**: "Watch out for circular dependencies in module A."

---

## 3. Rules for Market Research (Stage 1)

**Rule 3.1: The "Open Source" Exemption**
*   **If** the project is an open-source developer tool, utility, or internal script:
    *   **SKIP** all Market Research.
    *   **SKIP** all Pricing/Revenue models.
    *   **SKIP** Competitor Analysis (unless comparing technical features for implementation ideas).
*   **Action**: Create `SKIP.md` with a single sentence: "Developer tool; market research not applicable."

**Rule 3.2: Validity over Volume**
*   **If** research is needed (e.g., for a commercial app), focus on **validation**, not **hallucination**.
*   **Do not** invent revenue projections for a pre-MVP idea.
*   **Do not** estimate Total Addressable Market (TAM) unless you have real data access (which AI mostly doesn't).

---

## 4. Rules for Technical Specifications (Stage 7)

**Rule 4.1: Conciseness is King**
*   **Tech Stack**: List the dependencies. Do not describe them.
    *   *Bad*: "FastAPI is a modern, fast (high-performance), web framework for building APIs..."
    *   *Good*: "Backend: FastAPI (v0.100+)"
*   **Coding Standards**: Reference standard tooling.
    *   *Bad*: 5 pages of indentation rules.
    *   *Good*: "Linting: `ruff`. Formatting: `black`. Type Checking: `mypy --strict`."

**Rule 4.2: Local vs. Enterprise Security**
*   **Context matters**.
*   **Localhost Tool**: Focus on input validation and file permission safety. Do not mention SOC 2, HIPAA, or rotating encryption keys unless relevant.
*   **Public SaaS**: Full security specs are required.

**Rule 4.3: Architecture over Implementation**
*   Describe **Data Flow**, **Component Boundaries**, and **State Management**.
*   Do not write pseudo-code for every single function.

---

## 5. The "SKIP" Mandate

**Rule 5.1: Absolute Adherence**
*   If you decide a stage (e.g., UX, Market Research, DevOps) is not needed, create a `SKIP.md` file.
*   **STOP** there. Do not create *any* other files in that directory.
*   **Do not** second-guess yourself by skipping the folder but then writing the content "just in case."

---

## Summary Checklist for AI

Before generating content, ask:
1.  **Is this needed?** (Or can I skip it?)
2.  **Is this appropriate for the scale?** (L2 vs L5)
3.  **Does the user already know this?** (Expert Audience)
4.  **Am I hallucinating business value?** (Open Source vs Commercial)
