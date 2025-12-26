# Sprint 3: Skill Discovery & Registry

## Sprint Overview
**Goal**: Automatic skill discovery from filesystem and tool registration

**Duration**: 4-6 days | **Status**: 📋 Not Started

## Sprint Objectives
1. ✅ Scan skills directory for SKILL.md files
2. ✅ Parse YAML frontmatter (name, description)
3. ✅ Build in-memory tool registry
4. ✅ Implement full list_tools with discovered skills
5. ✅ Handle malformed SKILL.md files gracefully
6. ✅ Expose minimum 3 dev-swarms skills (init-ideas, code-development, draft-commit-message)

## Backlog Items
| ID | Type | Title | Status | Priority |
|----|------|-------|--------|----------|
| 01 | feature | Skill discovery engine (filesystem scanning) | Not Started | P0 |
| 02 | feature | YAML frontmatter parser | Not Started | P0 |
| 03 | feature | Tool registry (in-memory hash map) | Not Started | P0 |
| 04 | feature | list_tools implementation (return discovered skills) | Not Started | P0 |
| 05 | feature | Error handling for malformed SKILL.md | Not Started | P0 |
| 06 | feature | Verify 3 core dev-swarms skills accessible | Not Started | P0 |

**Total**: 6 | **Completed**: 0

## Dependencies
- **Requires**: Sprint 2 (MCP protocol handler)
- **Blocks**: Sprint 4 (skill invocation needs registry)

## Success Criteria
1. ✅ Discovers all SKILL.md files in skills directory
2. ✅ Parses YAML frontmatter correctly
3. ✅ Registry provides O(1) skill lookup
4. ✅ list_tools returns all discovered skills
5. ✅ Malformed skills logged but don't crash server
6. ✅ At least 3 dev-swarms skills exposed via MCP

## Test Plan
```bash
# Test 1: Skill discovery
mkdir -p /tmp/skills/test-skill
echo '---\nname: test-skill\ndescription: Test\n---\n# Test' > /tmp/skills/test-skill/SKILL.md
python -m mcp_skills_server --skills-dir /tmp/skills 2>&1 | grep "Found 1 skill"

# Test 2: list_tools returns discovered skills
echo '{"jsonrpc":"2.0","method":"list_tools","id":1}' | python -m mcp_skills_server --skills-dir /tmp/skills
# Expected: {"jsonrpc":"2.0","id":1,"result":{"tools":[{"name":"test-skill","description":"Test"}]}}

# Test 3: Malformed SKILL.md handling
echo 'invalid yaml' > /tmp/skills/bad-skill/SKILL.md
python -m mcp_skills_server --skills-dir /tmp/skills 2>&1 | grep "Skipping skill"
# Expected: Warning logged, server continues

# Test 4: Real dev-swarms skills
python -m mcp_skills_server --skills-dir ./skills 2>&1 | grep "init-ideas\|code-development\|draft-commit-message"
# Expected: All 3 core skills discovered
```

---
Last updated: 2025-12-26
