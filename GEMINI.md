# Gemini Bootstrap

Read `AI_HARNESS.md` first.

Then run:

```bash
node scripts/ai-context.mjs
```

Use `.ai/current-focus.md` and `.ai/handoff.md` for session continuity.

## AI Operational Mandates (Personal Preference)

- **Workflow:** Always prefer `subagent-driven-development` for implementation tasks spanning more than 2 files.
- **TDD:** Strict Test-Driven Development is required. No implementation without a failing test.
- **Token Efficiency:** Always use `rtk` proxy for shell commands. Monitor efficiency with `rtk gain --history`.
- **Knowledge Sharing:** Any new "tricks", "flows", or "meta-processes" must be documented in the `learn/` folder, subdivided by topic.
- **Memory Logging:** Every small task completed must be documented as an individual `.md` file in `memory/YYYY-MM-DD/`. A `next_tasks.md` file must exist in each daily folder to track pending work.
- **Git Workflow:** Every task must be implemented on a dedicated branch named after the task (e.g., `task-2-tavily-search`). Once a task is complete and verified, it must be pushed to the remote repository.
- **Codebase Indexing:** Maintain the GitNexus index regularly after major changes.

