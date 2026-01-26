# WebUI Backend

Run the FastAPI server on port 8001 for local development.

Recommended command: uvicorn main:app --reload --port 8001

## API Notes

- POST /api/sync returns refreshed stage data and a sync timestamp.
