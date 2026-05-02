---
name: skill-improvement
description: "Skill for the Skill-improvement area of nextjs-app. 20 symbols across 5 files."
---

# Skill-improvement

20 symbols | 5 files | Cohesion: 83%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how inspectSkillLoopTarget, roundRate, summarize work
- Modifying skill-improvement-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | resolveProjectRoot, getSkillTelemetryRoot, getSkillObservationsPath, appendSkillObservation, readSkillObservations (+3) |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/health.js` | roundRate, rankCounts, summarizeVariantRuns, deriveSkillStatus, buildSkillHealthReport |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/evaluate.js` | roundRate, summarize, buildSkillEvaluationScaffold |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/amendify.js` | createProposalId, summarizePatchPreview, proposeSkillAmendment |
| `_backup_cleanup/everything-claude-code/scripts/session-inspect.js` | inspectSkillLoopTarget |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `inspectSkillLoopTarget` | Function | `_backup_cleanup/everything-claude-code/scripts/session-inspect.js` | 65 |
| `roundRate` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/evaluate.js` | 4 |
| `summarize` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/evaluate.js` | 8 |
| `buildSkillEvaluationScaffold` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/evaluate.js` | 20 |
| `createProposalId` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/amendify.js` | 6 |
| `summarizePatchPreview` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/amendify.js` | 10 |
| `proposeSkillAmendment` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/amendify.js` | 33 |
| `resolveProjectRoot` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 8 |
| `getSkillTelemetryRoot` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 12 |
| `getSkillObservationsPath` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 16 |
| `appendSkillObservation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 73 |
| `readSkillObservations` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 80 |
| `roundRate` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/health.js` | 4 |
| `rankCounts` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/health.js` | 8 |
| `summarizeVariantRuns` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/health.js` | 14 |
| `deriveSkillStatus` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/health.js` | 32 |
| `buildSkillHealthReport` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/health.js` | 45 |
| `ensureString` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 20 |
| `createObservationId` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 28 |
| `createSkillObservation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-improvement/observations.js` | 32 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 1 calls |

## How to Explore

1. `gitnexus_context({name: "inspectSkillLoopTarget"})` — see callers and callees
2. `gitnexus_query({query: "skill-improvement"})` — find related execution flows
3. Read key files listed above for implementation details
