# Stage 6: System Architecture

## Overview

This stage defines the system architecture for the MCP Skills Server, including components, data flow, and deployment boundaries.

## Owners

- **Tech Manager (Architect)** (Lead): Define architectural principles, component boundaries, system structure
- **Backend Architect**: Design internal modules, data structures, OAuth integration
- **DevOps Engineer**: Review deployment feasibility, scaling strategy, operational aspects

## Product Context

**Important**: The MCP Skills Server is a **command-line subprocess** that communicates via **stdio** (standard input/output), not a traditional web application.

**Architecture Characteristics**:
- **Process Model**: Single-process subprocess (spawned by MCP client)
- **Communication**: stdio transport (stdin for requests, stdout for responses, stderr for logs)
- **Storage**: File-based (reads SKILL.md files from filesystem, no database)
- **Stateless**: Each request is independent, no session state
- **Security**: OAuth 2.1 token validation (validates but doesn't issue tokens)

## Architectural Principles

1. **Simplicity First**: Keep architecture simple, avoid over-engineering
2. **File-Based Storage**: Use filesystem as data source (no database needed)
3. **Stateless Design**: No persistent state, restart recovers any issues
4. **Fast Startup**: Optimize for <2 second startup time
5. **Graceful Degradation**: Continue operating when non-critical errors occur
6. **Clear Separation**: Distinct modules with single responsibilities
7. **Security by Design**: OAuth validation on every request
8. **Observable**: Comprehensive logging for troubleshooting

## Documentation Structure

- [`system-overview.md`](./system-overview.md) - Components and their responsibilities
- [`architecture-diagram.md`](./architecture-diagram.md) - Visual diagrams of system structure
- [`data-flow.md`](./data-flow.md) - Request flow and data transformations
- [`deployment-boundaries.md`](./deployment-boundaries.md) - Deployment model and scaling strategy

## Key Architectural Decisions

### Decision 1: Stdio Transport (Not HTTP)

**Rationale**: MCP specification uses stdio for subprocess communication
**Trade-offs**:
- ✅ Simple, no network layer needed
- ✅ Process isolation, security
- ✅ Standard subprocess model
- ⚠️ Limited to local/containerized deployment
- ⚠️ Lower throughput than HTTP (acceptable for use case)

**Alternative (P2)**: SSE transport for remote deployment

### Decision 2: File-Based Storage (No Database)

**Rationale**: Skills are SKILL.md files on filesystem
**Trade-offs**:
- ✅ No database setup/management
- ✅ Skills managed with git
- ✅ Simple, reliable
- ✅ Fast file system reads
- ⚠️ No querying capabilities (not needed)
- ⚠️ Limited to local filesystem

**Alternative**: Not needed for this use case

### Decision 3: Stateless Server

**Rationale**: Each MCP request is independent
**Trade-offs**:
- ✅ Simple restart/recovery
- ✅ No state synchronization
- ✅ Horizontally scalable (multiple instances)
- ⚠️ Re-read files on each request (mitigated by caching in v1.0)

### Decision 4: OAuth Validation Only (Not Issuance)

**Rationale**: MCP server validates tokens issued by external OAuth provider
**Trade-offs**:
- ✅ Leverage existing OAuth infrastructure
- ✅ Enterprise integration friendly
- ✅ No token management complexity
- ⚠️ Depends on external OAuth provider availability

## Component Count

**Total Components**: 9 internal modules + 2 external dependencies

- **Internal Modules**: 9 (CLI, MCP Handler, Discovery, Registry, Invocation, OAuth, Config, Logger, FileIO)
- **External Dependencies**: 2 (OAuth Provider, Filesystem)

## Next Steps

After architecture approval:
→ Proceed to Stage 7: Tech Specs (technology choices, frameworks, coding standards)

---

Last updated: 2025-12-26
