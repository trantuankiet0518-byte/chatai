---
name: tui
description: "Skill for the Tui area of nextjs-app. 85 symbols across 8 files."
---

# Tui

85 symbols | 8 files | Cohesion: 71%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how with_output_store, increase_pane_size, decrease_pane_size work
- Modifying tui-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | with_output_store, increase_pane_size, decrease_pane_size, scroll_down, scroll_up (+48) |
| `_backup_cleanup/everything-claude-code/ecc2/src/tui/widgets.rs` | currency, tokens, ratio, clamped_ratio, display_label (+16) |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/output.rs` | as_str, subscribe, replace_lines, pushing_output_broadcasts_events |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | get_output_lines, insert_session, append_output_line |
| `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/registry.js` | select |
| `_backup_cleanup/everything-claude-code/ecc2/src/tui/app.rs` | run |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/runtime.rs` | capture_command_output_persists_lines_and_events |
| `components/molecules/DataTable.tsx` | DataTable |

## Entry Points

Start here when exploring this area:

- **`with_output_store`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs:85`
- **`increase_pane_size`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs:426`
- **`decrease_pane_size`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs:431`
- **`scroll_down`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs:438`
- **`scroll_up`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs:469`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `with_output_store` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 85 |
| `increase_pane_size` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 426 |
| `decrease_pane_size` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 431 |
| `scroll_down` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 438 |
| `scroll_up` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 469 |
| `new_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 494 |
| `toggle_help` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 515 |
| `tick` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 519 |
| `run` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/app.rs` | 14 |
| `get_output_lines` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 333 |
| `as_str` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/output.rs` | 15 |
| `subscribe` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/output.rs` | 67 |
| `replace_lines` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/output.rs` | 93 |
| `DataTable` | Function | `components/molecules/DataTable.tsx` | 15 |
| `currency` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/widgets.rs` | 70 |
| `render` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 119 |
| `tokens` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/widgets.rs` | 61 |
| `budget_ratio` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/widgets.rs` | 176 |
| `gradient_color` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/widgets.rs` | 196 |
| `new` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/tui/dashboard.rs` | 81 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Metrics_scroll_does_not_mutate_output_scroll → Prepare` | cross_community | 7 |
| `Refresh_loads_selected_session_output_and_follows_tail → Prepare` | cross_community | 7 |
| `Refresh_preserves_selected_session_by_id → Prepare` | cross_community | 7 |
| `Metrics_scroll_does_not_mutate_output_scroll → As_str` | cross_community | 6 |
| `Metrics_scroll_does_not_mutate_output_scroll → OutputLine` | cross_community | 6 |
| `Metrics_scroll_does_not_mutate_output_scroll → Lock_buffers` | cross_community | 6 |
| `Refresh_loads_selected_session_output_and_follows_tail → As_str` | cross_community | 6 |
| `Refresh_loads_selected_session_output_and_follows_tail → OutputLine` | cross_community | 6 |
| `Refresh_loads_selected_session_output_and_follows_tail → Lock_buffers` | cross_community | 6 |
| `Refresh_preserves_selected_session_by_id → As_str` | cross_community | 6 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Session | 8 calls |
| Scripts | 7 calls |
| Observability | 1 calls |
| State-store | 1 calls |
| Worktree | 1 calls |

## How to Explore

1. `gitnexus_context({name: "with_output_store"})` — see callers and callees
2. `gitnexus_query({query: "tui"})` — find related execution flows
3. Read key files listed above for implementation details
