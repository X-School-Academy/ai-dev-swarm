# Primary Persona: Maya Chen - AI Platform Engineer

## Basic Information

- **Name**: Maya Chen
- **Age**: 32
- **Role**: Senior AI Platform Engineer at a mid-size tech company
- **Location**: San Francisco, CA (Remote-friendly company)
- **Education**: MS in Computer Science, specialization in AI/ML

## Background

### Professional Background

Maya has 8 years of software engineering experience, with the last 3 years focused on building AI-powered development tools. She previously worked at a large tech company building internal developer tools before joining a smaller company to lead their AI platform initiative.

Her team is responsible for creating an internal AI agent platform that helps developers across the organization with tasks like code review, test generation, and deployment automation.

### Technical Proficiency

- **Expert**: Python, Go, REST APIs, Cloud infrastructure (AWS/GCP)
- **Advanced**: AI/ML frameworks (LangChain, OpenAI APIs), MCP protocol, Docker/Kubernetes
- **Intermediate**: React/TypeScript (frontend), PostgreSQL
- **Learning**: Latest MCP ecosystem developments, OAuth 2.1 implementation patterns

### Relevant Experience

- Built 5+ internal developer tools from scratch
- Integrated multiple third-party APIs and protocols
- Led security review and OAuth 2.0 implementation for internal platform
- Currently exploring MCP as standard for AI agent tooling
- Active in developer communities (GitHub, Discord servers for AI tools)

## Goals & Motivations

### Primary Goals

1. **Build a reliable AI agent platform** that developers trust and actually use
2. **Provide structured workflows** to AI agents so they give consistent, high-quality assistance
3. **Stay ahead of industry trends** in AI development tools and protocols
4. **Reduce development time** for common tasks through AI automation

### What Success Looks Like

- Internal developers adopt the AI platform for 50%+ of their development tasks
- AI agents provide consistent, methodology-driven assistance
- Security and compliance teams approve the platform for production use
- Platform is extensible and can evolve with new AI capabilities

### Key Motivations

- **Professional Growth**: Wants to be known as expert in AI platform engineering
- **Impact**: Seeing developers become more productive and ship faster
- **Technical Excellence**: Building systems that are secure, reliable, and well-architected
- **Innovation**: Working with cutting-edge technology and open standards

## Pain Points & Frustrations

### Current Challenges

1. **Lack of Standardization**: "Every AI agent needs custom integration work. There's no standard way to give them development expertise."

2. **Security Concerns**: "I found out most MCP servers have zero authentication. That's a non-starter for enterprise use. Security team won't approve anything without OAuth."

3. **Platform Lock-in**: "Our team uses different AI tools - some like Cursor, others use Claude Code. I can't build for just one platform."

4. **Methodology Gap**: "AI agents are powerful but they lack structure. They can execute tasks but don't know *how* to approach software development systematically."

5. **Integration Complexity**: "Integrating frameworks like LangChain gives tools but requires tons of custom code. I need something that works out of the box via MCP."

### Frustrations with Existing Solutions

- **GitHub MCP Server**: "Great for repo operations but had a security vulnerability. Plus, it's just tools, not workflows."
- **LangChain**: "Powerful but not MCP-native. I'd have to build the MCP layer myself."
- **Custom Skills**: "I could write skills for Claude Code, but then only Claude users benefit. Need something interoperable."
- **DIY Approach**: "Building everything from scratch takes months. I need proven methodologies I can integrate quickly."

## Behaviors & Preferences

### How She Currently Solves the Problem

- Reading MCP specification docs and examples
- Exploring FastMCP framework for Python implementations
- Testing different MCP servers to understand patterns
- Manually writing custom prompts and instructions for AI agents
- Considering building a custom MCP server from scratch

### Preferred Tools and Platforms

- **Development**: VS Code, Python with uv, Docker, GitHub
- **AI Tools**: OpenAI API, Claude API, experimenting with MCP servers
- **Infrastructure**: AWS (Lambda, API Gateway, ECS), Terraform
- **Learning**: GitHub repos, technical blogs, Discord communities, MCP official docs

### Usage Patterns

- Checks GitHub trending and MCP ecosystem weekly for new servers
- Spends 30-40% time on architecture and security design
- Values well-documented examples over lengthy conceptual docs
- Prefers open-source with active maintenance over commercial solutions
- Tests locally first, then scales to team

### Communication Preferences

- GitHub issues for technical discussions
- Discord/Slack for real-time community help
- Documentation: Clear README, code examples, architecture diagrams
- Prefers async communication (issues, PRs) over meetings

## Needs from This Product

### Must-Have Features (P0)

1. **MCP-Native Implementation**: Works out of the box with any MCP-compatible AI agent
2. **OAuth 2.1 Security**: Enterprise-grade authentication from day one
3. **Skills Discovery**: Automatic discovery and registration of dev-swarms skills
4. **Context Injection**: Proper delivery of SKILL.md content to AI agents
5. **File Path Resolution**: Correct handling of relative paths to project root
6. **Core Methodology Access**: At minimum, init-ideas and code-development skills
7. **Clear Documentation**: Setup guide, architecture docs, usage examples
8. **Production-Ready**: Reliable, tested, handles errors gracefully

### Important Features (P1)

1. **Complete 10-Stage Workflow**: All dev-swarms skills (market-research through deployment)
2. **Error Handling**: Helpful error messages when skills not found or misconfigured
3. **Performance**: Fast startup (<2 sec), quick skill invocation (<100ms)
4. **Testing Support**: Example tests showing how to validate MCP server
5. **Deployment Guide**: Docker compose, systemd service, cloud deployment examples
6. **Monitoring**: Logging and observability for troubleshooting
7. **Community**: Active GitHub repo, responsive maintainers

### Nice-to-Have Features (P2)

1. **Custom Skills Support**: Easy pattern for adding organization-specific skills
2. **Skill Versioning**: Handle updates to dev-swarms skills gracefully
3. **Analytics**: Track which skills are most used
4. **SSE Transport**: Alternative to stdio for remote deployments
5. **Web UI**: Optional dashboard for configuration and monitoring
6. **CLI Tools**: Helper commands for testing and debugging

## Quote

> "I need an MCP server that brings real development methodology to AI agents, not just another tool integrator. Something secure enough for enterprise, interoperable enough for any platform, and comprehensive enough that AI agents actually know *how* to build software properly. If it works with dev-swarms' proven 10-stage approach via standard MCP, that's exactly what we've been missing."

## User Journey

### Discovery Phase
- Searches for "MCP server development workflows" or "skills MCP"
- Finds MCP Skills Server on GitHub or MCP marketplace
- Reads README to understand what it does
- Checks if it's secure (OAuth 2.1) and actively maintained

### Evaluation Phase
- Clones repo and reviews architecture
- Reads documentation to understand setup
- Checks for examples and tests
- Reviews security implementation (OAuth 2.1 compliance)
- Tests locally with a simple AI agent client

### Integration Phase
- Installs and configures MCP Skills Server
- Points it at dev-swarms/skills directory
- Tests skill invocation with internal AI platform
- Validates file path resolution works correctly
- Reviews logs and error handling

### Adoption Phase
- Rolls out to internal development team
- Monitors usage and gathers feedback
- Contributes bug reports and potential PRs
- Recommends to peers in industry communities
- Potentially adds custom skills for organization

## How This Product Solves Maya's Problems

| Pain Point | How MCP Skills Server Helps |
|------------|----------------------------|
| Lack of Standardization | MCP protocol is the emerging standard, MCP Skills Server implements it properly |
| Security Concerns | Built with OAuth 2.1 from the start, enterprise-ready security |
| Platform Lock-in | Works with any MCP-compatible agent - Cursor, Claude Code, custom agents |
| Methodology Gap | Provides dev-swarms' comprehensive 10-stage development methodology |
| Integration Complexity | Drop-in MCP server, no custom code needed, FastMCP-based implementation |
| Time to Market | Open source, production-ready, install and use immediately |
