# Error Handling

## Error Categories

- validation: invalid input or path out of scope
- state: conflicting run or invalid stage state
- io: file read or write failure
- execution: agent run failure or interruption
- streaming: stream disconnect or timeout

## Error Response Rules

- Always include code and message
- Use a short, user-facing message for UI display
- Include details only for troubleshooting

## UI Handling

- Blocker errors show a banner and disable affected actions
- Transient errors show a toast and allow retry
- When a run fails, show exit status and keep output for review

## Retry Behavior

- Sync and document read can be retried immediately
- Document write retries only after reloading current content
- Run start retries only after confirming no active run

## Logging Rules

- Log all errors with timestamp and stageId when applicable
- Associate errors with runId for execution and streaming issues
