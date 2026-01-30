# Research 1 - Claude Headless

## Goal

Validate that Claude Code can run in headless mode from a Python subprocess, stream output in real time, and be interrupted cleanly.

## What This Covers

- Non-interactive execution using `--print`
- Real-time stdout/stderr capture
- Exit code capture
- SIGINT interruption

## How To Run

- Headless run:
  - `python run_headless.py --prompt "Say hello"`
- Stream JSON output:
  - `python run_headless.py --prompt "Say hello" --output-format stream-json`
- Interrupt after 3 seconds:
  - `python run_headless.py --prompt "Count to 100" --interrupt-after 3`

## Notes

- This assumes Claude Code is installed and authenticated locally.
- If authentication is not configured, `run_headless.py` will exit with a non-zero code.
