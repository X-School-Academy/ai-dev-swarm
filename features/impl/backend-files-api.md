# Implementation: backend-files-api

## Files Changed
- dev-swarm/py_scripts/webui/document_service.py: path validation, list/read/write helpers.
- dev-swarm/py_scripts/webui/run_state.py: run-active guard helper.
- dev-swarm/py_scripts/webui/main.py: document list/read/write endpoints.

## Implementation Details
- Path validation blocks absolute paths, traversal, and out-of-root access.
- Writes are restricted to known stage directories and markdown/HTML files.
- Run-active state is guardable via RUN_ACTIVE env flag until run lifecycle exists.
- Document payloads return contentType and lastModified per API spec.

## Code Structure
- Document helpers are isolated in document_service.py for reuse.
