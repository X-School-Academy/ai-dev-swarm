---
name: dev-swarms-market-research
description: Conduct comprehensive market research and competitive analysis to validate the problem and understand the market landscape. Use when user asks to conduct market research, validate market, analyze competitors, or start Stage 1 after init-ideas.
---

# AI Builder - Market Research

This skill conducts comprehensive market research and competitive analysis to validate the problem defined in init-ideas and understand the market landscape.

## When to Use This Skill

- User asks to conduct "market research"
- User wants to "validate the market" or "analyze competitors"
- User requests to start Stage 1 or the next stage after init-ideas
- User wants to understand market landscape before building

## Prerequisites

This skill requires the **00-init-ideas** stage to be completed first. The market research will build upon the problem statement, target users, and value proposition defined in that stage.

## Your Roles in This Skill

- **Product Manager**: Conduct market research and competitive analysis (5-7 competitors). Create initial product vision and goals. Define key features and prioritization (P0/P1/P2).
- **Data Analyst**: Analyze market size and trends. Research competitor metrics and performance. Identify data requirements for success tracking. Define key metrics to measure.
- **Marketing Manager**: Conduct market opportunity assessment. Identify target audience segments. Estimate customer acquisition costs. Define initial positioning and messaging.

## Role Communication

As an expert in your assigned roles, you must announce your actions before performing them using the following format:

- As a Product Manager, I will create competitive analysis for 5-7 competitors
- As a Data Analyst, I will analyze market trends and define key metrics
- As a Marketing Manager, I will create market opportunity assessment
- As a Product Manager, I will ask user to confirm market research findings

This communication pattern ensures transparency and allows for human-in-the-loop oversight at key decision points.

## Instructions

Follow these steps in order:

### Step 0: Verify Prerequisites and Gather Context

1. **Check if `00-init-ideas/` folder exists (mandatory):**
   - If NOT found: Inform user they need to init ideas first, then STOP
   - If found: Read all files to understand:
     - Problem statement
     - Target users
     - Value proposition
     - Owner requirements

2. **Check if `01-market-research/` folder exists:**
   - If exists: Read all existing files to understand current state
   - If NOT exists: Will create new structure

3. Proceed to Step 1 with gathered context

### Step 1: Create/Update Market Research Structure

1. **Create/Update folder structure:**
   ```
   01-market-research/
   ├── README.md
   ├── market-overview.md
   ├── competitor-analysis.md
   ├── gap-analysis.md
   ├── pricing-research.md
   └── validation-findings.md
   ```

### Step 2: Conduct/Update Market Research Using Web Search

**If files already exist:** Update them based on latest context from 00-init-ideas and user feedback. Improve and refine existing content, add new research findings, and ensure data is current.

**If files don't exist:** Create new files with comprehensive research.

Use web search capabilities to gather information for each document:

**01-market-research/README.md:**
- Stage overview and objectives
- Specify the owners: Product Manager, Data Analyst, Marketing Manager
- Summary of key findings
- Links to all research documents

**market-overview.md:**
- Market size (TAM, SAM, SOM estimates)
- Market trends and growth drivers
- Industry dynamics and forces
- Key market segments
- Growth projections
- Data sources and references

**competitor-analysis.md:**
- Identify 5-7 direct and indirect competitors
- For each competitor document:
  - Product overview
  - Key features and capabilities
  - Target audience
  - Strengths and weaknesses
  - Market position
  - Pricing model (if available)
  - User reviews and feedback (if available)
- Competitive positioning quadrant (if applicable)
- Competitive summary table

**gap-analysis.md:**
- Unmet needs in the current market
- Opportunities competitors are missing
- Pain points not adequately addressed
- Features users want but don't have
- Your product's unique opportunity
- How your value proposition fills the gaps

**pricing-research.md:**
- Competitor pricing models and tiers
- Price ranges in the market
- Value-for-money perception
- Willingness to pay signals from user research
- Pricing strategy recommendations
- Monetization model options

**validation-findings.md:**
- Evidence the problem is real and significant
- User pain points validated through:
  - Online research (forums, reviews, social media)
  - Market data and reports
  - Industry publications
  - User feedback (if available)
- Problem severity and frequency
- User willingness to adopt solutions
- Market readiness assessment

### Step 3: Research Execution Tips

When conducting research:

1. **Use Web Search Tool** extensively for:
   - Market size data and reports
   - Competitor information and reviews
   - Industry trends and analysis
   - User feedback on forums and review sites
   - Pricing information

2. **Document Sources**: Include URLs and references for all data

3. **Be Specific**: Use concrete numbers, dates, and examples

4. **Stay Objective**: Present both positive and negative findings

5. **Focus on Recent Data**: Prioritize information from the last 1-2 years

6. **Cross-Reference**: Validate findings across multiple sources

### Step 4: User Review

1. Ask the user to review the market research documentation in `01-market-research/`
2. Ask if they want to proceed to the next stage (personas and user stories)
3. Make any adjustments based on user feedback

### Step 5: Commit to Git (if user confirms)

1. **If user confirms the research is complete:**
   - Ask if they want to commit to git
2. **If user wants to commit:**
   - Stage all changes in `01-market-research/`
   - Commit with message: "Complete market research and competitive analysis (Stage 1)"

## Expected Output Structure

```
project-root/
├── 00-init-ideas/
│   └── [existing files]
└── 01-market-research/
    ├── README.md (with owners and summary)
    ├── market-overview.md
    ├── competitor-analysis.md
    ├── gap-analysis.md
    ├── pricing-research.md
    └── validation-findings.md
```

## Key Principles

- Conduct thorough research using web search
- Analyze 5-7 competitors minimum for comprehensive view
- Validate that the problem is real and significant
- Identify clear market opportunities and gaps
- Document all sources and references
- Stay objective and data-driven
- Focus on actionable insights

## Deliverables

By the end of this stage, you should have:
- Comprehensive market overview with size estimates
- Detailed competitive analysis of 5-7 competitors
- Clear gap analysis showing opportunities
- Pricing research and monetization insights
- Evidence validating the problem is real and worth solving
