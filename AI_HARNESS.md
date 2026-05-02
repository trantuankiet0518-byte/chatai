# AI Harness

This repository uses a lightweight shared harness so Codex, Qwen, Gemini, and other coding agents can work with the same project memory and shorter prompts.

Read order for any new agent:

1. `AGENTS.md`
2. `.ai/project-context.md`
3. `.ai/current-focus.md`
4. `.ai/handoff.md`
5. Run `node scripts/ai-context.mjs`

---

## Scope-Based Workflow (Token Optimization)

Each agent MUST work within a defined scope. Scopes limit which files the agent can read and edit, drastically reducing token usage.

### Available Scopes

Run `node scripts/ai-scope.mjs --list` to see all scopes.

Key scopes:

| Scope | What it covers |
|---|---|
| `ui-atoms` | Button, Input, Badge, Select... |
| `ui-molecules` | FormField, Modal, PalaceCell... |
| `ui-organisms` | Navbar, Sidebar, LapLaSo components... |
| `ui-templates` | AuthTemplate, DashboardTemplate |
| `engine-bazi` | Bát Tự engine, types, display |
| `engine-vanhan` | Vận Hạn prediction logic |
| `api-routes` | All API endpoints |
| `services` | Service layer (API client, auth, fortune) |
| `contracts` | Data model interfaces & types |
| `pages-marketing` | Landing, hoso, laplaso marketing pages |
| `pages-auth` | Login, register pages |
| `pages-views` | Detail view pages (lá số, vận hạn) |
| `i18n` | Internationalization, messages |
| `config` | next.config, tsconfig, package.json |

### How to use scopes

1. **Claim a scope** before editing:
   ```bash
   node scripts/ai-handoff.mjs --owner "codex" --scope "ui-organisms" --goal "Fix Navbar" --next "..."
   ```

2. **Load scope context** (instead of reading the whole repo):
   ```bash
   node scripts/ai-scope.mjs --scope ui-organisms           # summary
   node scripts/ai-scope.mjs --scope ui-organisms --depth full  # with file contents
   ```

3. **Only edit files listed as Writable** in the scope output.
4. **Read Readonly files** for context but never modify them.
5. **Hand off** when done:
   ```bash
   node scripts/ai-handoff.mjs --owner "codex" --scope "ui-organisms" --goal "Fixed Navbar" --files "Navbar.tsx|Sidebar.tsx" --checks "build" --next "..."
   ```

### Scope rules

- One agent owns one scope at a time.
- Never edit files outside your scope without requesting expansion.
- If a task spans multiple scopes, split into sub-tasks under `.ai/tasks/`.
- Scopes are defined in `.ai/scopes.json` — update it when adding new subsystems.

---

## General Rules

- Treat `.ai/project-context.md` as the canonical low-token project summary.
- Treat `.ai/current-focus.md` as the current workstream summary.
- Treat `.ai/handoff.md` as the latest session handoff.
- Do not reread the whole repository unless the task requires deeper inspection.
- Before editing, check `git status --short` or use `node scripts/ai-context.mjs`.
- Prefer updating `.ai/current-focus.md` and `.ai/handoff.md` instead of repeating long chat summaries.
- Keep notes short, factual, and scoped to decisions, blockers, changed areas, and next steps.

Multi-agent protocol:

- One agent owns one scope at a time.
- Record ownership in `.ai/current-focus.md` before broad edits.
- For parallel work, create a scoped task file under `.ai/tasks/`.
- Do not overwrite unrelated work already present in the dirty tree.
- When handing off, update `.ai/handoff.md` with:
  - goal
  - files touched
  - checks run
  - blockers
  - exact next step

Token discipline:

- **Always load scope context first** — never read the whole repo.
- Start from the harness files before opening large source files.
- Summarize findings back into `.ai/current-focus.md` if they matter across sessions.
- Keep summaries under 20 lines where possible.

Recommended commands:

- `node scripts/ai-scope.mjs --list` — see all scopes
- `node scripts/ai-scope.mjs --scope <name>` — load scope context
- `node scripts/ai-scope.mjs --scope <name> --depth full` — load with file contents
- `node scripts/ai-context.mjs` — full project context (use sparingly)
- `node scripts/ai-handoff.mjs --owner "codex" --goal "..." --scope "..." --files "a|b" --checks "lint" --blockers "none" --next "..."`
