# MVP Success Criteria

## Primary Success Metric

**A non-technical user can complete a full dev-swarm workflow (ideas → stage execution) without using the terminal.**

This is the core hypothesis. If the MVP achieves this, it validates the product concept.

---

## Functional Success Criteria

### SC1: Stage Visibility
**Criteria:** User can see all 12 stages (00-11) with accurate status indicators.
**Validation:** Open UI, verify all stages display with correct states (not started, completed, skipped).

### SC2: Document Access
**Criteria:** User can view any markdown document in rendered format without leaving the UI.
**Validation:** Navigate to a stage, click on a document, verify it renders correctly.

### SC3: Document Editing
**Criteria:** User can edit a markdown document and save changes.
**Validation:** Open document, make edit, save, verify change persists in file system.

### SC4: Stage Execution
**Criteria:** User can start a stage with one click and see AI output in real-time.
**Validation:** Click "Run Stage," verify AI executes, output streams to UI.

### SC5: Execution Control
**Criteria:** User can stop AI execution mid-process.
**Validation:** Start execution, click "Stop," verify process terminates cleanly.

### SC6: Project Sync
**Criteria:** UI reflects file system changes after manual sync.
**Validation:** Make change via terminal, click "Sync," verify UI updates.

### SC7: Skip Management
**Criteria:** User can skip/unskip stages via UI.
**Validation:** Toggle skip on a stage, verify SKIP.md created/removed.

---

## User Experience Success Criteria

### UX1: No CLI Required
**Criteria:** Primary personas (Sarah, Marcus) can complete their scenarios without terminal.
**Validation:** Walk through Sarah's scenario (ideas → stage review) entirely in UI.

### UX2: Self-Service Recovery
**Criteria:** User can recover from errors without developer help.
**Validation:** Trigger an error, verify user can understand and retry.

### UX3: Intuitive Navigation
**Criteria:** User can find desired features within 3 clicks from dashboard.
**Validation:** Time-to-task for common operations (view document, run stage).

---

## Technical Success Criteria

### T1: Streaming Performance
**Criteria:** AI output streams with <500ms latency from generation to display.
**Validation:** Measure latency during execution; no perceptible lag.

### T2: Clean Interruption
**Criteria:** Stopping execution terminates process without orphaned processes or data corruption.
**Validation:** Stop execution multiple times, verify clean state.

### T3: File System Accuracy
**Criteria:** UI state matches file system state after sync.
**Validation:** Compare UI indicators with actual folder contents.

### T4: Responsive Layout
**Criteria:** UI works on desktop/laptop screens from 1280px to 2560px width.
**Validation:** Test on various screen sizes; no layout breakage.

---

## What Success Is NOT

- **Speed of AI execution** - The UI doesn't make AI faster
- **Quality of AI output** - The UI doesn't change AI capabilities
- **Adoption metrics** - Internal tool; no user acquisition targets
- **Feature completeness** - MVP is intentionally minimal

---

## MVP Validation Plan

1. **Self-test:** Developer walks through primary persona scenarios
2. **User test:** Non-technical user (if available) attempts workflow without guidance
3. **Edge cases:** Test stop/restart, error states, file system sync

---

## Success Threshold

**MVP is successful if:**
- All 7 Functional criteria pass
- At least 2 of 3 UX criteria pass
- All 4 Technical criteria pass

**MVP needs iteration if:**
- Any Functional criterion fails
- UX1 (No CLI Required) fails
- Any Technical criterion fails
