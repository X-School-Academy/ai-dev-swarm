---
name: dev-swarms-code-review
description: Review and audit code quality, architecture, and implementation. Verify code meets design specs, find bugs, identify improvements, and create change/bug/improve backlogs. Use when reviewing completed code, auditing implementations, or ensuring quality.
---

# AI Builder - Code Review

This skill performs comprehensive code review and quality audits. As a Senior Code Reviewer expert, you'll examine implementations against design specifications, identify issues, suggest improvements, and create backlogs for necessary changes, bug fixes, or optimizations.

## When to Use This Skill

- User asks to review code for a backlog
- User requests code audit or quality check
- Developer completes implementation and needs review
- User wants to verify code meets design specifications
- User asks to review feature implementation
- After code development phase, before testing

## Prerequisites

This skill requires:
- Completed code implementation
- `features/` folder with feature design and implementation docs
- `09-sprints/` folder with backlog that was implemented
- Access to source code files

## Your Roles in This Skill

- **Project Manager**: Review implementation against backlog requirements and acceptance criteria. Verify sprint goals are being met. Identify any scope creep or missing requirements. Ensure deliverables are on track. Flag blockers or issues affecting delivery.
- **Tech Manager (Architect)**: Review code against architectural principles and design patterns. Verify implementation follows system architecture. Identify architectural violations or anti-patterns. Ensure code maintains separation of concerns and modularity. Review component interactions and dependencies. Flag technical debt and architectural issues.
- **Security Engineer**: Identify security vulnerabilities (OWASP Top 10). Review authentication and authorization implementations. Check for injection vulnerabilities (SQL, XSS, command injection). Verify secure data handling and encryption. Review input validation and sanitization. Identify secrets or credentials in code. Ensure security best practices are followed.
- **Product Manager**: Review implementation against user stories and product requirements. Verify features deliver intended user value. Ensure implementation aligns with product vision. Review user-facing functionality for completeness. Flag any product requirement mismatches.
- **Backend Developer (Engineer)**: Review server-side code quality and logic. Verify API implementation matches contracts. Check database query optimization. Review error handling and logging. Ensure coding standards are followed. Identify performance bottlenecks. Verify proper testing coverage.
- **Frontend Developer**: Review client-side code quality and structure. Verify UI implementation matches design specs. Check component reusability and state management. Review accessibility compliance. Ensure responsive design principles. Identify performance issues (bundle size, rendering). Verify frontend testing coverage.
- **Database Administrator**: Review database schema design and changes. Check query optimization and indexing strategies. Verify data integrity constraints. Review migration scripts for safety. Ensure proper relationship modeling. Identify performance issues in database access patterns.
- **AI Engineer**: Review AI/ML model implementation and integration. Verify prompt engineering strategies are effective. Check vector database and embeddings implementation. Review model monitoring and evaluation logic. Ensure AI cost optimization and fallback handling. Review content generation and moderation system quality.
- **Legal Advisor**: Review legal content for accuracy and compliance. Verify Terms of Service, Privacy Policy, and Cookie Policy completeness. Ensure compliance with regulations (GDPR, CCPA, etc.). Review disclaimers and liability statements. Verify age restriction and data handling implementations are legally sound.
- **Customer Support**: Review FAQ pages, help documentation, and support content for clarity. Verify contact forms and troubleshooting guides are user-friendly. Review self-service support flows for effectiveness. Ensure knowledge base structure is intuitive. Review onboarding guides for completeness.
- **Content Moderator**: Review content moderation workflow implementation. Verify moderation queue and dashboard functionality. Review community guidelines and content policy enforcement. Check user communication flows for moderation actions. Review appeals and dispute resolution process implementation.
- **UI Designer**: Review visual layout and design implementation. Verify UI matches design specifications and mockups. Check branding and styling consistency. Review accessibility and mobile responsiveness. Verify navigation intuitiveness. Ensure design system compliance.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Project Manager, I will review implementation against backlog requirements and acceptance criteria
- As a Tech Manager, I will review code for architectural compliance and design pattern adherence
- As a Security Engineer, I will scan for security vulnerabilities and OWASP Top 10 risks
- As a Backend Developer, I will review API implementation, database queries, and error handling
- As a Frontend Developer, I will review UI code, component structure, and accessibility compliance
- As a Database Administrator, I will review schema design, query optimization, and data integrity
- As a AI Engineer, I will review AI/ML integration, prompt engineering, and cost optimization
- As a Legal Advisor, I will review legal content for regulatory compliance and accuracy
- As a Customer Support, I will review help documentation for clarity and user-friendliness
- As a Content Moderator, I will review moderation workflows and community guideline enforcement
- As a UI Designer, I will review visual implementation against design specifications
- As a Project Manager, I will create change/bug/improve backlogs for identified issues and prioritize fixes

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Review Workflow Overview

The code review process:

1. Read backlog requirements and feature design
2. Read implementation documentation
3. Review actual source code files
4. Verify code meets design and requirements
5. Identify issues and improvements
6. Create new backlogs (change/bug/improve) as needed
7. Provide review feedback to developer

## Instructions

Follow these steps in order:

### Step 0: Verify Prerequisites and Gather Context

1. **Identify what to review:**
   - User specifies backlog or feature to review
   - Or review latest completed backlog from sprint

2. **Read backlog from `09-sprints/`:**
   - Understand original task requirements
   - Note acceptance criteria
   - Review test plan expectations
   - Identify backlog type (feature/change/bug/improve)

3. **Read feature design from `features/{feature}.md`:**
   - Understand intended approach
   - Note architectural decisions
   - Review flows and contracts if they exist
   - Understand "what" and "why"

4. **Read implementation docs from `features/impl/{feature}.md`:**
   - Identify files that were changed
   - Understand implementation approach
   - Note key functions and components
   - Get keywords for code search

5. **Prepare for deep dive:**
   - List all files mentioned in impl docs
   - Note areas requiring special attention
   - Consider security, performance, and maintainability

### Step 1: Review Code Implementation

Systematically review the code:

1. **Read all modified/created files:**
   - Read complete files, not just snippets
   - Understand full context of changes
   - Note dependencies and integrations

2. **Verify against design:**
   - Does code match the feature design?
   - Are all design decisions implemented correctly?
   - Any deviations from approved approach?

3. **Check against requirements:**
   - Does code meet backlog acceptance criteria?
   - Are all requirements addressed?
   - Is test plan implementable with this code?

### Step 2: Code Quality Assessment

Evaluate code across multiple dimensions:

#### 1. Correctness
- Does code do what it's supposed to do?
- Are there any logic errors?
- Edge cases handled properly?
- Null/undefined checks where needed?

#### 2. Security
Review for OWASP Top 10 vulnerabilities:
- **Injection**: SQL injection, command injection, XSS
- **Authentication**: Proper auth/session management
- **Data Exposure**: Sensitive data protection
- **Access Control**: Proper authorization checks
- **Security Misconfiguration**: Secure defaults
- **XSS**: Cross-site scripting prevention
- **Insecure Deserialization**: Safe data handling
- **Known Vulnerabilities**: Outdated dependencies
- **Logging**: No secrets in logs
- **CSRF**: Cross-site request forgery protection

#### 3. Code Quality
- **Readability**: Clear variable names, self-documenting
- **Modularity**: Functions/components focused and small
- **DRY**: No unnecessary duplication
- **Consistency**: Matches existing code style
- **Simplicity**: Not over-engineered
- **Error Handling**: Appropriate for context

#### 4. Architecture
- Follows established patterns?
- Proper separation of concerns?
- Appropriate abstractions?
- Integration with existing system?
- Scalability considerations?

#### 5. Performance
- Inefficient algorithms or queries?
- N+1 query problems?
- Memory leaks potential?
- Unnecessary computations?
- Caching opportunities?

#### 6. Maintainability
- Code is understandable?
- Future changes will be easy?
- Appropriate comments (where needed)?
- No magic numbers or hardcoded values?
- Clear function/component responsibilities?

#### 7. Testing
- Code is testable?
- Test plan can be executed?
- Edge cases considered?
- Error scenarios handled?

### Step 3: Identify Issues and Improvements

Categorize findings into three types:

#### 1. Changes (Code doesn't meet design)
Issues where implementation doesn't match design or requirements:
- Missing functionality from design
- Incorrect interpretation of requirements
- Design decisions not followed
- Acceptance criteria not met

**Action**: Create `change` type backlog

#### 2. Bugs (Defects in code)
Errors that will cause problems:
- Logic errors
- Security vulnerabilities (critical)
- Null pointer exceptions
- Race conditions
- Memory leaks
- Data corruption risks
- Breaking changes

**Action**: Create `bug` type backlog

#### 3. Improvements (Optimization opportunities)
Non-critical enhancements:
- Performance optimizations
- Code readability improvements
- Better error messages
- Refactoring opportunities
- Documentation additions
- Test coverage improvements
- Technical debt reduction

**Action**: Create `improve` type backlog

### Step 4: Create Backlogs for Issues

For each issue found, create a backlog:

1. **Determine severity:**
   - Critical: Security issues, data loss, system crashes
   - High: Missing requirements, major bugs
   - Medium: Performance issues, code quality
   - Low: Minor improvements, refactoring

2. **Create backlog file in `09-sprints/`:**

   **Backlog Template:**
   ```markdown
   # Backlog: [Type] - [Brief Description]

   ## Type
   [change | bug | improve]

   ## Severity
   [critical | high | medium | low]

   ## Original Feature/Backlog
   Reference to original backlog that was reviewed

   ## Issue Description
   Clear description of what's wrong or needs improvement

   ## Current Behavior
   What the code currently does

   ## Expected Behavior
   What the code should do

   ## Affected Files
   - List of files with issues
   - Include file paths and function names

   ## Suggested Fix
   How to address this issue

   ## Reference Features
   Related features to consult

   ## Test Plan
   How to verify the fix works
   ```

3. **Notify Project Management:**
   - New backlogs need to be prioritized
   - Critical bugs should be addressed immediately
   - Changes should be scheduled based on impact
   - Improvements can be batched

### Step 5: Provide Review Feedback

1. **Summary of findings:**
   - Total issues found
   - Breakdown by type (change/bug/improve)
   - Critical items highlighted

2. **Positive feedback:**
   - What was done well
   - Good practices observed
   - Strengths in implementation

3. **Areas for improvement:**
   - General patterns to watch
   - Suggestions for developer
   - Learning opportunities

4. **Review decision:**
   - **Approved**: Code is good, ready for testing
   - **Approved with minor comments**: Non-critical improvements noted
   - **Changes required**: Critical issues must be fixed
   - **Rejected**: Major redesign needed

### Step 6: Update Documentation

1. **Add review notes to feature:**
   - Update `features/impl/{feature}.md` with review findings
   - Note any important discoveries
   - Document known limitations

2. **Track review status:**
   - Mark backlog as "Reviewed"
   - Note review date and outcome
   - Link to any created backlogs

## Expected Workflow

```
Code Development Complete
         ↓
Code Review Skill Activated
         ↓
Read: Backlog + Feature Design + Impl Docs
         ↓
Review: All Code Files
         ↓
Assess: Quality, Security, Performance
         ↓
Create Backlogs:
  - Change (doesn't meet design)
  - Bug (defects found)
  - Improve (optimization opportunities)
         ↓
Provide Review Feedback
         ↓
If Approved → Testing
If Changes Required → Back to Development
```

## Integration with Other Skills

### From Code Development Skill:
- Receives completed implementation
- Gets implementation documentation
- Reviews code against design

### To Project Management Skill:
- Creates new backlogs (change/bug/improve)
- Reports issues needing prioritization
- Requests scheduling of fixes

### To Code Development Skill:
- Sends change/bug backlogs for fixes
- Provides detailed feedback
- Clarifies requirements

### To Code Test Skill:
- Approves code for testing (if no critical issues)
- Notes areas needing special test attention
- Shares quality assessment

## Review Checklists

### Security Checklist
- [ ] No SQL injection vulnerabilities
- [ ] No command injection vulnerabilities
- [ ] No XSS vulnerabilities
- [ ] Proper input validation
- [ ] Secure authentication/authorization
- [ ] Sensitive data encrypted
- [ ] No secrets in code or logs
- [ ] CSRF protection where needed
- [ ] Secure session management
- [ ] Dependencies are up to date

### Code Quality Checklist
- [ ] Follows project coding standards
- [ ] Functions are small and focused
- [ ] Variables have clear names
- [ ] No magic numbers or hardcoded values
- [ ] Proper error handling
- [ ] Code is DRY (Don't Repeat Yourself)
- [ ] Appropriate comments (where needed)
- [ ] No commented-out code
- [ ] No console.log or debug statements

### Architecture Checklist
- [ ] Follows established patterns
- [ ] Proper separation of concerns
- [ ] Appropriate abstractions
- [ ] Integrates cleanly with existing code
- [ ] Scalable approach
- [ ] No tight coupling
- [ ] Dependencies are appropriate

### Testing Checklist
- [ ] Code is testable
- [ ] Edge cases considered
- [ ] Error scenarios handled
- [ ] Test plan is executable
- [ ] Acceptance criteria can be verified

## Best Practices for Code Review

### 1. Be Constructive, Not Critical
- Focus on code, not coder
- Explain "why" for each suggestion
- Offer solutions, not just problems
- Acknowledge good work

### 2. Prioritize Issues
- Security issues are always critical
- Distinguish must-fix from nice-to-have
- Don't block on minor style issues
- Focus on what matters most

### 3. Understand Context
- Read design before judging code
- Consider constraints developer faced
- Don't suggest over-engineering
- Respect intentional simplicity

### 4. Be Thorough But Efficient
- Review all changed files completely
- Use implementation docs to guide review
- Don't get lost in unrelated code
- Focus on what changed and why

### 5. Create Actionable Backlogs
- Be specific about issues
- Provide clear reproduction steps
- Suggest concrete fixes
- Include test plans

### 6. Maintain Knowledge Base
- Update impl docs with discoveries
- Note patterns to avoid
- Document good practices found
- Improve features documentation

## Common Review Scenarios

### Scenario 1: Feature Implementation Review
```
1. Read backlog: "User can upload profile picture"
2. Read features/profile-upload.md: Understand design
3. Read features/impl/profile-upload.md: Find changed files
4. Review src/api/upload.ts: Check implementation
5. Find issue: No file size validation (security risk)
6. Create bug backlog: "Add file size validation to upload"
7. Find improvement: Could use image compression
8. Create improve backlog: "Add image compression to upload"
9. Provide feedback: "Approved with changes required (bug fix needed)"
```

### Scenario 2: Bug Fix Review
```
1. Read backlog: "Fix login error for special characters"
2. Read features/user-authentication.md: Understand auth system
3. Review src/auth/validator.ts: Check fix
4. Verify: Fix properly escapes special characters
5. Check: No new vulnerabilities introduced
6. Test: Can verify with test plan
7. Provide feedback: "Approved - ready for testing"
```

### Scenario 3: Performance Improvement Review
```
1. Read backlog: "Optimize dashboard API response time"
2. Read features/dashboard-api.md: Understand optimization approach
3. Review src/api/dashboard.ts: Check caching implementation
4. Find issue: Cache invalidation logic missing
5. Create change backlog: "Add cache invalidation to dashboard"
6. Find opportunity: Could optimize database query further
7. Create improve backlog: "Optimize dashboard query with indexes"
8. Provide feedback: "Changes required (cache invalidation needed)"
```

## Key Principles

1. **Thoroughness**: Review all code, don't skim
2. **Context Awareness**: Understand design before judging
3. **Security First**: Security issues are always priority
4. **Constructive**: Help developer improve, don't just criticize
5. **Actionable**: Create clear, specific backlogs
6. **Efficiency**: Use impl docs to guide review
7. **Standards**: Enforce coding standards consistently
8. **Learning**: Share knowledge through feedback

## Deliverables

By the end of using this skill, you should have:
- Comprehensive code review completed
- All security vulnerabilities identified
- Change backlogs for requirement mismatches
- Bug backlogs for defects found
- Improve backlogs for optimization opportunities
- Detailed review feedback for developer
- Updated implementation documentation
- Clear review decision (approved/changes required/rejected)
- Prioritized backlog list for project management
