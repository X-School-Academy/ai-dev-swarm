# Source Code Structure Guide

This guide defines how to document the `src/` folder structure in `07-tech-specs/source-code-structure.md`.

## Goal

Give AI developers a consistent, searchable map for where code lives and how to add new code in `src/`.

## Required Sections

When creating `07-tech-specs/source-code-structure.md`, include:

1. **Overview**
   - Purpose of the chosen structure
   - How it supports scalability and feature-driven development

2. **Chosen Structure (One Primary Strategy)**
   - Pick a primary organization strategy (layer-based, domain-based, frontend/backend split, or other)
   - Provide a concrete `src/` tree example
   - Explain the rationale for the chosen strategy

   Common strategies you can choose from:

   **Option A: Layer-Based (Traditional):**
   ```
   src/
   ├── controllers/    # HTTP request handlers
   ├── services/       # Business logic
   ├── models/         # Data models
   ├── utils/          # Utilities
   └── tests/          # Tests
   ```

   **Option B: Modular/Domain-Based:**
   ```
   src/
   ├── auth/           # Authentication module
   ├── users/          # User management module
   ├── payments/       # Payment module
   ├── shared/         # Shared code
   └── tests/          # Integration tests
   ```

   **Option C: Monorepo:**
   ```
   src/
   ├── frontend/
   │   ├── components/
   │   ├── pages/
   │   └── shared/
   ├── backend/
   │   ├── api/
   │   ├── services/
   │   └── database/
   └── macro services/
       ├── cpu video processor/
       └── gpu video generator/
   ```

   **Option D: Simple Flat Structure (Small Projects):**
   ```
   src/
   ├── main.py
   ├── utils.py
   ├── config.py
   └── tests/
   ```

3. **Naming Conventions**
   - File naming rules (case, separators)
   - Test naming rules (e.g., `.test.*`, `.spec.*`, `test_*`)
   - Type/contract naming rules (if applicable)

4. **Placement Rules**
   - Where new feature code should live
   - Where shared utilities should live
   - Where API contracts, schemas, or DTOs should live
   - Where UI components, pages, and styles should live (if frontend exists)
   - Where backend services, controllers, and data access should live (if backend exists)

5. **Tests Location**
   - Co-located vs separate test directories
   - Exceptions (e.g., end-to-end tests)

6. **Entry Points**
   - Main entry files (e.g., `src/main.ts`, `src/index.ts`, `src/server.ts`)
   - Where routing or application bootstrapping happens

7. **Examples**
   - At least two concrete examples showing where to add new files

## Constraints

- Keep the structure as small as possible while meeting requirements.
- Do not invent frameworks or tooling; align to the approved tech stack.
- Ensure the structure supports the feature-driven development pattern.
- Update `src/README.md` if the structure changes.

## Checklist

- [ ] Structure is clearly described with an example tree
- [ ] Naming conventions are explicit
- [ ] Placement rules cover common additions
- [ ] Test file locations are defined
- [ ] Entry points are documented
- [ ] Examples show where to add new files
