# Backlog 02: Configuration Manager (CLI Flags + Env Vars)

**Type**: feature | **Priority**: P0 | **Status**: Not Started | **Effort**: 3-4 hours

## User Story
As a developer, I want flexible configuration from CLI flags and environment variables so that I can easily configure the server for different environments.

## Description
Implement ConfigManager class that loads configuration from CLI arguments and environment variables with proper precedence and validation.

**Why**: Configuration is needed by all components. Must support both local development (env vars) and production deployment (CLI flags).

## Acceptance Criteria
- [ ] ConfigManager loads from CLI flags (highest priority)
- [ ] ConfigManager loads from environment variables (fallback)
- [ ] ConfigManager provides default values
- [ ] Configuration includes: skills_dir, log_level, oauth_client_id, oauth_client_secret
- [ ] Validation method checks required fields
- [ ] get() method retrieves config values
- [ ] Masks secrets in logs/debug output

## Reference Features
- Depends on: Backlog 01 (project structure)

## Implementation

**File**: `mcp_skills_server/config/manager.py`

```python
import os
from typing import Any, Optional


class ConfigManager:
    """Manages application configuration from multiple sources."""

    def __init__(
        self,
        skills_dir: Optional[str] = None,
        log_level: Optional[str] = None,
        oauth_client_id: Optional[str] = None,
        oauth_client_secret: Optional[str] = None,
    ):
        """Initialize configuration.

        Args:
            skills_dir: Path to skills directory (CLI flag or env var)
            log_level: Logging level (DEBUG, INFO, WARNING, ERROR)
            oauth_client_id: OAuth client ID
            oauth_client_secret: OAuth client secret
        """
        # Load with precedence: CLI flags > env vars > defaults
        self._config = {
            "skills_dir": skills_dir or os.environ.get("MCP_SKILLS_DIR", "./skills"),
            "log_level": log_level or os.environ.get("MCP_LOG_LEVEL", "INFO"),
            "oauth_client_id": oauth_client_id or os.environ.get("MCP_OAUTH_CLIENT_ID"),
            "oauth_client_secret": oauth_client_secret or os.environ.get("MCP_OAUTH_CLIENT_SECRET"),
        }

    def get(self, key: str, default: Any = None) -> Any:
        """Get configuration value."""
        return self._config.get(key, default)

    def validate(self) -> None:
        """Validate required configuration."""
        required = ["skills_dir"]
        missing = [k for k in required if not self._config.get(k)]
        if missing:
            raise ValueError(f"Missing required configuration: {', '.join(missing)}")

    def to_dict(self, mask_secrets: bool = True) -> dict:
        """Export configuration as dictionary."""
        config = self._config.copy()
        if mask_secrets and config.get("oauth_client_secret"):
            config["oauth_client_secret"] = "***masked***"
        return config
```

## Test Plan

```bash
# Test 1: CLI flags take precedence
python -m mcp_skills_server --skills-dir /tmp/skills --log-level DEBUG --validate-config
# Expected: Configuration shows /tmp/skills and DEBUG

# Test 2: Environment variables work
export MCP_SKILLS_DIR="/var/skills"
export MCP_LOG_LEVEL="WARNING"
python -m mcp_skills_server --validate-config
# Expected: Configuration shows /var/skills and WARNING

# Test 3: Default values apply
unset MCP_SKILLS_DIR
unset MCP_LOG_LEVEL
python -m mcp_skills_server --validate-config
# Expected: Configuration shows ./skills (default) and INFO (default)

# Test 4: Validation catches missing required fields
python -c "from mcp_skills_server.config.manager import ConfigManager; c = ConfigManager(skills_dir=None); c.validate()"
# Expected: Raises ValueError for missing skills_dir

# Test 5: Secrets are masked
python -c "from mcp_skills_server.config.manager import ConfigManager; c = ConfigManager(oauth_client_secret='secret'); print(c.to_dict())"
# Expected: Shows oauth_client_secret: "***masked***"
```

## Definition of Done
- [ ] ConfigManager class implemented
- [ ] Supports CLI flags, env vars, defaults
- [ ] Validation method works
- [ ] Secrets masked in output
- [ ] Unit tests pass
- [ ] Code passes black, ruff, mypy
- [ ] Documentation updated

---
Last updated: 2025-12-26
