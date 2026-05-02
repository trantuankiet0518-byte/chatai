---
name: observability
description: "Skill for the Observability area of nextjs-app. 18 symbols across 3 files."
---

# Observability

18 symbols | 3 files | Cohesion: 67%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how new, compute_risk, query_tool_logs work
- Modifying observability-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | new, compute_risk, from_score, base_tool_risk, computes_sensitive_file_risk (+11) |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | query_tool_logs |
| `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | query_tool_calls |

## Entry Points

Start here when exploring this area:

- **`new`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs:33`
- **`compute_risk`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs:55`
- **`query_tool_logs`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs:397`
- **`query_tool_calls`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs:64`
- **`query`** (Function) — `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs:277`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `new` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 33 |
| `compute_risk` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 55 |
| `query_tool_logs` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/store.rs` | 397 |
| `query_tool_calls` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/session/manager.rs` | 64 |
| `query` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 277 |
| `from_score` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 103 |
| `base_tool_risk` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 116 |
| `computes_sensitive_file_risk` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 319 |
| `computes_blast_radius_risk` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 335 |
| `computes_irreversible_risk` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 351 |
| `blocks_combined_high_risk_operations` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 370 |
| `test_db_path` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 298 |
| `test_session` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 302 |
| `logger_persists_entries_and_paginates` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 382 |
| `assess_file_sensitivity` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 128 |
| `assess_blast_radius` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 166 |
| `assess_irreversibility` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 202 |
| `contains_any` | Function | `_backup_cleanup/everything-claude-code/ecc2/src/observability/mod.rs` | 230 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Query_tool_calls → Prepare` | cross_community | 5 |
| `Query_tool_calls → Session` | cross_community | 4 |
| `Query_tool_calls → SessionMetrics` | cross_community | 4 |
| `Query_tool_calls → ToolLogEntry` | intra_community | 4 |
| `Query_tool_calls → ToolLogPage` | intra_community | 4 |
| `Scroll_down → ToolLogEntry` | cross_community | 4 |
| `Scroll_down → ToolLogPage` | cross_community | 4 |
| `Scroll_up → ToolLogEntry` | cross_community | 4 |
| `Scroll_up → ToolLogPage` | cross_community | 4 |
| `Logger_persists_entries_and_paginates → Session` | intra_community | 3 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Session | 4 calls |
| Scripts | 1 calls |
| State-store | 1 calls |
| Tui | 1 calls |

## How to Explore

1. `gitnexus_context({name: "new"})` — see callers and callees
2. `gitnexus_query({query: "observability"})` — find related execution flows
3. Read key files listed above for implementation details
