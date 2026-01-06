# 04-prd deliverables

Only present files that are suitable for the project's type and level; omit the rest.

## Deliverable list

- prd.md: Product overview, goals, users, journeys, and MVP alignment.
- functional-requirements.md: Behavioral requirements with acceptance criteria.
- non-functional-requirements.md: Quality attributes and constraints.
- out-of-scope.md: Explicit exclusions to prevent scope creep.

## File content guidance

### prd.md (Main PRD)

This is the core PRD document covering product overview, goals, and user journeys:

1. **Product Overview:**
   - Product name and tagline
   - Product vision (what is this product?)
   - Problem statement (recap from `00-init-ideas`)
   - Solution overview (how does this product solve the problem?)
   - Target market and users

2. **Product Goals:**
   - **Business Goals:**
     - Revenue targets or business model
     - Market positioning
     - Competitive differentiation
     - Strategic objectives

   - **User Goals:**
     - What users want to accomplish
     - User needs being addressed
     - User pain points being solved

   - **Product Goals:**
     - Activation goals
     - Engagement goals
     - Retention goals
     - Growth goals

3. **Target Users:**
   - Primary persona (link to `02-personas/persona-primary.md`)
   - Secondary persona if applicable (link to `02-personas/persona-secondary.md`)
   - User segments and characteristics
   - User assumptions and constraints

4. **User Journeys:**
   - **Critical User Journeys:**
     - End-to-end journey for primary persona
     - Key touchpoints and interactions
     - Entry points and exit points
     - Success states and failure states

   - **Secondary User Journeys:**
     - Additional important flows
     - Edge case journeys

5. **MVP Alignment:**
   - How this PRD builds on the MVP (link to `03-mvp/`)
   - What is included from MVP scope
   - What is being added beyond MVP (P1/P2 features)
   - Phasing plan (what ships when)

6. **Feature Overview:**
   - High-level feature list organized by category
   - Feature prioritization (P0/P1/P2)
   - Dependencies between features
   - Feature roadmap (MVP vs. v1.0 vs. future)

### functional-requirements.md

Define what the product must do (behaviors, not implementation):

1. **Requirements Organization:**
   - Group requirements by feature area
   - Use consistent numbering (FR-001, FR-002, etc.)
   - Link requirements to user stories from `02-personas`

2. **For Each Requirement:**

```
### FR-XXX: [Requirement Title]

**User Story:** As a [persona], I want [capability], so that [benefit]
(Link to original user story in `02-personas/user-stories.md`)

**Description:**
Detailed description of what the product must do

**Behavior:**
- Specific behavior 1
- Specific behavior 2
- Specific behavior 3

**Acceptance Criteria:**
- [ ] Criterion 1 (testable condition)
- [ ] Criterion 2 (testable condition)
- [ ] Criterion 3 (testable condition)

**Priority:** P0 / P1 / P2

**Dependencies:** [Other requirements this depends on]

**Notes:**
- Additional context
- Edge cases to consider
- Related features
```

3. **Requirement Categories:**
   - Authentication and Authorization
   - Core Features (from MVP)
   - Additional Features (P1/P2)
   - User Profile and Settings
   - Data Management
   - Notifications and Communications
   - Search and Discovery

4. **Cross-Cutting Requirements:**
   - Error handling and error messages
   - Loading states and feedback
   - Empty states
   - Accessibility requirements (WCAG 2.1 compliance)
   - Internationalization (i18n) if needed
   - Mobile responsiveness

### non-functional-requirements.md

Define quality attributes and constraints:

1. **Performance Requirements:**
   - Response time targets
   - Throughput targets
   - Resource usage targets

2. **Scalability Requirements:**
   - Expected user growth trajectory
   - Peak load scenarios
   - Data growth projections
   - Scaling strategy (horizontal vs. vertical)
   - Geographic distribution needs

3. **Reliability and Availability:**
   - Uptime targets
   - Maximum tolerable downtime
   - Data backup and recovery requirements
   - Disaster recovery objectives (RTO, RPO)
   - Fault tolerance needs

4. **Security Requirements:**
   - Authentication and authorization requirements
   - Data security and privacy requirements
   - Security controls (validation, rate limiting, audit logging)

5. **Compliance Requirements:**
   - Regulatory compliance (GDPR, CCPA, HIPAA, etc.)
   - Industry standards (PCI-DSS, SOC 2, etc.)
   - Legal requirements (Terms of Service, Privacy Policy)
   - Data residency requirements
   - Cookie consent and tracking requirements

6. **Usability Requirements:**
   - Browser and device compatibility
   - Screen size support
   - Accessibility standards (WCAG 2.1 Level AA)
   - Keyboard navigation support
   - Screen reader compatibility

7. **Maintainability Requirements:**
   - Code documentation standards
   - Logging and monitoring requirements
   - Error tracking and reporting
   - Debugging capabilities
   - Update and deployment constraints

8. **Compatibility Requirements:**
   - Third-party service integrations
   - API compatibility requirements
   - Data format compatibility
   - Legacy system compatibility (if applicable)

### out-of-scope.md

Explicitly define what is NOT included in this PRD:

1. **Features Explicitly Excluded:**
   - Features that were considered but rejected
   - Features that are common in competitors but not needed
   - Features that might be requested but are out of scope
   - Future features that are definitely post-v1.0

2. **Platform Exclusions:**
   - Platforms not supported (e.g., "no native mobile apps in v1.0")
   - Browsers not supported (e.g., "no IE11 support")
   - Devices not supported

3. **Integration Exclusions:**
   - Third-party integrations deferred to later
   - External services not included in v1.0

4. **Technical Exclusions:**
   - Advanced features deferred (AI/ML, real-time collaboration, etc.)
   - Performance optimizations deferred
   - Internationalization deferred (if applicable)

5. **Business Exclusions:**
   - Business models not pursued
   - Market segments not targeted in v1.0
   - Monetization features deferred

6. **Clarifications:**
   - Common misconceptions about scope
   - Features that sound similar but are different
   - Boundary clarifications

Purpose: Prevent scope creep and align stakeholders on what is NOT being built.
