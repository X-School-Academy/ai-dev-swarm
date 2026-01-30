#!/usr/bin/env python3
import asyncio
import json
import time
from typing import AsyncGenerator

from fastapi import FastAPI, WebSocket
from fastapi.responses import StreamingResponse

app = FastAPI()


def _payload(sequence: int) -> str:
    return json.dumps({"sequence": sequence, "timestamp": time.time()})


async def _event_stream() -> AsyncGenerator[str, None]:
    sequence = 0
    while True:
        data = _payload(sequence)
        yield f"data: {data}\n\n"
        sequence += 1
        await asyncio.sleep(0.2)


@app.get("/sse")
async def sse() -> StreamingResponse:
    return StreamingResponse(_event_stream(), media_type="text/event-stream")


@app.get("/health")
async def health() -> dict:
    return {"status": "ok"}


@app.websocket("/ws")
async def ws_endpoint(websocket: WebSocket) -> None:
    await websocket.accept()
    sequence = 0
    try:
        while True:
            await websocket.send_text(_payload(sequence))
            sequence += 1
            await asyncio.sleep(0.2)
    except Exception:
        await websocket.close()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server:app", host="127.0.0.1", port=8123, log_level="info")
