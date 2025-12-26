# Deployment Boundaries - MCP Skills Server

## Overview

This document defines the deployment model for the MCP Skills Server, including what runs where, security boundaries, scaling strategies, and operational considerations.

**Deployment Model**: Single-process subprocess with local or containerized deployment

---

## Deployment Environments

### Development Environment

**Where**: Developer's local machine

**Purpose**: Development, testing, and debugging

**Components Deployed**:
- MCP Skills Server (local process)
- Skills directory (local filesystem)
- Test MCP client (Claude Code or custom test client)

**Data**:
- Test/fake SKILL.md files
- Mock OAuth credentials for testing
- Local logs (stderr to terminal)

**Access**:
- Developer only (process runs as developer's user account)

**OAuth Configuration**:
- Test OAuth client ID/secret (Google OAuth test project or mock)
- localhost redirect URIs for testing

**Performance Targets**: Not critical (development environment)

**Deployment Method**:
```bash
# Install in development mode
uv pip install -e .

# Run directly from source
python -m mcp_skills_server --skills-dir ./dev-swarms/skills --log-level DEBUG
```

---

### Staging Environment

**Where**: Cloud VM or container (same infrastructure as production)

**Purpose**: Pre-production testing, QA, and validation

**Components Deployed**:
- MCP Skills Server (containerized or VM process)
- Skills directory (mounted volume or cloned from git)
- Test MCP clients (internal team)

**Data**:
- Production-like skills (full skill set)
- OAuth credentials (separate staging OAuth app)
- Logs (stderr redirected to log aggregation service)

**Access**:
- Internal team + selected beta testers
- Accessed via SSH or container orchestration

**OAuth Configuration**:
- Staging OAuth client ID/secret (separate from production)
- Staging redirect URIs

**Performance Targets**: Match production targets (validate performance)

**Deployment Method**:
```bash
# Docker container
docker run -v /path/to/skills:/skills \
  -e MCP_OAUTH_CLIENT_ID=$STAGING_CLIENT_ID \
  -e MCP_OAUTH_CLIENT_SECRET=$STAGING_CLIENT_SECRET \
  mcp-skills-server:staging \
  --skills-dir /skills --log-level INFO
```

**Monitoring**:
- Log aggregation (e.g., CloudWatch, Datadog)
- Error tracking (e.g., Sentry)
- Performance metrics (startup time, invocation latency)

---

### Production Environment

**Where**: User's local machine or cloud VM/container

**Purpose**: Live usage by end users

**Components Deployed**:
- MCP Skills Server (subprocess spawned by MCP client)
- Skills directory (user's project directory)
- MCP client (Claude Code, Cursor, or custom client)

**Data**:
- User's real SKILL.md files (project-specific skills)
- User's OAuth credentials (their own OAuth app or shared)
- Logs (stderr to user's terminal or log file)

**Access**:
- User only (process runs as user's account)
- No remote access (local subprocess)

**OAuth Configuration**:
- User's OAuth client ID/secret (configured during setup)
- User's redirect URIs

**Performance Targets**: <2s startup, <100ms invocation (critical)

**Deployment Method**:
```bash
# User installation via uv
uv pip install mcp-skills-server

# User runs as subprocess (spawned by MCP client)
# No manual start needed - client manages lifecycle
```

**Deployment Variations**:

1. **Local Subprocess** (Primary):
   - MCP client spawns server as subprocess
   - Communicates via stdio (stdin/stdout)
   - Server lifecycle managed by client

2. **Containerized** (Alternative for teams):
   - Server runs in Docker container
   - Skills directory mounted from host
   - Logs redirected to container logs

3. **Remote Deployment** (P2 - Future):
   - Server runs on remote VM/container
   - Communicates via SSE transport (not stdio)
   - Shared server for team use

---

## What Runs Where

### User's Device (Local Machine)

**Components**:
- **MCP Client**: Claude Code, Cursor, or custom MCP client
  - Spawns MCP Skills Server as subprocess
  - Sends JSON-RPC requests via stdin
  - Receives JSON-RPC responses via stdout
  - Manages server lifecycle (start, stop, restart)

- **MCP Skills Server Process**:
  - CLI Entry Point
  - MCP Protocol Handler (stdio listener)
  - All 9 internal components
  - Runs as user's OS process

- **Filesystem**:
  - Skills directory with SKILL.md files
  - Project files referenced by skills
  - Configuration files (if using config file in v1.0)
  - Log files (if stderr redirected to file)

**Resource Usage**:
- Memory: ~50-100MB (in-memory registry, no caching in MVP)
- CPU: Minimal (idle most of time, spikes during skill invocation)
- Disk: Read-only access to skills directory (~10-50KB per SKILL.md)

**Operating Systems Supported**:
- macOS (primary)
- Linux (primary)
- Windows (with WSL or native Python)

---

### Cloud (External Services)

**OAuth Provider** (Google, GitHub, Azure, etc.):
- **Purpose**: Validate OAuth 2.1 access tokens
- **Communication**: HTTPS API calls from server to provider
- **Endpoints Used**:
  - OpenID Connect discovery endpoint
  - Token introspection endpoint
- **Data Exchanged**:
  - Access tokens (from server to provider)
  - Validation results (from provider to server)
- **Uptime Dependency**: Critical (server cannot start if provider unreachable)
- **Latency**: ~50-200ms per token validation
- **Failover**: No fallback in MVP (fail fast)

**Third-Party Services** (Optional):
- **Error Tracking** (Sentry, Rollbar):
  - Capture exceptions and errors
  - Send error reports to cloud service
  - Optional (configured via environment variable)

- **Log Aggregation** (CloudWatch, Datadog):
  - Collect stderr logs
  - Store and analyze logs centrally
  - Optional (for team/enterprise deployments)

---

## Trust Boundaries

### Boundary 1: User's Machine ↔ OAuth Provider

**Trust Level**: Untrusted User Machine ↔ Trusted External Service

**Data Flow**:
- Server → OAuth Provider: Access token validation requests
- OAuth Provider → Server: Validation responses

**Security Controls**:
- **HTTPS/TLS Encryption**: All communication uses HTTPS
- **Certificate Validation**: Server validates OAuth provider SSL certificates
- **No Token Persistence**: Access tokens never stored on disk
- **Token Masking**: Tokens never logged (masked in debug logs)
- **Timeout**: 30-second timeout for provider calls (prevent hanging)

**Threats Mitigated**:
- Man-in-the-middle attacks (via TLS)
- Token leakage (no logging, no persistence)
- Denial of service (timeout protection)

**Residual Risks**:
- OAuth provider compromise (outside our control)
- Network interception (mitigated by TLS)

---

### Boundary 2: MCP Client ↔ MCP Skills Server

**Trust Level**: Trusted Client ↔ Trusted Server (same machine, same user)

**Data Flow**:
- Client → Server: JSON-RPC requests (via stdin)
- Server → Client: JSON-RPC responses (via stdout)

**Security Controls**:
- **Process Isolation**: OS-level process isolation
- **No Network Exposure**: Communication via stdio (local only)
- **OAuth Required**: Every request requires valid OAuth token
- **Input Validation**: All JSON-RPC messages validated
- **No Credential Storage**: Server doesn't store OAuth tokens

**Threats Mitigated**:
- Unauthorized access (OAuth validation)
- Process injection (OS-level isolation)
- Data tampering (input validation)

**Residual Risks**:
- Malicious client on same machine (can access server)
- User's machine compromise (full access to subprocess)

---

### Boundary 3: Server ↔ Filesystem (Skills Directory)

**Trust Level**: Trusted Server ↔ Trusted Filesystem (local disk)

**Data Flow**:
- Server → Filesystem: Read SKILL.md files
- Filesystem → Server: File contents

**Security Controls**:
- **Read-Only Access**: Server only reads files (never writes)
- **Path Validation**: Prevent directory traversal attacks
  - No `..` in paths
  - All paths must be within project_root
- **UTF-8 Encoding**: Reject non-UTF-8 files
- **File Size Limits**: Warn on files >100KB, reject >1MB

**Threats Mitigated**:
- Directory traversal attacks (`../../../etc/passwd`)
- Large file DoS (reject very large files)
- Encoding attacks (UTF-8 validation)

**Residual Risks**:
- Malicious SKILL.md content (trusted input assumption)
- Filesystem corruption (OS-level concern)

---

### Boundary 4: Server Components (Internal)

**Trust Level**: All internal components are trusted (same process)

**Data Flow**: Inter-component method calls (in-memory)

**Security Controls**:
- **No External Input**: Internal components don't directly accept external input
- **Validated Data Only**: Data validated at entry points (CLI, MCP Protocol Handler)
- **Fail-Safe Defaults**: Components use secure defaults

**Threats Mitigated**:
- None (internal boundary, same trust level)

**Residual Risks**:
- Programming bugs (mitigated by testing)

---

## Scaling Strategy

### Vertical Scaling (Scale Up)

**Current Deployment**: Single-process subprocess

**Scaling Approach**: Increase host machine resources

**Resource Scaling**:
- **Memory**: 50MB → 200MB (for larger skill sets or caching)
- **CPU**: 1 core sufficient (low CPU usage)
- **Disk**: Minimal (read-only access to skills)

**When to Scale Up**:
- Number of skills >50 (more memory for registry)
- Large SKILL.md files (>100KB) requiring more memory
- High concurrent invocations (more CPU for processing)

**Maximum Single Instance Capacity**:
- Skills: ~100-200 skills (in-memory registry)
- Concurrent Requests: ~10-20 (stdio is sequential, but fast)
- Memory: ~200MB max

**Limitations**:
- Stdio transport is sequential (cannot process concurrent requests in parallel)
- Single process (cannot utilize multiple CPU cores)

---

### Horizontal Scaling (Scale Out)

**MVP Approach**: Not applicable (single subprocess per MCP client)

**Future Approach (v1.0+)**: Multiple instances for team use

**Scaling Model**:
1. **Per-User Instances** (Current):
   - Each user runs their own server subprocess
   - No sharing between users
   - Simple, isolated, secure

2. **Shared Team Instance** (P2):
   - Single server instance for team
   - SSE transport instead of stdio
   - Concurrent request handling
   - Shared skill registry
   - Requires authentication and authorization per user

**Load Balancing** (P2 for shared instances):
- Round-robin across multiple server instances
- Session affinity not needed (stateless)
- Health checks via MCP ping/pong

**Session Management**:
- MVP: No sessions (stateless)
- P2: OAuth session tokens with TTL

---

### Auto-Scaling

**MVP**: Not applicable (no auto-scaling for local subprocess)

**Future (P2 for cloud deployment)**:

**Scaling Triggers**:
- CPU utilization >70% for 5 minutes → scale up
- Request rate >100 req/s → scale out
- Memory usage >80% → scale up

**Scaling Actions**:
- Horizontal: Spin up new server instances
- Vertical: Increase instance size

**Scaling Limits**:
- Minimum instances: 1 (always at least one running)
- Maximum instances: 10 (cost control)

---

## High Availability & Fault Tolerance

### MVP (Local Subprocess)

**Availability Target**: N/A (local subprocess, not HA)

**Failure Modes**:
- Server crash → MCP client restarts server automatically
- Configuration error → User fixes config, restarts server
- OAuth provider down → Server cannot start (fail fast)

**Recovery Strategy**:
- Restart server (fast startup <2s)
- No data loss (stateless, reads from filesystem)
- User intervention for config errors

---

### Future (Cloud Deployment - P2)

**Availability Target**: 99.9% uptime (8.76 hours downtime/year)

**High Availability Strategies**:

1. **Multi-Instance Deployment**:
   - Run 2+ server instances
   - Load balancer distributes requests
   - Instance failure → traffic routed to healthy instances

2. **Health Checks**:
   - HTTP health check endpoint (for cloud deployment)
   - Check MCP protocol handler is responsive
   - Frequency: Every 10 seconds
   - Failure threshold: 3 consecutive failures → mark unhealthy

3. **Graceful Degradation**:
   - OAuth provider down → Cache last valid tokens (short TTL)
   - Skill file unreadable → Skip that skill, continue serving others
   - Invalid request → Return error, continue processing other requests

4. **Circuit Breaker** (for OAuth provider):
   - Detect repeated OAuth provider failures
   - Open circuit → fail fast without calling provider
   - Retry after cooldown period (30 seconds)
   - Close circuit when provider recovers

---

## Geographic Distribution

### MVP: Single Region (User's Location)

**Deployment**: Wherever user's machine is located

**Latency**: <100ms (local process, no network)

**Data Residency**: User's local disk (no cloud storage)

---

### Future (P2): Multi-Region Cloud Deployment

**Deployment Strategy**:
- Primary region: US East (for US users)
- Secondary region: EU West (for EU users, GDPR compliance)
- Tertiary region: Asia Pacific (for APAC users)

**Data Replication**:
- Skills directory replicated across regions (read-only)
- No user data stored (stateless)

**Latency Optimization**:
- Users routed to nearest region
- OAuth provider calls from same region (reduce latency)

**Compliance**:
- GDPR: EU data stays in EU region
- Data residency requirements met per region

---

## Operational Considerations

### Monitoring

**MVP (Local Subprocess)**:
- **Logging**: stderr output to terminal
- **Metrics**: None (local use)
- **Errors**: User sees errors in terminal

**Future (Cloud Deployment - P2)**:
- **Log Aggregation**: CloudWatch, Datadog, Splunk
- **Metrics**:
  - Request rate (requests/second)
  - Response time (p50, p95, p99)
  - Error rate (errors/total requests)
  - OAuth validation latency
  - Skill invocation latency
- **Alerting**:
  - Error rate >1% → alert ops team
  - Response time p95 >200ms → alert
  - OAuth provider unavailable → alert immediately
- **Dashboards**:
  - Real-time request metrics
  - Error trends over time
  - Performance breakdown (OAuth, file I/O, processing)

---

### Logging

**Log Format**:
```
[TIMESTAMP] [LEVEL] [COMPONENT] Message
```

**Example**:
```
[2025-12-26 16:30:45] [INFO] [server] MCP Skills Server v0.1.0 starting...
[2025-12-26 16:30:45] [DEBUG] [config] Skills directory: /Users/maya/projects/dev-swarms/skills
[2025-12-26 16:30:46] [INFO] [discovery] Found 3 skills
[2025-12-26 16:30:47] [INFO] [server] Server ready (1.2s)
[2025-12-26 16:31:00] [INFO] [mcp] Received list_tools request
[2025-12-26 16:31:00] [INFO] [mcp] list_tools complete (42ms)
[2025-12-26 16:31:15] [WARNING] [oauth] Token validation failed: token expired
```

**Log Levels**:
- **DEBUG**: Detailed information for troubleshooting (disabled by default)
- **INFO**: Normal operations (default level)
- **WARNING**: Unexpected but recoverable issues
- **ERROR**: Errors that prevent operation

**Log Destinations**:
- **MVP**: stderr (terminal output)
- **Production**: stderr (can be redirected to file or log aggregation)

**Sensitive Data Handling**:
- OAuth tokens: Never logged (masked as `***`)
- OAuth secrets: Never logged (masked)
- User data: Not logged (no PII)

---

### Error Tracking

**MVP**: Errors logged to stderr

**Future (P2)**:
- Error tracking service (Sentry, Rollbar)
- Automatic error reporting
- Error grouping and deduplication
- Stack traces and context
- Alerts for new error types

---

### Updates and Deployment

**MVP (Local Installation)**:
- User updates via `uv pip install --upgrade mcp-skills-server`
- No downtime (user controls when to update)
- Breaking changes communicated via release notes

**Future (Cloud Deployment - P2)**:
- Blue-green deployment (zero downtime)
- Canary releases (gradual rollout)
- Rollback capability (if new version has issues)
- Health checks during deployment

---

## Deployment Architecture Summary

| Aspect | MVP (Local Subprocess) | Future (Cloud Deployment - P2) |
|--------|------------------------|--------------------------------|
| **Deployment** | Local subprocess | Cloud VM/container |
| **Communication** | stdio (stdin/stdout) | SSE or HTTP |
| **Scaling** | Single instance per user | Horizontal scaling (multiple instances) |
| **Availability** | N/A (local process) | 99.9% uptime target |
| **Monitoring** | Terminal logs | Log aggregation + metrics |
| **Geographic** | User's location | Multi-region |
| **Updates** | User-controlled | Automated (blue-green) |
| **Authentication** | OAuth (per user) | OAuth + session management |

---

## Security Architecture Summary

| Boundary | Security Controls | Threats Mitigated |
|----------|-------------------|-------------------|
| User Machine ↔ OAuth Provider | HTTPS, cert validation, no token persistence | MITM, token leakage |
| MCP Client ↔ Server | Process isolation, OAuth required | Unauthorized access |
| Server ↔ Filesystem | Read-only, path validation, UTF-8 check | Directory traversal, encoding attacks |
| Internal Components | Validated input at boundaries | N/A (trusted boundary) |

---

## Deployment Checklist

### Development Setup
- [ ] Install Python 3.8+
- [ ] Install uv package manager
- [ ] Install mcp-skills-server in development mode
- [ ] Configure OAuth test credentials
- [ ] Create test skills directory
- [ ] Run server with DEBUG log level

### Staging Deployment
- [ ] Provision cloud VM or container
- [ ] Clone skills directory from git
- [ ] Configure staging OAuth credentials
- [ ] Set environment variables (client ID, secret)
- [ ] Deploy server (Docker or direct)
- [ ] Configure log aggregation
- [ ] Set up error tracking
- [ ] Run integration tests
- [ ] Validate performance targets

### Production Deployment (User)
- [ ] User installs via `uv pip install mcp-skills-server`
- [ ] User configures OAuth credentials (setup wizard in v1.0)
- [ ] User sets skills directory path
- [ ] MCP client spawns server automatically
- [ ] User verifies server is working (`list_tools` test)

---

Last updated: 2025-12-26
