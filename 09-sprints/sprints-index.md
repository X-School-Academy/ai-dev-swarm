# Sprints Index - MCP Skills Server

## Project Overview

**Project**: MCP Skills Server
**Goal**: Build a production-ready MCP server that exposes dev-swarms skills to any MCP-compatible AI agent
**MVP Target**: 10 P0 features delivering core value proposition
**Timeline**: 7 sprints (estimated 4-6 weeks for full implementation)

---

## Current Sprint Status

**Active Sprint**: Sprint 1 - Foundation & Infrastructure
**Status**: Not Started
**Start Date**: TBD
**Target Completion**: TBD

---

## Sprint Pipeline (Priority Order)

### Sprint 1: Foundation & Infrastructure
**Status**: 📋 Planned
**Goal**: Establish project structure, configuration management, and development environment
**Backlogs**: 6 items (all feature type)
**Key Deliverables**:
- Python project structure with pyproject.toml
- Configuration manager (CLI flags, env vars)
- Logging system
- Development tooling (black, ruff, mypy, pytest)

[Go to Sprint 1 →](./sprint-01/)

---

### Sprint 2: MCP Protocol Core
**Status**: 📋 Planned
**Goal**: Implement core MCP protocol handler with stdio transport
**Backlogs**: 6 items
**Key Deliverables**:
- MCP protocol handler
- stdio transport communication
- JSON-RPC message handling
- Basic list_tools and call_tool stubs
- Server lifecycle management

[Go to Sprint 2 →](./sprint-02/)

---

### Sprint 3: Skill Discovery & Registry
**Status**: 📋 Planned
**Goal**: Automatic skill discovery from filesystem and tool registration
**Backlogs**: 6 items
**Key Deliverables**:
- Skill discovery engine
- YAML frontmatter parsing
- Tool registry (in-memory)
- list_tools implementation
- Error handling for malformed skills

[Go to Sprint 3 →](./sprint-03/)

---

### Sprint 4: Skill Invocation & Path Resolution
**Status**: 📋 Planned
**Goal**: Implement skill invocation with SKILL.md content injection and file path resolution
**Backlogs**: 6 items
**Key Deliverables**:
- Skill invocation handler
- File I/O operations
- Path resolver and validation
- call_tool implementation
- Content processing and formatting

[Go to Sprint 4 →](./sprint-04/)

---

### Sprint 5: OAuth & Security
**Status**: 📋 Planned
**Goal**: Implement OAuth 2.1 authentication and comprehensive security measures
**Backlogs**: 7 items
**Key Deliverables**:
- OAuth validator
- Token introspection
- Provider integration (Google, GitHub, Azure)
- Input validation
- Path traversal prevention
- Secret masking in logs

[Go to Sprint 5 →](./sprint-05/)

---

### Sprint 6: Testing & Quality Assurance
**Status**: 📋 Planned
**Goal**: Achieve 80% test coverage with comprehensive test suite
**Backlogs**: 6 items
**Key Deliverables**:
- Unit tests (80% coverage)
- Integration tests
- Security tests
- Performance tests
- CI/CD workflow (GitHub Actions)
- Code quality gates

[Go to Sprint 6 →](./sprint-06/)

---

### Sprint 7: Documentation & Release Preparation
**Status**: 📋 Planned
**Goal**: Complete documentation and prepare for MVP release
**Backlogs**: 5 items
**Key Deliverables**:
- User documentation (README, setup guide)
- API documentation
- Architecture documentation
- Deployment guide
- Release packaging and distribution

[Go to Sprint 7 →](./sprint-07/)

---

## Sprint Statistics

**Total Sprints**: 7
**Total Backlogs**: 42
**Completed Sprints**: 0
**Completed Backlogs**: 0
**Overall Progress**: 0%

### Backlog Type Distribution
- **feature**: 35 (83%)
- **change**: 0 (0%)
- **bug**: 0 (0%)
- **improve**: 7 (17%)

---

## MVP P0 Feature Coverage

| P0 Feature | Sprint | Status |
|------------|--------|--------|
| P0-01: MCP Server with Stdio Transport | Sprint 2 | 📋 Planned |
| P0-02: Automatic Skill Discovery | Sprint 3 | 📋 Planned |
| P0-03: Skill Invocation & Context Injection | Sprint 4 | 📋 Planned |
| P0-04: File Path Resolution | Sprint 4 | 📋 Planned |
| P0-05: OAuth 2.1 Security | Sprint 5 | 📋 Planned |
| P0-06: Script Reference Handling | Sprint 4 | 📋 Planned |
| P0-07: Core Dev-Swarms Skills Access | Sprint 3 | 📋 Planned |
| P0-08: Setup Documentation | Sprint 7 | 📋 Planned |
| P0-09: Error Handling & Logging | Sprint 1 | 📋 Planned |
| P0-10: Basic Testing | Sprint 6 | 📋 Planned |

---

## Dependencies and Sequencing

**Critical Path**:
1. Sprint 1 (Foundation) → Sprint 2 (MCP Core) → Sprint 3 (Discovery) → Sprint 4 (Invocation) → Sprint 5 (Security)
2. Sprint 6 (Testing) can run partially parallel with Sprint 4-5
3. Sprint 7 (Documentation) requires all features complete

**Key Dependencies**:
- Sprint 2 depends on Sprint 1 (needs configuration, logging)
- Sprint 3 depends on Sprint 2 (needs MCP protocol handler)
- Sprint 4 depends on Sprint 3 (needs tool registry)
- Sprint 5 can start in parallel with Sprint 4
- Sprint 6 testing depends on Sprint 1-5 features
- Sprint 7 documentation depends on all sprints

---

## Risk & Mitigation

**Technical Risks**:
- OAuth 2.1 complexity (Sprint 5) - Plan extra time, reference MCP spec carefully
- Performance targets (<2s startup, <100ms invocation) - Profile early, optimize in Sprint 6
- MCP protocol compliance - Test with MCP Inspector throughout development

**Schedule Risks**:
- Sprints 1-3 are well-defined, low risk
- Sprint 5 (OAuth) is highest complexity - may need overflow
- Sprint 6 (Testing) may reveal issues requiring additional bug backlogs

**Mitigation Strategies**:
- Keep sprints small (5-7 backlogs each)
- Test continuously, not just in Sprint 6
- Reference MCP specification and FastMCP examples
- Maintain buffer capacity for discovered bugs/changes

---

## Archive

No sprints archived yet.

---

## Notes

**Sprint Sizing**: Each sprint targets 5-7 backlogs for manageable scope and steady velocity.

**Test-Driven Approach**: Write tests alongside feature development, not only in Sprint 6.

**Documentation**: Keep documentation current throughout - don't defer to Sprint 7.

**MVP Focus**: All sprints focus exclusively on P0 features. P1/P2 features deferred to post-MVP.

---

Last updated: 2025-12-26
