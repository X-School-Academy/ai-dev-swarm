# Backlog 01: Python Project Structure with pyproject.toml

**Type**: feature
**Priority**: P0
**Status**: Not Started
**Estimated Effort**: 2-3 hours

---

## User Story

As a developer, I want a well-organized Python project structure so that I can easily navigate the codebase and understand where different components live.

---

## Description

Create a professional Python project structure following modern best practices with pyproject.toml for dependency management and configuration.

**Why This Matters**:
- Clean structure makes onboarding faster
- Standard layout familiar to Python developers
- pyproject.toml is the modern standard (replaces setup.py)
- Proper structure enables tools like black, ruff, mypy to work correctly

---

## Acceptance Criteria

- [ ] Project follows src layout or flat layout (src recommended)
- [ ] `pyproject.toml` includes project metadata (name, version, description, authors)
- [ ] `pyproject.toml` defines dependencies (none for MVP Sprint 1)
- [ ] `pyproject.toml` defines dev dependencies (black, ruff, mypy, pytest)
- [ ] `pyproject.toml` includes build system configuration
- [ ] `pyproject.toml` includes tool configurations (black, ruff, mypy, pytest)
- [ ] Project installable with `pip install -e .`
- [ ] `README.md` exists with basic project description
- [ ] `.gitignore` includes Python-specific exclusions (__pycache__, *.pyc, .venv, etc.)

---

## Reference Features

*No existing features to reference (this is the first feature)*

---

## Implementation Details

### Recommended Structure

```
mcp-skills-server/
├── mcp_skills_server/        # Main package
│   ├── __init__.py           # Package initialization
│   ├── __main__.py           # Entry point for python -m
│   ├── cli.py                # CLI argument parsing
│   ├── config/               # Configuration module
│   │   ├── __init__.py
│   │   └── manager.py
│   └── utils/                # Utilities module
│       ├── __init__.py
│       └── logger.py
├── tests/                    # Test suite
│   ├── __init__.py
│   ├── conftest.py           # pytest fixtures
│   └── unit/                 # Unit tests
│       └── __init__.py
├── pyproject.toml            # Project configuration
├── README.md                 # Documentation
├── LICENSE                   # MIT License
└── .gitignore                # Git exclusions
```

### pyproject.toml Template

```toml
[build-system]
requires = ["setuptools>=61.0", "wheel"]
build-backend = "setuptools.build_meta"

[project]
name = "mcp-skills-server"
version = "0.1.0"
description = "MCP Skills Server for AI agent skill execution"
authors = [{name = "Your Name", email = "you@example.com"}]
readme = "README.md"
license = {text = "MIT"}
requires-python = ">=3.8"
classifiers = [
    "Development Status :: 3 - Alpha",
    "Intended Audience :: Developers",
    "License :: OSI Approved :: MIT License",
    "Programming Language :: Python :: 3",
    "Programming Language :: Python :: 3.8",
    "Programming Language :: Python :: 3.9",
    "Programming Language :: Python :: 3.10",
    "Programming Language :: Python :: 3.11",
    "Programming Language :: Python :: 3.12",
]
dependencies = []

[project.optional-dependencies]
dev = [
    "black>=23.7.0",
    "ruff>=0.0.286",
    "mypy>=1.5.0",
    "pytest>=7.4.0",
    "pytest-cov>=4.1.0",
]

[project.scripts]
mcp-skills-server = "mcp_skills_server.cli:main"

[tool.black]
line-length = 100
target-version = ['py38', 'py39', 'py310', 'py311', 'py312']

[tool.ruff]
line-length = 100
target-version = "py38"
select = ["E", "W", "F", "I", "UP", "B", "SIM"]
ignore = ["E501"]

[tool.mypy]
python_version = "3.8"
warn_return_any = true
warn_unused_configs = true
disallow_untyped_defs = false

[tool.pytest.ini_options]
testpaths = ["tests"]
python_files = ["test_*.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
addopts = "--strict-markers --tb=short"
```

---

## Test Plan

```bash
# Test 1: Project structure exists
ls mcp_skills_server/__init__.py
ls mcp_skills_server/__main__.py
ls pyproject.toml
ls README.md
# Expected: All files exist

# Test 2: Package is installable
pip install -e .
# Expected: Installation succeeds

# Test 3: Package is importable
python -c "import mcp_skills_server; print(mcp_skills_server.__version__)"
# Expected: Prints version (e.g., "0.1.0")

# Test 4: Dev dependencies installed
black --version
ruff --version
mypy --version
pytest --version
# Expected: All tools available

# Test 5: Git ignores Python artifacts
echo "__pycache__" > test.txt
git status test.txt
# Expected: test.txt not ignored (only __pycache__ should be)
rm test.txt
```

---

## Definition of Done

- [ ] All files and folders created as per structure
- [ ] `pyproject.toml` includes all required sections
- [ ] Project installs successfully with `pip install -e .`
- [ ] Can import package: `import mcp_skills_server`
- [ ] All dev dependencies available
- [ ] `.gitignore` excludes Python artifacts
- [ ] README has basic project description
- [ ] Code committed to git

---

## Notes

- Use MIT license (standard for open source Python packages)
- Keep version at 0.1.0 for MVP
- Add proper LICENSE file with MIT text
- README should include installation instructions

---

Last updated: 2025-12-26
