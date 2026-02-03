# [Backlog Title]

## Metadata

- **Backlog Type**: [FEATURE | CHANGE | BUG | IMPROVE]
- **Feature Name**: `[feature-name]` (CRITICAL: Must match file name segment)
- **Sub-feature**: `[sub-feature or n/a]` (Use only when a feature is too large to split)
- **Created By**: [Role1, Role2] (If this backlog relates to multiple roles, specify each role name)
- **Status**: [Not Started | In Development | In Code Review | In Testing | Done]
- **Sprint**: [sprint-name]
- **Estimated Size**: [~X lines of code] (Follow sprint-backlog-guidelines.md)

## Description

[Clear description of what needs to be done from the user's perspective]

**Size Constraint:** Follow sprint-backlog-guidelines.md. If it feels "big," split into smaller backlogs.

### Why This Work Is Needed

[Explain the business value, problem being solved, or reason for this work]

## Original Feature/Backlog (For CHANGE/BUG/IMPROVE types only)

Link to the original backlog that this backlog is modifying:
- [BACKLOG_TYPE-feature-name-sub-feature.md](BACKLOG_TYPE-feature-name-sub-feature.md)

## User Story (For FEATURE type only)

- As a [user role], I want [capability], So that [benefit/value].

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Reference Features

List related features from `features/features-index.md`:
- `[related-feature-name]` - Brief description of how it relates

## Test Plan (MANDATORY per sprint-backlog-guidelines.md)

**CRITICAL:** This backlog MUST specify at least one test method below. A backlog without a clear test method is not valid.

### Test Method(s) - Select at least one:
- [ ] **Unit Test**: [Describe what unit tests will verify]
- [ ] **UI Testing**: [Manual or automated - describe UI test steps]
- [ ] **Command-line Testing**: [curl commands, CLI tools, shell scripts]
- [ ] **Log Verification**: [What logs to check during runtime]

### Expected Behavior
[What behavior is expected when this backlog is complete]

### Test Success Criteria
[What result confirms the test passed]

### Manual Testing Steps (if applicable)
- Step 1: [Action to take]
- Step 2: [Expected result]
- Step 3: [Verify behavior]

### Automated Testing (if applicable)
- Unit tests: [What to test]
- Integration tests: [What to test]
- API tests: [Endpoints to test]

### Definition of Done
This backlog is considered **Done** only when its test method(s) pass.

## Development Notes (Updated by AI Developer)

**Status:** [Not Started | In Progress | Completed]
**Sprint Log Entry:** [Add a short entry to the sprint README progress log]

### Files Created/Modified
- `src/[feature-name]/[file].ts` - Brief description of changes

### Implementation Approach
[Summarize how requirements were implemented]

### Key Decisions
[Note any important technical decisions made]

### Integration Points
[Document how code integrates with other features]

### Known Issues
[Flag any potential issues for code review]

## Code Review Notes (Updated by AI Code Reviewer)

**Status:** [Not Started | In Progress | Completed]
**Sprint Log Entry:** [Add a short entry to the sprint README progress log]

### Review Summary
[Overall assessment of code quality]

### Review Decision
[Approved | Approved with comments | Changes required | Rejected]

### Issues Found
- CHANGE backlogs created: [count]
- BUG backlogs created: [count]
- IMPROVE backlogs created: [count]

### Security Assessment
[Security vulnerabilities found, if any]

### Code Quality Assessment
[Rating based on readability, maintainability, performance, etc.]

### Positive Highlights
[What was done well]

### Areas for Improvement
[General suggestions for developer]

### Related Backlogs Created
- [CHANGE-feature-name-sub.md](CHANGE-feature-name-sub.md)
- [BUG-feature-name-sub.md](BUG-feature-name-sub.md)

## Testing Notes (Updated by AI Tester)

**Status:** [Not Started | In Progress | Completed]
**Sprint Log Entry:** [Add a short entry to the sprint README progress log]

### Test Summary
- Total tests executed: [count]
- Tests passed: [count]
- Tests failed: [count]

### Test Types Executed
- Unit tests: [pass/fail count]
- Integration tests: [pass/fail count]
- API tests: [pass/fail count]
- UI tests: [pass/fail count]
- Manual tests: [pass/fail count]

### Test Coverage
[Percentage of code/features tested]

### Issues Found
- BUG backlogs created: [count]
- IMPROVE backlogs created: [count]

### Test Decision
[Passed | Passed with minor issues | Failed | Blocked]

### Test Evidence
- Screenshots: [links]
- Logs: [excerpts]
- Performance metrics: [data]

### Related Backlogs Created
- [BUG-feature-name-sub.md](BUG-feature-name-sub.md)
- [IMPROVE-feature-name-sub.md](IMPROVE-feature-name-sub.md)
