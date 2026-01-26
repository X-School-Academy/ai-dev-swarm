Please check all the design docs at 10-sprints/

the project has finised (but some docs not updated, not clear if some items have been checked), we need to update agent skills below to improve the system

1. dev-swarm-stage-sprints

for sprint and backlog docs, we shoud use checkbox list for any Checklist, Acceptance Criteria, test plan etc, we need to use checkbox style list, which need QA to test or verify

2. dev-swarm-code-test

for backlog docs:
test and check all the checkbox item, then mark it as [x] - pass, or [-] no test need
once test a backlog, mark the backlog status to `Done`

once finish a backlog test, always check if have left backlogs, if no backlogs left, then perform stage test in the sprint doc

if all the backlogs finished, need to test/check/verify any checkbox item in the sprint doc, then mark it as [x] - pass, or [-] no test need
once a sprint finished, mark the sprint status to `Completed`


For test, the recommended test methods are (with priority)

1. using curl command (high priority method)
2. using `playwright-browser-*` agent skill for webui (must use browser to test for any web UI related item)
3. write test code
4. write unit test


