# Security Specifications

## File System Safety

- All reads and writes must be scoped to the project root
- Reject absolute paths and parent traversal
- Only allow writes to known stage folders

## Process Execution

- Only allow execution of configured AI agents
- Do not accept arbitrary shell commands from the UI
- Use a fixed allowlist of executable paths

## API Safety

- Validate all inputs and return clear errors
- Do not expose environment variables or secrets
- Limit output to what is needed for the UI

## Failure Defaults

- On validation failure, do not perform any file or process action
- On streaming failure, stop the run and report a clear error
