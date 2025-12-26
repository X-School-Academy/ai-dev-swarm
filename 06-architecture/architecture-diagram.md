# Architecture Diagrams - MCP Skills Server

## Overview

This document provides visual diagrams of the MCP Skills Server architecture using Mermaid notation.

---

## Diagram 1: High-Level System Architecture

This diagram shows the overall system architecture with all major components and external dependencies.

```mermaid
graph TB
    subgraph "MCP Client Process"
        Client[MCP Client<br/>Claude Code, Cursor, Custom]
    end

    subgraph "MCP Skills Server Process"
        subgraph "Interface Layer"
            CLI[CLI Entry Point<br/>Argument Parsing]
            MCP[MCP Protocol Handler<br/>stdio Transport]
        end

        subgraph "Core Layer"
            Discovery[Skill Discovery<br/>Engine]
            Registry[Tool Registry<br/>HashMap]
            Invocation[Skill Invocation<br/>Handler]
        end

        subgraph "Infrastructure Layer"
            Config[Configuration<br/>Manager]
            Logger[Logger<br/>stderr]
            FileIO[File I/O<br/>Manager]
            OAuth[OAuth 2.1<br/>Validator]
        end
    end

    subgraph "External Dependencies"
        FS[(Filesystem<br/>SKILL.md files)]
        OAuthProvider[OAuth Provider<br/>Google/GitHub/Azure]
    end

    Client -->|stdin: JSON-RPC| MCP
    MCP -->|stdout: JSON-RPC| Client
    MCP -.->|stderr: logs| Logger

    CLI --> Config
    CLI --> Logger
    CLI --> Discovery
    CLI --> MCP

    MCP --> OAuth
    MCP --> Registry
    MCP --> Invocation

    Discovery --> FileIO
    Discovery --> Registry

    Invocation --> Registry
    Invocation --> FileIO
    Invocation --> Config

    FileIO --> FS
    OAuth --> OAuthProvider

    style Client fill:#e1f5ff
    style MCP fill:#ffe1e1
    style OAuth fill:#ffe1e1
    style Invocation fill:#ffe1e1
    style FS fill:#e1ffe1
    style OAuthProvider fill:#f5e1ff
```

**Diagram Legend**:
- **Blue**: External client
- **Red**: Critical components
- **Green**: External dependencies
- **Purple**: Third-party services
- **Solid lines**: Data flow
- **Dotted lines**: Logging

---

## Diagram 2: Component Dependency Graph

This diagram shows the dependencies between internal components (which components depend on which).

```mermaid
graph LR
    CLI[CLI Entry<br/>Point]
    Config[Configuration<br/>Manager]
    Logger[Logger]
    Discovery[Skill<br/>Discovery]
    Registry[Tool<br/>Registry]
    MCP[MCP Protocol<br/>Handler]
    OAuth[OAuth<br/>Validator]
    Invocation[Skill<br/>Invocation]
    FileIO[File I/O<br/>Manager]

    CLI --> Config
    CLI --> Logger
    CLI --> Discovery
    CLI --> MCP

    Logger --> Config

    Discovery --> Config
    Discovery --> Logger
    Discovery --> FileIO
    Discovery --> Registry

    Registry --> Logger

    MCP --> Logger
    MCP --> OAuth
    MCP --> Registry
    MCP --> Invocation

    OAuth --> Config
    OAuth --> Logger

    Invocation --> Registry
    Invocation --> FileIO
    Invocation --> Config
    Invocation --> Logger

    FileIO --> Logger

    style CLI fill:#e1f5ff
    style Config fill:#ffe1e1
    style Logger fill:#f5f5e1
    style MCP fill:#ffe1e1
```

**Dependency Levels**:
- **Level 0**: Configuration Manager (no dependencies)
- **Level 1**: Logger (depends on Config)
- **Level 2**: File I/O Manager, OAuth Validator (depend on Logger, Config)
- **Level 3**: Skill Discovery, Tool Registry (depend on lower levels)
- **Level 4**: MCP Protocol Handler, Skill Invocation (depend on all below)
- **Level 5**: CLI Entry Point (orchestrates all)

---

## Diagram 3: Server Startup Sequence

This diagram shows the initialization sequence when the server starts.

```mermaid
sequenceDiagram
    actor User
    participant CLI as CLI Entry Point
    participant Config as Configuration Manager
    participant Log as Logger
    participant OAuth as OAuth Validator
    participant Disc as Skill Discovery
    participant Reg as Tool Registry
    participant MCP as MCP Protocol Handler
    participant FS as Filesystem

    User->>CLI: mcp-skills-server --skills-dir ./skills
    CLI->>Config: Load configuration
    Config-->>CLI: Config object

    CLI->>Log: Initialize logger
    Log-->>CLI: Logger ready

    Log->>User: [INFO] MCP Skills Server starting...

    CLI->>OAuth: Validate OAuth config
    OAuth->>Config: Get OAuth settings
    OAuth-->>CLI: OAuth configured

    CLI->>Disc: Discover skills
    Disc->>Config: Get skills directory
    Disc->>FS: Scan directory
    FS-->>Disc: Skill folders
    Disc->>FS: Read SKILL.md files
    FS-->>Disc: SKILL.md content
    Disc->>Disc: Parse YAML frontmatter
    Disc->>Reg: Register skills
    Reg-->>Disc: Skills registered
    Disc-->>CLI: 3 skills discovered

    Log->>User: [INFO] Found 3 skills

    CLI->>MCP: Start stdio listener
    MCP-->>CLI: Listener ready

    Log->>User: [INFO] Server ready (1.2s)

    MCP->>MCP: Wait for requests on stdin
```

**Startup Time**: Target <2 seconds (measured in logs)

---

## Diagram 4: MCP Request Flow (list_tools)

This diagram shows what happens when an MCP client requests the list of available tools.

```mermaid
sequenceDiagram
    participant Client as MCP Client
    participant MCP as MCP Protocol Handler
    participant OAuth as OAuth Validator
    participant Reg as Tool Registry
    participant Log as Logger

    Client->>MCP: JSON-RPC: list_tools<br/>(with OAuth token)

    MCP->>Log: [INFO] Received list_tools request

    MCP->>OAuth: Validate token
    OAuth->>OAuth: Check token with provider
    alt Token Valid
        OAuth-->>MCP: Valid
        MCP->>Reg: Get tool list
        Reg-->>MCP: [{name: "init-ideas", ...}, ...]
        MCP->>MCP: Format JSON-RPC response
        MCP->>Log: [INFO] list_tools complete
        MCP-->>Client: JSON-RPC response<br/>{tools: [...]}
    else Token Invalid
        OAuth-->>MCP: Invalid
        MCP->>Log: [WARNING] Token validation failed
        MCP-->>Client: JSON-RPC error<br/>401 Unauthorized
    end
```

**Response Time**: <50ms (no file I/O, just registry lookup)

---

## Diagram 5: MCP Request Flow (call_tool)

This diagram shows the complete flow for invoking a skill.

```mermaid
sequenceDiagram
    participant Client as MCP Client
    participant MCP as MCP Protocol Handler
    participant OAuth as OAuth Validator
    participant Inv as Skill Invocation Handler
    participant Reg as Tool Registry
    participant FileIO as File I/O Manager
    participant FS as Filesystem
    participant Log as Logger

    Client->>MCP: JSON-RPC: call_tool<br/>{name: "init-ideas"}

    MCP->>Log: [INFO] Skill invoked: init-ideas

    MCP->>OAuth: Validate token
    OAuth-->>MCP: Valid

    MCP->>Inv: Invoke skill "init-ideas"

    Inv->>Reg: Look up skill metadata
    Reg-->>Inv: {file_path: "./skills/init-ideas/SKILL.md"}

    Inv->>FileIO: Read SKILL.md
    FileIO->>FS: Read file
    FS-->>FileIO: File content
    FileIO-->>Inv: SKILL.md content

    Inv->>Inv: Parse YAML frontmatter
    Inv->>Inv: Resolve file paths<br/>(relative → absolute)
    Inv->>Inv: Handle script references

    Inv-->>MCP: Processed SKILL.md content

    MCP->>MCP: Format JSON-RPC response
    MCP->>Log: [INFO] Invocation complete (45ms)
    MCP-->>Client: JSON-RPC response<br/>{content: "..."}
```

**Response Time**: Target <100ms (includes file I/O)

---

## Diagram 6: Skill Discovery Process

This diagram shows how skills are discovered during server startup.

```mermaid
flowchart TD
    Start([Server Startup]) --> GetDir[Get skills directory<br/>from config]
    GetDir --> ScanDir{Scan directory<br/>for folders}

    ScanDir -->|For each folder| CheckSKILL{SKILL.md<br/>file exists?}

    CheckSKILL -->|No| SkipFolder[Log: Skip folder<br/>No SKILL.md]
    CheckSKILL -->|Yes| ReadFile[Read SKILL.md file]

    ReadFile --> ParseYAML{Parse YAML<br/>frontmatter}

    ParseYAML -->|Parse Error| SkipSkill[Log: Skip skill<br/>Invalid YAML]
    ParseYAML -->|Success| ValidateMeta{Validate metadata<br/>name, description?}

    ValidateMeta -->|Missing Fields| SkipSkill
    ValidateMeta -->|Valid| ValidateName{Valid skill name?<br/>alphanumeric + -_}

    ValidateName -->|Invalid| SkipSkill
    ValidateName -->|Valid| CheckDupe{Duplicate<br/>skill name?}

    CheckDupe -->|Yes| SkipSkill2[Log: Skip skill<br/>Duplicate name]
    CheckDupe -->|No| RegisterSkill[Register skill<br/>in Tool Registry]

    SkipFolder --> NextFolder{More<br/>folders?}
    SkipSkill --> NextFolder
    SkipSkill2 --> NextFolder
    RegisterSkill --> NextFolder

    NextFolder -->|Yes| ScanDir
    NextFolder -->|No| LogSummary[Log: Found N skills]
    LogSummary --> End([Discovery Complete])

    style Start fill:#e1f5ff
    style End fill:#e1ffe1
    style RegisterSkill fill:#ffe1e1
    style SkipFolder fill:#f5e1e1
    style SkipSkill fill:#f5e1e1
    style SkipSkill2 fill:#f5e1e1
```

**Discovery Strategy**: Fail-safe (skip invalid skills, continue discovery)

---

## Diagram 7: OAuth Validation Flow

This diagram shows how OAuth 2.1 tokens are validated.

```mermaid
flowchart TD
    Start([MCP Request<br/>with Token]) --> Extract[Extract access token<br/>from request]

    Extract --> CheckFormat{Token format<br/>valid?}

    CheckFormat -->|No| Reject1[Return 401<br/>Invalid token format]
    CheckFormat -->|Yes| CallProvider[Call OAuth provider<br/>token introspection endpoint]

    CallProvider --> Timeout{Response<br/>received?}

    Timeout -->|Timeout 30s| Reject2[Return 503<br/>OAuth provider unreachable]
    Timeout -->|Success| ParseResp{Parse provider<br/>response}

    ParseResp -->|Error| Reject3[Return 401<br/>Token validation failed]
    ParseResp -->|Success| CheckActive{Token active?<br/>per provider}

    CheckActive -->|No| Reject4[Return 401<br/>Token inactive/revoked]
    CheckActive -->|Yes| CheckExp{Token expired?}

    CheckExp -->|Yes| Reject5[Return 401<br/>Token expired]
    CheckExp -->|No| CheckScope{Scope sufficient?<br/>if applicable}

    CheckScope -->|No| Reject6[Return 403<br/>Insufficient scope]
    CheckScope -->|Yes| Allow[Allow request<br/>Continue processing]

    Reject1 --> LogWarn[Log: Token validation failed]
    Reject2 --> LogError[Log: OAuth provider error]
    Reject3 --> LogWarn
    Reject4 --> LogWarn
    Reject5 --> LogWarn
    Reject6 --> LogWarn
    Allow --> LogInfo[Log: Token validated]

    LogWarn --> End([Return Error])
    LogError --> End
    LogInfo --> Continue([Process Request])

    style Start fill:#e1f5ff
    style Allow fill:#e1ffe1
    style Continue fill:#e1ffe1
    style Reject1 fill:#ffe1e1
    style Reject2 fill:#ffe1e1
    style Reject3 fill:#ffe1e1
    style Reject4 fill:#ffe1e1
    style Reject5 fill:#ffe1e1
    style Reject6 fill:#ffe1e1
```

**Security**: Fail-secure (reject on any validation failure)

---

## Diagram 8: File Path Resolution Process

This diagram shows how relative paths in SKILL.md are resolved to absolute paths.

```mermaid
flowchart LR
    Start([SKILL.md Content]) --> ScanContent[Scan content for<br/>file path patterns]

    ScanContent --> FindPaths{File path<br/>found?}

    FindPaths -->|No more paths| Return([Return Processed<br/>Content])
    FindPaths -->|Yes| ExtractPath[Extract path<br/>from content]

    ExtractPath --> CheckAbs{Path already<br/>absolute?}

    CheckAbs -->|Yes| KeepPath[Keep path as-is]
    CheckAbs -->|No| GetRoot[Get project root<br/>from config]

    GetRoot --> JoinPaths[Join project root<br/>+ relative path]
    JoinPaths --> NormPath[Normalize path<br/>handle . and ..]
    NormPath --> ValidatePath{Path safe?<br/>no traversal}

    ValidatePath -->|No| LogWarn[Log warning:<br/>Suspicious path]
    ValidatePath -->|Yes| ReplacePath[Replace in content<br/>relative → absolute]

    KeepPath --> FindPaths
    ReplacePath --> FindPaths
    LogWarn --> KeepPath

    style Start fill:#e1f5ff
    style Return fill:#e1ffe1
    style ReplacePath fill:#ffe1e1
```

**Example**:
- Input: `See 00-init-ideas/README.md`
- Output: `See /Users/maya/projects/dev-swarms/00-init-ideas/README.md`

---

## Diagram Summary

| Diagram | Purpose | Complexity |
|---------|---------|------------|
| 1. High-Level Architecture | Overall system structure | Medium |
| 2. Component Dependencies | Component relationships | Low |
| 3. Startup Sequence | Initialization flow | Medium |
| 4. list_tools Flow | Simple MCP request | Low |
| 5. call_tool Flow | Complex MCP request | High |
| 6. Skill Discovery | Discovery algorithm | High |
| 7. OAuth Validation | Security flow | High |
| 8. Path Resolution | Content processing | Medium |

**Total Diagrams**: 8 comprehensive visualizations

---

Last updated: 2025-12-26
