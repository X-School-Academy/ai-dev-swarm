Please update the agent skills below:

1. dev-swarm/skills/dev-swarm-sprints
2. dev-swarm/skills/dev-swarm-code-development
3. dev-swarm/skills/dev-swarm-code-test
4. dev-swarm/skills/dev-swarm-code-review
5. dev-swarm/skills/dev-swarm-tech-specs


When creating sprints and backlogs, the project manager should follow the rules defined in `dev-swarm/docs/sprint-backlog-guidelines.md` (include this file in the skill.md file as a required reference, so we can update the rules at any time).

Update dev-swarm/skills/dev-swarm-sprints/templates/* to make them clear and meet these requirements.

The development steps for each backlog are:

1. Developer writes code
2. Code review is performed
3. Testing is conducted

Each step must update the related backlog.md and the sprint README (`09-sprints/[sprint-name]/README.md`) with status + a short log entry.


Backlog.md file name format: [backlog-type]-[feature-name]-<sub-feature>.md

Ideally, each backlog is for a feature, but for large features that are hard to split, we can use sub-features. However, in `features/`, we manage all sub-features as one feature.

Since we will use `feature-name` to create the AI knowledge base in `features/`,

each backlog.md should contain the related `feature-name` in a required **Feature Name** metadata field, so the AI developer can quickly identify the code logic by referencing `features/`. The **Feature Name** value must match the `feature-name` segment in the file name. In this way, the AI developer can work on a large project without needing to read all the code and docs at once.

Here are the steps for each role:

### Developer
1. Read backlog.md
2. Find the related `feature-name`
3. Read `features/features-index.md` from `features/` and find the feature file
4. Read other files related to this feature under contracts/flows/impl with the same `feature-name` file name
5. Check code in `src/` by referencing `features/impl/feature-name.md`
6. Write the code or review the code
7. Update the `backlog.md` file
8. Update the sprint README with a Development log entry

### Reviewer
1. Read backlog.md
2. Find the related `feature-name`
3. Read `features/features-index.md` from `features/` and find the feature file
4. Read other files related to this feature under contracts/flows/impl with the same `feature-name` file name
5. Check code in `src/` by referencing `features/impl/feature-name.md`
6. Review the code (do not write code)
7. Update the `backlog.md` file
8. Update the sprint README with a Code Review log entry

### Tester
1. Read backlog.md for testing instructions
2. Find the related `feature-name`
3. Read `features/features-index.md` from `features/` and find the feature file
4. Read other files related to this feature under contracts/flows/impl with the same `feature-name` file name
5. Check code in `src/` by referencing `features/impl/feature-name.md`
6. Execute the test plan (write tests if required by the backlog; otherwise run manual tests)
7. Update the `backlog.md` file with a test result summary
8. Update the sprint README with a Testing log entry

**We call this the feature-driven development pattern, where `feature-name` serves as the index for the whole project. AI developers/project managers use `feature-name` to manage the entire development lifecycle.**

The knowledge base `features/` is managed by developers and used by testers and reviewers. The project manager does not use or check the knowledge base `features/`; they use `feature-name` to connect each backlog to the knowledge base `features/`.

The knowledge base `features/` serves as the AI developer's memory. The Project Manager creates features/backlogs from a user level or non-technical level and doesn't need to care about how the whole structure of the project's code is organized in the codebase.

Add a new file `source-code-structure.md` to define the source code structure under the `src/` folder in the file `dev-swarm/docs/repository-structure.md`.

Update `dev-swarm/skills/dev-swarm-tech-specs` to include this file.

AI developers should follow `source-code-structure.md` to create and manage code in the `src/` folder.


