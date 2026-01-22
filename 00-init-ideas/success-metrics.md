# Success Metrics

## Primary Goal: Accessibility

**Metric: Non-technical user can complete a full workflow without CLI**

A user with no terminal experience should be able to:
- Start a new project from ideas
- Progress through all active stages
- Review and approve AI-generated content
- Complete sprint execution

**How to validate:**
- User testing with non-developer participants
- Task completion without asking for CLI help
- User can explain what each stage does after using the UI

## Secondary Goal: Workflow Reliability

**Metric: Code-controlled workflows produce consistent results**

The same inputs should produce the same workflow behavior:
- Stage skip logic determined by SKIP.md presence (not AI interpretation)
- Step sequence executed in correct order
- Appropriate prompts sent to AI agents

**How to validate:**
- Run the same workflow multiple times
- Compare outputs for consistency
- Verify no steps are skipped or reordered

## Usability Metrics

### Reduced Time-to-Start
- User can begin working within 2 minutes of opening the UI
- No documentation reading required for basic operations

### Error Recovery
- User can identify and recover from AI errors without developer help
- Clear indication of what went wrong and what to do next

### Context Retention
- UI shows project state accurately after page reload
- User doesn't lose track of progress

## Adoption Indicators

### Usage Patterns
- Users choose web UI over CLI for stage management
- Users complete more stages per session compared to CLI

### User Feedback
- Positive sentiment about ease of use
- Requests for additional features (indicates engagement)

## What's NOT a Success Metric

- **Speed of AI execution**: The UI doesn't make AI faster
- **Quality of AI output**: The UI doesn't change AI capabilities
- **Mobile usage**: Desktop-only, no mobile metrics needed
- **Multi-user collaboration**: Single-user tool initially
