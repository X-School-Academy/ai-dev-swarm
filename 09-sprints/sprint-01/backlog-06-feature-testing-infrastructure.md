# Backlog 06: Testing Infrastructure with Pytest

**Type**: feature | **Priority**: P0 | **Status**: Not Started | **Effort**: 2 hours

## User Story
As a developer, I want pytest infrastructure so that I can write and run tests easily.

## Description
Setup pytest with coverage reporting and test organization structure.

## Acceptance Criteria
- [ ] `pytest` runs successfully
- [ ] `pytest --cov=mcp_skills_server` generates coverage report
- [ ] tests/ folder with unit/ and integration/ subfolders
- [ ] conftest.py with shared fixtures
- [ ] Basic test for ConfigManager

## Implementation

**File**: `tests/conftest.py`
```python
import pytest

@pytest.fixture
def temp_skills_dir(tmp_path):
    """Create temporary skills directory."""
    skills_dir = tmp_path / "skills"
    skills_dir.mkdir()
    return skills_dir
```

**File**: `tests/unit/test_config.py`
```python
from mcp_skills_server.config.manager import ConfigManager

def test_config_manager_defaults():
    config = ConfigManager()
    assert config.get("log_level") == "INFO"
    assert config.get("skills_dir") == "./skills"

def test_config_manager_custom():
    config = ConfigManager(skills_dir="/tmp/skills", log_level="DEBUG")
    assert config.get("skills_dir") == "/tmp/skills"
    assert config.get("log_level") == "DEBUG"

def test_config_validation():
    config = ConfigManager(skills_dir="/tmp/skills")
    config.validate()  # Should not raise

def test_secrets_masked():
    config = ConfigManager(oauth_client_secret="secret123")
    config_dict = config.to_dict(mask_secrets=True)
    assert config_dict["oauth_client_secret"] == "***masked***"
```

## Test Plan

```bash
# Test 1: Pytest runs
pytest
# Expected: Tests discovered and run

# Test 2: Coverage report
pytest --cov=mcp_skills_server --cov-report=term-missing
# Expected: Coverage report generated

# Test 3: Specific test
pytest tests/unit/test_config.py::test_config_manager_defaults -v
# Expected: Single test runs and passes
```

## Definition of Done
- [ ] Pytest infrastructure complete
- [ ] Basic tests pass
- [ ] Coverage reporting works
- [ ] Documented

---
Last updated: 2025-12-26
