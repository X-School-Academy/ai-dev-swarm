# Research 2 Results - Realtime Streaming

## Summary

Both SSE and WebSocket streaming work locally with sub-500ms latency when measured on the same host. A minimal FastAPI server can stream timestamped messages, and a client can consume them with low overhead.

## Evidence

- SSE endpoint streamed JSON payloads; tests validated latency under 0.5s.
- WebSocket endpoint streamed JSON payloads; tests validated latency under 0.5s.

## Commands Run

- `uv pip install -r requirements.txt -r requirements-dev.txt`
- `python -m pytest`

## Key Behaviors Validated

- SSE streaming can deliver incremental updates without buffering.
- WebSocket streaming can deliver incremental updates without buffering.
- Client-side latency calculations are stable across multiple samples.

## Gaps and Follow-Ups

- Measure latency when the backend streams real subprocess output instead of synthetic messages.
- Test under longer sessions (5+ minutes) to confirm connection stability.

## Go/No-Go

Go for MVP real-time streaming using SSE or WebSocket. The core assumption A2 is validated in a local environment.
