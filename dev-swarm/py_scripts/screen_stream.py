#!/usr/bin/env python3
import argparse
import asyncio
import json
import sys
import threading
import signal
import time

import mss
from mss import tools
import numpy as np
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse, Response
import uvicorn


# ---------- CLI ARGUMENTS ----------

parser = argparse.ArgumentParser(
    description="Local screen region WebSocket streamer (mss + WebGL client)."
)

parser.add_argument(
    "--monitor",
    type=int,
    default=1,
    help="Monitor ID (mss index). 0 = all monitors, 1 = primary, 2 = secondary, etc.",
)
parser.add_argument(
    "--top",
    type=int,
    default=0,
    help="Top offset (relative to the chosen monitor).",
)
parser.add_argument(
    "--left",
    type=int,
    default=0,
    help="Left offset (relative to the chosen monitor).",
)
parser.add_argument(
    "--width",
    type=int,
    default=None,
    help="Capture width. If not set, uses monitor width - left.",
)
parser.add_argument(
    "--height",
    type=int,
    default=None,
    help="Capture height. If not set, uses monitor height - top.",
)
parser.add_argument(
    "--host",
    type=str,
    default="127.0.0.1",
    help="HTTP server host (default: 127.0.0.1).",
)
parser.add_argument(
    "--port",
    type=int,
    default=8000,
    help="HTTP server port (default: 8000).",
)
parser.add_argument(
    "--fps",
    type=int,
    default=15,
    help="Target frames per second (default: 15).",
)
parser.add_argument(
    "--background",
    action="store_true",
    help="Capture continuously in the background so /snapshot.png works without a client.",
)

args = parser.parse_args()

MONITOR_ID = args.monitor
REL_TOP = args.top
REL_LEFT = args.left
REQ_WIDTH = args.width
REQ_HEIGHT = args.height
TARGET_FPS = max(1, args.fps)
BACKGROUND_CAPTURE = args.background
USE_OVERLAY = MONITOR_ID == -1

print(
    f"[config] monitor={MONITOR_ID}, top={REL_TOP}, left={REL_LEFT}, "
    f"width={REQ_WIDTH}, height={REQ_HEIGHT}, fps={TARGET_FPS}, "
    f"host={args.host}, port={args.port}"
)
if BACKGROUND_CAPTURE:
    print("[config] background capture enabled")

if USE_OVERLAY:
    print("[config] monitor=-1 uses a transparent overlay window")


# ---------- FASTAPI APP ----------

app = FastAPI()
frame_lock = threading.Lock()
latest_rgba = None
latest_png = None
latest_size = (0, 0)
last_capture_ts = 0.0

overlay_lock = threading.Lock()
overlay_region = None
overlay_ready = threading.Event()


@app.get("/")
async def index():
    """
    Returns HTML page with a <canvas> that uses WebGL.
    It connects to /ws and draws the raw RGBA frames as a texture.
    """
    html = r"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Local Screen Region Viewer (WebGL)</title>
    <style>
        body {
            margin: 0;
            background: #000;
            display: flex;
            height: 100vh;
            overflow: hidden;
        }
        #canvas-wrapper {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #000;
        }
        canvas {
            background: #000;
            max-width: 100%;
            max-height: 100%;
        }
    </style>
</head>
<body>
<div id="canvas-wrapper">
    <canvas id="screenCanvas"></canvas>
</div>

<script>
(function () {
    const canvas = document.getElementById("screenCanvas");

    // ---------- WebGL SETUP ----------

    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) {
        console.error("WebGL not supported in this environment.");
        return;
    }

    function resizeCanvasToDisplaySize() {
        if (!initialized || frameWidth === 0 || frameHeight === 0) {
            return;
        }

        const parent = canvas.parentElement;
        const containerWidth = parent.clientWidth;
        const containerHeight = parent.clientHeight;

        // Calculate aspect ratios
        const sourceAspect = frameWidth / frameHeight;
        const containerAspect = containerWidth / containerHeight;

        let canvasWidth, canvasHeight;

        // Fit the canvas within the container while maintaining aspect ratio
        if (sourceAspect > containerAspect) {
            // Source is wider than container - fit to width
            canvasWidth = containerWidth;
            canvasHeight = containerWidth / sourceAspect;
        } else {
            // Source is taller than container - fit to height
            canvasHeight = containerHeight;
            canvasWidth = containerHeight * sourceAspect;
        }

        if (canvas.width !== canvasWidth || canvas.height !== canvasHeight) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
    }
    window.addEventListener("resize", resizeCanvasToDisplaySize);

    const vertexShaderSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;

        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
            v_texCoord = a_texCoord;
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        varying vec2 v_texCoord;
        uniform sampler2D u_texture;

        void main() {
            gl_FragColor = texture2D(u_texture, v_texCoord);
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compile failed:", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    function createProgram(gl, vsSource, fsSource) {
        const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
        const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link failed:", gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        return program;
    }

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    const textureLocation  = gl.getUniformLocation(program, "u_texture");

    // Full-screen quad
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Texture coords
    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    const texCoords = new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);

    // Setup attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    // Texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.uniform1i(textureLocation, 0);

    // ---------- WEBSOCKET / FRAME HANDLING ----------

    let frameWidth = 0;
    let frameHeight = 0;
    let initialized = false;

    const wsProtocol = (location.protocol === "https:") ? "wss" : "ws";
    const wsUrl = wsProtocol + "://" + location.host + "/ws";
    const ws = new WebSocket(wsUrl);
    ws.binaryType = "arraybuffer";

    ws.onopen = () => {
        console.log("WebSocket connected, waiting for frames...");
    };

    ws.onclose = () => {
        console.log("WebSocket disconnected. Refresh to reconnect.");
    };

    ws.onerror = (e) => {
        console.error("WebSocket error:", e);
    };

    ws.onmessage = (event) => {
        if (typeof event.data === "string") {
            try {
                const msg = JSON.parse(event.data);
                if (msg.type === "init") {
                    frameWidth = msg.width;
                    frameHeight = msg.height;
                    console.log(`Streaming ${frameWidth}x${frameHeight}`);
                    initialized = true;
                    resizeCanvasToDisplaySize();
                } else if (msg.type === "error") {
                    console.error("Server error:", msg.message);
                }
            } catch (err) {
                console.error("Failed to parse JSON message:", err);
            }
            return;
        }

        if (!initialized) return;

        const buffer = event.data;
        const pixels = new Uint8Array(buffer);

        if (pixels.length !== frameWidth * frameHeight * 4) {
            console.warn("Unexpected pixel data length:", pixels.length);
            return;
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
        gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            frameWidth,
            frameHeight,
            0,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            pixels
        );

        resizeCanvasToDisplaySize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    resizeCanvasToDisplaySize();
})();
</script>
</body>
</html>
    """
    return HTMLResponse(html)


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    """
    Each WebSocket connection gets its own capture loop.
    - Capture only starts after the WebSocket is accepted.
    - Loop stops cleanly when the client disconnects or refreshes.
    """
    await ws.accept()
    print("[ws] client connected")

    try:
        if BACKGROUND_CAPTURE:
            last_size = (0, 0)
            while True:
                if shutdown_flag.is_set() or (uvicorn_server is not None and uvicorn_server.should_exit):
                    request_shutdown("server exit signaled")
                    await ws.close(code=1001, reason="server shutdown")
                    break

                with frame_lock:
                    rgba = latest_rgba
                    width, height = latest_size

                if rgba is None or width == 0 or height == 0:
                    await asyncio.sleep(0.05)
                    continue

                if (width, height) != last_size:
                    init_msg = {
                        "type": "init",
                        "width": width,
                        "height": height,
                    }
                    await ws.send_text(json.dumps(init_msg))
                    last_size = (width, height)
                if last_size != (0, 0):
                    break

            frame_interval = 1.0 / TARGET_FPS
            while True:
                if shutdown_flag.is_set() or (uvicorn_server is not None and uvicorn_server.should_exit):
                    request_shutdown("server exit signaled")
                    await ws.close(code=1001, reason="server shutdown")
                    break

                start = asyncio.get_event_loop().time()
                with frame_lock:
                    rgba = latest_rgba
                    width, height = latest_size
                if (width, height) != last_size and width > 0 and height > 0:
                    init_msg = {
                        "type": "init",
                        "width": width,
                        "height": height,
                    }
                    await ws.send_text(json.dumps(init_msg))
                    last_size = (width, height)
                if last_size == (0, 0):
                    await asyncio.sleep(0.05)
                    continue
                if rgba is not None:
                    await ws.send_bytes(rgba)

                elapsed = asyncio.get_event_loop().time() - start
                sleep_time = frame_interval - elapsed
                if sleep_time > 0:
                    await asyncio.sleep(sleep_time)
        else:
            with mss.mss() as sct:
                monitor_region = get_capture_region(sct)
                print(f"[capture] Using region: {monitor_region} (monitor index {MONITOR_ID})")

                # First frame for size
                first_frame = sct.grab(monitor_region)
                h = first_frame.height
                w = first_frame.width

                init_msg = {
                    "type": "init",
                    "width": w,
                    "height": h,
                }
                await ws.send_text(json.dumps(init_msg))

                frame_interval = 1.0 / TARGET_FPS

                # ---- CAPTURE LOOP: ONLY WHILE THIS CLIENT IS CONNECTED ----
                while True:
                    if shutdown_flag.is_set() or (uvicorn_server is not None and uvicorn_server.should_exit):
                        request_shutdown("server exit signaled")
                        await ws.close(code=1001, reason="server shutdown")
                        break

                    start = asyncio.get_event_loop().time()

                    if USE_OVERLAY:
                        try:
                            new_region = get_capture_region(sct)
                        except ValueError:
                            await asyncio.sleep(0.05)
                            continue
                        if new_region != monitor_region:
                            monitor_region = new_region
                            init_msg = {
                                "type": "init",
                                "width": monitor_region["width"],
                                "height": monitor_region["height"],
                            }
                            await ws.send_text(json.dumps(init_msg))

                    frame = sct.grab(monitor_region)
                    img = np.asarray(frame)        # BGRA
                    rgba = img[..., [2, 1, 0, 3]]  # to RGBA

                    await ws.send_bytes(rgba.tobytes())

                    elapsed = asyncio.get_event_loop().time() - start
                    sleep_time = frame_interval - elapsed
                    if sleep_time > 0:
                        await asyncio.sleep(sleep_time)

    except WebSocketDisconnect:
        print("[ws] client disconnected")
    except Exception as e:
        print("[ws] error in capture loop:", e)
        # Try to notify client, but ignore if already gone
        try:
            await ws.send_text(json.dumps({
                "type": "error",
                "message": f"Server error: {e}",
            }))
            await ws.close()
        except Exception:
            pass


shutdown_flag = threading.Event()
uvicorn_server = None  # set in __main__, used for cross-thread shutdown requests


def get_capture_region(sct: mss.mss) -> dict:
    if USE_OVERLAY:
        with overlay_lock:
            region = overlay_region
        if not region:
            raise ValueError("Overlay region not ready")
        return dict(region)

    monitors = sct.monitors
    if MONITOR_ID < 0 or MONITOR_ID >= len(monitors):
        raise ValueError(
            f"Invalid monitor_id {MONITOR_ID}, available: 0..{len(monitors)-1}"
        )

    mon = monitors[MONITOR_ID]

    top = mon["top"] + REL_TOP
    left = mon["left"] + REL_LEFT
    width = REQ_WIDTH if REQ_WIDTH is not None else (mon["width"] - REL_LEFT)
    height = REQ_HEIGHT if REQ_HEIGHT is not None else (mon["height"] - REL_TOP)

    if width <= 0 or height <= 0:
        raise ValueError(f"Computed invalid region width={width}, height={height}")

    return {
        "top": top,
        "left": left,
        "width": width,
        "height": height,
    }


def capture_background():
    global latest_rgba, latest_png, latest_size, last_capture_ts
    frame_interval = 1.0 / TARGET_FPS
    try:
        with mss.mss() as sct:
            if USE_OVERLAY:
                overlay_ready.wait()
            monitor_region = get_capture_region(sct)
            print(f"[capture] Background region: {monitor_region} (monitor index {MONITOR_ID})")
            while not shutdown_flag.is_set():
                start = time.time()
                if USE_OVERLAY:
                    try:
                        monitor_region = get_capture_region(sct)
                    except ValueError:
                        time.sleep(0.05)
                        continue
                frame = sct.grab(monitor_region)
                img = np.asarray(frame)        # BGRA
                rgba = img[..., [2, 1, 0, 3]]  # to RGBA
                png_bytes = tools.to_png(frame.rgb, frame.size)

                with frame_lock:
                    latest_rgba = rgba.tobytes()
                    latest_png = png_bytes
                    latest_size = frame.size
                    last_capture_ts = start

                elapsed = time.time() - start
                sleep_time = frame_interval - elapsed
                if sleep_time > 0:
                    time.sleep(sleep_time)
    except Exception as exc:
        print(f"[capture] background capture stopped: {exc}")
        shutdown_flag.set()


@app.get("/snapshot.png")
async def snapshot_png():
    """
    Returns a single PNG frame for preview or download.
    """
    if BACKGROUND_CAPTURE:
        with frame_lock:
            png_bytes = latest_png
        if png_bytes is None:
            return Response(content=b"", status_code=503, media_type="text/plain")
        return Response(content=png_bytes, media_type="image/png")

    try:
        with mss.mss() as sct:
            monitor_region = get_capture_region(sct)
            frame = sct.grab(monitor_region)
            png_bytes = tools.to_png(frame.rgb, frame.size)
            return Response(content=png_bytes, media_type="image/png")
    except ValueError as exc:
        return Response(content=str(exc).encode("utf-8"), status_code=503, media_type="text/plain")
    except Exception as exc:
        return Response(content=f"capture error: {exc}".encode("utf-8"), status_code=500, media_type="text/plain")


def run_overlay_window():
    try:
        from PyQt6 import QtCore, QtWidgets
    except Exception as exc:
        print(f"[overlay] PyQt6 is required for --monitor -1: {exc}")
        sys.exit(1)

    class OverlayWindow(QtWidgets.QWidget):
        def __init__(self):
            super().__init__()
            self.setWindowTitle("Capture Area (move/resize)")
            self.setWindowFlags(QtCore.Qt.WindowType.Window)
            self.setStyleSheet(
                "background: #f2f2f2; "
                "border: 2px solid #000;"
            )
            self.setMinimumSize(200, 150)
            self.resize(800, 600)

        def update_region(self):
            top_left = self.mapToGlobal(QtCore.QPoint(0, 0))
            width = max(1, int(self.width()))
            height = max(1, int(self.height()))
            region = {
                "top": int(top_left.y()),
                "left": int(top_left.x()),
                "width": width,
                "height": height,
            }
            with overlay_lock:
                global overlay_region
                overlay_region = region
                overlay_ready.set()

        def moveEvent(self, event):
            self.update_region()
            super().moveEvent(event)

        def resizeEvent(self, event):
            self.update_region()
            super().resizeEvent(event)

        def showEvent(self, event):
            QtCore.QTimer.singleShot(0, self.update_region)
            super().showEvent(event)

    app = QtWidgets.QApplication(sys.argv)
    window = OverlayWindow()
    window.show()

    def poll_shutdown():
        if shutdown_flag.is_set() or (uvicorn_server is not None and uvicorn_server.should_exit):
            app.quit()

    timer = QtCore.QTimer()
    timer.timeout.connect(poll_shutdown)
    timer.start(200)
    app.aboutToQuit.connect(lambda: request_shutdown("overlay closed"))
    app.exec()


def request_shutdown(reason: str):
    """Flag the server to stop and tell uvicorn to exit."""
    global uvicorn_server
    if shutdown_flag.is_set():
        return
    shutdown_flag.set()
    print(f"\n[server] {reason}, shutting down...")
    if uvicorn_server is not None:
        uvicorn_server.should_exit = True
        uvicorn_server.force_exit = True


if __name__ == "__main__":
    print(f"[server] starting on http://{args.host}:{args.port}")
    print("[server] Press Ctrl+C to exit")

    if BACKGROUND_CAPTURE:
        bg_thread = threading.Thread(target=capture_background, daemon=True)
        bg_thread.start()

    config = uvicorn.Config(
        app,
        host=args.host,
        port=args.port,
        log_level="info",
        # We install our own signal handlers below.
        timeout_keep_alive=5,
        reload=False,
    )
    uvicorn_server = uvicorn.Server(config)

    # Custom signal handlers ensure Ctrl+C/SIGTERM always request shutdown,
    # even while a websocket capture loop is running.
    def _handle_signal(sig_num, _frame):
        sig_name = signal.Signals(sig_num).name
        request_shutdown(f"signal {sig_name} received")

    for sig in (signal.SIGINT, signal.SIGTERM):
        try:
            signal.signal(sig, _handle_signal)
        except (ValueError, AttributeError):
            # Signals may not be available (e.g., on some platforms/threads); ignore.
            pass

    try:
        if USE_OVERLAY:
            server_thread = threading.Thread(target=uvicorn_server.run, daemon=True)
            server_thread.start()
            run_overlay_window()
            server_thread.join(timeout=2.0)
        else:
            uvicorn_server.run()
    finally:
        shutdown_flag.set()
        print("[server] Server stopped")
