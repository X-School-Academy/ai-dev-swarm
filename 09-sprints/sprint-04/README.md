# Sprint 4: Skill Invocation & Path Resolution

## Sprint Overview
**Goal**: Implement skill invocation with SKILL.md content injection and file path resolution

**Duration**: 4-6 days | **Status**: 📋 Not Started

## Sprint Objectives
1. ✅ Read SKILL.md content on invocation
2. ✅ Resolve file paths to absolute paths from project root
3. ✅ Implement call_tool with actual skill content
4. ✅ Handle script references (return execution instructions)
5. ✅ Path traversal prevention
6. ✅ Invocation latency <100ms

## Backlog Items
| ID | Type | Title | Status | Priority |
|----|------|-------|--------|----------|
| 01 | feature | Skill invocation handler | Not Started | P0 |
| 02 | feature | File I/O operations (read SKILL.md) | Not Started | P0 |
| 03 | feature | Path resolver (relative to absolute) | Not Started | P0 |
| 04 | feature | call_tool implementation (return SKILL.md content) | Not Started | P0 |
| 05 | feature | Script reference handling | Not Started | P0 |
| 06 | feature | Path traversal prevention & validation | Not Started | P0 |

**Total**: 6 | **Completed**: 0

## Dependencies
- **Requires**: Sprint 3 (tool registry)
- **Parallel**: Sprint 5 (OAuth can run in parallel)

## Success Criteria
1. ✅ call_tool returns complete SKILL.md content
2. ✅ File paths converted to absolute paths
3. ✅ Script files return execution instructions
4. ✅ Path traversal attacks prevented
5. ✅ Invocation completes in <100ms
6. ✅ File read errors handled gracefully

## Test Plan
```bash
# Test 1: Skill invocation
echo '{"jsonrpc":"2.0","method":"call_tool","params":{"name":"init-ideas"},"id":1}' | python -m mcp_skills_server --skills-dir ./skills
# Expected: Full SKILL.md content in response

# Test 2: Path resolution
# SKILL.md contains: templates/ideas.md
# Expected: Converted to /absolute/path/to/project/templates/ideas.md

# Test 3: Path traversal prevention
# Attempt: ../../../etc/passwd
# Expected: Error, path validation failed

# Test 4: Invocation performance
time echo '{"jsonrpc":"2.0","method":"call_tool","params":{"name":"init-ideas"},"id":1}' | python -m mcp_skills_server --skills-dir ./skills
# Expected: <100ms total
```

---
Last updated: 2025-12-26
