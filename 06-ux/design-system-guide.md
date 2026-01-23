# Design System Guide

## Visual Direction

The UI should feel like a high-tech control deck: precise, luminous, and data-forward. Emphasis is on contrast, crisp edges, and subtle glow cues that keep focus on stage state and execution output.

## Color Palette

- Background: deep navy (#0B1220)
- Surface: midnight blue (#111B2F)
- Surface alt: slate blue (#18243C)
- Text primary: ice white (#E8F0FF)
- Text secondary: cool gray (#A6B4CC)
- Accent primary: electric blue (#2F6BFF)
- Accent secondary: cyan (#20C6FF)
- Success: neon green (#38D996)
- Warning: amber (#FFB020)
- Error: red-orange (#FF5A3C)
- Focus ring: bright cyan (#6BE8FF)

## Typography

- Display: "Space Grotesk" (for headers)
- Body: "IBM Plex Sans" (for UI text)
- Mono: "JetBrains Mono" (output panel)

## Spacing Scale

- 4, 8, 12, 16, 24, 32, 48, 64

## Components

### Buttons

- Primary: electric blue background, ice white text, bold weight
- Secondary: transparent background with electric blue border
- Destructive: red-orange background
- Disabled: reduced opacity, no hover state

### Inputs

- Surface background, 1px border in slate blue
- Focus ring: bright cyan, 2px offset

### Cards/Panels

- Surface background, 1px border in slate blue
- Subtle glow shadow on hover for interactive cards

### Status Badges

- Not started: cool gray
- In-progress: cyan
- Completed: neon green
- Skipped: amber
- Error: red-orange

### Output Console

- Background: deep navy
- Text: ice white
- Errors: red-orange
- Warnings: amber

## Layout Principles

- Left: stage navigation and status
- Center: content (documents, forms)
- Right: execution output panel
- Keep primary actions anchored and visible
