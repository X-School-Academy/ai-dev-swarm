## 🤖 What is AI Dev Swarm?

AI Dev Swarm is an AI-powered development framework designed to turn a simple idea into a full-stack, commercial-ready product — automatically.

No coding knowledge required.
No tech background needed.
Just an idea.

AI Dev Swarm guides you step by step through the entire product lifecycle.

AI handles everything.
You focus on vision and decisions.

Our goal is simple but ambitious:

Enable a one-person company to become real — powered by AI.

## Support

Discord support: https://juniorit.ai/virtual-office

## How It Works

Fork and clone this project, then work with `Claude Code` and `OpenAI Codex` by default via Agent Skills integration.

For `Gemini CLI` or other AI Agents that do not support Agent skills natively, you can use them as an MCP server by configuring:

```json
{
  "mcpServers": {
    "skillz": {
      "command": "uvx",
      "args": [
        "skillz@latest",
        "/project-root-absolute-path/dev-swarms/skills",
        "--verbose"
      ]
    }
  }
}
```

Start with your ideas in `ideas.md`, then progress through structured stages:

**Planning & Strategy (Stages 0-4)**
- **Stage 0: Init Ideas** - Transform informal ideas into professional project documentation
- **Stage 1: Market Research** - Validate the problem and analyze competitive landscape
- **Stage 2: Personas** - Define user personas and prioritized user stories (P0/P1/P2)
- **Stage 3: MVP** - Define minimum viable product scope and success metrics
- **Stage 4: PRD** - Create comprehensive product requirements document

### Design & Architecture (Stages 5-7)
- **Stage 5: UX Design** - Design user flows, interactions, and mockups
- **Stage 6: Architecture** - Define system components, data flow, and deployment boundaries
- **Stage 7: Tech Specs** - Specify tech stack, security, coding standards, and theme guidelines

### Development & Deployment (Stages 8-10)
- **Stage 8: DevOps** - Setup development environment, GitHub, MCP tools, and Docker
- **Stage 9: Sprints** - AI-accelerated feature development with backlogs and testing
- **Stage 10: Deployment** - Deploy to staging/production with CI/CD pipelines

## Key Features (Planned)

- **MCP Protocol Integration**: Standard stdio transport for maximum compatibility
- **Automatic Skill Discovery**: Dynamically discovers and registers all dev-swarms skills
- **Context Injection**: Injects skill instructions into AI agent sessions
- **Smart Path Resolution**: Handles file paths relative to project root
- **Python + FastMCP**: Modern, reliable implementation with uv for dependency management

## Repository Structure

See `dev-swarms/docs/repository-structure.md` for the complete folder structure and file organization.

## Getting Started

1. Review the initial project documentation in `00-init-ideas/`
2. Follow the dev-swarms methodology through each stage
3. Use AI agents to accelerate development and maintain quality

## Skills Available

This project uses the dev-swarms framework skills:
- **init-ideas** - Project kickoff and idea formalization
- **market-research** - Market validation and competitive analysis
- **personas** - User personas and story creation
- **mvp** - MVP scope definition
- **prd** - Product requirements documentation
- **ux** - User experience design
- **architecture** - System architecture design
- **tech-specs** - Technical specifications
- **devops** - Development environment setup
- **project-management** - Sprint and backlog management
- **code-development** - Feature implementation
- **code-review** - Code quality review
- **code-test** - Comprehensive testing
- **deployment** - Production deployment
- **draft-commit-message** - Generate conventional commits

## Documentation

All project documentation is organized in numbered folders (00-10) representing each stage, with supporting documentation in `features/` for the knowledge base and `99-archive/` for completed work.

## 🤝 Want to Contribute?

If you’re interested in contributing:

No prior experience required.
No coding skills required.
Just curiosity and willingness to learn.

Once you show interest, I’ll personally guide you on how to contribute.

## ⭐ Call to Action

🙏 Please:

⭐ Star the repo.
🍴 Fork the project.
💬 Share feedback.
🤝 Join us as a contributor.

Let’s redefine how products are built in the AI era.

One idea. One person. One AI swarm. 🚀

Join our Discord server for discussion: https://juniorit.ai/virtual-office

## License

This project is licensed under the GNU Affero General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

This project may include open source code with other licenses. These codes will keep their original licenses.
