---
name: scripts
description: "Skill for the Scripts area of nextjs-app. 429 symbols across 69 files."
---

# Scripts

429 symbols | 69 files | Cohesion: 77%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how extract_content, write_audit, get_anomaly_attr work
- Modifying scripts-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/skills/continuous-learning-v2/scripts/test_parse_instinct.py` | fake_read_text, fake_open, test_load_from_empty_dir, test_load_from_nonexistent_dir, test_load_annotates_metadata (+55) |
| `_backup_cleanup/everything-claude-code/skills/continuous-learning-v2/scripts/instinct-cli.py` | cmd_evolve, _show_promotion_candidates, _generate_evolved, _load_instincts_from_dir, parse_instinct_file (+23) |
| `_backup_cleanup/everything-claude-code/scripts/claw.js` | isValidSessionName, loadHistory, appendTurn, buildPrompt, askClaude (+19) |
| `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | DesignSystemGenerator, _multi_domain_search, _find_reasoning_rule, _apply_reasoning, _select_best_match (+13) |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/scripts/design_system.py` | DesignSystemGenerator, _multi_domain_search, _find_reasoning_rule, _apply_reasoning, _select_best_match (+13) |
| `_backup_cleanup/everything-claude-code/scripts/harness-audit.js` | fileExists, readText, safeRead, detectTargetMode, getRepoChecks (+12) |
| `_backup_cleanup/everything-claude-code/scripts/skill-create-output.js` | sleep, animateProgress, progressBar, patterns, output (+10) |
| `_backup_cleanup/everything-claude-code/skills/videodb/scripts/ws_listener.py` | default_output_dir, ensure_private_dir, parse_args, log, append_event (+7) |
| `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/core.py` | detect_domain, search, BM25, tokenize, fit (+4) |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/scripts/core.py` | detect_domain, search, BM25, tokenize, fit (+4) |

## Entry Points

Start here when exploring this area:

- **`extract_content`** (Function) — `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py:94`
- **`write_audit`** (Function) — `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py:128`
- **`get_anomaly_attr`** (Function) — `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py:147`
- **`format_feedback`** (Function) — `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py:159`
- **`main`** (Function) — `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py:186`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `DesignSystemGenerator` | Class | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 36 |
| `DesignSystemGenerator` | Class | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/scripts/design_system.py` | 36 |
| `BM25` | Class | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/core.py` | 103 |
| `BM25` | Class | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/scripts/core.py` | 83 |
| `Scenario` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/scenario_generator.py` | 16 |
| `ScenarioRun` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/runner.py` | 20 |
| `ObservationEvent` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/parser.py` | 12 |
| `extract_content` | Function | `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py` | 94 |
| `write_audit` | Function | `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py` | 128 |
| `get_anomaly_attr` | Function | `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py` | 147 |
| `format_feedback` | Function | `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py` | 159 |
| `main` | Function | `_backup_cleanup/everything-claude-code/scripts/hooks/insaits-security-monitor.py` | 186 |
| `format_output` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py` | 29 |
| `generate` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 162 |
| `format_ascii_box` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 241 |
| `wrap_text` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 251 |
| `format_markdown` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 366 |
| `generate_design_system` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 461 |
| `persist_design_system` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 490 |
| `format_master_md` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/design_system.py` | 541 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Metrics_scroll_does_not_mutate_output_scroll → Prepare` | cross_community | 7 |
| `Cmd_export → Prepare` | cross_community | 7 |
| `Refresh_loads_selected_session_output_and_follows_tail → Prepare` | cross_community | 7 |
| `Cmd_evolve → Prepare` | cross_community | 7 |
| `Refresh_preserves_selected_session_by_id → Prepare` | cross_community | 7 |
| `Run → Prepare` | cross_community | 6 |
| `InitCommand → Prepare` | cross_community | 6 |
| `Main → Prepare` | cross_community | 5 |
| `Main → Prepare` | cross_community | 5 |
| `Main → Close` | cross_community | 5 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Install | 9 calls |
| State-store | 6 calls |
| Cluster_200 | 4 calls |
| Cluster_134 | 2 calls |
| Cluster_199 | 2 calls |
| Hooks | 2 calls |
| Install-targets | 2 calls |
| Session-adapters | 2 calls |

## How to Explore

1. `gitnexus_context({name: "extract_content"})` — see callers and callees
2. `gitnexus_query({query: "scripts"})` — find related execution flows
3. Read key files listed above for implementation details
