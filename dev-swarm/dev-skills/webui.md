create a webui server

1. instead of using slash commands `.claude/commands` to handle all the stage agent skills, we use webui for non-tech users
2. using langgraph to handle the logic
3. use AI Agent headless mode to simulate/execute the agent skill
4. support Claude Code, Codex, Gemini CLI, and more AI agents
5. the logic or workflow will be

a. create ideas.md based on ideas-template.md, allow selecting different options
b. create skip files for skipped stage by code, and commit by code
c. start stage 00 or next stage
- create skip files for skipped stage by code, and commit by code
- create readme by ai, and commit by code
- present readme to user for review
- once user update the readme, create other stage files by ai, then commit by code
- present all files to user for review
- once user update/delete any files, then commit by code
- if any stage files need to execute, then AI executes it, and updates the related files after execute action is finished, then commit by code (such as using browser or MCP for remote operations (GitHub, cloud, etc., especially in stage 08-devops and 10-deployment))
- present all files to user for review (include the result file)
- once user update/delete any files, then commit by code
- allow user to start the next stage
d. for 09-sprints stages
design a webUI to simulate backlog, and sprint command (dev, review, test should use code to control the workflow, not rely on AI)
e. ux
- show markdown code edit and preview in html view format for stage files
- each markdown code review and edit
- show any HTML files in each stage in the webui
- user friendly web UI design 
- only consider desktop computer layout
- for any AI execution, the UI should stream the output in real time, and can interrupt the process at any time
f. avoid to use AI, use code in high priority 
- git commit, file check, file create, logic control using code if possible
- extract system prompt from the skill files, to make each AI invocation simple

Notes:
AI means to use AI agent's headless mode
code means to use Python or Next.js frontend code 

frontend use next.js at dev-swarm/js_scripts/webui (root: dev-swarm/js_scripts using pnpm), and backend use python at dev-swarm/py_scripts/webui (root: dev-swarm/py_scripts using uv); 

both using dev-swarm/.env for config