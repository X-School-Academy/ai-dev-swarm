# 03-mvp deliverables

Only present files that are suitable for the project's type and level; omit the rest.

## Deliverable list

- mvp-scope.md: MVP definition, P0 features, user journey, and timeline.
- out-of-scope.md: P1/P2 features and explicit exclusions.
- success-metrics.md: Quantitative and qualitative success criteria.

## File content guidance

### mvp-scope.md

Define the MVP scope following these principles:

1. **MVP Definition:**
   - What is the Minimum Viable Product for this project?
   - What is the smallest version that delivers the core value proposition?
   - What does "viable" mean for this specific product?

2. **Core Value Proposition:**
   - What is the ONE main problem this MVP solves?
   - How does it solve the problem differently than alternatives?
   - Why would early adopters choose this MVP?

3. **P0 Features Only (Must-Have):**
   - Extract P0 user stories from `02-personas/user-stories.md`
   - List each P0 feature with:
     - Feature name and description
     - Which persona(s) it serves
     - Why it is essential for MVP (core value delivery)
     - Acceptance criteria from user stories
   - Rule: Only include features that are absolutely necessary to solve the core problem
   - Typically 5-10 P0 features maximum

4. **MVP User Journey:**
   - Describe the end-to-end user journey for the primary persona
   - Identify the critical path through the MVP
   - Ensure the journey is complete and testable

5. **Target Users for MVP:**
   - Who are the early adopters/beta testers?
   - How many users are needed to validate the MVP?
   - What characteristics make them ideal for MVP testing?

6. **MVP Timeline:**
   - Estimated sprints to build MVP (typically 1-3 sprints with AI assistance)
   - Key milestones and checkpoints

### out-of-scope.md

Explicitly define what will NOT be in the MVP:

1. **P1 Features Deferred (Should-Have, but not MVP):**
   - List each P1 feature from user stories
   - Explain why it is deferred to post-MVP
   - When it should be added (e.g., "after MVP validation", "v1.1")

2. **P2 Features Excluded (Nice-to-Have):**
   - List each P2 feature from user stories
   - Confirm these are post-MVP enhancements

3. **Technical Shortcuts Acceptable for MVP:**
   - What technical debt is acceptable? (document it)
   - What can be manual instead of automated?
   - What third-party services can replace custom development?
   - What optimizations can be deferred?

4. **Design Polish Deferred:**
   - What design refinements are not MVP-critical?
   - What can use basic UI instead of polished design?

5. **Explicit Exclusions:**
   - Features that might seem related but are definitely out of scope
   - Common feature requests to explicitly reject for MVP
   - Integrations or platforms deferred to later

Purpose: This document prevents scope creep and keeps the team focused on core value.

### success-metrics.md

Define how MVP success will be measured:

1. **Learning Objectives:**
   - What do we need to learn from this MVP?
   - What assumptions are we testing?
   - What questions do we need answered?

2. **Key Metrics (Quantitative):**

   **Activation Metrics:**
   - What does "activated user" mean for this product?
   - Target activation rate (e.g., "60% of signups complete onboarding")

   **Engagement Metrics:**
   - How do we measure engagement? (DAU, WAU, MAU, feature usage, etc.)
   - Target engagement level (e.g., "users perform core action 3x per week")

   **Retention Metrics:**
   - What defines a retained user? (e.g., "returns within 7 days")
   - Target retention rate (e.g., "40% week-1 retention")

   **Conversion Metrics (if applicable):**
   - What conversions matter? (signup, payment, referral, etc.)
   - Target conversion rates

   **Performance Metrics:**
   - Page load time targets
   - API response time targets
   - Uptime targets (e.g., "99% uptime")

3. **Success Criteria (What "Success" Looks Like):**
   - Define minimum thresholds for each key metric
   - What results would indicate "Proceed to Full Product"?
   - What results would indicate "Iterate MVP"?
   - What results would indicate "Pivot"?

4. **Validation Milestones:**
   - Week 1: What should we observe?
   - Week 2-3: What patterns should emerge?
   - Week 4+: What validates product-market fit?

5. **Qualitative Feedback Goals:**
   - How many user interviews? (target: 20-50 users)
   - What feedback mechanisms? (surveys, support tickets, interviews)
   - What questions to ask users?
   - What user behaviors to observe?

6. **Analytics Implementation:**
   - What analytics tools will be used? (Google Analytics, Mixpanel, etc.)
   - What events need to be tracked?
   - What dashboards need to be created?
