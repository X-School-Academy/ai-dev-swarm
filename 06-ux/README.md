# Stage 06 - UX Design

## Stage Goal

This stage defines the UX foundation for Dev Swarm WebUI, covering the design system, layout intent, user flows, responsive guidance, and accessibility requirements. The goal is to translate the PRD into a consistent, testable interface plan that matches the MVP scope and supports non-technical users.

UX design is critical here because the product removes CLI friction and replaces it with visual workflows. The interface must be clear, predictable, and low-friction for primary personas while still efficient for technical users. This stage will produce design references that guide implementation and reduce rework in Stage 07 (Architecture) and Stage 08 (Tech Specs).

Deliverables will capture visual direction, layout descriptions, navigation flows, and accessibility constraints for the MVP.

## File Selection

### design-system-guide.md

- **What:** Color palette, typography, spacing scale, and component styles.
- **Why:** A consistent design system is needed to reduce cognitive load and support fast implementation.
- **Include:** Core colors, typography choices, spacing tokens, buttons, form controls, and status indicators.

### design-ui-preview.html

- **What:** A simple HTML/CSS page demonstrating the design system.
- **Why:** Provides a concrete visual reference before creating full mockups.
- **Include:** Buttons, inputs, cards, stage badges, and output panel styling.

### wireframe_descriptions.md

- **What:** Textual layout descriptions for key screens.
- **Why:** Ensures layout intent is clear and aligned with MVP workflows before mockups.
- **Include:** Dashboard, stage detail view, document viewer/editor, and execution console.

### user-flows/

- **What:** User navigation flows for primary tasks.
- **Why:** Confirms that workflows match the PRD and minimize friction.
- **Include:** Run stage, edit document, toggle skip, and sync project flows.

### responsive-design.md

- **What:** Responsive behavior across desktop/laptop sizes.
- **Why:** The UI must scale from 1280px to 2560px without losing clarity.
- **Include:** Layout breakpoints, column behavior, and content density rules.

### accessibility.md

- **What:** Accessibility requirements aligned to WCAG 2.1 AA.
- **Why:** Non-technical users need clear, readable interfaces with keyboard access.
- **Include:** Contrast targets, focus states, keyboard navigation, and ARIA guidance.

## Approval Request

## Stage Files Created

- `design-system-guide.md`
- `design-ui-preview.html`
- `design-ui-mockup/`
- `wireframe_descriptions.md`
- `responsive-design.md`
- `accessibility.md`
- `user-flows/`

## Summary of UX Direction

- Control-room layout prioritizes stage status, documents, and output visibility.
- Visual system uses a high-tech blue palette with electric accents and high-contrast typography.
- Responsive behavior keeps output accessible via toggle at narrower widths.

## Stage Status

Stage 06 (UX Design) is complete. Ready to proceed to Stage 07 (Architecture).
