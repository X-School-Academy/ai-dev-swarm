# Non-Functional Requirements

## NFR1 Performance

Streaming latency from backend output generation to UI display must be under 500ms in local use.

The UI must remain responsive during active execution with no blocking interactions.

## NFR2 Reliability

Stopping execution must terminate the process without leaving orphaned processes.

File system scans must reflect accurate stage state after sync.

The system must recover cleanly from backend restarts without corrupting stage state.

## NFR3 Usability

The UI must target desktop and laptop screens from 1280px to 2560px width.

Primary workflows (view stage, run stage, stop execution, sync) must be reachable within three clicks from the dashboard.

## NFR4 Security

All file operations must be restricted to the project root.

The system must not execute arbitrary commands beyond configured AI agent operations.

## NFR5 Observability

The system must display error messages in the UI when AI execution or file operations fail.

Execution logs must be available for the current session.
