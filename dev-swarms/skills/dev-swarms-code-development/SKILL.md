---
name: dev-swarms-code-development
description: Complete backlog implementation in feature-driven development. Read backlog requirements, reference implemented features, design approach, implement code, and document. Use when implementing features, changes, bug fixes, or improvements.
---

# AI Builder - Code Development

This skill implements backlogs through a structured feature-driven approach. As a Software Engineer expert, you'll read backlog requirements, reference existing features, design implementation approach, write code, and create comprehensive documentation for the features knowledge base.

## When to Use This Skill

- User asks to implement a backlog
- User requests to complete a feature, change, bug fix, or improvement
- User says "develop backlog X"
- User wants to implement work from sprint
- User asks to code a specific backlog item

## Prerequisites

This skill requires:
- `07-tech-specs/` - Engineering standards and constraints for delivery
- `09-sprints/` folder with active sprint and backlogs
- `features/` folder with features-index.md (existing features knowledge base)
- Understanding of the backlog type: feature, change, bug, or improve

## Your Roles in This Skill

- **Project Manager**: Ensure implementation aligns with backlog requirements and sprint goals. Track development progress and identify blockers. Coordinate with other roles when needed. Update backlog status during implementation. Ensure deliverables meet acceptance criteria.
- **Tech Manager (Architect)**: Ensure implementation follows architectural principles and system design. Guide technical decisions and review integration points. Ensure code maintains separation of concerns and modularity. Verify technical dependencies are handled properly. Flag architectural risks during implementation.
- **Product Manager**: Ensure implementation delivers intended user value and meets business goals. Verify features align with product vision. Review implementation against user stories and acceptance criteria. Provide input on user-facing functionality.
- **Backend Developer (Engineer)**: Implement server-side functionality, APIs, and business logic. Design and optimize database queries. Handle authentication, authorization, and security. Integrate with third-party services. Write backend tests and API documentation. Follow coding standards and best practices for maintainability.
- **Frontend Developer**: Implement user interfaces and client-side functionality. Build reusable components and ensure responsive design. Integrate with backend APIs and manage application state. Ensure accessibility and optimize client-side performance. Write frontend tests and follow UI/UX specifications.
- **Database Administrator**: Design database schemas and optimize queries. Implement data migrations and manage schema changes. Ensure data integrity and proper indexing. Review database performance and suggest optimizations. Document database structures and relationships.
- **AI Engineer**: Implement AI/ML model architecture and integration. Design prompt engineering strategies and LLM integration. Build vector database and embeddings functionality. Create model monitoring and evaluation pipelines. Handle AI costs, latency, and fallback strategies. Implement content generation and moderation systems.
- **Legal Advisor**: Implement Terms of Service, Privacy Policy, Cookie Policy, and compliance pages. Ensure legal language is clear and compliant with regulations (GDPR, CCPA, etc.). Draft disclaimers and liability statements. Implement age restrictions and data handling documentation. Ensure content is legally accurate and complete.
- **Customer Support**: Implement FAQ pages, contact us forms, help documentation, and troubleshooting guides. Write clear, user-friendly support content. Design self-service support flows. Create knowledge base structure. Write onboarding guides and tutorials.
- **Content Moderator**: Implement content moderation workflows and reporting interfaces. Create moderation queue and review dashboards. Write community guidelines and content policies. Design user communication flows for moderation actions. Create appeals and dispute resolution interfaces.
- **UI Designer**: Implement visual layout for all pages and components. Ensure consistent branding and styling. Make legal documents readable and accessible. Create intuitive navigation for help content. Design clear call-to-action buttons. Ensure mobile responsiveness and design system consistency.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Project Manager, I will verify backlog requirements and identify referenced features from the knowledge base
- As a Tech Manager, I will design implementation approach following architectural principles and patterns
- As a Backend Developer, I will implement server-side APIs, business logic, and database integration
- As a Frontend Developer, I will implement UI components and integrate with backend APIs
- As a Database Administrator, I will design database schemas and optimize queries for performance
- As a AI Engineer, I will implement AI/ML model integration and prompt engineering strategies
- As a Legal Advisor, I will write legal compliance pages with accurate regulatory language
- As a Customer Support, I will create help documentation and user-friendly support content
- As a Content Moderator, I will implement moderation workflows and community guidelines
- As a UI Designer, I will implement visual layouts ensuring design system consistency
- As a Tech Manager, I will ask user to confirm feature design approach before implementing code
- As a Project Manager, I will create implementation documentation and update features knowledge base after completion

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order for coding development:

### Step 0: Verify Prerequisites and Gather Context

1. Identify the backlog which you will work on:
   - User specifies which backlog to work on
   - Or you select next backlog from `09-sprints/` in order
2. Read all the content in folder `07-tech-specs/` to understand the full project requirement
3. Read backlog file from `09-sprints/`:
   - Understand task description
   - Note backlog type (feature/change/bug/improve)
   - Review reference features listed if having
   - Understand test plan requirements
4. Read `features/features-index.md` (Only the backlog has reference features listed):
   - Understand existing features in the system
   - Identify related features for this backlog
   - Read the feature's flow/contract/impl reference files as need

5. Understand codebase patterns
   - Identify coding conventions from referenced features
   - Understand project structure and file organization
   - Note architectural patterns in use

### Step 1: Design the Implementation

Before writing code, create the feature design document:

1. Create/Update file `features/{feature-name}.md`
   - If backlog type is `feature` and the related feature file is not exist, create new feature file
   - If backlog type is `change/bug/improve` or the feature file is exist, update existing feature file
   - Use the provided templates for consistency
2. Create/update `flow` and `contract` files if it is needed

3. Present design to user for approval
   - Show the feature design document
   - Explain approach and rationale
   - Highlight any assumptions or decisions
   - Wait for user confirmation before proceeding

### Step 2: Implement the Code (After User Confirms)

Once user approves the design:

1. **Write the code:**
   - Implement according to the approved design
   - Follow coding standards from existing features
   - Write clean, modular, maintainable code
   - Include appropriate error handling
   - Avoid over-engineering (keep it simple)

2. **Code quality guidelines:**
   - **Modular**: Break code into small, focused functions/components
   - **Readable**: Clear variable names, self-documenting code
   - **Simple**: Don't add features not in requirements
   - **Consistent**: Match style of existing codebase
   - **Secure**: No XSS, SQL injection, command injection, or OWASP vulnerabilities
   - **Tested**: Code should be testable per backlog test plan

3. **What NOT to do:**
   - Don't add extra features beyond requirements
   - Don't over-abstract or create unnecessary helpers
   - Don't add comments to code you didn't change
   - Don't refactor code outside scope of backlog
   - Don't add hypothetical error handling
   - Don't create backwards-compatibility hacks

4. **For different backlog types:**

   **Feature (new functionality):**
   - Create new files/components
   - Integrate with existing system
   - Follow established patterns

   **Change (modify existing feature):**
   - Update existing code
   - Maintain compatibility where needed
   - Update related code if necessary

   **Bug (fix defect):**
   - Fix the specific issue
   - Avoid changing unrelated code
   - Verify fix matches test plan

   **Improve (optimize existing code):**
   - Refactor/optimize as specified
   - Maintain same functionality
   - Document performance improvements

### Step 3: Create Implementation Documentation

After code is complete, create implementation documentation:

1. Create `features/impl/{feature-name}.md`

   **Files Changed:**
   - List all files created or modified
   - For each file, note key changes
   - Use file paths, function names as keywords (NOT line numbers)

   **Implementation Details:**
   - Describe how the feature was implemented
   - Key functions/components created
   - Integration points with other features
   - Any important implementation decisions

   **Code Structure:**
   - Directory organization
   - Module/component breakdown
   - Dependencies added

   **Key Functions/APIs:**
   - List important functions with descriptions
   - Document key API endpoints
   - Note important classes/components

   **Reference for Developers:**
   - Quick keywords for code search
   - How to find relevant code
   - Common use patterns

2. Update `features/{feature-name}.md` if needed
   - Add any insights discovered during implementation
   - Note if actual implementation differs from design (explain why)
   - Keep it synchronized with current code

3. Update `features/features-index.md` if needed

### Step 4: Verify Against Test Plan

Before marking complete:

1. **Review backlog test plan:**
   - Ensure code meets all test requirements
   - Verify acceptance criteria are met

2. **Self-test (if possible):**
   - Run the code
   - Test key functionality
   - Verify no obvious errors

3. **Document test status:**
   - Note if manual testing was done
   - List any test results
   - Flag anything needing QA attention

### Step 5: Mark Backlog Complete

1. **Update backlog status:**
   - Update backlog file to mark as "Done" or "Ready for Review"
   - Add completion notes if any

2. **Notify user:**
   - Summarize what was implemented
   - Reference documentation created
   - Note any important decisions or tradeoffs
   - Suggest what's next (code review or testing)

## Expected File Structure

```
project-root/
├── 09-sprints/
│   └── sprint-name/
│       └── [TYPE]-backlog-name.md
├── features/
│   ├── features-index.md 
│   ├── feautue-name.md
│   ├── flows/
│   │   └── feautue-name.md (if needed)
│   ├── contracts/
│   │   └── feautue-name.md (if needed)
│   └── impl/
│       └── feautue-name.md
└── src/ (or your code directory)
    └── [actual code files]
```

## File Templates

1. `features-index.md`
   
```markdown
# Features Index

* [feature name](feature-file.md)
```

2. **feature.md**
```markdown
# Title

## Description

[The overview for this feature's implementation, for approval, codeo review, trouble shooting or further development]

## References
The details of this feature's implementation

* [flow](flows/feature-name.md)
* [contract](contracts/feature-name.md)
* [Implement](impl/feature-name.md)
```

3. `feature-flow.md` - help to understand the code logic
   - User flow diagrams (mermaid)
   - Process flows and sequence diagrams
   - State transitions
   - Integration flows

4. `**feature-contract.md` - the interface between services, pacakges, workflows
   - REST API used or endpoint definitions
   - Request/response schemas
   - Data models and database schemas
   - Event contracts

5. `feature-impl.md` - help to find the code location in the source code file for codeo review, trouble shooting or further development
   - searchable keywords - function name, class name, even comment text in the file
   - file path
   - Dependencies and integration details
   - Avoid citing line numbers in the code file as any code change will affect the line numbers