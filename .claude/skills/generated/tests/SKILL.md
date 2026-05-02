---
name: tests
description: "Skill for the Tests area of nextjs-app. 40 symbols across 6 files."
---

# Tests

40 symbols | 6 files | Cohesion: 89%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how grade, classify_events, test_returns_compliance_result work
- Modifying tests-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | test_returns_compliance_result, test_full_compliance, test_optional_step_detected, test_no_hook_promotion_recommended, test_step_evidence_not_empty (+11) |
| `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_parser.py` | test_parses_tdd_spec, test_step_fields, test_optional_detector_fields, test_scoring_threshold, test_required_vs_optional_steps (+6) |
| `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/parser.py` | Detector, Step, ComplianceSpec, parse_spec, parse_trace |
| `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/grader.py` | StepResult, ComplianceResult, _check_temporal_order, grade |
| `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/classifier.py` | classify_events, _parse_classification |
| `_backup_cleanup/everything-claude-code/tests/run-all.js` | walkFiles, discoverTestFiles |

## Entry Points

Start here when exploring this area:

- **`grade`** (Function) — `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/grader.py:61`
- **`classify_events`** (Function) — `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/classifier.py:16`
- **`test_returns_compliance_result`** (Function) — `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py:54`
- **`test_full_compliance`** (Function) — `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py:59`
- **`test_optional_step_detected`** (Function) — `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py:71`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `StepResult` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/grader.py` | 11 |
| `ComplianceResult` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/grader.py` | 19 |
| `Detector` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/parser.py` | 22 |
| `Step` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/parser.py` | 29 |
| `ComplianceSpec` | Class | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/parser.py` | 37 |
| `grade` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/grader.py` | 61 |
| `classify_events` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/scripts/classifier.py` | 16 |
| `test_returns_compliance_result` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 54 |
| `test_full_compliance` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 59 |
| `test_optional_step_detected` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 71 |
| `test_no_hook_promotion_recommended` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 77 |
| `test_step_evidence_not_empty` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 82 |
| `test_low_compliance` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 91 |
| `test_write_test_fails_ordering` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 96 |
| `test_run_test_red_not_detected` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 103 |
| `test_hook_promotion_recommended` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 109 |
| `test_failure_reasons_present` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 114 |
| `test_empty_trace` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 123 |
| `test_compliance_rate_is_ratio_of_required_only` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 129 |
| `test_spec_id_in_result` | Function | `_backup_cleanup/everything-claude-code/skills/skill-comply/tests/test_grader.py` | 134 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → Step` | cross_community | 4 |
| `Main → Detector` | cross_community | 4 |
| `Main → ComplianceSpec` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 5 calls |
| State-store | 1 calls |

## How to Explore

1. `gitnexus_context({name: "grade"})` — see callers and callees
2. `gitnexus_query({query: "tests"})` — find related execution flows
3. Read key files listed above for implementation details
