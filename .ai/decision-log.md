# Decision Log

## 2026-04-10

- Chose a lightweight repo-local harness instead of a heavy external orchestrator.
- Shared memory is stored in text files under `.ai/` so any agent can read it.
- Canonical bootstrap path is `AI_HARNESS.md` plus `npm run ai:context`.
- Token reduction strategy is based on compact summaries and handoff notes, not long conversational history.
