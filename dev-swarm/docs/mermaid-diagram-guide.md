# Mermaid Diagram Guide

This guide defines how to create Mermaid diagrams across stages.
Use it as the standard for diagram structure and rendering.

## Purpose

- Keep diagrams lightweight but consistent across stages.
- Avoid over-engineering by matching effort to project scale.
- Ensure diagram outputs are human-reviewable and AI-readable.

## Where Diagrams Live

Each stage folder may include a `diagram/` directory:

```
diagram/
  README.md
  index.html
  file1.md
  file1.html
  file2.md
  file3.html
  images/
    mermaid1.png
    mermaid2.png
```

Notes:

- AI agents read only `.md` files.
- Humans review `.html` and `.png` outputs.

## Creation Rules

- All Mermaid source lives in markdown files in `diagram/`.
- Use agent skill `dev-swarm-mermaid` to render:
  - `images/*.png` for the html file for review
  - `.html` for human-in-the-loop feedback
- If Mermaid code fails to render, fix the code before re-running.
