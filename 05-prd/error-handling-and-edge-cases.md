# Error Handling and Edge Cases

## AI Agent Not Installed

If the configured AI agent binary is missing, the system must surface a clear error and block execution.

## AI Agent Authentication Failure

If the agent requires authentication and fails, the system must stop execution and display the error output.

## Permission Denied on File Operations

If a file read or write fails due to permissions, the UI must show the failure and keep the previous state.

## Invalid Stage State

If a stage folder is missing or incomplete, the system must show a warning and prevent execution.

## Interrupted Execution

If execution is interrupted, the system must report the interruption and allow a clean restart.

## Streaming Disconnects

If the streaming connection drops, the system must show a warning and provide a reconnect action.

## Concurrent Actions

If the user triggers multiple actions that would conflict (run + edit + sync), the system must serialize or block with an explanation.

## Large Output Volumes

If output grows large, the UI must preserve output for the session while remaining responsive.
