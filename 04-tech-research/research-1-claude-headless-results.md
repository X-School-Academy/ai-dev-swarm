# Research 1 Results - Claude Headless

## Summary

Claude Code supports headless execution via `--print`. The CLI can be invoked from Python, streams output line-by-line, and exits with code 0 on success. A SIGINT interrupt is supported by the runner but not exercised in this run.

## Evidence

- `claude --print --output-format text "Say hello"` returns output and exits normally.
- Unit tests executed successfully, including a live headless call.

## Commands Run

- `python 04-tech-research/research-1-claude-headless/run_headless.py --prompt "Say hello"`
- `RUN_CLAUDE_HEADLESS_TESTS=1 python -m unittest discover -s tests`

## Key Behaviors Validated

- Headless mode works with `--print`.
- Real-time stdout capture works in the Python runner.
- Exit codes are available from the subprocess.

## Gaps and Follow-Ups

- SIGINT interruption should be explicitly tested with `--interrupt-after`.
- Stream JSON output should be verified with `--output-format stream-json`.

## Go/No-Go

Go for MVP headless execution using Claude Code. The core assumption A1 is validated for `--print` mode.
