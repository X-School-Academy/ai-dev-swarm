# 07-tech-specs deliverables

Only present files that are suitable for the project's type and level; omit the rest.

## Deliverable list

- tech-stack.md: Technology choices and rationale.
- security.md: Security posture, auth, and threat mitigations.
- theme-standards.md: Theme standards extracted from UX mockups.
- coding-standards.md: Code style and conventions.
- source-code-structure.md: Source organization and boundaries.
- testing-standards.md: Testing strategy and gates.
- security-standards.md: Secure coding rules and checklist.

## File content guidance

### README.md

- Stage overview and objectives
- Owners: Tech Manager (lead), Security Engineer, UI Designer, DevOps Engineer
- Summary of technical approach and key decisions
- Use the Deliverables checklist in the README template to list files; do not add a separate Documents section
- Rationale for major technical decisions

### tech-stack.md

Define the complete technology stack:

1. **Technology Selection Criteria:**
   - Must support requirements from PRD
   - Must work with chosen architecture
   - Team familiarity and expertise
   - Community support and ecosystem
   - Performance and scalability
   - Cost considerations
   - Long-term maintainability

2. **Frontend Stack:**
   - Define framework/library choice and rationale
   - Specify language (JavaScript/TypeScript) and why
   - Select UI component library approach
   - Choose state management solution
   - Define styling approach
   - Specify build tool and package manager
   - For mobile: Define framework and navigation approach
   - For desktop: Define framework if applicable

3. **Backend Stack:**
   - Select language and version with rationale
   - Choose framework and explain why
   - Define API style (REST/GraphQL/gRPC/etc.)
   - Specify background job processing approach
   - Define scheduler if needed

4. **Database and Data Storage:**
   - Select primary database type and version with rationale
   - Choose caching solution
   - Define object storage approach
   - Specify search solution if applicable

5. **Infrastructure and Deployment:**
   - Select cloud provider with rationale
   - Choose compute service approach
   - Define container orchestration if applicable
   - Specify CDN service

6. **DevOps and Tools:**
   - Define version control platform and branching strategy
   - Choose CI/CD platform with rationale
   - Select application monitoring solution
   - Choose error tracking service
   - Define logging approach
   - Select infrastructure as code tool

7. **External Services and APIs:**
   - Choose authentication service approach
   - Select email delivery service
   - Define payment processing if applicable
   - Choose analytics service
   - Select SMS service if applicable

### security.md

Define the security posture and approach:

1. **Security Principles:**
   - Security by design
   - Defense in depth
   - Principle of least privilege
   - Zero trust architecture
   - Fail securely

2. **Authentication Approach:**
   - Method: JWT / Session-based / OAuth 2.0 / SAML / etc.
   - Token Storage: httpOnly cookies / localStorage / sessionStorage
   - Token Expiration: Access token and refresh token windows
   - Multi-Factor Authentication (MFA): Required / Optional / Not implemented
   - Password policy (length, hashing, iterations)

3. **Authorization Model:**
   - Approach: RBAC / ABAC / ACL / etc.
   - Roles and permissions definition

4. **Secrets Management:**
   - Approach: Secrets manager / Vault / env vars
   - API key, DB credential, and encryption key handling

5. **Data Security:**
   - Encryption at rest and in transit
   - PII handling
   - Data retention and deletion approach

6. **Threat Mitigation:**
   - OWASP Top 10 protections
   - CSRF protection, rate limiting, SQL injection defenses, CORS

7. **Compliance Requirements:**
   - GDPR, CCPA, HIPAA, PCI-DSS, SOC 2 (as applicable)

### theme-standards.md (CRITICAL - Based on Approved UX Mockup)

IMPORTANT: This file MUST be extracted from the approved UX mockup in `05-ux/mockups/styles.css`. Do NOT invent theme values.

Extract and document the UI theme from the UX mockup:

1. **Theme Extraction from Mockup:**
   - Read `05-ux/mockups/styles.css`
   - Extract all CSS variables defined in `:root`
   - Document them here with exact values from the mockup

2. **Color Palette:**
   - Extract all color variables (primary, secondary, accent, neutral, semantic)
   - Document use cases for each color
   - Ensure color contrast requirements (WCAG AA minimum)
   - Define dark mode variations if applicable

3. **Typography:**
   - Extract font families and their use cases
   - Document font sizes scale (xs through 3xl)
   - Define font weights (regular, medium, semibold, bold)
   - Specify line heights for different content types
   - Define typography hierarchy and usage rules

4. **Spacing System:**
   - Extract spacing scale variables from mockup
   - Define spacing usage rules for components, margins, and gaps
   - Specify default spacing for common UI patterns

5. **Border Radius:**
   - Extract border radius values from mockup
   - Define usage rules for different component types

6. **Shadows:**
   - Extract shadow values from mockup
   - Define shadow usage for elevation and states

7. **Transitions:**
   - Extract transition timing values from mockup
   - Define transition usage for interactions and animations

8. **Component-Specific Styles:**
   - Extract button styles (variants, sizes, states)
   - Extract form styles (inputs, focus, error, success states)
   - Extract card styles (background, padding, shadow, border)
   - Document other component-specific styles as needed

9. **Responsive Breakpoints:**
   - Extract breakpoints from mockup media queries
   - Define responsive behavior rules for fonts, spacing, and layouts

10. **Design Tokens for Implementation:**
    - Provide design tokens in format suitable for the chosen tech stack
    - Ensure tokens match extracted CSS variable values
    - Include all theme values (colors, fonts, spacing, etc.)

CRITICAL RULES:
- Do NOT invent or guess theme values
- Do extract exact values from `05-ux/mockups/styles.css`
- Do preserve the exact CSS variable names
- Do include usage rules and accessibility notes
- Do provide code examples for implementation

### coding-standards.md

Define code style rules and conventions:

1. **General Principles:**
   - Clean, readable code
   - DRY, KISS, SOLID (where applicable)

2. **Naming Conventions:**
   - Variables: camelCase (JS/TS), snake_case (Python), PascalCase (classes)
   - Functions: verb-first naming
   - Constants: UPPER_SNAKE_CASE
   - Files: PascalCase for components, camelCase for utilities

3. **Code Organization:**
   - Frontend folder structure (components, pages, hooks, utils, services, store)
   - Backend folder structure (controllers, models, services, routes, middleware)
   - Clear separation of concerns

4. **Code Style:**
   - Indentation and line length
   - Comments explain why, not what
   - Formatting tools (Prettier, Black) and format-on-save

5. **Best Practices:**
   - Error handling patterns
   - Async patterns (async/await)
   - Security basics (no secrets, validate input)
   - Performance basics (avoid re-renders, cache when appropriate)

6. **Version Control:**
   - Commit message format and examples
   - Branch naming conventions

### source-code-structure.md

Define the organization and structure of source code under the `src/` folder. Follow `dev-swarm/docs/source-code-structure.md` as the baseline:

1. **Overview:**
   - Explain the chosen code organization approach
   - Separation of concerns and maintainability goals

2. **Choose Organization Strategy:**
   - Select a strategy from `dev-swarm/docs/source-code-structure.md`

3. **File Naming Conventions:**
   - Naming conventions (kebab-case, snake_case, PascalCase)
   - Test file conventions
   - Type definition conventions

4. **Code Organization Principles:**
   - Single responsibility
   - Clear entry points
   - Co-located tests
   - Shared code guidance

5. **Documentation Requirements:**
   - Where each type of code belongs
   - Examples and rationale
   - Guidelines for adding new code

### testing-standards.md

Define testing requirements and standards:

1. **Testing Principles:**
   - Test behavior, not implementation
   - Keep tests simple and isolated

2. **Testing Pyramid:**
```
     /\
    /E2E\     <- Few (10%)
   /------\
  /Integration\ <- Some (30%)
 /------------\
/  Unit Tests  \  <- Many (60%)
```

3. **Required Test Coverage:**
   - Minimum 80% overall
   - Critical code 100% coverage
   - Nice-to-have code 60-70% coverage

4. **Unit Testing:**
   - Business logic, transformations, validation, utilities
   - Frameworks: Jest/Vitest, pytest, Go testing
   - Naming conventions for test files

5. **Integration Testing:**
   - API endpoints, DB operations, external integrations
   - Tools: Supertest, Postman/Newman, test DBs

6. **End-to-End (E2E) Testing:**
   - Critical user flows from UX
   - Frameworks: Playwright, Cypress, Selenium

7. **Test Execution:**
   - Local and CI execution expectations
   - Common test commands

8. **Minimum Test Gates:**
   - Required checks before merge and deployment

### security-standards.md

Define secure coding rules and practices:

1. **Secure Coding Principles:**
   - Validate input, fail securely, defense in depth, least privilege

2. **Input Validation and Output Encoding:**
   - Server-side validation, allowlists, encoding by context

3. **Authentication and Authorization:**
   - Password hashing, rate limiting, auth checks on every request

4. **Sensitive Data Handling:**
   - No secrets in logs, encrypt at rest, HTTPS in transit

5. **Secret Management:**
   - Secrets manager or env vars, rotation policies

6. **Dependency Security:**
   - Vulnerability scanning and updates

7. **SQL Injection Prevention:**
   - Parameterized queries, ORM usage, validation before queries

8. **Logging and Monitoring:**
   - Auth events, access to sensitive data, alerting
   - Redaction rules for PII and secrets

9. **Security Checklist for Code Review:**
   - Input validation, parameterized SQL, no secrets, HTTPS, CSRF, XSS protections
