# System Overview - MCP Skills Server

## Overview

This document defines the major system components of the MCP Skills Server and their responsibilities.

**Architecture Type**: Single-process subprocess with stdio communication
**Component Count**: 9 internal modules + 2 external dependencies

---

## Architectural Principles

### 1. Separation of Concerns
Each module has a single, well-defined responsibility. Modules interact through clear interfaces.

### 2. Fail-Fast and Graceful Degradation
- Configuration errors → Fail fast (exit on startup)
- Skill errors → Degrade gracefully (log warning, skip skill, continue)
- Runtime errors → Return error response, continue serving

### 3. Stateless Services
No persistent state. Server can be restarted without data loss. Each request is independent.

### 4. Security by Design
OAuth validation on every MCP request. Input validation at all boundaries. Secrets never logged.

### 5. Observable Systems
Comprehensive logging to stderr. Structured log format. Debug mode for troubleshooting.

### 6. Performance Conscious
Fast startup (<2s). Quick skill invocation (<100ms). Caching strategy (v1.0).

---

## System Components

### Component 1: CLI Entry Point

**Type**: Application Entry Point / Interface

**Responsibility**:
- Parse command-line arguments and flags
- Load and validate configuration
- Initialize all subsystems
- Start MCP protocol handler
- Handle graceful shutdown (SIGTERM, SIGINT)

**Key Capabilities**:
- Argument parsing (--skills-dir, --log-level, --oauth-client-id, etc.)
- Environment variable loading
- Help and version display
- Configuration validation (--validate-config)
- Signal handling for shutdown

**Interfaces**:
- **Inputs**: Command-line arguments, environment variables, OS signals
- **Outputs**: Exit codes (0=success, 1=config error, 2=startup error, etc.)
- **APIs**: None (entry point)

**Dependencies**:
- Configuration Manager (to load config)
- Logger (to initialize logging)
- Skill Discovery Engine (to discover skills on startup)
- MCP Protocol Handler (to start stdio listener)

**Data Storage**:
- None (loads config, doesn't store)

**Scalability**:
- N/A (single instance per subprocess)

---

### Component 2: Configuration Manager

**Type**: Backend / Infrastructure

**Responsibility**:
- Load configuration from multiple sources (CLI flags, env vars, config file in v1.0)
- Validate configuration values
- Provide configuration to other components
- Manage configuration precedence (CLI > env var > default)

**Key Capabilities**:
- Multi-source configuration loading
- Configuration validation
- Default value handling
- Sensitive value masking (for logging)

**Interfaces**:
- **Inputs**: CLI flags, environment variables, config file (v1.0)
- **Outputs**: Configuration object with validated values
- **APIs**: `get_config(key)` → value

**Dependencies**:
- None (lowest-level component)

**Data Storage**:
- In-memory configuration object

**Scalability**:
- N/A (single instance)

**Example Configuration**:
```python
{
  "skills_dir": "./dev-swarms/skills",
  "project_root": "/Users/maya/projects/dev-swarms",
  "log_level": "INFO",
  "oauth_client_id": "abc123",
  "oauth_client_secret": "***masked***",
  "oauth_provider_url": "https://accounts.google.com"
}
```

---

### Component 3: Logger

**Type**: Infrastructure / Cross-Cutting

**Responsibility**:
- Provide structured logging to stderr
- Support multiple log levels (DEBUG, INFO, WARNING, ERROR)
- Format log messages consistently
- Never log sensitive data (tokens, secrets)

**Key Capabilities**:
- Structured log format: `[TIMESTAMP] [LEVEL] [COMPONENT] Message`
- Configurable log level
- Component-based logging (server, config, discovery, mcp, oauth, io)
- Safe logging (no secrets)

**Interfaces**:
- **Inputs**: Log method calls from other components
- **Outputs**: Log messages to stderr
- **APIs**: `log_info(component, message)`, `log_error(component, message)`, etc.

**Dependencies**:
- Configuration Manager (for log level)

**Data Storage**:
- None (writes to stderr stream)

**Scalability**:
- N/A (single instance)

**Example Logs**:
```
[2025-12-26 16:30:45] [INFO] [server] MCP Skills Server v0.1.0 starting...
[2025-12-26 16:30:45] [DEBUG] [config] Skills directory: ./dev-swarms/skills
[2025-12-26 16:30:45] [INFO] [discovery] Found 3 skills
```

---

### Component 4: Skill Discovery Engine

**Type**: Backend / Core Functionality

**Responsibility**:
- Scan skills directory for skill folders
- Identify SKILL.md files
- Parse SKILL.md YAML frontmatter
- Validate skill metadata
- Build initial skill registry
- Log discovered skills

**Key Capabilities**:
- Recursive directory scanning
- SKILL.md file detection
- YAML frontmatter parsing
- Skill validation (name, description required)
- Error handling (malformed skills skipped with warning)

**Interfaces**:
- **Inputs**: Skills directory path (from config)
- **Outputs**: List of discovered skills with metadata
- **APIs**: `discover_skills(skills_dir)` → List[SkillMetadata]

**Dependencies**:
- Configuration Manager (for skills directory path)
- Logger (for logging discovery process)
- File I/O Manager (for reading SKILL.md files)

**Data Storage**:
- None (returns discovered skills to registry)

**Scalability**:
- Runs once on startup (O(n) where n = number of skill folders)
- V1.0: File watcher for hot reload

**Skill Metadata Structure**:
```python
{
  "name": "init-ideas",
  "description": "Initialize project ideas and documentation",
  "category": "project-setup",  # optional
  "file_path": "./dev-swarms/skills/dev-swarms-init-ideas/SKILL.md",
  "folder_path": "./dev-swarms/skills/dev-swarms-init-ideas"
}
```

---

### Component 5: Tool Registry

**Type**: Backend / Core Functionality

**Responsibility**:
- Maintain mapping of skill names to skill metadata
- Register discovered skills as MCP tools
- Provide skill lookup by name
- Prevent duplicate skill names

**Key Capabilities**:
- Skill registration
- Skill lookup (O(1) by name)
- Duplicate detection
- Tool list generation (for MCP list_tools)

**Interfaces**:
- **Inputs**: List of skills from Discovery Engine
- **Outputs**: MCP tool list, skill metadata
- **APIs**:
  - `register_skill(metadata)` → void
  - `get_skill(name)` → SkillMetadata or None
  - `list_tools()` → List[ToolDefinition]

**Dependencies**:
- Logger (for logging registration)

**Data Storage**:
- In-memory hash map: `{skill_name: SkillMetadata}`

**Scalability**:
- O(1) lookup
- Limited by number of skills (expected: 3-30, max: 100+)

---

### Component 6: MCP Protocol Handler

**Type**: Backend / Core Functionality / Protocol Implementation

**Responsibility**:
- Implement stdio transport (stdin/stdout)
- Parse JSON-RPC 2.0 messages
- Route requests to appropriate handlers
- Format JSON-RPC responses
- Handle MCP initialization handshake
- Support MCP methods: list_tools, call_tool

**Key Capabilities**:
- Stdio listener (continuous read loop)
- JSON-RPC message parsing and validation
- Method routing (list_tools → list handler, call_tool → invocation handler)
- Error response formatting
- Graceful shutdown

**Interfaces**:
- **Inputs**: JSON-RPC messages on stdin
- **Outputs**: JSON-RPC responses on stdout
- **APIs**: Internal routing to handlers

**Dependencies**:
- Tool Registry (for list_tools)
- Skill Invocation Handler (for call_tool)
- OAuth Validator (for authentication)
- Logger (for logging requests/responses)

**Data Storage**:
- None (stateless request/response)

**Scalability**:
- Handles requests sequentially (stdio limitation)
- V1.0: Performance optimizations for concurrent-like handling
- P2: SSE transport for true concurrency

**JSON-RPC Message Examples**:

**Request (list_tools)**:
```json
{
  "jsonrpc": "2.0",
  "method": "list_tools",
  "id": 1
}
```

**Response (list_tools)**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "tools": [
      {"name": "init-ideas", "description": "Initialize project ideas"},
      {"name": "code-development", "description": "Feature development workflow"}
    ]
  },
  "id": 1
}
```

**Request (call_tool)**:
```json
{
  "jsonrpc": "2.0",
  "method": "call_tool",
  "params": {"name": "init-ideas"},
  "id": 2
}
```

**Response (call_tool)**:
```json
{
  "jsonrpc": "2.0",
  "result": {
    "content": "[Full SKILL.md content with resolved paths...]"
  },
  "id": 2
}
```

---

### Component 7: OAuth Validator

**Type**: Backend / Security

**Responsibility**:
- Validate OAuth 2.1 access tokens
- Communicate with OAuth provider for token validation
- Implement PKCE flow validation
- Check token expiration, scope, issuer
- Return authentication decision (valid/invalid)

**Key Capabilities**:
- OAuth 2.1 with PKCE validation
- Token introspection (with OAuth provider)
- Token expiration checking
- Secure session ID generation
- Error handling for OAuth provider failures

**Interfaces**:
- **Inputs**: Access token from MCP request header/params
- **Outputs**: Authentication decision (valid: true/false)
- **APIs**: `validate_token(token)` → bool

**Dependencies**:
- Configuration Manager (for OAuth provider URL, client credentials)
- Logger (for logging validation attempts)
- External: OAuth Provider (Google, GitHub, Azure, etc.)

**Data Storage**:
- None (stateless validation)
- Optional: Token validation cache (v1.0 optimization)

**Scalability**:
- Network call to OAuth provider (adds latency ~50-200ms)
- V1.0: Cache valid tokens (short TTL)

**OAuth Validation Flow**:
1. Extract token from request
2. Check token format and structure
3. Call OAuth provider token introspection endpoint
4. Validate response (active: true, expiration, scope)
5. Return validation result

**Error Handling**:
- OAuth provider unreachable → Reject request, log error
- Invalid token → Reject request, return 401 Unauthorized
- Expired token → Reject request, return 401 Unauthorized with clear message

---

### Component 8: Skill Invocation Handler

**Type**: Backend / Core Functionality

**Responsibility**:
- Handle call_tool MCP requests
- Look up skill in registry
- Read SKILL.md file
- Resolve file paths to absolute paths
- Handle script references
- Return processed SKILL.md content

**Key Capabilities**:
- Skill lookup
- SKILL.md file reading
- Path resolution (relative → absolute)
- Script reference handling (instructions instead of source)
- Error handling (file not found, read errors)

**Interfaces**:
- **Inputs**: Skill name from MCP call_tool request
- **Outputs**: Processed SKILL.md content
- **APIs**: `invoke_skill(name)` → string (SKILL.md content)

**Dependencies**:
- Tool Registry (for skill lookup)
- File I/O Manager (for reading SKILL.md)
- Configuration Manager (for project root path)
- Logger (for logging invocations)

**Data Storage**:
- None (reads from filesystem on each invocation)
- V1.0: Optional content cache

**Scalability**:
- File I/O is fast for typical SKILL.md sizes (10-50KB)
- V1.0: Cache SKILL.md content to avoid repeated reads

**Processing Steps**:
1. Look up skill in registry → get file path
2. Read SKILL.md file
3. Parse YAML frontmatter
4. Identify file path references in content
5. Resolve relative paths to absolute (using project root)
6. Identify script references
7. Replace script content with execution instructions
8. Return processed content

**Example Path Resolution**:
```
Original: "See 00-init-ideas/README.md for details"
Resolved: "See /Users/maya/projects/dev-swarms/00-init-ideas/README.md for details"
```

---

### Component 9: File I/O Manager

**Type**: Backend / Infrastructure

**Responsibility**:
- Read files from filesystem
- Handle file I/O errors gracefully
- Provide file existence checks
- Support UTF-8 encoding
- Log file operations (DEBUG level)

**Key Capabilities**:
- File reading with error handling
- UTF-8 decoding
- File existence checking
- Path validation (prevent directory traversal)
- Large file warnings (>100KB)

**Interfaces**:
- **Inputs**: File paths
- **Outputs**: File content or error
- **APIs**:
  - `read_file(path)` → string or error
  - `file_exists(path)` → bool

**Dependencies**:
- Logger (for logging file operations)

**Data Storage**:
- None (reads from filesystem)

**Scalability**:
- Limited by filesystem performance
- Typical SKILL.md files are small (10-50KB)

**Security**:
- Path validation prevents directory traversal attacks
- Example: reject paths with `../../../etc/passwd`

---

## External Dependencies

### External Dependency 1: OAuth Provider

**Type**: Third-Party Service

**Purpose**: Validate OAuth 2.1 access tokens

**Providers Supported**:
- Google (https://accounts.google.com)
- GitHub (https://github.com/login/oauth)
- Azure AD (https://login.microsoftonline.com)
- Custom OAuth 2.1 providers

**Interface**:
- Token introspection endpoint
- HTTPS only
- OAuth 2.1 compliant

**Failure Handling**:
- Timeout: 30 seconds
- Retry: No retry (fail fast)
- Circuit breaker: v1.0 feature
- Fallback: Reject request if provider unreachable

**Trust Boundary**: Trusted external service (HTTPS, authenticated)

---

### External Dependency 2: Filesystem

**Type**: Local Resource

**Purpose**: Store SKILL.md files

**Interface**:
- Standard OS filesystem (POSIX, Windows)
- Read-only access required
- UTF-8 encoded files

**Failure Handling**:
- Directory not found → Fail startup
- File not found → Return error for that skill
- Permission denied → Fail startup (directory) or error (individual file)
- Disk full → Logging fails, server continues

**Trust Boundary**: Local filesystem (trusted)

---

## Component Interaction Patterns

### Pattern 1: Request-Response (Synchronous)

**Used For**: MCP protocol communication

**Flow**:
1. MCP Client sends JSON-RPC request on stdin
2. MCP Protocol Handler receives and parses
3. OAuth Validator checks authentication
4. Appropriate handler processes request
5. Response formatted and sent to stdout

**Characteristics**:
- Synchronous (blocking)
- Stateless
- Fast (<100ms target)

---

### Pattern 2: Initialization Sequence

**Used For**: Server startup

**Flow**:
1. CLI Entry Point parses arguments
2. Configuration Manager loads config
3. Logger initialized
4. OAuth Validator initialized (validate config)
5. Skill Discovery Engine scans directory
6. Tool Registry registers discovered skills
7. MCP Protocol Handler starts stdio listener
8. Server ready (log message)

**Characteristics**:
- Runs once on startup
- Sequential (each step depends on previous)
- Fast (<2s target)

---

### Pattern 3: File-Based Data Access

**Used For**: Reading SKILL.md files

**Flow**:
1. Skill Invocation Handler requests file
2. File I/O Manager reads from filesystem
3. Content returned to handler
4. Handler processes content (path resolution, etc.)

**Characteristics**:
- Synchronous file I/O
- No database queries
- Simple and reliable

**V1.0 Optimization**: Cache file content in memory

---

## Component Summary Table

| Component | Type | Dependencies | Complexity | Criticality |
|-----------|------|--------------|------------|-------------|
| CLI Entry Point | Interface | Config, Logger, Discovery, MCP | Low | High |
| Configuration Manager | Infrastructure | None | Low | High |
| Logger | Infrastructure | Config | Low | Medium |
| Skill Discovery Engine | Core | Config, Logger, FileIO | Medium | High |
| Tool Registry | Core | Logger | Low | High |
| MCP Protocol Handler | Core | Registry, Invocation, OAuth, Logger | High | Critical |
| OAuth Validator | Security | Config, Logger, OAuth Provider | Medium | Critical |
| Skill Invocation Handler | Core | Registry, FileIO, Config, Logger | Medium | Critical |
| File I/O Manager | Infrastructure | Logger | Low | High |

**Total**: 9 components
**Critical**: 3 (MCP Protocol Handler, OAuth Validator, Skill Invocation Handler)
**High**: 5
**Medium**: 1 (Logger)

---

Last updated: 2025-12-26
