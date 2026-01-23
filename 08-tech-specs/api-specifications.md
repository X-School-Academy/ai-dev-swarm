# API Specifications

## API Principles

- All endpoints are local-only and operate within the project root.
- Errors return a consistent structure with a stable error code and message.
- Long-running operations return a run identifier for status tracking.
- Streaming output is delivered over SSE.

## Resource Model

Stages are addressed by stageId, formatted as two digits: 00 through 11 and 99.

Documents are referenced by a path relative to the project root.

Runs are referenced by runId. Only one active run is allowed at a time.

## Endpoints

### Health

- GET /api/health
- Purpose: Basic liveness and version info.

### Stage List

- GET /api/stages
- Purpose: Return all stages with derived state and file summary.
- Returns: stageId, name, status, isSkippable, hasSkipFile, files.

### Stage Skip

- POST /api/stages/{stageId}/skip
- Purpose: Toggle skip state for a skippable stage.
- Input: desired state or toggle flag.
- Errors: Non-skippable stage, invalid stage, permission denied.

### Stage Run

- POST /api/stages/{stageId}/run
- Purpose: Start a stage workflow.
- Input: optional mode if the stage supports sub-steps.
- Returns: runId and initial run status.
- Errors: Run already active, stage invalid, missing prerequisites.

### Stage Stop

- POST /api/stages/{stageId}/stop
- Purpose: Stop an active run for the stage.
- Returns: updated run status.
- Errors: No active run, stop failed.

### Run Status

- GET /api/runs/{runId}
- Purpose: Retrieve current status and summary.
- Returns: runId, stageId, status, startedAt, endedAt, exitCode.

### Run Stream

- GET /api/runs/{runId}/stream
- Purpose: Stream output lines for a run using SSE.
- Content-Type: text/event-stream.
- Events: system, output, error, status.

### Documents List

- GET /api/stages/{stageId}/documents
- Purpose: List documents for the stage.
- Returns: list of relative paths with type hints.

### Document Read

- GET /api/documents
- Purpose: Fetch a document by path.
- Input: path query parameter.
- Returns: content, contentType, lastModified.

### Document Write

- PUT /api/documents
- Purpose: Save a document by path.
- Input: path and content.
- Returns: updated metadata.
- Errors: Path out of scope, write failure, conflict.

### Project Sync

- POST /api/sync
- Purpose: Re-scan the file system and refresh stage states.
- Returns: updated stage list and sync timestamp.

## Error Model

Errors include:
- code: stable identifier
- message: short human-readable summary
- details: optional technical context for debugging

## Status Values

- Stage status: not-started, in-progress, completed, skipped, error
- Run status: queued, running, stopped, succeeded, failed
