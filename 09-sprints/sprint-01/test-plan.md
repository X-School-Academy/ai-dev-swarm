# Sprint 1 Test Plan - Foundation & Infrastructure

## Overview

This test plan validates that Sprint 1 delivers a solid foundation for the MCP Skills Server project. Tests should be executable by non-technical users and demonstrate real user value.

**Sprint Goal**: Establish project structure, configuration, logging, and development environment

---

## Pre-Test Setup

```bash
# Clone repository
git clone git@github.com:X-School-Academy/ai-dev-swarm.git
cd ai-dev-swarm/mcp-skills-server  # (after Sprint 1 implementation)

# Verify Python version
python --version
# Expected: Python 3.8 or higher
```

---

## Test 1: Project Installation

**Objective**: Verify project can be installed and is ready for development

**Steps**:
```bash
# Install in editable mode
pip install -e .

# Verify installation
python -c "import mcp_skills_server; print('✅ Package installed')"
```

**Expected Result**:
- Installation completes without errors
- Package is importable
- Output: "✅ Package installed"

**Pass Criteria**: ✅ Installation successful, package importable

---

## Test 2: CLI Help and Version

**Objective**: Verify CLI provides helpful information to users

**Steps**:
```bash
# Display help
python -m mcp_skills_server --help

# Display version
python -m mcp_skills_server --version
```

**Expected Result**:
- Help text shows all available options (--skills-dir, --log-level, etc.)
- Version displays (e.g., "0.1.0")

**Pass Criteria**: ✅ Help is clear, version is displayed

---

## Test 3: Configuration from Environment Variables

**Objective**: Verify configuration can be loaded from environment variables

**Steps**:
```bash
# Set environment variables
export MCP_SKILLS_DIR="/tmp/test-skills"
export MCP_LOG_LEVEL="DEBUG"

# Validate configuration
python -m mcp_skills_server --validate-config
```

**Expected Result**:
- Configuration loaded from env vars
- Skills dir: /tmp/test-skills
- Log level: DEBUG
- No errors

**Pass Criteria**: ✅ Environment variables loaded correctly

---

## Test 4: Configuration from CLI Flags (Override)

**Objective**: Verify CLI flags override environment variables

**Steps**:
```bash
# Env vars still set from Test 3
export MCP_SKILLS_DIR="/tmp/test-skills"
export MCP_LOG_LEVEL="DEBUG"

# Override with CLI flags
python -m mcp_skills_server --skills-dir /var/skills --log-level WARNING --validate-config
```

**Expected Result**:
- CLI flags take precedence
- Skills dir: /var/skills (not /tmp/test-skills)
- Log level: WARNING (not DEBUG)

**Pass Criteria**: ✅ CLI flags override env vars correctly

---

## Test 5: Logging Output

**Objective**: Verify logging works and outputs to stderr with proper format

**Steps**:
```bash
# Run with DEBUG logging
python -m mcp_skills_server --log-level DEBUG 2>&1 | head -n 10
```

**Expected Result**:
- Logs appear on stderr (not stdout)
- Format: `[YYYY-MM-DD HH:MM:SS] [LEVEL   ] [component] message`
- Example: `[2025-12-26 16:30:45] [INFO   ] [server] MCP Skills Server v0.1.0 starting...`

**Pass Criteria**: ✅ Logs formatted correctly, output to stderr

---

## Test 6: Secret Masking in Logs

**Objective**: Verify secrets are never exposed in logs

**Steps**:
```bash
# Pass OAuth secret via CLI
python -m mcp_skills_server --oauth-client-secret "my_secret_value_123" --log-level DEBUG 2>&1 | grep "my_secret_value_123"
```

**Expected Result**:
- Secret value NOT found in logs
- Should see: "oauth_client_secret: ***masked***"
- grep command returns no matches

**Pass Criteria**: ✅ Secrets masked, not exposed in logs

---

## Test 7: Code Quality Tools

**Objective**: Verify code quality tools are configured and pass

**Steps**:
```bash
# Install dev dependencies
pip install -e ".[dev]"

# Run code formatting check
black --check .

# Run linting
ruff check .

# Run type checking
mypy mcp_skills_server/
```

**Expected Result**:
- Black: Code is formatted (or shows files that would be reformatted)
- Ruff: No linting errors
- Mypy: No type errors (or minimal with explanations)

**Pass Criteria**: ✅ All tools configured and run successfully

---

## Test 8: Testing Infrastructure

**Objective**: Verify pytest works and tests can run

**Steps**:
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=mcp_skills_server --cov-report=term-missing
```

**Expected Result**:
- pytest collects and runs tests (even if 0 tests initially)
- Coverage report generated
- No test failures

**Pass Criteria**: ✅ pytest works, coverage reporting functional

---

## Test 9: Invalid Configuration Handling

**Objective**: Verify clear error messages for invalid configuration

**Steps**:
```bash
# Invalid log level
python -m mcp_skills_server --log-level INVALID 2>&1
```

**Expected Result**:
- Clear error message about invalid log level
- Shows valid options: DEBUG, INFO, WARNING, ERROR
- Non-zero exit code

**Pass Criteria**: ✅ Error message is helpful, not cryptic

---

## Test 10: Development Workflow

**Objective**: Verify typical development workflow works end-to-end

**Steps**:
```bash
# Make a code change (add comment to cli.py)
echo "# Test comment" >> mcp_skills_server/cli.py

# Format code
black .

# Check linting
ruff check .

# Run tests
pytest

# Verify change doesn't break anything
python -m mcp_skills_server --version
```

**Expected Result**:
- Code formatted automatically by black
- Linting passes
- Tests pass
- Server still runs

**Pass Criteria**: ✅ Development workflow is smooth and automated

---

## Sprint Success Criteria

**Sprint 1 is successful if ALL tests pass**:
- [  ] Test 1: Installation ✅
- [  ] Test 2: CLI Help/Version ✅
- [  ] Test 3: Env Var Configuration ✅
- [  ] Test 4: CLI Flag Override ✅
- [  ] Test 5: Logging Output ✅
- [  ] Test 6: Secret Masking ✅
- [  ] Test 7: Code Quality Tools ✅
- [  ] Test 8: Testing Infrastructure ✅
- [  ] Test 9: Error Handling ✅
- [  ] Test 10: Development Workflow ✅

---

## Demo Script for Customer Showcase

**Title**: "MCP Skills Server - Solid Foundation"

**Demo Flow** (5 minutes):

1. **Quick Install** (30 seconds)
   ```bash
   pip install -e .
   python -m mcp_skills_server --version
   ```
   **Say**: "Installation is simple - one command and you're ready"

2. **Flexible Configuration** (1 minute)
   ```bash
   # Show env vars
   export MCP_SKILLS_DIR="./skills"
   python -m mcp_skills_server --validate-config

   # Show CLI override
   python -m mcp_skills_server --skills-dir /tmp/skills --log-level DEBUG --validate-config
   ```
   **Say**: "Configuration is flexible - use environment variables or CLI flags"

3. **Developer Experience** (2 minutes)
   ```bash
   # Show code quality
   black .
   ruff check .
   pytest --cov=mcp_skills_server
   ```
   **Say**: "Code quality is automatic - formatting, linting, testing all configured"

4. **Clear Logging** (1 minute)
   ```bash
   python -m mcp_skills_server --log-level DEBUG 2>&1 | head -5
   ```
   **Say**: "Logs are clear and informative - perfect for troubleshooting"

5. **Security First** (30 seconds)
   ```bash
   python -m mcp_skills_server --oauth-client-secret "secret" --log-level DEBUG 2>&1 | grep "secret"
   ```
   **Say**: "Secrets are protected - never exposed in logs"

**Closing**: "Sprint 1 delivers a solid foundation - professional structure, flexible config, great DX. Ready for core MCP protocol in Sprint 2."

---

Last updated: 2025-12-26
