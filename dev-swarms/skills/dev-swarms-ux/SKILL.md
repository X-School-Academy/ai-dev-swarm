---
name: dev-swarms-ux
description: Design user experience including flows, interactions, mockups, and accessibility. Use when user asks to design UX, create mockups, or start Stage 5 after PRD.
---

# AI Builder - UX Design

This skill creates/updates the UX design documentation including user flows, interaction specifications, edge cases, accessibility requirements, and most importantly, **interactive HTML/CSS/JS mockups** for UI-based applications.

## When to Use This Skill

- User asks to "design UX" or "create mockups"
- User requests to start Stage 5 or the next stage after PRD
- User wants to visualize the product design
- User wants to create interactive prototypes
- User needs to present product design to non-technical stakeholders

## Prerequisites

This skill requires **04-prd** to be completed. The UX design will translate functional requirements into visual designs and user flows.

## Your Roles in This Skill

- **UX Designer**: Lead UX design with user flows, interaction specs, and accessibility. Create user journey maps and ensure intuitive navigation. Design information architecture and interaction patterns. Ensure WCAG 2.1 accessibility compliance.
- **UI Designer**: Create visual mockups using static HTML/CSS/JS. Define theme, color palette, typography, and spacing. Design components and layouts. Create interactive prototypes that showcase the product to non-technical stakeholders.
- **Content Moderator**: Design user input moderation workflows in UI. Define content submission and review interfaces. Plan flagging, reporting, and appeals flows. Design moderation queue interfaces. Ensure community guidelines are presented clearly in UI. Plan user communication flows for moderation actions.
- **Product Manager**: Ensure UX aligns with requirements and user stories. Review flows against acceptance criteria. Validate that design solves user problems effectively.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a UX Designer, I will create user flow diagrams for all critical journeys from the PRD
- As a UI Designer, I will design interactive HTML/CSS/JS mockups showcasing the theme and user flows
- As a UX Designer, I will define interaction specifications for all components with state transitions
- As a Content Moderator, I will design moderation workflows and reporting interfaces in the UI
- As a UX Designer, I will ensure WCAG 2.1 Level AA accessibility compliance across all designs
- As a Product Manager, I will ask user to confirm UX design and mockups before proceeding to architecture

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 0: Verify Prerequisites and Gather Context

1. **Check if `04-prd/` folder exists (mandatory):**
   - If NOT found: Inform user they need to create PRD first, then STOP
   - If found: Read all files to understand:
     - Functional requirements
     - User journeys
     - Product goals
     - Non-functional requirements (especially usability and accessibility)

2. **Check if `02-personas/` folder exists (mandatory):**
   - If NOT found: Inform user they need personas first, then STOP
   - If found: Read to understand:
     - User personas and their needs
     - User pain points
     - User preferences and behaviors

3. **Check if `03-mvp/` folder exists (recommended):**
   - If found: Read to understand:
     - MVP scope
     - Core features to prioritize in design

4. **Check if `05-ux/` folder exists:**
   - If exists: Read all existing files to understand current UX design state
   - If NOT exists: Will create new structure

5. Proceed to Step 1 with gathered context

### Step 1: Create/Update UX Structure

1. **Create/Update folder structure:**
   ```
   05-ux/
   ├── README.md
   ├── user-flows.md
   ├── interaction-specs.md
   ├── edge-cases.md
   ├── accessibility.md
   └── mockups/                    # For UI-based applications
       ├── index.html              # Main mockup entry point
       ├── styles.css              # Theme and styling
       ├── script.js               # Interactive behaviors (optional)
       └── assets/                 # Images, icons, fonts (if needed)
   ```

   **Note**: For UI-based web/mobile/desktop apps, the `mockups/` folder with static HTML/CSS/JS files is **CRITICAL** as it showcases the product to non-technical stakeholders.

### Step 2: Create/Update UX Documentation

**If files already exist:** Update them based on latest context from PRD and user feedback. Refine flows, update mockups, and ensure consistency.

**If files don't exist:** Create new comprehensive UX design documents.

**05-ux/README.md:**
- Stage overview and objectives
- Specify the owners: UX Designer (lead), UI Designer, Product Manager
- Summary of UX approach and design philosophy
- Links to all UX documentation files
- Link to mockups (if applicable)
- How to view/interact with mockups

**user-flows.md:**

Define user flows with diagrams and descriptions:

1. **Critical User Flows:**

   For each critical flow from the PRD:

   **Format:**
   ```
   ### Flow: [Flow Name]

   **Related Requirements:** [FR-XXX, FR-YYY from PRD]
   **User Persona:** [Primary/Secondary persona]
   **Goal:** What the user wants to accomplish

   **Flow Steps:**
   1. **Entry Point:** Where does the user start?
      - Screen/page: [Name]
      - Trigger: [What initiates this flow]

   2. **Step 1:** [Action/Screen]
      - User action: [What user does]
      - System response: [What happens]
      - Next state: [Where user goes]

   3. **Step 2:** [Action/Screen]
      - User action: [What user does]
      - System response: [What happens]
      - Next state: [Where user goes]

   ... continue for all steps ...

   N. **Success State:** [End goal achieved]
      - Screen/page: [Name]
      - Confirmation: [How user knows they succeeded]

   **Alternative Paths:**
   - If [condition]: User goes to [alternative step]
   - If [error condition]: Show [error state]

   **Flow Diagram:** (Use Mermaid or text-based diagram)
   ```

   Use Mermaid diagrams when possible:
   ```mermaid
   graph TD
       A[Entry Point] --> B[Step 1]
       B --> C{Decision?}
       C -->|Yes| D[Step 2a]
       C -->|No| E[Step 2b]
       D --> F[Success]
       E --> F
   ```

2. **User Flow Categories:**
   - **Onboarding Flow**: First-time user experience
   - **Authentication Flows**: Login, signup, password reset
   - **Core Feature Flows**: Main user journeys for key features
   - **Settings & Profile Flows**: User account management
   - **Error & Recovery Flows**: What happens when things go wrong

**interaction-specs.md:**

Define interaction rules, states, and transitions:

1. **Component States:**

   For each interactive component:
   ```
   ### Component: [Component Name]

   **States:**
   - **Default**: Normal state appearance and behavior
   - **Hover**: When user hovers (desktop only)
   - **Focus**: When component has keyboard focus
   - **Active/Pressed**: When user clicks/taps
   - **Disabled**: When component is not interactive
   - **Loading**: When action is in progress
   - **Error**: When validation fails or error occurs
   - **Success**: When action completes successfully

   **Transitions:**
   - Default → Hover: [How it changes]
   - Hover → Active: [How it changes]
   - Active → Loading: [How it changes]
   - Loading → Success/Error: [How it changes]

   **Interaction Rules:**
   - Click/tap behavior: [What happens]
   - Keyboard interaction: [Enter, Space, Arrow keys, etc.]
   - Screen reader behavior: [What is announced]
   ```

2. **Interaction Patterns:**
   - **Buttons**: Primary, secondary, tertiary, icon buttons
   - **Forms**: Input fields, dropdowns, checkboxes, radio buttons
   - **Navigation**: Menus, tabs, breadcrumbs
   - **Feedback**: Toast notifications, alerts, modals, confirmations
   - **Loading States**: Spinners, skeleton screens, progress indicators
   - **Animations & Transitions**: Durations, easing functions

3. **Touch & Gesture Support (if mobile/tablet):**
   - Tap targets (minimum 44x44px)
   - Swipe gestures
   - Pull to refresh
   - Long press actions

**edge-cases.md:**

Define edge cases and expected outcomes:

1. **Data Edge Cases:**
   ```
   ### Edge Case: [Scenario Name]

   **Scenario:** What is the unusual condition?

   **Examples:**
   - Empty state: No data available
   - Very long text: Name with 200 characters
   - Special characters: Unicode, emojis, symbols
   - Large numbers: Billions, scientific notation
   - Zero values: Empty cart, $0.00 balance

   **Expected Behavior:**
   - What should the UI show?
   - How should the system handle it?
   - What message should the user see?

   **Mockup Reference:** [Link to mockup showing this state]
   ```

2. **Edge Case Categories:**
   - **Empty States**: No content, no results, no data
   - **Extreme Values**: Very large, very small, zero, negative
   - **Boundary Conditions**: Max length, min length, limits reached
   - **Unusual Input**: Special characters, different languages, emojis
   - **Network Issues**: Offline, slow connection, timeout
   - **Permission Issues**: Access denied, unauthorized
   - **Concurrent Actions**: Multiple users, race conditions

3. **Error Scenarios:**
   - **Validation Errors**: Invalid input, missing required fields
   - **System Errors**: Server errors, database errors, API failures
   - **Business Logic Errors**: Insufficient balance, item out of stock
   - **User Errors**: Wrong password, duplicate email, expired session

**accessibility.md:**

Define accessibility requirements and checklist:

1. **Accessibility Standards:**
   - **Target Compliance**: WCAG 2.1 Level AA (or higher)
   - **Supported Assistive Technologies**:
     - Screen readers (NVDA, JAWS, VoiceOver)
     - Keyboard navigation
     - Voice control
     - Screen magnification

2. **WCAG 2.1 Checklist:**

   **Perceivable:**
   - [ ] All images have alt text
   - [ ] Color is not the only means of conveying information
   - [ ] Text has sufficient contrast (4.5:1 for normal text, 3:1 for large text)
   - [ ] Content is responsive and adapts to different screen sizes
   - [ ] Videos have captions and transcripts
   - [ ] Audio content has transcripts

   **Operable:**
   - [ ] All functionality available via keyboard
   - [ ] No keyboard traps
   - [ ] Skip navigation links provided
   - [ ] Focus order is logical
   - [ ] Focus indicator is visible
   - [ ] Interactive elements have minimum 44x44px touch target
   - [ ] No content flashes more than 3 times per second

   **Understandable:**
   - [ ] Language of page is declared (lang attribute)
   - [ ] Navigation is consistent across pages
   - [ ] Forms have clear labels and instructions
   - [ ] Error messages are clear and helpful
   - [ ] Form validation provides specific feedback

   **Robust:**
   - [ ] Valid HTML markup
   - [ ] ARIA labels used correctly
   - [ ] Compatible with current and future assistive technologies

3. **Keyboard Navigation:**
   - Tab order and focus management
   - Keyboard shortcuts (if any)
   - Escape key behavior (close modals, cancel actions)
   - Enter/Space key behavior (activate buttons, submit forms)

4. **Screen Reader Support:**
   - ARIA labels and roles
   - Live regions for dynamic content
   - Meaningful link text (not "click here")
   - Form field labels and error associations

**mockups/ (CRITICAL for UI-based applications):**

Create interactive HTML/CSS/JS mockups to showcase the product:

**Purpose of Mockups:**
- **Visualize the product** for non-technical stakeholders
- **Define theme, style, and branding** (colors, fonts, spacing)
- **Showcase basic user flows** interactively
- **Serve as a project proposal** to help customers understand what they'll get
- **Provide a reference** for developers during implementation

**mockups/index.html:**

Create a static HTML mockup with:

1. **Structure:**
   - Proper HTML5 document structure
   - Navigation section for site navigation
   - Main content area with multiple screen sections
   - Footer section
   - Link to styles.css and script.js

2. **What to Include:**
   - **Multiple key screens**: Home, main features, settings, profile
   - **Interactive navigation**: Click to switch between screens
   - **Component examples**: Buttons, forms, cards, modals
   - **State examples**: Default, hover, active, disabled, loading, error
   - **Responsive design**: Works on desktop, tablet, mobile
   - **Real content examples**: Use realistic text and data (not Lorem Ipsum if possible)

**mockups/styles.css:**

Define the complete design system:

1. **CSS Variables for Theme:**
   - Define color palette (primary, secondary, accent, background, surface, text, border, semantic colors)
   - Define typography (font families, font sizes, font weights, line heights)
   - Define spacing system (xs, sm, md, lg, xl, 2xl)
   - Define border radius values (sm, md, lg, full)
   - Define shadow values (sm, md, lg)
   - Define transition timing (fast, base, slow)

2. **Component Styles:**
   - Buttons (primary, secondary, outline, ghost)
   - Forms (inputs, selects, checkboxes, radio buttons)
   - Cards and containers
   - Navigation (navbar, sidebar, tabs)
   - Modals and dialogs
   - Alerts and notifications
   - Tables and lists
   - Loading states and skeletons

3. **Responsive Breakpoints:**
   - Define breakpoints for mobile, tablet, desktop, and wide screens
   - Implement responsive behavior with media queries

**mockups/script.js:**

Add interactivity to the mockup:

1. **Screen Navigation:**
   - Implement navigation function to switch between screens/pages
   - Hide inactive screens and show active screen
   - Handle navigation events (clicks on nav links)

2. **Interactive Elements:**
   - Button click handlers
   - Form interactions (show validation states)
   - Modal open/close
   - Dropdown menus
   - Tab switching
   - Accordion expand/collapse
   - Toast notifications

3. **State Demonstrations:**
   - Show loading states
   - Show error states
   - Show success states
   - Show empty states

**mockups/assets/:**

Include any visual assets:
- Logo (SVG preferred)
- Icons (use icon libraries like Font Awesome or create custom SVGs)
- Sample images (if needed for mockup)
- Custom fonts (if not using web fonts)

### Step 3: Ensure Alignment

Make sure UX design aligns with:
- Functional requirements from 04-prd/functional-requirements.md
- User journeys from 04-prd/prd.md
- User personas from 02-personas/
- MVP scope from 03-mvp/ (prioritize core features in mockups)
- Accessibility requirements from 04-prd/non-functional-requirements.md

Verify that:
- All critical user flows are documented
- All edge cases are considered
- Accessibility checklist is complete
- Mockups showcase the product effectively (for UI-based apps)
- Interactions are clearly specified

### Step 4: User Review

1. **Present the UX design to the user:**
   - Show the interactive mockups (if UI-based app)
   - Walk through critical user flows
   - Demonstrate interaction patterns
   - Explain accessibility considerations

2. **Highlight key insights:**
   - Number of user flows documented
   - Key interaction patterns defined
   - Accessibility compliance level (WCAG 2.1 Level AA)
   - Mockup screens created (if applicable)
   - Theme and design system defined

3. **For mockups specifically:**
   - Open `mockups/index.html` in browser
   - Demonstrate navigation between screens
   - Show responsive behavior (resize browser)
   - Point out theme consistency (colors, fonts, spacing)
   - Explain how this represents the final product

4. **Ask questions:**
   - Does the design align with their vision?
   - Are there any flows missing?
   - Any concerns about accessibility?
   - Should any mockup screens be added/changed?
   - Ready to proceed to next stage (architecture)?

5. Make adjustments based on user feedback

### Step 5: Commit to Git (if user confirms)

1. **If user confirms UX design is complete:**
   - Ask if they want to commit to git
2. **If user wants to commit:**
   - Stage all changes in `05-ux/`
   - Commit with message: "Design UX flows, interactions, and mockups (Stage 5)"

## Expected Project Structure

```
project-root/
├── 00-init-ideas/
│   └── [existing files]
├── 01-market-research/ (optional)
│   └── [existing files if present]
├── 02-personas/
│   └── [existing files]
├── 03-mvp/
│   └── [existing files]
├── 04-prd/
│   └── [existing files]
└── 05-ux/
    ├── README.md (with owners and summary)
    ├── user-flows.md (flow diagrams with Mermaid)
    ├── interaction-specs.md (states, transitions, rules)
    ├── edge-cases.md (edge cases + expected outcomes)
    ├── accessibility.md (WCAG 2.1 checklist)
    └── mockups/ (CRITICAL for UI apps)
        ├── index.html (interactive mockup)
        ├── styles.css (complete design system)
        ├── script.js (interactivity)
        └── assets/ (images, icons, fonts)
```

## Key UX Design Principles

1. **User-Centered**: Design for user needs, not technical constraints
2. **Consistent**: Use consistent patterns, components, and interactions
3. **Accessible**: WCAG 2.1 Level AA compliance minimum
4. **Responsive**: Works on all devices and screen sizes
5. **Clear**: Intuitive navigation and clear feedback
6. **Forgiving**: Handle errors gracefully with helpful messages
7. **Efficient**: Minimize steps to complete tasks
8. **Delightful**: Pleasant to use, not just functional

## Mockup Best Practices (UI-Based Applications)

1. **Use realistic content**: Avoid Lorem Ipsum, use actual product-like content
2. **Show multiple states**: Default, hover, active, loading, error, success, empty
3. **Make it interactive**: Allow clicking through key flows
4. **Keep it simple**: Don't over-engineer, focus on showcasing design
5. **Use design system**: Define colors, fonts, spacing in CSS variables
6. **Show responsiveness**: Test on mobile, tablet, desktop sizes
7. **Include branding**: Logo, color palette, typography that represent the brand
8. **Document theme**: Comment the CSS to explain design decisions

## Why Mockups Matter

For UI-based applications, mockups serve multiple purposes:
- **Stakeholder Buy-in**: Non-technical customers can see and interact with what they're getting
- **Design Validation**: Test the design before writing production code
- **Developer Reference**: Provides exact spacing, colors, fonts for implementation
- **User Testing**: Can be used to test flows with real users
- **Proposal Tool**: Helps sell the product vision to investors or clients
- **Alignment**: Ensures everyone has the same visual understanding

## Deliverables

By the end of this stage, you should have:
- Complete user flow documentation with diagrams (5-15 critical flows)
- Detailed interaction specifications for all components
- Edge case documentation with expected behaviors
- Accessibility checklist and compliance plan (WCAG 2.1 Level AA)
- **Interactive HTML/CSS/JS mockups** showcasing theme, style, and user flows (for UI apps)
- Complete design system defined in CSS
- Foundation for architecture design (next stage)
- Visual reference for implementation
