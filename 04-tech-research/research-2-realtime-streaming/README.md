# Research 2 - Realtime Streaming

## Goal

Validate that subprocess output can be streamed to a frontend in real time with acceptable latency using SSE and WebSocket.

## What This Covers

- SSE endpoint streaming JSON lines with timestamps
- WebSocket endpoint streaming JSON messages with timestamps
- Client latency measurement

## How To Run

- Install deps:
  - `uv pip install -r requirements.txt -r requirements-dev.txt`
- Start server:
  - `python server.py`
- Run tests:
  - `python -m pytest`

## Notes

- Tests launch `uvicorn` in a subprocess on port 8123.
- Latency is measured as client receive time minus server timestamp.
