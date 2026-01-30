import json
import os
import signal
import subprocess
import sys
import time
from contextlib import contextmanager

import httpx
import pytest
import websockets

SERVER_HOST = "127.0.0.1"
SERVER_PORT = 8123
SERVER_URL = f"http://{SERVER_HOST}:{SERVER_PORT}"
WS_URL = f"ws://{SERVER_HOST}:{SERVER_PORT}/ws"


@contextmanager
def run_server():
    env = os.environ.copy()
    proc = subprocess.Popen(
        [
            sys.executable,
            "-m",
            "uvicorn",
            "server:app",
            "--host",
            SERVER_HOST,
            "--port",
            str(SERVER_PORT),
            "--log-level",
            "warning",
        ],
        cwd=os.path.dirname(__file__) + "/..",
        env=env,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
    )

    # Wait for server readiness.
    deadline = time.time() + 5
    while time.time() < deadline:
        try:
            httpx.get(f"{SERVER_URL}/health", timeout=0.5)
            break
        except Exception:
            time.sleep(0.1)
    else:
        proc.terminate()
        raise RuntimeError("Server did not start")

    try:
        yield proc
    finally:
        proc.send_signal(signal.SIGTERM)
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()


def _latency_from_payload(payload: str) -> float:
    data = json.loads(payload)
    return time.time() - data["timestamp"]


def _assert_latency(latencies, max_latency=0.5):
    assert latencies, "No latency samples captured"
    worst = max(latencies)
    assert worst < max_latency, f"Latency too high: {worst:.3f}s"


@pytest.mark.asyncio
async def test_websocket_latency():
    with run_server():
        latencies = []
        async with websockets.connect(WS_URL, open_timeout=2) as ws:
            for _ in range(5):
                message = await ws.recv()
                latencies.append(_latency_from_payload(message))
        _assert_latency(latencies)


def test_sse_latency():
    with run_server():
        latencies = []
        with httpx.stream("GET", f"{SERVER_URL}/sse", timeout=5) as response:
            for line in response.iter_lines():
                if line.startswith("data: "):
                    payload = line[len("data: ") :]
                    latencies.append(_latency_from_payload(payload))
                    if len(latencies) >= 5:
                        break
        _assert_latency(latencies)
