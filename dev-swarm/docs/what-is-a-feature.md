# What is a Feature in Software Design?

## Definition

A **feature** is a function from the end user's viewpoint. It is something the user can directly see and directly operate. Internal functions or workflows that only help implement a user-facing function are **not** features.

## Feature Ownership

Features are defined by the **Product Manager** (or the equivalent product owner role) in collaboration with key stakeholders. Engineering and design partners can propose or refine feature ideas, but final feature definition and prioritization responsibility sits with product.

## User Perspective

### Types of Users

Software serves different types of users:
- **End Users**: Non-technical individuals who interact with the software to accomplish specific tasks
- **Power Users**: Technical users who may integrate the software as a tool within their workflow
- **System Users**: Other software systems that consume the software's capabilities via APIs or integrations

### Features as Value Propositions

When we discuss features, we mean **user-facing capabilities**, not internal implementation details. A feature must meet both criteria:

1. The user can see it with their own eyes.
2. The user can operate it by hand.

## Feature Characteristics

A well-defined feature typically:
- Is visible in the user interface or user experience
- Is directly operable by the user (clicks, taps, inputs, gestures)
- Solves a specific user problem or need
- Provides measurable value or benefit
- Can be independently described and understood
- Contributes to the overall software functionality

## Feature Sizing and Implementation Scope

The scope and granularity of a feature are often influenced by the technical approach, specifically the frameworks and libraries utilized. What is defined as a single "feature" can vary based on the effort and complexity involved in its implementation:

- **Library-Driven (Bundled Features):** When using high-level libraries that abstract complexity, multiple related capabilities might be treated as a single feature. For example, if using a framework like `fastmcp` where adding `stdio`, `http`, and `sse` transports only requires a simple parameter change, the entire "Multi-Transport MCP Client" is considered a single feature.
- **Custom Implementation (Granular Features):** If the same capabilities must be built from scratch without supporting libraries, each transport might be defined as its own distinct feature (e.g., "Implement SSE Transport") because of the significant individual effort, design, and testing required for each.

## Examples

### What is a Feature

- **User Authentication**: A login page where a user enters credentials to access their account.
- **Product Search**: A search bar that allows users to find items by name or category.
- **Data Export**: A button that allows a user to download their activity log as a CSV file.
- **REST API Endpoint**: For a *System User*, a documented endpoint `/api/v1/orders` that returns order data in JSON format.
- **CLI Command**: For a *Power User*, a command like `swarm init` that sets up a new project structure.
- **Dark Mode Toggle**: A settings switch that changes the application's visual theme.

### What is NOT a Feature

- **Database Optimization**: Adding an index to a table to speed up queries (Internal implementation).
- **Code Refactoring**: Cleaning up legacy code to improve maintainability without changing behavior.
- **CI/CD Pipeline**: Setting up GitHub Actions to run tests automatically on every push.
- **Third-party Library Integration**: Adding a logging library to the project (Unless it provides a user-facing log viewer).
- **Security Hardening**: Implementing JWT token rotation logic (Internal mechanism).
- **Bug Fixes**: Repairing a broken existing feature (Fixing a bug is not a new feature, though it may be a "Feature Request" in some contexts, it is technically maintenance).

### The "Who" Defines the Feature

Whether a specific capability is considered a feature depends entirely on the target audience.

- **Logging to Console or File**:
    - **Is a Feature** if the end user is a **Power User** or **System User** (e.g., a developer or sysadmin) who relies on logs for monitoring, debugging, or auditing.
    - **Is NOT a Feature** if the end user is a **non-technical user** (e.g., a standard website visitor). For them, logging is an internal technical detail that doesn't provide direct value or interaction.

- **Configuration via Text Files (YAML/JSON)**:
    - **Is a Feature** for **Power Users** who prefer "Infrastructure as Code," version controlling their configs, and batch automation.
    - **Is NOT a Feature** for **End Users** who expect a graphical settings menu (GUI) and find raw text editing error-prone and intimidating.

- **API Rate Limiting Headers**:
    - **Is a Feature** for **System Users** (developers building integrations) because `X-RateLimit-Remaining` headers allow them to programmatically manage their request flow and avoid bans.
    - **Is NOT a Feature** for **End Users** of the main application. They only care that the app works; knowing how many requests remain per minute is irrelevant technical noise to them.
