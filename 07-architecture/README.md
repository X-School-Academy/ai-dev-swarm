# Stage 07 - Architecture

## Stage Goal

This stage defines the system architecture for Dev Swarm WebUI, covering core components, data flow, APIs, infrastructure boundaries, and security constraints. The goal is to translate the MVP requirements into a concrete, buildable design that clearly separates frontend UI, backend orchestration, and external tool integrations.

Architecture design is critical here because the product replaces a CLI-driven workflow with deterministic code control. We need to make the orchestration explicit, ensure streaming output remains reliable, and constrain file and command access to the project root. Clear architecture prevents workflow regressions and keeps headless AI execution predictable.

This stage builds on the MVP scope, PRD requirements, UX layouts, and tech research results. Deliverables will provide a concise blueprint for Stage 08 (Tech Specs), including the system boundary, integration points, and API surface needed to implement the UI and backend.

## File Selection

### system-architecture.md
- What: High-level component architecture and responsibilities.
- Why essential: Aligns UI, backend, and agent execution into a single, shared mental model.
- Include: Core components, responsibilities, interfaces, and key runtime boundaries.

### architecture-diagram/
- What: One or two high-level architecture diagrams.
- Why essential: Visualizes component boundaries and interactions for faster review.
- Include: Frontend, backend, file system, AI agent runner, and streaming channel.

### tech-stack.md
- What: Finalized technology stack for frontend, backend, and tooling.
- Why essential: Confirms implementation choices are aligned with MVP and constraints.
- Include: Frameworks, runtime versions, libraries for streaming and markdown rendering, and local tooling.

### tech-stack-rationale.md
- What: Brief justification for each major technology decision.
- Why essential: Documents trade-offs and avoids re-litigating decisions later.
- Include: Why Next.js and Python were selected, and why SSE or WebSocket is preferred for streaming.

### api-design.md
- What: API architecture for backend endpoints and streaming.
- Why essential: Establishes how the UI triggers actions and receives output.
- Include: API style, auth assumptions, streaming approach, error model, and versioning strategy.

### api-endpoints.md
- What: List of required MVP endpoints.
- Why essential: Provides a concrete checklist for backend implementation.
- Include: Stage state, file listing, file read/write, run/stop execution, stream output, and sync.

### infrastructure-design.md
- What: Runtime layout and process model on a local machine.
- Why essential: Ensures consistent startup, ports, and process isolation.
- Include: Local ports, process boundaries, environment configuration, and log/output handling.

### integration-architecture.md
- What: External tool integrations and their responsibilities.
- Why essential: Claude Code, git, and file system access are core dependencies.
- Include: Invocation model, output capture, interruption handling, and failure modes.

### security-architecture.md
- What: Security boundaries and constraints for local execution.
- Why essential: The backend runs processes and file operations, so guardrails are mandatory.
- Include: Project-root scoping, allowed commands, input validation, and safe termination.

### data-flow-diagram/
- What: Data flow diagrams for key workflows.
- Why essential: Makes streaming and orchestration flows explicit.
- Include: Run stage flow, output streaming, stop execution, and sync refresh.

### scalability-plan.md
- What: Minimal scalability and reliability plan.
- Why essential: Prevents rework when expanding to multi-agent or larger projects.
- Include: Concurrency limits, streaming backpressure, and long-run stability considerations.

## Approval Request

Please check the Stage Proposal in `07-architecture/README.md`. Update it directly or tell me how to update it.
