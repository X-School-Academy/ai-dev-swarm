# User Stories - MCP Skills Server

## Overview

This document contains prioritized user stories for the MCP Skills Server, organized by priority:
- **P0 (Must Have)**: 10 stories - Core features required for MVP
- **P1 (Should Have)**: 12 stories - Important features for usability and adoption
- **P2 (Nice to Have)**: 8 stories - Enhancement features for polish

All stories reference our personas:
- **Maya** - AI Platform Engineer (Primary Persona)
- **James** - Engineering Team Lead (Secondary Persona)

---

## P0 - Must Have (Core Features)

### P0-01: MCP Server Implementation with Stdio Transport

**User Story:**
As Maya (AI Platform Engineer),
I want an MCP server that implements the stdio transport protocol correctly,
So that I can integrate it with any MCP-compatible AI agent client using the standard communication method.

**Acceptance Criteria:**
- [ ] MCP server runs as a subprocess with stdin/stdout communication
- [ ] Implements MCP 2025-06-18 specification correctly
- [ ] Handles JSON-RPC messages according to spec
- [ ] Starts up in under 2 seconds
- [ ] Properly handles shutdown and cleanup
- [ ] Works with standard MCP clients (Claude Code, custom agents)

**Notes:**
- Use FastMCP framework for Python implementation
- Follow MCP specification for stdio transport requirements
- Reference: https://modelcontextprotocol.io/specification/2025-06-18/basic/transports

---

### P0-02: Automatic Skill Discovery and Registration

**User Story:**
As Maya (AI Platform Engineer),
I want the MCP server to automatically discover all skills in the dev-swarms/skills directory on startup,
So that I don't have to manually configure each skill and new skills are available immediately.

**Acceptance Criteria:**
- [ ] Server reads dev-swarms/skills directory on launch
- [ ] Discovers all skill folders containing SKILL.md files
- [ ] Parses SKILL.md YAML frontmatter (name, description)
- [ ] Registers each skill as an MCP tool
- [ ] Logs discovered skills for debugging
- [ ] Handles missing or malformed SKILL.md files gracefully with clear error messages

**Notes:**
- Skills directory path should be configurable
- Support nested skill folders
- Validate SKILL.md format before registration

---

### P0-03: Skill Invocation with SKILL.md Context Injection

**User Story:**
As Maya (AI Platform Engineer),
I want the MCP server to return the complete SKILL.md content when a skill is invoked,
So that the AI agent receives all the instructions and context needed to execute that skill properly.

**Acceptance Criteria:**
- [ ] When skill tool is called, server reads corresponding SKILL.md file
- [ ] Returns complete SKILL.md content including frontmatter and body
- [ ] Content is formatted for injection into AI agent's context
- [ ] File reading errors are handled gracefully
- [ ] Response time is under 100ms per invocation
- [ ] Supports skills with large SKILL.md files (up to 100KB)

**Notes:**
- Consider caching SKILL.md content after first read
- Ensure proper handling of markdown formatting
- Test with actual dev-swarms skills

---

### P0-04: File Path Resolution to Project Root

**User Story:**
As Maya (AI Platform Engineer),
I want all file paths referenced in SKILL.md to be automatically converted to absolute paths relative to the project root,
So that AI agents can correctly read referenced files regardless of where the MCP server is running.

**Acceptance Criteria:**
- [ ] Server identifies all file path references in SKILL.md content
- [ ] Converts relative paths to absolute paths from project root
- [ ] Handles different path formats (Unix, Windows)
- [ ] Preserves paths that are already absolute
- [ ] Documents path resolution logic for users
- [ ] Works correctly when server runs from subdirectories

**Notes:**
- Project root should be configurable
- Consider using path patterns like `{PROJECT_ROOT}/path/to/file`
- Test on macOS, Linux, and Windows

---

### P0-05: OAuth 2.1 Security Implementation

**User Story:**
As Maya (AI Platform Engineer),
I want the MCP server to implement OAuth 2.1 authentication according to MCP 2025-06-18 specification,
So that it meets enterprise security requirements and can be approved for production use.

**Acceptance Criteria:**
- [ ] Implements OAuth 2.1 with PKCE flow
- [ ] Validates access tokens properly (per RFC spec)
- [ ] Supports resource parameter in token requests (RFC 8707)
- [ ] Implements secure, non-deterministic session IDs
- [ ] Does not use sessions for authentication (per MCP spec)
- [ ] Provides clear documentation on OAuth 2.1 setup and configuration
- [ ] Includes examples for common OAuth providers (Google, GitHub, Azure)

**Notes:**
- Reference MCP security best practices: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
- Use FastMCP 2.0's built-in enterprise auth features
- Avoid "token passthrough" anti-pattern

---

### P0-06: Script Reference Handling

**User Story:**
As Maya (AI Platform Engineer),
I want script files referenced in skills to provide instructions for the AI agent to invoke them rather than showing source code,
So that AI agents know to execute scripts as commands instead of trying to read and modify script code.

**Acceptance Criteria:**
- [ ] Identifies script files in skill directories (.sh, .py, etc.)
- [ ] For scripts, provides execution instructions instead of source code
- [ ] Instructions include: script purpose, required arguments, expected output
- [ ] Works for common script types (bash, Python, Node.js)
- [ ] Documents script invocation pattern in SKILL.md
- [ ] Handles cases where scripts don't exist gracefully

**Notes:**
- Scripts should be marked in SKILL.md with special syntax
- Consider adding script metadata (description, args) in skill folders
- Security: Document that AI agents will execute these scripts

---

### P0-07: Core Dev-Swarms Skills Access

**User Story:**
As James (Engineering Team Lead),
I want my team to have access to essential dev-swarms skills (init-ideas, code-development, draft-commit-message) through any AI agent,
So that we can start using the structured methodology immediately for our most common tasks.

**Acceptance Criteria:**
- [ ] Server exposes at minimum these skills: init-ideas, code-development, draft-commit-message
- [ ] Skills work when invoked from different MCP clients (Cursor, Claude Code, custom agents)
- [ ] Each skill returns complete context and instructions
- [ ] File references in skills resolve correctly
- [ ] Skills produce expected outputs when followed by AI agents

**Notes:**
- These are the minimum viable skills for useful methodology
- Test with actual dev-swarms skill files
- Ensure skill dependencies are handled (if any)

---

### P0-08: Clear Setup and Configuration Documentation

**User Story:**
As James (Engineering Team Lead),
I want clear, step-by-step documentation for setting up the MCP Skills Server,
So that my team members can install and configure it within 30 minutes without needing deep technical expertise.

**Acceptance Criteria:**
- [ ] README includes installation instructions (pip install, uv setup)
- [ ] Configuration guide explains all required settings
- [ ] Quick start guide gets users running in under 30 minutes
- [ ] Troubleshooting section covers common issues
- [ ] Example configurations provided for different use cases
- [ ] Prerequisites clearly listed (Python version, uv, dependencies)

**Notes:**
- Target audience: developers familiar with Python but new to MCP
- Include screenshots or terminal output examples
- Provide example MCP client configuration

---

### P0-09: Error Handling and Logging

**User Story:**
As Maya (AI Platform Engineer),
I want clear error messages and comprehensive logging,
So that I can quickly diagnose and fix issues when integrating the MCP server into our platform.

**Acceptance Criteria:**
- [ ] All errors include actionable error messages
- [ ] Logs show skill discovery process
- [ ] Logs show skill invocations with timing
- [ ] Log levels configurable (DEBUG, INFO, WARNING, ERROR)
- [ ] Errors distinguish between configuration issues, skill issues, and runtime errors
- [ ] Logs written to stderr (stdout reserved for MCP protocol)

**Notes:**
- Use Python logging module with proper configuration
- Consider structured logging (JSON format) for production
- Document logging configuration options

---

### P0-10: Basic Testing and Validation

**User Story:**
As Maya (AI Platform Engineer),
I want example tests that show how to validate the MCP server is working correctly,
So that I can verify the integration in our CI/CD pipeline and catch regressions early.

**Acceptance Criteria:**
- [ ] Test suite covers skill discovery
- [ ] Test suite covers skill invocation
- [ ] Test suite covers file path resolution
- [ ] Tests can run in CI/CD environment
- [ ] Documentation explains how to run tests
- [ ] Tests use realistic dev-swarms skills

**Notes:**
- Use pytest for Python testing
- Include both unit tests and integration tests
- Mock MCP client for integration tests

---

## P1 - Should Have (Important Features)

### P1-01: Complete 10-Stage Dev-Swarms Methodology

**User Story:**
As James (Engineering Team Lead),
I want access to all dev-swarms skills covering the complete 10-stage methodology,
So that my team can use structured workflows from initial idea through production deployment.

**Acceptance Criteria:**
- [ ] All 15+ dev-swarms skills are available via MCP
- [ ] Skills include: market-research, personas, mvp, prd, ux, architecture, tech-specs, devops, project-management, code-review, code-test, deployment
- [ ] Skills are organized logically (by stage or category)
- [ ] Each skill properly handles its dependencies and context
- [ ] Skills work together as a cohesive methodology

**Notes:**
- This is P1 not P0 because MVP can work with subset of skills
- Ensures full value proposition is delivered
- Test skill workflows end-to-end

---

### P1-02: Performance Optimization

**User Story:**
As Maya (AI Platform Engineer),
I want the MCP server to be performant under typical load (10-20 concurrent skill invocations),
So that it doesn't become a bottleneck in our AI platform even with multiple developers using it simultaneously.

**Acceptance Criteria:**
- [ ] Handles 10 concurrent skill invocations without failures
- [ ] Startup time consistently under 2 seconds
- [ ] Skill invocation response time under 100ms (95th percentile)
- [ ] Memory usage stays under 200MB under normal load
- [ ] Performance metrics documented

**Notes:**
- stdio transport has inherent limitations (0.64 req/sec under heavy load per research)
- Document known limitations and when to consider SSE transport
- Optimize skill caching and file I/O

---

### P1-03: Deployment Guide with Examples

**User Story:**
As Maya (AI Platform Engineer),
I want deployment examples for common scenarios (local, Docker, cloud),
So that I can deploy the MCP server in our infrastructure without trial-and-error.

**Acceptance Criteria:**
- [ ] Local development setup documented
- [ ] Dockerfile provided for containerized deployment
- [ ] docker-compose.yml example for easy local testing
- [ ] Example for systemd service (Linux servers)
- [ ] Cloud deployment guide (AWS Lambda, ECS, or similar)
- [ ] Security considerations for each deployment type documented

**Notes:**
- Focus on stdio transport for local/container deployments
- Note limitations for serverless (stdio constraints)
- Include environment variable configuration

---

### P1-04: Skill Metadata and Discovery API

**User Story:**
As Maya (AI Platform Engineer),
I want an API endpoint or method to list all available skills with their metadata,
So that I can build UI or tooling to help users discover and understand available skills.

**Acceptance Criteria:**
- [ ] Method to retrieve list of all registered skills
- [ ] Each skill returns: name, description, category, file path
- [ ] Metadata extracted from SKILL.md frontmatter
- [ ] Supports filtering by category or tag
- [ ] Returns JSON-formatted response

**Notes:**
- Useful for building dashboards or skill browsers
- Consider MCP resources for skill discovery
- Document API format

---

### P1-05: Configuration File Support

**User Story:**
As James (Engineering Team Lead),
I want to configure the MCP server via a config file (YAML or JSON),
So that my team can share configurations and make setup more repeatable.

**Acceptance Criteria:**
- [ ] Supports configuration file (mcp-skills-server.yml or similar)
- [ ] Configuration includes: skills directory path, project root, logging level, OAuth settings
- [ ] Environment variables can override config file settings
- [ ] Example configuration files provided
- [ ] Clear error messages if config file is invalid
- [ ] Documentation explains all configuration options

**Notes:**
- YAML preferred for human readability
- Support .env files for sensitive values (OAuth secrets)
- Validate configuration on startup

---

### P1-06: Health Check and Status Endpoint

**User Story:**
As Maya (AI Platform Engineer),
I want a health check mechanism to verify the MCP server is running and healthy,
So that I can monitor it in production and integrate with our infrastructure monitoring.

**Acceptance Criteria:**
- [ ] Health check method returns server status
- [ ] Reports number of skills loaded
- [ ] Indicates if server is ready to handle requests
- [ ] Returns uptime and basic metrics
- [ ] Can be called without authentication (for monitoring)

**Notes:**
- Consider MCP protocol limitations for health checks
- May need separate HTTP endpoint for traditional monitoring
- Document monitoring best practices

---

### P1-07: Helpful Error Messages for Common Issues

**User Story:**
As James (Engineering Team Lead),
I want error messages that help my team fix common problems themselves,
So that they don't need to escalate every issue to me or the platform team.

**Acceptance Criteria:**
- [ ] Error when skills directory not found suggests checking path configuration
- [ ] Error when SKILL.md missing suggests checking skill folder structure
- [ ] Error when OAuth not configured suggests setup documentation
- [ ] Each error includes error code and troubleshooting link
- [ ] Errors distinguish between user error vs. server bug

**Notes:**
- Create troubleshooting guide in documentation
- Include links to docs in error messages
- Test common error scenarios

---

### P1-08: Skill Dependency Handling

**User Story:**
As Maya (AI Platform Engineer),
I want the server to handle dependencies between skills intelligently,
So that AI agents understand when one skill requires output from another skill.

**Acceptance Criteria:**
- [ ] Skills can declare dependencies in SKILL.md frontmatter
- [ ] Server validates dependency chains on startup
- [ ] Warning if circular dependencies detected
- [ ] Documentation explains dependency format
- [ ] Dependencies exposed in skill metadata

**Notes:**
- May be P2 if dependencies are rare in dev-swarms skills
- Consider whether dependencies should be enforced or advisory
- Document dependency best practices for custom skills

---

### P1-09: Example MCP Client Configurations

**User Story:**
As James (Engineering Team Lead),
I want example configurations for popular MCP clients (Claude Code, Cursor, custom agents),
So that my team can quickly connect their preferred AI tool to the MCP Skills Server.

**Acceptance Criteria:**
- [ ] Claude Code configuration example provided
- [ ] Cursor configuration example provided (if applicable)
- [ ] Generic MCP client example (Python or TypeScript)
- [ ] Examples include OAuth 2.1 setup
- [ ] Documentation explains how to test connection

**Notes:**
- Check if Cursor officially supports MCP servers
- Provide minimal working examples
- Include troubleshooting tips for each client

---

### P1-10: Security Best Practices Documentation

**User Story:**
As Maya (AI Platform Engineer),
I want comprehensive security documentation following MCP and OWASP best practices,
So that I can pass our security team's review and deploy with confidence.

**Acceptance Criteria:**
- [ ] OAuth 2.1 setup documented with security considerations
- [ ] Token validation process explained
- [ ] Secure session ID generation documented
- [ ] Guidance on avoiding common MCP security pitfalls
- [ ] References to OWASP and MCP security guidelines
- [ ] Example security review checklist provided

**Notes:**
- Reference: https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices
- Address findings from market research (authentication gaps)
- Include compliance considerations for enterprises

---

### P1-11: Community Contribution Guidelines

**User Story:**
As Maya (AI Platform Engineer),
I want clear guidelines for contributing to the MCP Skills Server project,
So that I can contribute bug fixes, improvements, and share custom skills with the community.

**Acceptance Criteria:**
- [ ] CONTRIBUTING.md file with contribution process
- [ ] Code of conduct documented
- [ ] Pull request template provided
- [ ] Development setup guide for contributors
- [ ] Testing requirements for PRs explained
- [ ] Issue templates for bugs and feature requests

**Notes:**
- Encourage community contributions for ecosystem growth
- Make contribution process welcoming to new contributors
- Define governance model (maintainers, review process)

---

### P1-12: Skill Update and Reload Mechanism

**User Story:**
As Maya (AI Platform Engineer),
I want the server to detect when skills are updated and reload them without full restart,
So that I can iterate on custom skills quickly during development.

**Acceptance Criteria:**
- [ ] Server watches skills directory for changes (optional feature)
- [ ] Reloads SKILL.md content when modified
- [ ] Logs skill reload events
- [ ] Handles reload errors gracefully without crashing
- [ ] Can be disabled for production environments

**Notes:**
- Use file system watchers (e.g., watchdog library)
- May cause issues with stdio transport - document limitations
- Make feature opt-in via configuration

---

## P2 - Nice to Have (Enhancement Features)

### P2-01: Custom Skills Support and Documentation

**User Story:**
As Maya (AI Platform Engineer),
I want documentation and examples showing how to create custom organization-specific skills,
So that I can extend dev-swarms methodology with our internal processes and best practices.

**Acceptance Criteria:**
- [ ] Documentation explains custom skill structure
- [ ] Example custom skill provided
- [ ] Guidelines for SKILL.md frontmatter and format
- [ ] Best practices for file organization
- [ ] Explains how to test custom skills

**Notes:**
- Core feature is already supported (server discovers any skill)
- This story is about documentation and examples
- Consider skill template generator tool

---

### P2-02: Skill Usage Analytics

**User Story:**
As James (Engineering Team Lead),
I want to see which skills my team uses most frequently,
So that I can understand which parts of the methodology provide the most value and where to focus training.

**Acceptance Criteria:**
- [ ] Server tracks skill invocation counts
- [ ] Analytics include: skill name, invocation count, timestamp
- [ ] Export analytics to JSON or CSV
- [ ] Optional dashboard or report generation
- [ ] Privacy-preserving (no sensitive content logged)

**Notes:**
- Consider privacy implications of analytics
- Make analytics opt-in
- Useful for product development and prioritization

---

### P2-03: Skill Versioning Support

**User Story:**
As Maya (AI Platform Engineer),
I want the server to handle skill versioning gracefully when dev-swarms skills are updated,
So that I can upgrade skills without breaking existing integrations.

**Acceptance Criteria:**
- [ ] Skills can declare version in frontmatter
- [ ] Server supports loading multiple versions of same skill (optional)
- [ ] Default behavior loads latest version
- [ ] Version information included in skill metadata
- [ ] Documentation explains versioning strategy

**Notes:**
- May be complex to implement properly
- Consider whether versioning is needed for MVP
- Semantic versioning recommended

---

### P2-04: Web UI for Skill Browser

**User Story:**
As James (Engineering Team Lead),
I want a web-based UI to browse available skills and see their documentation,
So that my team can discover and understand skills without reading markdown files directly.

**Acceptance Criteria:**
- [ ] Web UI shows list of all skills
- [ ] Click skill to view full SKILL.md content
- [ ] Search and filter skills by name or category
- [ ] Responsive design (works on mobile)
- [ ] Optional feature, disabled by default

**Notes:**
- Significant development effort - clear P2
- Alternative: generate static site from skills
- Consider using MCP Inspector or similar tool

---

### P2-05: SSE Transport Support

**User Story:**
As Maya (AI Platform Engineer),
I want the option to use Server-Sent Events (SSE) transport instead of stdio,
So that I can deploy the MCP server remotely and avoid stdio's scalability limitations.

**Acceptance Criteria:**
- [ ] Server supports SSE transport as alternative to stdio
- [ ] Configuration option to choose transport type
- [ ] SSE transport handles authentication properly
- [ ] Documentation explains when to use SSE vs. stdio
- [ ] Example SSE deployment provided

**Notes:**
- SSE supports remote deployments and better scalability
- More complex than stdio
- Reference MCP transport documentation

---

### P2-06: CLI Helper Tools

**User Story:**
As Maya (AI Platform Engineer),
I want CLI commands to test and debug the MCP server,
So that I can troubleshoot issues and validate configurations without writing custom client code.

**Acceptance Criteria:**
- [ ] CLI command to list skills: `mcp-skills list`
- [ ] CLI command to invoke skill: `mcp-skills invoke <skill-name>`
- [ ] CLI command to validate configuration: `mcp-skills validate`
- [ ] CLI command to test OAuth setup: `mcp-skills test-auth`
- [ ] Clear output and error messages

**Notes:**
- Useful for development and debugging
- Consider using Click or Typer for CLI framework
- Install as part of package

---

### P2-07: Docker Compose Setup for Development

**User Story:**
As Maya (AI Platform Engineer),
I want a docker-compose setup that includes the MCP server, example client, and monitoring,
So that I can demo the full setup to stakeholders or test integrations locally.

**Acceptance Criteria:**
- [ ] docker-compose.yml includes MCP server
- [ ] Includes example MCP client container
- [ ] Optional monitoring/logging stack (Prometheus, Grafana)
- [ ] README explains how to run the demo
- [ ] Demonstrates skills working end-to-end

**Notes:**
- Great for demos and testing
- Include sample skills and example invocations
- Document resource requirements

---

### P2-08: Skill Templates and Generator

**User Story:**
As Maya (AI Platform Engineer),
I want a template generator that creates skeleton custom skills,
So that I can quickly scaffold new skills following best practices.

**Acceptance Criteria:**
- [ ] Command generates new skill folder structure
- [ ] Creates SKILL.md with frontmatter template
- [ ] Prompts for skill name, description, category
- [ ] Includes example acceptance criteria and instructions
- [ ] Follows dev-swarms skill conventions

**Notes:**
- Makes custom skill creation easier
- Consider Cookiecutter or similar
- Include in CLI tools

---

## Story Traceability

### Stories Addressing Problem Statement Pain Points

| Pain Point (Stage 0) | Related Stories |
|----------------------|-----------------|
| Limited Skill Access | P0-02, P0-03, P0-07, P1-01 |
| Fragmented Workflows | P0-07, P1-01, P1-09 |
| Integration Barriers | P0-01, P0-05, P0-08, P1-03 |
| Context Injection Challenge | P0-03, P0-04, P0-06 |

### Stories Addressing Market Gaps (Stage 1)

| Market Gap | Related Stories |
|------------|-----------------|
| Interoperable Skills System | P0-01, P1-09 (cross-platform support) |
| Comprehensive Development Methodology | P0-07, P1-01 (10-stage workflow) |
| Security-First MCP | P0-05, P1-10 (OAuth 2.1) |
| Context Injection for Skills | P0-03, P0-04, P0-06 |

### Stories by Persona Primary Need

**Maya (AI Platform Engineer) - Top Priorities:**
1. P0-05: OAuth 2.1 Security
2. P0-01: MCP Server Implementation
3. P0-02: Skill Discovery
4. P0-09: Error Handling and Logging
5. P1-02: Performance Optimization

**James (Engineering Team Lead) - Top Priorities:**
1. P0-07: Core Skills Access
2. P0-08: Setup Documentation
3. P1-01: Complete 10-Stage Methodology
4. P1-09: Client Configuration Examples
5. P1-07: Helpful Error Messages

---

## Implementation Priority

### Sprint 1 (MVP - Core Functionality)
- P0-01: MCP Server Implementation
- P0-02: Skill Discovery
- P0-03: Skill Invocation
- P0-08: Basic Documentation

### Sprint 2 (MVP - Security & Quality)
- P0-05: OAuth 2.1
- P0-04: File Path Resolution
- P0-09: Error Handling
- P0-10: Testing

### Sprint 3 (MVP - Production Ready)
- P0-06: Script Handling
- P0-07: Core Skills
- P1-08: Setup Documentation (enhanced)
- P1-10: Security Documentation

### Sprint 4+ (Enhancements)
- P1-01: Complete Skills
- P1-02: Performance
- P1-03: Deployment Guide
- Remaining P1 stories
- P2 stories as time permits

---

## Notes

- **Total Stories**: 30 (10 P0, 12 P1, 8 P2)
- **MVP Scope**: All P0 stories (10 stories)
- **Estimated MVP Development**: 3-4 sprints (6-8 weeks)
- **Full v1.0**: P0 + P1 stories (22 stories total)
