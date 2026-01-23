# Observability Spec

## Logging Goals

- Provide clear visibility into stage runs and file operations
- Distinguish system events from agent output
- Support debugging without exposing sensitive data

## Log Categories

- system: lifecycle and status events
- agent: stdout and stderr lines
- io: file reads and writes
- api: request and response summaries

## Log Fields

- timestamp
- category
- stageId when relevant
- runId when relevant
- message summary

## UI Output Rules

- System messages are labeled and visually separated
- Agent output preserves order and line breaks
- Errors are highlighted and pinned in the output panel
