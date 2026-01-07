# Software Development Scale Classification Standard

**(SD-SCS v1.0)**

## 1. Purpose of This Standard

This document defines a **clear, purpose-driven classification system** for software development projects.

Its goals are to:

* Prevent **over-engineering**
* Align **engineering effort with business intent**
* Make scope decisions explicit and auditable
* Enable AI agents, developers, and managers to work from the **same scale language**

This standard applies to **all software**, from one-off scripts to large commercial products.

---

## 2. Core Classification Dimensions

Every project MUST be classified using **two dimensions**:

### Dimension A — Project Purpose

Why the software exists.

### Dimension B — Development Scale

How complex and long-lived the software is expected to be.

Both dimensions MUST be defined **before development begins**.

---

## 3. Dimension A — Project Purpose Classification

Each project MUST choose **exactly one primary purpose**.

### P1 — Personal Tool

**Definition:**
Built for an individual or a very small group, primarily to save time or automate tasks.

**Examples:**

* Shell scripts
* Personal Python tools
* Simple Agent SKill
* Simple MCP Server
* Local automation

**Key Characteristics:**

* No external users
* No support obligations
* Disposable or replaceable

**Hard Limits:**

* No UI frameworks
* No database unless absolutely required
* No auth system

---

### P2 — Internal Tool

**Definition:**
Built for internal teams inside a company or organization.

**Examples:**

* Admin dashboards
* Internal APIs
* DevOps tools

**Key Characteristics:**

* Controlled users
* Predictable usage
* Internal support only

**Hard Limits:**

* No public API guarantees
* No enterprise compliance
* No multi-tenant design

---

### P3 — Open Source Project

**Definition:**
Built for public use, collaboration, or ecosystem impact.

**Examples:**

* CLI tools
* Libraries
* Frameworks

**Key Characteristics:**

* Public visibility
* Community expectations
* Long-term maintainability

**Hard Limits:**

* No proprietary lock-in
* No business-critical assumptions
* No revenue dependency by default

---

### P4 — Commercial / Profit-Oriented Product

**Definition:**
Built to generate revenue directly or indirectly.

**Examples:**

* SaaS products
* Paid apps
* Subscription platforms

**Key Characteristics:**

* Paying users
* Reliability expectations
* Legal and security considerations

**Hard Limits:**

* No “best effort” reliability
* No undocumented behavior
* No manual-only operations

---

## 4. Dimension B — Development Scale Levels

Each project MUST choose **one scale level**.

---

### L0 — One-Off Execution

**Description:**
Run once or very rarely.

**Typical Tech:**
Shell, single Python file

**Explicitly NOT Included:**

* Reusability
* Configuration system
* Tests

---

### L1 — Reusable Script

**Description:**
Used repeatedly by the same people.

**Typical Tech:**
Python script, Node script

**Included:**

* Arguments
* Error handling
* Minimal documentation

**NOT Included:**

* Frameworks
* Databases
* Deployment pipelines

---

### L2 — Tool with Environment Setup

**Description:**
Needs dependencies, setup, or packaging.

**Typical Tech:**
CLI tools, small services, Simple MCP Server, Simple Agent Skill

**Included:**

* Dependency management
* Install instructions
* Basic tests

**Required Stages & Files:**

*   **00-init-ideas/**
    *   `README.md`: Project level indication & file list.
    *   `problem-solution.md`
    *   `owner-requirement.md`
*   **07-tech-specs/**
    *   `README.md`
    *   `tech-stack.md`: Coding language (default Python) & packages.
*   **08-devops/**
    *   `README.md`
    *   `development_environment.md`: Dev env setup. Python (default `venv` via `uv`) or Node.js (default `pnpm`).
*   **10-deployment/** (Mandatory for Tools/Agent Skills)
    *   `README.md`: Indicate target (e.g., `dev-swarm/py_scripts`, `dev-swarm/skills`).
    *   `deployment.md`
*   **09-sprints/**: Skip.

**NOT Included:**

* User accounts
* UI dashboards
* Multi-service architecture

---

### L3 — Single-Service Application

**Description:**
A real application with users.

**Typical Tech:**
Web app, API server

**Included:**

* Configuration system
* Database
* Auth (if required)

**NOT Included:**

* Microservices
* Message queues
* Multi-region deployment

---

### L4 — Product MVP

**Description:**
Minimal viable product for real users.

**Typical Tech:**
Web + backend, storage, analytics

**Included:**

* User lifecycle
* Monitoring
* Backup strategy

**NOT Included:**

* Enterprise RBAC
* Perfect scalability
* Full automation

---

### L5 — Multi-Platform MVP

**Description:**
Same product across web and mobile.

**Included:**

* API versioning
* Release pipelines
* Crash reporting

**NOT Included:**

* Offline-first by default
* Plugin ecosystems

---

### L6 — Growth-Stage Product

**Description:**
Actively scaling users and team.

**Included:**

* Observability
* SLOs
* Incident response

---

### L7 — Platform / Ecosystem

**Description:**
Others build on top of this system.

**Included:**

* Strong contracts
* Backward compatibility
* Governance

---

## 5. Mandatory Classification Statement

Every project MUST include the following statement in its root documentation:

```
Project Purpose: Px
Development Scale: Lx

This project explicitly DOES NOT include:
- Item A
- Item B
- Item C
```

This statement is **binding**.

---

## 6. Recommended Purpose × Scale Matrix

| Purpose ↓ / Scale → | L0–L1 | L2 | L3 | L4 | L5 | L6–L7 |
| ------------------- | ----- | -- | -- | -- | -- | ----- |
| Personal Tool (P1)  | ✅     | ✅  | ❌  | ❌  | ❌  | ❌     |
| Internal Tool (P2)  | ✅     | ✅  | ✅  | ⚠️ | ❌  | ❌     |
| Open Source (P3)    | ⚠️    | ✅  | ✅  | ⚠️ | ❌  | ❌     |
| Commercial (P4)     | ❌     | ⚠️ | ✅  | ✅  | ✅  | ✅     |

Legend:

* ✅ Recommended
* ⚠️ Allowed with justification
* ❌ Not allowed

---

## 7. Why This Standard Exists (Design Principle)

> **Most failed projects are not technical failures —
> they are scale mismatches.**

This standard enforces:

* Intent clarity
* Scope discipline
* Sustainable development
