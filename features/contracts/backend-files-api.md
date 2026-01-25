# Contract: backend-files-api

## Endpoints

### GET /api/stages/{stageId}/documents
- Returns: list of relative paths for markdown and HTML documents in the stage.

### GET /api/documents
- Query: path (relative to project root)
- Returns: content, contentType, lastModified

### PUT /api/documents
- Body: path, content
- Returns: content, contentType, lastModified

## Errors
- 400: invalid path, unsupported file type
- 403: path out of scope
- 404: file not found
- 409: write blocked during active run
