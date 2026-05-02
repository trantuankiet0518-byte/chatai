# Task Scopes

Use this folder when you want multiple agents to work in parallel with low overlap.

Pattern:

- one task file per workstream
- one owner per task file
- one clear scope per task file

Recommended filename:

- `YYYY-MM-DD-short-scope.md`

Minimum content:

- owner
- goal
- scope
- files allowed
- files avoid
- done definition
- handoff notes

Rules:

- do not assign overlapping write scopes to multiple agents
- if a scope changes, update the task file before more edits happen
- copy only the task file and `AI_HARNESS.md` into a new agent prompt when possible
