Almost all roles will be involved in dev-swarm/skills/dev-swarm-init-ideas, which are defined in dev-swarm/docs/dev-swarm-roles.md

The roles will:
1. Make a judgment on whether a particular stage is needed to build a project for the given idea
2. Write the readme file in each stage as an expert, the readme is a design requirement file for that stage (e.g., Product Manager cannot write requirements for DevOps, etc.)
3. Define the docs list that needs to be designed in that stage and write in readme file of that stage, as specified in dev-swarm/docs/repository-structure.md
4. add a file `sprint-feature-proposal.md` name under `09-sprints/` after readme in file dev-swarm/docs/repository-structure.md
5. The `sprint-feature-proposal.md` will be created in stage `09-sprints/` and should ask the user to review and confirm the content with 'readme file' before creating each sprint and the backlog files
6. For each sprint, create a readme file in the sprint folder first, ask the user to review and confirm before creating all the backlog files for this sprint

`sprint-feature-proposal.md` template can be:

```
# Project Name

## Description

## Sprint Feature Proposal

### Sprint Name 1
  * feature name 1
  * feature name 2
### Sprint Name 2
  * feature name 1
  * feature name 2
```

#5, #6 related to `dev-swarm/skills/dev-swarm-project-management`

**Do not include dev-swarm/docs/repository-structure.md and dev-swarm/docs/dev-swarm-roles.md in any skills, except for dev-swarm/skills/dev-swarm-init-ideas, as they are two big files, we need to extract related roles and file strucutres information to the related skill file as we current do**