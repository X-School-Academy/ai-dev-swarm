# Backlog 03: Logging System with Stderr Output

**Type**: feature | **Priority**: P0 | **Status**: Not Started | **Effort**: 2-3 hours

## User Story
As a developer, I want comprehensive logging to stderr so that I can debug server operations without interfering with MCP protocol on stdout.

## Description
Implement logging system that outputs to stderr with configurable levels and proper formatting per theme standards.

## Acceptance Criteria
- [ ] Logs output to stderr (stdout reserved for MCP protocol)
- [ ] Format: `[YYYY-MM-DD HH:MM:SS] [LEVEL   ] [component] message`
- [ ] Supports log levels: DEBUG, INFO, WARNING, ERROR
- [ ] Component-specific loggers (server, config, discovery, etc.)
- [ ] Log level configurable via CLI flag and env var
- [ ] Secrets never appear in logs (masked)

## Implementation

**File**: `mcp_skills_server/utils/logger.py`

```python
import logging
import sys


def setup_logging(log_level: str = "INFO") -> None:
    """Configure logging for the application.

    Args:
        log_level: Logging level (DEBUG, INFO, WARNING, ERROR)
    """
    level = getattr(logging, log_level.upper(), logging.INFO)

    logging.basicConfig(
        level=level,
        format='[%(asctime)s] [%(levelname)-7s] [%(name)s] %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        stream=sys.stderr
    )


def get_logger(component: str) -> logging.Logger:
    """Get logger for component.

    Args:
        component: Component name (server, config, discovery, etc.)

    Returns:
        Configured logger instance
    """
    return logging.getLogger(component)
```

## Test Plan

```bash
# Test 1: Logs go to stderr
python -m mcp_skills_server --log-level DEBUG 2>&1 | head -5
# Expected: Log lines appear with proper format

# Test 2: Log format correct
python -m mcp_skills_server 2>&1 | grep -E '\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]'
# Expected: Matches timestamp format

# Test 3: Log level filtering
python -m mcp_skills_server --log-level WARNING 2>&1 | grep DEBUG
# Expected: No DEBUG logs (only WARNING and above)

# Test 4: Component loggers
python -c "from mcp_skills_server.utils.logger import setup_logging, get_logger; setup_logging(); log = get_logger('test'); log.info('test message')"
# Expected: [YYYY-MM-DD HH:MM:SS] [INFO   ] [test] test message
```

## Definition of Done
- [ ] Logging configured to stderr
- [ ] Proper formatting per theme standards
- [ ] Log level configurable
- [ ] Component loggers work
- [ ] Unit tests pass
- [ ] Documented in README

---
Last updated: 2025-12-26
