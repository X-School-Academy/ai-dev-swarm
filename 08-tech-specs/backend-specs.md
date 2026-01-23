# Backend Specs

## Service Responsibilities

- Serve REST API for stages, documents, sync, and run control
- Execute AI agent workflows in headless mode
- Stream run output in real time via SSE
- Enforce file system boundaries and safe path handling

## Runtime and Framework

- Language: Python
- Web framework: FastAPI
- Streaming: SSE over HTTP

## File System Rules

- Define a single project root and forbid access outside it.
- Normalize and validate all paths before access.
- Only allow writes to known stage folders and files.
- Reject paths that traverse up or include absolute paths.

## Stage State Derivation

- Stage status is derived from file presence, not stored separately.
- Rules:
  - skipped if SKIP.md exists
  - completed if README.md exists and no active run
  - in-progress if run active
  - not-started if no README.md and no SKIP.md
  - error if required files are missing or inconsistent

## Run Lifecycle

- Only one active run is allowed at a time.
- Run start creates a run record with stageId and timestamps.
- Output stream emits system messages and agent output distinctly.
- Stop behavior:
  - Send interrupt to the agent process
  - Graceful timeout, then force terminate
  - Mark run as stopped with exit status

## Workflow Execution

- Standard stages run proposal generation then file generation.
- Stage 04 and 06 follow their specialized workflows.
- Stage 09 and 10 include execution steps when required.

## Concurrency Rules

- While a run is active, block document writes and sync.
- Reads are allowed, but warn if content may change during run.
- If a second run is requested, return a conflict error.

## Error Handling

- Use stable error codes for common failures.
- Always return structured errors with a short message.
- Log errors with runId when applicable.

## Output Categorization

- system: lifecycle updates and status transitions
- output: agent stdout lines
- error: stderr lines or backend failures
- status: run state changes
