# Current Focus

Status:

- Application workflow fully documented. Ready for feature development.
- Repository has a dirty worktree. Assume ongoing product work is in progress.

Active harness owner:

- Owner: `gemini`
- Scope: `api-routes`
- Goal: Setup Second Brain Search feature
- Started: 2026-05-02 15:54:03 ICT

Current guidance:

- **Read `.ai/workflow.md` first** for full application workflow context.
- Read `AGENTS.md` for project structure, conventions, and detailed workflow (section 12).
- Use `node scripts/ai-context.mjs` for additional context in a fresh session.
- For large tasks, claim a scope here before editing.
- When done, replace the handoff file with the latest state.

Key workflow files to understand:

- `lib/services/authGuard.ts` — Protected route definitions
- `lib/services/authSession.ts` — Auth state management
- `lib/services/savedCharts.ts` — Chart persistence
- `lib/vanhan_predict.ts` — Van Han prediction algorithm
- `components/organisms/laplaso/LapLaSoExperience.tsx` — Lập lá số orchestrator
- `app/[locale]/(marketing)/vanhan/page.tsx` — Van Han page

Suggested ownership format:

- Owner: `<agent/tool>`
- Scope: `<files or subsystem>`
- Goal: `<single sentence>`
- Started: `<YYYY-MM-DD HH:mm timezone>`
