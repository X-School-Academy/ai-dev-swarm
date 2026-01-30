#!/usr/bin/env python3
import argparse
import os
import selectors
import signal
import subprocess
import sys
import time


def build_command(args):
    cmd = [args.claude_bin, "--print", "--output-format", args.output_format]
    if args.include_partial:
        cmd.append("--include-partial-messages")
    if args.model:
        cmd.extend(["--model", args.model])
    if args.permission_mode:
        cmd.extend(["--permission-mode", args.permission_mode])
    cmd.append(args.prompt)
    return cmd


def stream_process(proc, interrupt_after):
    selector = selectors.DefaultSelector()
    if proc.stdout:
        selector.register(proc.stdout, selectors.EVENT_READ, data="stdout")
    if proc.stderr:
        selector.register(proc.stderr, selectors.EVENT_READ, data="stderr")

    start = time.monotonic()
    interrupted = False

    while True:
        if interrupt_after is not None and not interrupted:
            if time.monotonic() - start >= interrupt_after:
                proc.send_signal(signal.SIGINT)
                interrupted = True

        if proc.poll() is not None and not selector.get_map():
            break

        events = selector.select(timeout=0.1)
        if not events:
            if proc.poll() is not None:
                break
            continue

        for key, _ in events:
            stream = key.fileobj
            label = key.data
            line = stream.readline()
            if line:
                sys.stdout.write(f"[{label}] {line}")
                sys.stdout.flush()
            else:
                selector.unregister(stream)

    return proc.wait()


def main():
    parser = argparse.ArgumentParser(description="Run Claude Code in headless mode and stream output.")
    parser.add_argument("--prompt", required=True, help="Prompt to send to Claude.")
    parser.add_argument(
        "--output-format",
        default="text",
        choices=["text", "json", "stream-json"],
        help="Claude output format.",
    )
    parser.add_argument("--include-partial", action="store_true", help="Include partial messages in stream-json output.")
    parser.add_argument("--model", help="Optional model override.")
    parser.add_argument(
        "--permission-mode",
        choices=["acceptEdits", "bypassPermissions", "default", "delegate", "dontAsk", "plan"],
        help="Permission mode passed to Claude.",
    )
    parser.add_argument("--claude-bin", default="claude", help="Path to the Claude Code CLI.")
    parser.add_argument(
        "--interrupt-after",
        type=float,
        help="Send SIGINT after N seconds to test interruption handling.",
    )

    args = parser.parse_args()

    cmd = build_command(args)
    sys.stdout.write(f"[runner] Executing: {' '.join(cmd)}\n")
    sys.stdout.flush()

    env = os.environ.copy()
    proc = subprocess.Popen(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        bufsize=1,
        env=env,
    )

    exit_code = stream_process(proc, args.interrupt_after)
    sys.stdout.write(f"[runner] Exit code: {exit_code}\n")
    sys.stdout.flush()

    return exit_code


if __name__ == "__main__":
    sys.exit(main())
