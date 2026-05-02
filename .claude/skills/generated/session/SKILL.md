---
name: session
description: "Skill for the Session area of nextjs-app. 79 symbols across 11 files."
---

# Session

79 symbols | 11 files | Cohesion: 67%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how list_sessions, get_latest_session, get_session work
- Modifying session-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | list_sessions, get_status, resume_session, agent_program, resolve_session (+25) |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | list_sessions, get_latest_session, get_session, open, init_schema (+14) |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/runtime.rs` | start, update_state, update_pid, append_output_line, send (+3) |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/daemon.rs` | run, resume_crashed_sessions, check_sessions, resume_crashed_sessions_with, temp_db_path (+3) |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/output.rs` | default, new, push_line, lines, lock_buffers (+1) |
| `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | new, log, log_tool_call |
| `_backup_cleanup/everything-claude-code/ecc2/src/main.rs` | main |
| `_backup_cleanup/everything-claude-code/ecc2/src/config/mod.rs` | load |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/mod.rs` | can_transition_to |
| `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | stop_selected |

## Entry Points

Start here when exploring this area:

- **`list_sessions`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs:228`
- **`get_latest_session`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs:278`
- **`get_session`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs:282`
- **`list_sessions`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs:26`
- **`get_status`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs:30`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `list_sessions` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 228 |
| `get_latest_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 278 |
| `get_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 282 |
| `list_sessions` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 26 |
| `get_status` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 30 |
| `resume_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 77 |
| `run_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 109 |
| `load` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/config/mod.rs` | 71 |
| `open` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 15 |
| `capture_command_output` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/runtime.rs` | 117 |
| `update_state` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 151 |
| `update_pid` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 187 |
| `can_transition_to` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/mod.rs` | 48 |
| `stop_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 35 |
| `increment_tool_calls` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 220 |
| `insert_tool_log` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 361 |
| `record_tool_call` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 39 |
| `new` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 259 |
| `log` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 263 |
| `log_tool_call` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 286 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → Arg` | cross_community | 6 |
| `Main → WorktreeInfo` | cross_community | 6 |
| `Metrics_scroll_does_not_mutate_output_scroll → Lock_buffers` | cross_community | 6 |
| `Append_output_line_keeps_latest_buffer_window → Prepare` | cross_community | 6 |
| `Refresh_loads_selected_session_output_and_follows_tail → Lock_buffers` | cross_community | 6 |
| `Update_state_rejects_invalid_terminal_transition → Prepare` | cross_community | 6 |
| `Run → Prepare` | cross_community | 6 |
| `Refresh_preserves_selected_session_by_id → Lock_buffers` | cross_community | 6 |
| `Render → Prepare` | cross_community | 6 |
| `Open_migrates_existing_sessions_table_with_pid_column → Prepare` | cross_community | 6 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Tui | 13 calls |
| Scripts | 3 calls |
| State-store | 3 calls |
| Worktree | 3 calls |

## How to Explore

1. `gitnexus_context({name: "list_sessions"})` — see callers and callees
2. `gitnexus_query({query: "session"})` — find related execution flows
3. Read key files listed above for implementation details
