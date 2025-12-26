# Backlog 04: CLI Entry Point with Argparse

**Type**: feature | **Priority**: P0 | **Status**: Not Started | **Effort**: 2-3 hours

## User Story
As a user, I want a clear CLI interface so that I can easily configure and run the MCP server.

## Description
Create CLI entry point using argparse that handles --help, --version, configuration flags, and server startup.

## Acceptance Criteria
- [ ] `python -m mcp_skills_server --help` shows usage
- [ ] `python -m mcp_skills_server --version` shows version
- [ ] Supports flags: --skills-dir, --log-level, --oauth-client-id, --oauth-client-secret
- [ ] `--validate-config` validates and shows configuration
- [ ] Graceful error messages for invalid arguments
- [ ] Exit codes: 0=success, 1=config error, 2=runtime error

## Implementation

**File**: `mcp_skills_server/cli.py`

```python
import argparse
import sys
from mcp_skills_server.config.manager import ConfigManager
from mcp_skills_server.utils.logger import setup_logging, get_logger


def parse_args():
    parser = argparse.ArgumentParser(
        prog="mcp-skills-server",
        description="MCP Skills Server - Serve AI agent skills via MCP"
    )
    parser.add_argument("--skills-dir", help="Skills directory path")
    parser.add_argument("--log-level", choices=["DEBUG", "INFO", "WARNING", "ERROR"], help="Log level")
    parser.add_argument("--oauth-client-id", help="OAuth client ID")
    parser.add_argument("--oauth-client-secret", help="OAuth client secret")
    parser.add_argument("--validate-config", action="store_true", help="Validate config and exit")
    parser.add_argument("--version", action="version", version="0.1.0")
    return parser.parse_args()


def main():
    args = parse_args()
    setup_logging(args.log_level or "INFO")
    logger = get_logger("server")

    config = ConfigManager(
        skills_dir=args.skills_dir,
        log_level=args.log_level,
        oauth_client_id=args.oauth_client_id,
        oauth_client_secret=args.oauth_client_secret
    )

    if args.validate_config:
        try:
            config.validate()
            logger.info(f"Configuration valid: {config.to_dict()}")
            return 0
        except ValueError as e:
            logger.error(f"Configuration invalid: {e}")
            return 1

    logger.info("MCP Skills Server v0.1.0 starting...")
    # Server startup will be added in Sprint 2
    logger.info("Server ready (placeholder)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

**File**: `mcp_skills_server/__main__.py`
```python
from mcp_skills_server.cli import main
import sys

if __name__ == "__main__":
    sys.exit(main())
```

## Test Plan

```bash
# Test 1: Help text
python -m mcp_skills_server --help

# Test 2: Version
python -m mcp_skills_server --version

# Test 3: Config validation
python -m mcp_skills_server --skills-dir ./skills --validate-config

# Test 4: Invalid flag
python -m mcp_skills_server --invalid-flag
# Expected: Error message, exit code 2
```

## Definition of Done
- [ ] CLI works with all flags
- [ ] Help and version display correctly
- [ ] Config validation works
- [ ] Proper exit codes
- [ ] Documented

---
Last updated: 2025-12-26
