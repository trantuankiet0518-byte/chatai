---
name: state-store
description: "Skill for the State-store area of nextjs-app. 47 symbols across 6 files."
---

# State-store

47 symbols | 6 files | Cohesion: 68%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how test_all_required_steps_detected work
- Modifying state-store-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | createQueryApi, insertDecision, insertGovernanceEvent, insertSkillRun, upsertInstallState (+16) |
| `_backup_cleanup/everything-claude-code/scripts/lib/state-store/index.js` | resolveStateStorePath, wrapSqlJsDatabase, pragma, openDatabase, createStateStore (+4) |
| `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | test, createTempDir, cleanupTempDir, runNode, parseJson (+2) |
| `_backup_cleanup/everything-claude-code/scripts/lib/state-store/schema.js` | readSchema, getAjv, getEntityValidator, formatValidationErrors, validateEntity (+1) |
| `_backup_cleanup/everything-claude-code/scripts/lib/state-store/migrations.js` | ensureMigrationTable, getAppliedMigrations, applyMigrations |
| `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | test_all_required_steps_detected |

## Entry Points

Start here when exploring this area:

- **`test_all_required_steps_detected`** (Function) — `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py:64`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `test_all_required_steps_detected` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 64 |
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 19 |
| `createTempDir` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 31 |
| `cleanupTempDir` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 35 |
| `runNode` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 39 |
| `parseJson` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 50 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 254 |
| `createQueryApi` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 287 |
| `resolveStateStorePath` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/index.js` | 13 |
| `wrapSqlJsDatabase` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/index.js` | 33 |
| `openDatabase` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/index.js` | 140 |
| `createStateStore` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/index.js` | 163 |
| `seedStore` | Function | `_backup_cleanup/everything-claude-code/tests/lib/state-store.test.js` | 54 |
| `normalizeLimit` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 8 |
| `classifyOutcome` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 123 |
| `toPercent` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 136 |
| `summarizeSkillRuns` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 144 |
| `summarizeInstallHealth` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 173 |
| `listRecentSessions` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 538 |
| `getStatus` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/state-store/queries.js` | 564 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Metrics_scroll_does_not_mutate_output_scroll → Prepare` | cross_community | 7 |
| `Cmd_export → Prepare` | cross_community | 7 |
| `Refresh_loads_selected_session_output_and_follows_tail → Prepare` | cross_community | 7 |
| `Cmd_evolve → Prepare` | cross_community | 7 |
| `Refresh_preserves_selected_session_by_id → Prepare` | cross_community | 7 |
| `Append_output_line_keeps_latest_buffer_window → Prepare` | cross_community | 6 |
| `Update_state_rejects_invalid_terminal_transition → Prepare` | cross_community | 6 |
| `Run → Prepare` | cross_community | 6 |
| `InitCommand → Prepare` | cross_community | 6 |
| `Render → Prepare` | cross_community | 6 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 6 calls |
| Codex | 2 calls |
| Tests | 1 calls |

## How to Explore

1. `gitnexus_context({name: "test_all_required_steps_detected"})` — see callers and callees
2. `gitnexus_query({query: "state-store"})` — find related execution flows
3. Read key files listed above for implementation details
