# Stage 04 - Tech Research

## Stage Goal

This stage validates the two critical technical assumptions that could block MVP development:

1. **Claude Code can run in headless mode** with programmatic control (start, capture output, interrupt)
2. **Real-time streaming works** from Python subprocess to Next.js frontend with acceptable latency

These are the highest-risk technical unknowns. If headless execution doesn't work as expected, the entire product concept needs to pivot. If streaming has issues, user experience suffers significantly.

Standard technologies (Next.js, Python FastAPI, file system operations, markdown rendering) are well-documented and don't require research.

## Research Topics

### research-1-claude-headless/

**What:** Claude Code headless/non-interactive execution from Python

**Why:**
- Unfamiliarity: Haven't used Claude Code's headless mode programmatically before
- Business-critical: Core MVP feature depends on this working
- Assumption A1 from assumptions-risks.md needs validation

**Validation Goals:**
- Execute Claude Code with a prompt from Python subprocess
- Capture stdout/stderr in real-time (not just at completion)
- Send SIGINT/SIGTERM to interrupt execution cleanly
- Verify exit codes are captured correctly

**Status:** Completed

**Results:** `research-1-claude-headless-results.md`

---

### research-2-realtime-streaming/

**What:** Real-time output streaming from Python backend to Next.js frontend

**Why:**
- Error-prone: WebSocket/SSE implementations can have subtle issues
- Performance-critical: MVP requires <500ms latency per tech requirements
- Assumption A2 from assumptions-risks.md needs validation

**Validation Goals:**
- Stream subprocess output from Python to frontend in real-time
- Test with both WebSocket and SSE approaches
- Measure actual latency
- Verify connection stability over longer executions (5+ minutes)

**Status:** Completed

**Results:** `research-2-realtime-streaming-results.md`

---

## Not Researching

**Next.js + React:** Standard, well-documented framework with extensive community support.

**Python FastAPI/Flask:** Standard backend frameworks, familiar and well-documented.

**File system operations:** Basic OS operations, no unknowns.

**Markdown rendering:** Many mature libraries available (react-markdown, marked, etc.).

**Git operations:** Well-documented subprocess calls to git CLI.

## Summary of Findings

- Claude Code supports headless execution via `--print` with real-time stdout capture and clean exit codes.
- SSE and WebSocket streaming deliver sub-500ms latency in local tests.
- Remaining follow-ups: explicit SIGINT test and longer-duration streaming stability.

## Stage Status

Stage 04 (Tech Research) is complete. Ready to proceed to Stage 05 (PRD).
