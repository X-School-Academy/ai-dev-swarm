# AI Dev Swarm - Complete User Manual

**Build Your Dream Product Without Writing Code**

Version 1.0 | For Complete Beginners

---

## Table of Contents

1. [Welcome to AI Dev Swarm](#welcome-to-ai-dev-swarm)
2. [What You Can Build](#what-you-can-build)
3. [Getting Started in 5 Minutes](#getting-started-in-5-minutes)
4. [Understanding the 12-Stage Journey](#understanding-the-12-stage-journey)
5. [How to Work with AI Agents](#how-to-work-with-ai-agents)
6. [Slash Commands - Your Quick Actions](#slash-commands---your-quick-actions)
7. [Complete Workflow Examples](#complete-workflow-examples)
8. [Understanding Your Project Structure](#understanding-your-project-structure)
9. [Tips for Success](#tips-for-success)
10. [Frequently Asked Questions](#frequently-asked-questions)
11. [Getting Help](#getting-help)

---

## Welcome to AI Dev Swarm

### What is AI Dev Swarm?

AI Dev Swarm is your personal AI-powered development team. Think of it as having expert product managers, designers, developers, and testers working for you - all powered by AI.

**The Promise:**
- You have an idea
- AI handles everything technical
- You get a real, working product
- No coding knowledge required

### Who Is This For?

- Entrepreneurs with product ideas but no technical background
- Business people who want to build software without hiring developers
- Anyone curious about turning ideas into real applications
- People who want to understand how software is built professionally

### What Makes It Different?

Traditional development requires:
- Learning to code (months/years)
- Understanding technical jargon
- Knowing architecture, databases, APIs
- Managing complex tools

**AI Dev Swarm approach:**
- You describe what you want in plain English
- AI translates your ideas into professional documentation
- AI builds the actual software
- You make decisions, AI does the work

---

## What You Can Build

AI Dev Swarm adapts to your project size. Here's what's possible:

### Level 0-1: Simple Scripts
**Examples:**
- A tool that renames files automatically
- A script that sends you daily email summaries
- A calculator for business metrics

**What you get:** A simple program that runs on your computer

---

### Level 2: Useful Tools
**Examples:**
- A command-line tool that converts files
- A personal task automation tool
- A data processing utility

**What you get:** A professional tool with documentation and installation instructions

---

### Level 3: Single Applications
**Examples:**
- A personal blog website
- A simple inventory tracker
- A team collaboration tool

**What you get:** A real web application with a database and user interface

---

### Level 4: Complete Products (MVP)
**Examples:**
- An e-commerce store
- A social platform for a niche community
- A SaaS tool for small businesses

**What you get:** A minimum viable product ready for real users

---

### Level 5-7: Large Scale Products
**Examples:**
- Multi-platform apps (web + mobile)
- Marketplaces with multiple user types
- Enterprise-grade platforms

**What you get:** A commercial-ready product with full deployment

---

## Getting Started in 5 Minutes

### Prerequisites

**What you need:**
1. A computer (Mac, Windows, or Linux)
2. One of these AI code agents:
   - **Claude Code**
   - **OpenAI Codex**
   - **GitHub Copilot CLI**
   - **opencode**
   - **Gemini CLI** (requires MCP server setup)
3. Git installed (for saving your work)
4. Your idea written down

**What you DON'T need:**
- Coding experience
- Technical degree
- Development tools knowledge
- Understanding of programming languages

---

### Step 1: Fork and Clone This Project

**In plain English:**
"Forking" means making your own copy of AI Dev Swarm on GitHub. "Cloning" means downloading it to your computer.

**How to do it:**
1. Go to the AI Dev Swarm GitHub page
2. Click the "Fork" button (top right)
3. Open your terminal/command prompt
4. Type: `git clone [your-fork-url]`
5. Navigate into the folder: `cd ai-dev-swarm`

---

### Step 2: Write Your Ideas

Open the file called `ideas.md` in any text editor and write your project idea.

**Example:**
```markdown
# My Project Idea

## The Problem
People in my neighborhood can't easily find local handymen for home repairs.

## My Solution
A simple website where homeowners can post repair jobs and local handymen can respond.

## Who Needs This
- Homeowners who need repairs
- Local handymen looking for work

## What I Want
- A simple website anyone can use
- Way for homeowners to post jobs
- Way for handymen to see jobs and respond
- Basic payment handling
```

**Tips:**
- Write like you're explaining to a friend
- Don't worry about technical details
- Focus on the problem and who it helps
- Be specific about what you want

---

### Step 3: Start Your AI Journey

Open your AI code agent (Claude Code, Codex, Copilot CLI, etc.) in your project folder.

**Optional but recommended - Refine your ideas first:**
```
# For Claude Code / Copilot CLI / opencode:
/ideas-refine

# For OpenAI Codex:
/prompts:ideas-refine
```

This will help AI polish your ideas.md and ask clarifying questions before you begin.

**Then start Stage 0:**
```
# For Claude Code / Copilot CLI / opencode:
/stage 0

# For OpenAI Codex:
/prompts:stage 0
```

or simply type in plain English:

```
Let's start! I want to build my project from the ideas.md file
```

**What happens next:**
The AI will:
1. Read your ideas
2. Ask you clarifying questions
3. Create professional project documentation
4. Show you a plan
5. Ask for your approval

**Your job:**
- Answer the AI's questions
- Review what it creates
- Say "yes" to approve or ask for changes

---

## Understanding the 12-Stage Journey

AI Dev Swarm breaks product development into 12 clear stages (0-11). Each stage builds on the previous one.

### The Big Picture

**Think of it like building a house:**
- Stages 0-5: Planning (blueprints, permits, budgets, feasibility)
- Stages 6-8: Design (architecture, materials, layout)
- Stages 9-11: Building (construction, finishing, move-in)

---

### Stage 0: Init Ideas
**What happens:** Transform your rough ideas into professional documentation

**AI asks you about:**
- What problem are you solving?
- Who has this problem?
- Why does your solution matter?
- How much are you willing to spend? (in AI processing costs)

**You get:**
- Clear problem statement
- Target user description
- Value proposition
- Project classification (how big is this?)
- Budget estimate

**Time:** 15-30 minutes
**Your involvement:** Answer questions, approve the documents

**Example output:**
```
00-init-ideas/
├── README.md (overview)
├── problem-statement.md (the problem you're solving)
├── target-users.md (who you're building for)
├── value-proposition.md (why it matters)
├── owner-requirement.md (your specific requirements)
└── cost-budget.md (estimated AI processing costs)
```

---

### Stage 1: Market Research
**What happens:** AI researches your market and competitors

**AI does:**
- Finds similar products
- Analyzes competitors
- Identifies market opportunities
- Validates that your problem is real

**You get:**
- Market analysis report
- Competitor comparison
- Gap analysis (what's missing in the market)
- Validation findings

**Time:** 30-60 minutes
**Your involvement:** Review findings, adjust if needed

**When to skip:** Very personal tools, internal company tools

---

### Stage 2: User Personas
**What happens:** Define exactly who will use your product

**AI creates:**
- Detailed user profiles (personas)
- User stories (what users want to do)
- Priority levels (what's most important)

**You get:**
- Primary persona (main user type)
- Secondary personas (other user types)
- User stories organized by priority (P0 = critical, P1 = important, P2 = nice to have)

**Time:** 30-45 minutes
**Your involvement:** Confirm user profiles match your vision

**Example user story:**
```
As a homeowner, I want to post a repair job quickly,
so that I can get help within 24 hours.
Priority: P0 (critical for MVP)
```

---

### Stage 3: MVP Definition
**What happens:** Decide the smallest version that works

**MVP = Minimum Viable Product**
The simplest version you can launch to test your idea with real users.

**AI helps you:**
- Define what MUST be in the first version
- Explicitly exclude features for later
- Set success metrics

**You get:**
- MVP scope (what's included)
- Out-of-scope list (what's NOT included)
- Success metrics (how you'll measure success)

**Time:** 20-30 minutes
**Your involvement:** Make decisions about what's essential

**Critical thinking:**
- What's the absolute minimum users need?
- What can wait until version 2?
- How will you know if it's working?

---

### Stage 4: Tech Research (Optional)
**What happens:** Validate technical feasibility before committing to full development

**AI does:**
- Creates proof of concepts (PoCs)
- Evaluates third-party APIs and services
- Tests critical technical paths
- Runs performance benchmarks
- Identifies technical blockers early

**You get:**
- Feasibility assessment
- PoC results and recommendations
- Technology evaluation reports
- Go/no-go recommendations

**Time:** 1-4 hours (varies by complexity)
**Your involvement:** Review findings, make go/no-go decision

**When to skip:** Simple projects, well-understood technologies, personal tools

**This stage can save you weeks by catching technical blockers early!**

---

### Stage 5: Product Requirements (PRD)
**What happens:** Lock down WHAT the product does (not HOW)

**AI documents:**
- Every feature in detail
- How features should behave
- Performance requirements
- Security requirements
- Compliance needs

**You get:**
- Complete PRD document
- Functional requirements (what it does)
- Non-functional requirements (how well it performs)

**Time:** 1-2 hours
**Your involvement:** Review each feature, ensure nothing is missing

**This is your last chance to change WHAT before building HOW**

---

### Stage 6: UX Design
**What happens:** Design how users will interact with your product

**AI creates:**
- User flows (step-by-step journeys)
- Interaction specifications (buttons, forms, screens)
- Edge case handling (what happens when things go wrong)
- Accessibility guidelines
- Optional: HTML mockups you can click through

**You get:**
- Visual flows (diagrams showing user journeys)
- Interaction rules
- Mockups (if needed)

**Time:** 1-3 hours
**Your involvement:** Review flows, test mockups, ensure it's intuitive

---

### Stage 7: Architecture
**What happens:** Design the system structure

**AI decides:**
- How components connect
- How data flows through the system
- Where things are deployed
- System boundaries

**You get:**
- System overview
- Architecture diagrams
- Data flow explanations
- Deployment plan

**Time:** 1-2 hours
**Your involvement:** Approve the technical approach (AI explains in simple terms)

**AI will explain:** "Your app has 3 parts: a website users see, a server that handles requests, and a database that stores data."

---

### Stage 8: Tech Specs
**What happens:** Choose technologies and set standards

**AI specifies:**
- Programming languages to use
- Frameworks and tools
- Database technology
- Coding standards
- Security rules
- Testing requirements
- Visual theme (colors, fonts)

**You get:**
- Technology stack document
- Coding standards
- Testing standards
- Security standards
- Theme/design system

**Time:** 1-2 hours
**Your involvement:** Approve tech choices (AI explains pros/cons)

---

### Stage 9: DevOps Setup
**What happens:** Prepare the development environment

**AI sets up:**
- GitHub repository
- Development tools
- Docker configurations (packaging)
- Development standards

**You get:**
- Working development environment
- GitHub repository configured
- Tools installed and ready

**Time:** 30-60 minutes
**Your involvement:** Minimal - mostly automatic

---

### Stage 10: Development Sprints
**What happens:** AI builds your product feature by feature

**This is where the magic happens!**

**The cycle:**
1. AI breaks features into small tasks (backlogs)
2. AI shows you a sprint plan
3. You approve
4. AI writes the code
5. AI reviews the code
6. AI tests the code
7. Repeat until done

**Backlog types:**
- **FEATURE**: New functionality
- **CHANGE**: Modify existing feature
- **BUG**: Fix something broken
- **IMPROVE**: Optimize existing code

**You get:**
- Working code
- Features documentation
- Test results
- Progress tracking

**Time:** Varies (days to weeks depending on project size)
**Your involvement:** Approve sprint plans, test features, provide feedback

**Example sprint:**
```
Sprint: User Authentication
- FEATURE-user-registration.md
- FEATURE-user-login.md
- FEATURE-password-reset.md
- TEST-authentication-flow.md
```

---

### Stage 11: Deployment
**What happens:** Launch your product to the world

**AI handles:**
- Cloud setup (AWS, etc.)
- Staging environment
- Production deployment
- CI/CD pipelines (automatic deployment)
- Monitoring setup

**You get:**
- Live product on the internet
- Deployment documentation
- Monitoring dashboard
- Rollback procedures

**Time:** 2-4 hours
**Your involvement:** Approve deployment plan, verify it works

**Congratulations - Your product is LIVE!**

---

### Stage 99: Archive
**What happens:** Archive completed project to start a new one

**When to use:** You want to start a brand new project in the same repository

**AI does:**
- Moves current project to archive
- Cleans up for fresh start
- Preserves all your work

---

## How to Work with AI Agents

### Understanding Agent Skills

**What are agent skills?**
Think of them as specialized AI assistants. Each skill is like hiring an expert for a specific job.

**Available skills (your AI team):**

| Skill Name | What They Do | When to Use |
|------------|--------------|-------------|
| `dev-swarm-stage-init-ideas` | Business analyst who organizes your ideas | Starting a new project |
| `dev-swarm-stage-market-research` | Market researcher who analyzes competitors | Validating your market |
| `dev-swarm-stage-personas` | UX researcher who defines users | Understanding your audience |
| `dev-swarm-stage-mvp` | Product manager who scopes MVP | Deciding what to build first |
| `dev-swarm-stage-tech-research` | Technical lead who validates feasibility | Testing critical tech assumptions |
| `dev-swarm-stage-prd` | Product manager who writes requirements | Documenting all features |
| `dev-swarm-stage-ux` | UX designer who creates user flows | Designing the experience |
| `dev-swarm-stage-architecture` | Software architect who designs system | Planning technical structure |
| `dev-swarm-stage-tech-specs` | Technical lead who chooses technology | Selecting tools and standards |
| `dev-swarm-stage-devops` | DevOps engineer who sets up tools | Preparing development |
| `dev-swarm-stage-sprints` | Project manager who plans sprints | Organizing development work |
| `dev-swarm-code-development` | Software engineer who writes code | Building features |
| `dev-swarm-code-review` | Code reviewer who checks quality | Ensuring code quality |
| `dev-swarm-code-test` | QA tester who tests everything | Verifying it works |
| `dev-swarm-stage-deployment` | DevOps engineer who deploys | Launching to production |

---

### How AI Communicates

AI agents announce their role before acting:

**Examples:**
```
As a Business Owner, I will create the problem statement...
As a Product Manager, I will define user stories...
As a Software Engineer, I will implement the login feature...
As a QA Tester, I will verify the authentication flow...
```

**Why this matters:**
- You know exactly what's happening
- You can stop and ask questions
- You understand who's doing what

---

### The Human-in-the-Loop Principle

**You are always in control:**

1. **AI proposes** → Creates a plan or document
2. **You review** → Check if it matches your vision
3. **You decide** → Approve, request changes, or reject
4. **AI executes** → Does the work only after your approval

**Critical approval points:**
- Before creating each stage's documentation
- Before writing code for each feature
- Before deploying to production
- When budget impacts are significant

---

### Cost and Budget Understanding

**AI processing costs money** (usually a few dollars to a hundred dollars depending on project size)

**Why budget matters:**
- Larger projects need more AI "thinking"
- Research takes more processing
- Testing uses AI resources

**Budget levels (examples):**
- L2 Tool: $2-$10
- L3 Single App: $10-$25
- L4 MVP: $25-$50
- L5 Multi-platform: $50-$100
- L6-L7 Large scale: $100+

**You approve the budget in Stage 0 - it constrains all future AI work**

---

## Slash Commands - Your Quick Actions

Slash commands are shortcuts to trigger specific actions. Think of them as quick buttons.

### Supported AI Code Agents

**Native Agent Skills Support (use `/command` format):**
- **Claude Code** ✅ (recommended)
- **GitHub Copilot CLI** ✅
- **opencode** ✅

**Via Symlink Setup (use `/prompts:command` format):**
- **OpenAI Codex** (requires setup - see below)

**Via MCP Server (requires MCP setup):**
- **Gemini CLI** (see README.md for configuration)

---

### Available Commands

**All 8 slash commands:**

| Command | Claude Code / Copilot / opencode | OpenAI Codex | Description |
|---------|----------------------------------|--------------|-------------|
| stage | `/stage` | `/prompts:stage` | Start or jump to a development stage |
| ideas-refine | `/ideas-refine` | `/prompts:ideas-refine` | Refine your ideas.md file |
| skip | `/skip` | `/prompts:skip` | Skip a stage that's not needed |
| dev | `/dev` | `/prompts:dev` | Develop a feature (code only) |
| review | `/review` | `/prompts:review` | Review code quality |
| test | `/test` | `/prompts:test` | Test a feature |
| backlog | `/backlog` | `/prompts:backlog` | Complete workflow: dev → review → test |
| sprint | `/sprint` | `/prompts:sprint` | Process all backlogs in a sprint |

---

### Setup for OpenAI Codex Users

> **Important:** OpenAI Codex requires a symlink to enable slash commands, and all commands must use the `/prompts:command` format.

```bash
# Create symlink to enable slash commands in Codex
ln -s /absolute/path/to/your-project/.claude/commands ~/.codex/prompts

# Example:
ln -s /Users/yourname/projects/ai-dev-swarm/.claude/commands ~/.codex/prompts
```

**After setup, use commands like:**
```
/prompts:stage 0
/prompts:ideas-refine
/prompts:backlog login
```

---

#### `/stage [number or name]`
**Purpose:** Start or jump to a specific development stage

**Examples:**
```
# Claude Code / Copilot / opencode:
/stage 0              → Start with init-ideas
/stage 1              → Start market research
/stage mvp            → Jump to MVP definition
/stage architecture   → Jump to architecture stage

# OpenAI Codex:
/prompts:stage 0
/prompts:stage mvp
```

**When to use:** Beginning a new stage or jumping to a specific stage

---

#### `/dev [backlog-name]`
**Purpose:** Develop a specific feature (code implementation only)

**Examples:**
```
# Claude Code / Copilot / opencode:
/dev login            → Implement login feature
/dev user-profile     → Implement user profile feature

# OpenAI Codex:
/prompts:dev login
/prompts:dev user-profile
```

**When to use:** When you want AI to write code for a specific backlog

---

#### `/review [backlog-name]`
**Purpose:** Review code quality for a feature

**Examples:**
```
# Claude Code / Copilot / opencode:
/review login         → Review login code
/review user-profile  → Review profile code

# OpenAI Codex:
/prompts:review login
/prompts:review user-profile
```

**When to use:** After development, to check code quality

---

#### `/test [backlog-name]`
**Purpose:** Test a feature thoroughly

**Examples:**
```
# Claude Code / Copilot / opencode:
/test login           → Test login functionality
/test user-profile    → Test profile feature

# OpenAI Codex:
/prompts:test login
/prompts:test user-profile
```

**When to use:** After development and review, to verify it works

---

#### `/backlog [backlog-name]`
**Purpose:** Complete full workflow: develop → review → test

**Examples:**
```
# Claude Code / Copilot / opencode:
/backlog login        → Full cycle for login
/backlog user-profile → Full cycle for profile

# OpenAI Codex:
/prompts:backlog login
/prompts:backlog user-profile
```

**When to use:** When you want complete end-to-end processing of a feature

**This is the most common command during development!**

---

#### `/sprint [sprint-name]`
**Purpose:** Process all backlogs in a sprint through the complete workflow

**Examples:**
```
# Claude Code / Copilot / opencode:
/sprint 01            → Process all backlogs in sprint 01
/sprint user-auth     → Process all backlogs in user-auth sprint

# OpenAI Codex:
/prompts:sprint 01
/prompts:sprint user-auth
```

**When to use:** When you want to process an entire sprint's worth of features at once

**What it does:**
1. Locates the sprint folder (e.g., `SPRINT-01-user-auth`)
2. Reads the sprint README.md for backlog order and dependencies
3. For each backlog in the sprint, runs: dev → review → test
4. Updates sprint status as backlogs complete

**This is ideal for processing multiple related features in sequence!**

---

#### `/skip [stage-number-or-name]`
**Purpose:** Skip a development stage by creating SKIP.md file

**Examples:**
```
# Claude Code / Copilot / opencode:
/skip 1               → Skip market research
/skip market-research → Skip market research
/skip ux              → Skip UX design
/skip 5               → Skip UX design

# OpenAI Codex:
/prompts:skip 1
/prompts:skip ux
```

**When to use:** When a stage is not needed for your project type (e.g., L2 tools might skip market research, UX, architecture, and deployment)

**Note:** Stage 0 (init-ideas) should never be skipped as it classifies your project and determines which stages are necessary.

---

#### `/ideas-refine`
**Purpose:** Refine ideas.md into a professional draft via collaborative brainstorming

**Examples:**
```
# Claude Code / Copilot / opencode:
/ideas-refine         → Refine your ideas.md file

# OpenAI Codex:
/prompts:ideas-refine
```

**When to use:**
- After writing your initial rough ideas
- Before starting Stage 0 to polish your ideas
- When you want AI to help structure your thoughts better
- To get clarifying questions about your idea

**What it does:**
- Reads your ideas.md file
- Tightens wording and improves structure
- Preserves your original intent and tone
- Adds helpful prompts where gaps exist
- Provides clarifying questions to help you think through your idea

**This is especially useful for first-time users who aren't sure how detailed their ideas.md should be!**

---

### Command Workflow Example

**Scenario:** You want to build a user login feature

**Option 1: Step by step**
```
# For Claude Code / Copilot CLI / opencode:
You: /dev login
[AI writes the code]

You: /review login
[AI reviews the code, finds issues, creates bug backlogs]

You: /test login
[AI tests thoroughly, creates more bug/improve backlogs if needed]

# For OpenAI Codex:
You: /prompts:dev login
You: /prompts:review login
You: /prompts:test login
```

**Option 2: All at once (recommended)**
```
# For Claude Code / Copilot CLI / opencode:
You: /backlog login
[AI does all three steps automatically]

# For OpenAI Codex:
You: /prompts:backlog login
[AI does all three steps automatically]
```

**Recommendation:** Use `/backlog` (or `/prompts:backlog` for Codex) for most features. It's faster and ensures nothing is skipped.

---

## Complete Workflow Examples

> **Note:** Examples below use Claude Code format (`/command`). If you're using OpenAI Codex, add `prompts:` prefix (e.g., `/prompts:stage`, `/prompts:backlog`).

### Example 1: Build a Personal Budget Tracker (Level 2)

**Your idea:**
"I want a simple tool to track my monthly expenses and see where my money goes."

**Step-by-step walkthrough:**

#### Day 1: Setup and Planning (1-2 hours)

1. **Write ideas.md:**
```markdown
# Budget Tracker Tool

## Problem
I spend money randomly and don't know where it all goes.

## Solution
A simple command-line tool where I can add expenses and see monthly summaries.

## Users
Just me (personal tool)

## Features I Want
- Add expense with category and amount
- See monthly summary
- See spending by category
- Export to CSV
```

2. **Refine your ideas (optional):**
```
You: /ideas-refine
AI: [Polishes your ideas and asks clarifying questions]
You: [Answer questions and approve refined version]
```

3. **Start Stage 0:**
```
You: /stage 0
```

AI will:
- Classify your project (Personal Tool, L2)
- Create problem statement
- Create target user doc (you!)
- Estimate cost (~$2-5)
- Suggest skipping stages 1, 5, 6, 10 (typical for L2 tools)
- Ask for approval

```
You: Looks good, proceed
```

4. **Skip unnecessary stages:**
```
You: /skip 1
You: /skip 5
You: /skip 6
```

AI will create SKIP.md files for market research, UX, and architecture.

5. **Skip to Stage 4 (PRD):**
```
You: /stage prd
```

AI creates:
- Detailed requirements for each feature
- Performance expectations
- You review and approve

6. **Stage 7 (Tech Specs):**
```
You: /stage tech-specs
```

AI might propose:
- Python for the tool
- SQLite for data storage
- CSV library for exports
- You approve

---

#### Day 2: Development Setup (30 minutes)

7. **Stage 8 (DevOps):**
```
You: /stage devops
```

AI sets up:
- Python environment
- Project structure
- GitHub repo

---

#### Day 3-5: Build Features (2-4 hours total)

8. **Stage 9 (Sprints):**
```
You: /stage sprints
```

AI creates sprint plan:
```
Sprint 1: Core Functionality
- FEATURE-add-expense
- FEATURE-monthly-summary
- FEATURE-category-breakdown
- FEATURE-csv-export
```

You approve the plan

9. **Build each feature:**
```
You: /backlog add-expense
[AI develops, reviews, tests the feature]

You: /backlog monthly-summary
[AI develops, reviews, tests the feature]

You: /backlog category-breakdown
[AI develops, reviews, tests the feature]

You: /backlog csv-export
[AI develops, reviews, tests the feature]
```

10. **Test it yourself:**
```
You: How do I run this?

AI: Run these commands:
$ python budget.py add --amount 50 --category groceries
$ python budget.py summary
$ python budget.py export --month 2024-01
```

You try it, it works! Since this is an L2 tool that runs locally, you don't need Stage 10 (deployment). You're done!

---

### Example 2: Build a Neighborhood Services Marketplace (Level 4)

**Your idea:**
"A website where neighbors can offer and request services like dog walking, lawn mowing, tutoring."

**Timeline:** 2-3 weeks of AI work

#### Week 1: Planning and Design

**Day 1: Stages 0-1**
- Write detailed ideas.md
- `/ideas-refine` - Polish your ideas and get clarifying questions (optional but helpful)
- `/stage 0` - Define problem, users, value
- `/stage 1` - AI researches competitors (TaskRabbit, Nextdoor, etc.)

**Day 2: Stages 2-3**
- `/stage 2` - Define personas:
  - Sarah (Service provider - dog walker)
  - Mike (Service seeker - busy parent)
- `/stage 3` - Scope MVP:
  - Include: Post service, browse services, contact provider
  - Exclude: Payments, ratings, messaging (version 2)

**Day 3-4: Stage 4**
- `/stage 4` - Write complete PRD
  - User registration
  - Service posting
  - Search/browse
  - Contact system
  - User profiles

**Day 5: Stage 5**
- `/stage 5` - UX design
  - User flows for posting a service
  - User flows for finding a service
  - Mockups (optional)

---

#### Week 2: Technical Planning

**Day 6: Stage 6**
- `/stage 6` - Architecture
  - Frontend: React web app
  - Backend: Node.js API
  - Database: PostgreSQL
  - Email: SendGrid

**Day 7: Stage 7**
- `/stage 7` - Tech specs
  - Approve technology choices
  - Set coding standards
  - Define theme (colors, fonts)

**Day 8: Stage 8**
- `/stage 8` - DevOps setup
  - GitHub repository
  - Development environment
  - Docker setup

---

#### Week 3: Development

**Day 9-10: Sprint Planning**
```
You: /stage sprints

AI creates Sprint 1:
- FEATURE-user-registration
- FEATURE-user-login
- FEATURE-user-profile
- FEATURE-password-reset
```

You approve

**Day 11-13: Build Sprint 1**
```
You: /backlog user-registration
[Takes 2-3 hours]

You: /backlog user-login
[Takes 2-3 hours]

You: /backlog user-profile
[Takes 2-3 hours]

You: /backlog password-reset
[Takes 2-3 hours]
```

**Day 14-15: Sprint 2**
```
AI creates Sprint 2:
- FEATURE-create-service
- FEATURE-browse-services
- FEATURE-search-services
- FEATURE-service-details

You: /backlog create-service
You: /backlog browse-services
You: /backlog search-services
You: /backlog service-details
```

**Day 16-17: Sprint 3**
```
AI creates Sprint 3:
- FEATURE-contact-provider
- FEATURE-email-notifications
- FEATURE-homepage
- FEATURE-about-page

[Process all backlogs]
```

**Day 18-19: Testing & Fixes**
```
You: Run full test plan

[AI identifies bugs, creates BUG backlogs]

You: /backlog bug-login-error
You: /backlog bug-search-crash
```

---

#### Week 4: Launch

**Day 20-21: Deployment**
```
You: /stage deployment

AI:
- Sets up AWS hosting
- Configures domain
- Deploys to staging
- You test
- Deploys to production
```

**Your product is LIVE!**

---

## Understanding Your Project Structure

After working with AI Dev Swarm, your project will have this structure:

```
your-project/
├── README.md                    # Project overview
├── ideas.md                     # Your original ideas (starting point)
│
├── 00-init-ideas/              # Stage 0: Initial planning
│   ├── README.md
│   ├── problem-statement.md
│   ├── target-users.md
│   ├── value-proposition.md
│   ├── owner-requirement.md
│   └── cost-budget.md
│
├── 01-market-research/         # Stage 1: Market validation
│   ├── README.md
│   ├── market-overview.md
│   ├── competitor-analysis.md
│   └── validation-findings.md
│
├── 02-personas/                # Stage 2: User research
│   ├── README.md
│   ├── persona-primary.md
│   └── user-stories.md
│
├── 03-mvp/                     # Stage 3: MVP definition
│   ├── README.md
│   ├── mvp-scope.md
│   ├── out-of-scope.md
│   └── success-metrics.md
│
├── 04-tech-research/           # Stage 4: Technical feasibility (optional)
│   ├── README.md
│   ├── feasibility-assessment.md
│   ├── poc-results.md
│   └── poc/ (proof of concept code)
│
├── 05-prd/                     # Stage 5: Requirements
│   ├── README.md
│   ├── prd.md
│   ├── functional-requirements.md
│   └── non-functional-requirements.md
│
├── 06-ux/                      # Stage 6: UX design
│   ├── README.md
│   ├── user-flows.md
│   ├── interaction-specs.md
│   └── mockup/ (optional)
│
├── 07-architecture/            # Stage 7: System design
│   ├── README.md
│   ├── system-overview.md
│   └── architecture-diagram.md
│
├── 08-tech-specs/              # Stage 8: Technology choices
│   ├── README.md
│   ├── tech-stack.md
│   ├── coding-standards.md
│   └── testing-standards.md
│
├── 09-devops/                  # Stage 9: Development setup
│   ├── README.md
│   ├── github-setup.md
│   └── mcp-setup.md
│
├── 10-sprints/                 # Stage 10: Development work
│   ├── README.md
│   ├── sprint-001/
│   │   ├── README.md
│   │   ├── FEATURE-login.md
│   │   ├── FEATURE-registration.md
│   │   └── ...
│   └── sprint-002/
│       └── ...
│
├── 11-deployment/              # Stage 11: Going live
│   ├── README.md
│   ├── infra/
│   ├── releases/
│   └── evidence/
│
├── features/                   # Knowledge base (AI reference)
│   ├── README.md
│   ├── features-index.md      # List of all features
│   ├── auth-login.md          # Feature definition
│   ├── flows/                 # Flow diagrams
│   ├── contracts/             # API contracts
│   └── impl/                  # Implementation notes
│
├── src/                        # Your actual code
│   ├── frontend/
│   ├── backend/
│   └── ...
│
└── 99-archive/                 # Completed projects
```

---

### Key Folders Explained

**Planning Folders (00-05):**
These contain documents describing WHAT you're building. No code here (except PoCs in 04).

**Design Folders (06-08):**
These describe HOW it works from user and system perspectives.

**Development Folders (09-11):**
This is where AI sets up tools and builds your product.

**features/ - The Knowledge Base:**
AI creates a "memory" here. Each feature is documented so AI can reference it later without re-reading all code.

**src/ - Your Code:**
The actual working software lives here.

---

## Tips for Success

### 1. Start Small
**Don't:**
"I want to build the next Facebook"

**Do:**
"I want a simple social network for my college dorm"

**Why:** Smaller projects finish faster and teach you the process.

---

### 2. Be Specific in ideas.md
**Don't:**
"A productivity app"

**Do:**
"A todo list app where tasks are organized by energy level (high, medium, low) so I can pick tasks based on how I feel"

**Why:** Specific ideas lead to better AI suggestions.

---

### 3. Review Everything AI Creates
AI is smart but not perfect. Always review:
- Does this match my vision?
- Did AI misunderstand anything?
- Are the features what I want?

**Don't blindly approve - read and think**

---

### 4. Test Features As They're Built
Don't wait until the end. Test each feature when it's done.

**Example:**
```
You: /backlog user-login

AI: Login feature is complete!

You: How do I test it?

AI: Run the app and try these steps...
[You test it immediately]
```

---

### 5. Ask Questions
AI can explain anything in simple terms.

**Good questions:**
- "Why did you choose PostgreSQL over MySQL?"
- "Can you explain this architecture in simple terms?"
- "What does this error mean?"
- "How much will hosting cost approximately?"

---

### 6. Use Git Commits
Save your progress regularly.

```
You: Let's commit this stage

AI: [Creates professional commit message]
[Saves your work to GitHub]
```

**Why:** You can always go back if something goes wrong.

---

### 7. Budget for Iterations
Your first version won't be perfect. Plan for:
- MVP (version 1)
- Improvements based on user feedback (version 2)
- New features (version 3+)

---

### 8. Understand the Difference Between Stages
**Planning stages (0-5):** Can change easily, just documents
**Implementation (10+):** Changes are harder, requires recoding

**Do lots of planning, then build once**

---

## Frequently Asked Questions

### General Questions

**Q: Do I really need zero coding knowledge?**
A: Yes! But you'll learn concepts along the way. You don't need to write code, but you'll understand how software is built.

**Q: How long does a project take?**
A:
- Simple script (L0-L1): Few hours
- Tool (L2): 1-2 days
- Small app (L3): 1 week
- MVP (L4): 2-4 weeks
- Large product (L5+): 1-3 months

**Q: How much does it cost?**
A: Mostly your time. AI processing costs:
- L2: $2-$10
- L3: $10-$25
- L4: $25-$50
- L5+: $50-$200

Plus hosting costs when you deploy (varies by service).

**Q: Can I change my mind mid-project?**
A: Yes, but:
- Early stages (0-8): Easy to change
- During development (10): Harder, may need to redo code
- After deployment (11): Requires new development cycle

**Q: What if AI makes a mistake?**
A:
1. You review everything before approval
2. Code review catches issues
3. Testing finds bugs
4. You can always ask AI to fix it

---

### Technical Questions

**Q: What AI tools work with this?**
A:

**Native Agent Skills Support (easiest):**
- Claude Code (recommended)
- GitHub Copilot CLI
- opencode

**Via Symlink Setup:**
- OpenAI Codex (requires symlink, use `/prompts:command` format)

**Via MCP Server:**
- Gemini CLI (requires MCP server configuration)
- Any AI that supports MCP protocol

**Q: Where does my code run?**
A:
- During development: On your computer
- After deployment: On cloud servers (AWS, etc.)

**Q: Do I need to learn Git?**
A: Basic Git helps but AI handles most of it. Learn these commands:
- `git status` (see changes)
- `git add .` (stage changes)
- `git commit -m "message"` (save changes)
- `git push` (upload to GitHub)

**Q: Can I use my own tech stack?**
A: Yes! In Stage 7, discuss with AI. It will explain tradeoffs.

**Q: What if I want to add features later?**
A: Just create new backlogs:
1. Add to `09-sprints/sprint-new/FEATURE-new-thing.md`
2. Run `/backlog new-thing`
3. Deploy update

---

### Process Questions

**Q: Can I skip stages?**
A: Depends on project size:
- L0-L1: Only need stage 0
- L2: Can skip 1, 4, 6, 7, 11
- L3+: Should do all stages (except optional 4-tech-research)

AI will tell you which stages to skip.

**Q: What if I don't understand something AI created?**
A: Ask!
```
You: Can you explain the architecture in simple terms?
You: Why did you make this decision?
You: What does this mean for non-technical people?
```

**Q: How do I know if my idea is good?**
A: Stage 1 (market research) helps validate this. AI will:
- Find similar products
- Identify if there's demand
- Show you the competition

**Q: Can I work with a team?**
A: Yes! You can:
- Share the GitHub repository
- Work on different features simultaneously
- Review each other's backlogs

---

### Business Questions

**Q: Can I sell the product AI builds?**
A: Yes! It's your code. You own it.

**Q: Is it production-ready?**
A: For L4+ projects with full stages, yes. AI builds:
- Secure code
- Tested features
- Scalable architecture
- Proper deployment

**Q: How do I get users?**
A: AI builds the product. Marketing is up to you:
- Stage 1 gives you market insights
- Use that to find your audience
- Launch on relevant platforms

**Q: Can this replace hiring developers?**
A: For MVPs and small products: Often yes
For large-scale or highly specialized: You'll still benefit from experts
Best use: Validate ideas before hiring a team

---

## Getting Help

### Documentation

**Read these files in the project:**
- `dev-swarm/docs/ai-agile-development.md` - Understand the methodology
- `dev-swarm/docs/ai-feature-driven-development.md` - Feature approach
- `dev-swarm/docs/repository-structure.md` - Folder organization
- `dev-swarm/docs/software-dev-classification.md` - Project sizing

---

### Community Support

**Discord Server:**
Join the AI Dev Swarm community:
https://juniorit.ai/virtual-office

**Ask:**
- Project planning advice
- Technical questions
- Share your success stories
- Get feedback on ideas

---

## Your Journey Starts Now

### Quick Start Checklist

- [ ] Fork the AI Dev Swarm repository
- [ ] Clone it to your computer
- [ ] Write your idea in ideas.md
- [ ] Open Claude Code or Codex in the project folder
- [ ] (Optional) Type `/ideas-refine` to polish your ideas
- [ ] Type `/stage 0` or "Let's start!"
- [ ] Answer AI's questions
- [ ] Review and approve the first documents
- [ ] Continue through the stages

---

### Remember

1. **You're in control** - AI proposes, you decide
2. **Start small** - Learn with a simple project first
3. **Ask questions** - There are no stupid questions
4. **Test everything** - Don't skip testing
5. **Iterate** - Version 1 is just the beginning
6. **Have fun** - Building products should be exciting!

---

### The AI Dev Swarm Philosophy

**Traditional software development:**
- Requires years of learning
- High barrier to entry
- Technical knowledge is the bottleneck

**AI Dev Swarm approach:**
- Ideas and vision are what matter
- AI handles the technical complexity
- Anyone with a good idea can build

**Your role:**
- Provide vision and direction
- Make decisions
- Test and validate
- Guide the AI

**AI's role:**
- Handle technical implementation
- Follow best practices
- Build professional-quality code
- Explain everything in simple terms

---

### Success Story Template

Imagine 6 weeks from now:

```
Week 1: Had an idea, wrote it down
Week 2: AI helped plan and design
Week 3-4: AI built the features
Week 5: Tested and fixed issues
Week 6: Launched to real users

Result: A real product, built by AI, guided by you
```

**This is possible. This is AI Dev Swarm.**

---

## Conclusion

You now have everything you need to build software products without coding knowledge.

**The three keys to success:**
1. **Clear vision** - Know what problem you're solving
2. **Active participation** - Review, test, provide feedback
3. **Trust the process** - Follow the 12 stages

**Start today:**
1. Write your idea in ideas.md
2. Type `/stage 0`
3. Begin your journey

**Welcome to the future of software development.**

---

**Version:** 1.0
**Last Updated:** 2025-12-28
**License:** GNU Affero General Public License v3.0
**Community:** https://juniorit.ai/virtual-office
