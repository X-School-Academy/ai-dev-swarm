# Assumptions and Risks

## Key Assumptions

### A1: AI Agents Support Headless Mode

**Assumption:** Claude Code, Codex, and Gemini CLI can be executed programmatically without interactive terminal input.

**Basis:** Claude Code has a `--print` flag and can accept piped input. Other agents likely have similar capabilities.

**If wrong:** Would need to use alternative execution methods (API calls, expect scripts) or limit agent support.

### A2: Real-Time Output Streaming is Feasible

**Assumption:** AI agent stdout can be captured and streamed to the frontend with acceptable latency.

**Basis:** Standard subprocess streaming techniques work for most CLI tools.

**If wrong:** May need to use polling or batch output updates instead of true streaming.

### A3: Existing Prompts Can Be Extracted

**Assumption:** The prompts in agent skill files (`.claude/skills/`) can be extracted and reused in the config.

**Basis:** Skills are text-based with clear prompt sections.

**If wrong:** Would need to rewrite prompts specifically for headless execution.

### A4: File System is Source of Truth

**Assumption:** Stage state can be reliably determined by scanning the file system (presence of SKIP.md, README.md, etc.).

**Basis:** Current dev-swarm already uses SKIP.md for skip detection.

**If wrong:** Would need a separate state database, adding complexity.

### A5: Desktop/Laptop Only is Sufficient

**Assumption:** Target users will access the UI from desktop/laptop computers, not mobile devices.

**Basis:** Development work typically happens on desktop/laptop machines.

**If wrong:** Would need mobile-specific design, but unlikely given the use case. Note: Responsive design within desktop/laptop screen sizes is still supported.

## Risks

### R1: AI Agent Execution Complexity (Medium)

**Risk:** Different AI agents may have incompatible execution models, making unified control difficult.

**Impact:** More development effort per agent, possible agent-specific code paths.

**Mitigation:** Start with Claude Code only, add others incrementally with clear abstraction layer.

### R2: Real-Time Streaming Performance (Medium)

**Risk:** WebSocket/SSE streaming may introduce latency or reliability issues.

**Impact:** Poor user experience during AI execution.

**Mitigation:** Implement with fallback to polling; optimize based on testing.

### R3: Prompt Extraction Breaks Behavior (Low)

**Risk:** Prompts may behave differently when extracted from their original skill context.

**Impact:** AI outputs may not match expectations.

**Mitigation:** Test extracted prompts thoroughly; maintain mapping to original skill files.

### R4: File Sync Race Conditions (Low)

**Risk:** External file changes during UI operations could cause conflicts.

**Impact:** UI state mismatch, potential data loss.

**Mitigation:** User-controlled manual sync; no automatic file locking needed. User clicks refresh/sync when they want to update the UI state.

### R5: Scope Creep (Medium)

**Risk:** Feature requests expand beyond MVP, delaying delivery.

**Impact:** Project takes longer, loses focus.

**Mitigation:** Strict MVP scope definition in Stage 03; defer non-essential features.

## Dependencies

- Node.js and pnpm available for frontend development
- Python and uv available for backend development
- At least one AI agent (Claude Code) installed and configured
- Git installed for auto-commit functionality
