---
name: dev-swarms-mermaid
description: Create Mermaid diagrams and convert them to images. Use when needing to visualize flows, architecture, or data structures.
---

# Mermaid Diagram Generation

This skill provides instructions for creating Mermaid diagrams and converting them to SVG or PNG images using the Mermaid CLI (`mmdc`).

## Prerequisites

- Node.js and pnpm must be installed (refer to `dev-swarms-nodejs` skill if needed).

## Installation

We recommend using `pnpm dlx` to execute the Mermaid CLI without a permanent global installation.

Verify `mmdc` availability:
```bash
pnpm dlx @mermaid-js/mermaid-cli --version
```

## Usage

1.  **Create a Mermaid file:**
    Create a file with `.mmd` extension (e.g., `diagram.mmd`) containing the Mermaid diagram definition.

    **Example `diagram.mmd`:**

    ```mermaid
    flowchart TD
        A[Idea] --> B[AI Agent]
        B --> C[Design]
        C --> D[Code]
        D --> E[Test]
        E --> F[Deploy]
    ```

2.  **Generate Image:**
    Use `pnpm dlx` to run the Mermaid CLI and convert the `.mmd` file to an image (SVG recommended for scalability).

    ```bash
    pnpm dlx @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.svg
    ```

    For PNG output:
    ```bash
    pnpm dlx @mermaid-js/mermaid-cli -i diagram.mmd -o diagram.png
    ```

## Common Diagram Types

*   **Flowchart:** `flowchart TD` (Top-Down) or `LR` (Left-Right)
*   **Sequence Diagram:** `sequenceDiagram`
*   **Class Diagram:** `classDiagram`
*   **State Diagram:** `stateDiagram-v2`
*   **Entity Relationship Diagram:** `erDiagram`
