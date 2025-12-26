# Backlog 05: Development Tooling Setup (black, ruff, mypy)

**Type**: feature | **Priority**: P0 | **Status**: Not Started | **Effort**: 1-2 hours

## User Story
As a developer, I want automated code quality tools so that code stays consistent and catches errors early.

## Description
Configure and verify black (formatting), ruff (linting), and mypy (type checking) work correctly with the project.

## Acceptance Criteria
- [ ] `black .` formats all Python code
- [ ] `ruff check .` lints code with zero errors
- [ ] `mypy mcp_skills_server/` type checks successfully
- [ ] All tool configs in pyproject.toml
- [ ] Pre-commit hooks optional but documented

## Test Plan

```bash
# Test 1: Black formatting
black --check .
# Expected: All files formatted or shows what would change

# Test 2: Ruff linting
ruff check .
# Expected: No linting errors

# Test 3: Mypy type checking
mypy mcp_skills_server/
# Expected: Success or minimal errors with explanations

# Test 4: Format and verify
black .
ruff check .
mypy mcp_skills_server/
# Expected: All tools pass
```

## Definition of Done
- [ ] All tools configured
- [ ] All tools pass on current code
- [ ] Documented in README

---
Last updated: 2025-12-26
