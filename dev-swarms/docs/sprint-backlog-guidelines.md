# AI-Powered Agile (Human-in-the-Loop) Guidelines

## Purpose

This guideline defines a lightweight agile workflow designed for **AI-assisted development with human oversight**.

The goal is to:

* Keep work **small, verifiable, and reviewable**
* Allow **AI agents to move fast**
* Ensure **humans can always understand, test, and approve outcomes**

---

## Core Principles

1. **Small work items**

   * Smaller backlogs reduce hallucinations, rework, and review cost.
2. **Everything is testable**

   * If it can’t be tested, it’s not done.
3. **Frequent user-visible progress**

   * Every sprint must produce something reviewable.
4. **Human approval is mandatory**

   * AI executes, humans decide.

---

## Backlog Guidelines

Each backlog item **must meet all requirements below**.

### 1. Size limit

* Estimated change size:

  * **No more than 150 lines of code (LOC)**
  * Or **equivalent logical scope** (for non-code tasks)

> This is a guardrail, not a strict measurement.
> If a backlog feels “big,” it should be split.

---

### 2. Testability (required)

Each backlog item **must be testable** by **at least one** of the following methods:

* **Unit test**
* **UI testing**

  * Manual or automated
* **Command-line testing**

  * Shell scripts, `curl`, CLI tools, etc.
* **Log verification**

  * Checking expected logs during runtime

A backlog item without a clear test method **is not valid**.

---

### 3. Definition of Done (DoD)

Each backlog item must clearly state:

* What behavior is expected
* How it will be tested
* What result confirms success

A backlog is considered **Done** only when its test method(s) pass.

---

## Sprint Guidelines

Each sprint must follow the rules below.

### 1. Sprint size

* Maximum **7 backlog items per sprint**

This ensures:

* Predictable reviews
* Manageable AI execution
* Human attention stays focused

---

### 2. Sprint outcome

At the end of each sprint:

* The sprint **must be testable**
* The sprint **must be reviewable**

This can be done through:

* End-user testing
* A grouped demo
* A structured review session (logs, screenshots, CLI output, etc.)

---

### 3. Sprint acceptance

A sprint is accepted only if:

* All backlog items pass their defined tests
* A demo or review has been completed
* A human reviewer explicitly approves the sprint outcome

---

## Enhancements

These are optional but strongly recommended for smooth execution.

### Backlog verification checklist

Each backlog item may include a short checklist, for example:

* [ ] Unit tests pass
* [ ] `curl` command returns expected response
* [ ] UI action works as expected
* [ ] Logs contain expected output

---

### Outcome-based sizing

* Use **LOC as a warning signal**, not a hard rule
* Prefer judging size by **complexity and risk**, not raw code volume

---

## Summary

* Backlogs are **small and testable**
* Sprints are **limited and reviewable**
* AI moves fast, humans stay in control
* Every sprint delivers something real

This workflow is designed to support **AI-driven development at high speed without losing quality or accountability**.
