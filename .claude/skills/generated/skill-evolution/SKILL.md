---
name: skill-evolution
description: "Skill for the Skill-evolution area of nextjs-app. 76 symbols across 8 files."
---

# Skill-evolution

76 symbols | 8 files | Cohesion: 67%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how test, createTempDir, cleanupTempDir work
- Modifying skill-evolution-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/versioning.js` | readJsonl, getEvolutionLog, normalizeSkillDir, getVersionsDir, listVersions (+9) |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/provenance.js` | resolveRepoRoot, resolveHomeDir, getSkillRoots, normalizeSkillDir, isWithinRoot (+8) |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/dashboard.js` | horizontalBar, panelBox, renderFailureClusterPanel, renderAmendmentPanel, renderVersionTimelinePanel (+7) |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/health.js` | countPendingAmendments, formatRate, summarizeHealthReport, listSkillsInRoot, discoverSkills (+6) |
| `_backup_cleanup/everything-claude-code/tests/lib/skill-evolution.test.js` | test, createTempDir, cleanupTempDir, createSkill, appendJsonl (+3) |
| `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | test, createTempDir, cleanupTempDir, createSkill, appendJsonl (+2) |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/tracker.js` | readJsonl, readSkillExecutionRecords, resolveHomeDir, getRunsFilePath, toNullableNumber (+2) |
| `_backup_cleanup/everything-claude-code/scripts/skills-health.js` | showHelp, requireValue, parseArgs, main |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 18 |
| `createTempDir` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 30 |
| `cleanupTempDir` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 34 |
| `createSkill` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 38 |
| `appendJsonl` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 45 |
| `runCli` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 51 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/lib/skill-dashboard.test.js` | 57 |
| `readJsonl` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/versioning.js` | 134 |
| `getEvolutionLog` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/versioning.js` | 153 |
| `countPendingAmendments` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/health.js` | 113 |
| `horizontalBar` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/dashboard.js` | 29 |
| `panelBox` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/dashboard.js` | 39 |
| `renderFailureClusterPanel` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/dashboard.js` | 173 |
| `renderAmendmentPanel` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/dashboard.js` | 221 |
| `renderVersionTimelinePanel` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/dashboard.js` | 276 |
| `showHelp` | Function | `_backup_cleanup/everything-claude-code/scripts/skills-health.js` | 6 |
| `requireValue` | Function | `_backup_cleanup/everything-claude-code/scripts/skills-health.js` | 25 |
| `parseArgs` | Function | `_backup_cleanup/everything-claude-code/scripts/skills-health.js` | 34 |
| `main` | Function | `_backup_cleanup/everything-claude-code/scripts/skills-health.js` | 109 |
| `readJsonl` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/tracker.js` | 85 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → ResolveHomeDir` | cross_community | 5 |
| `Main → ResolveRepoRoot` | cross_community | 5 |
| `Main → ResolveHomeDir` | cross_community | 5 |
| `Main → ReadJsonl` | intra_community | 5 |
| `Main → ListSkillsInRoot` | intra_community | 5 |
| `RollbackTo → NormalizeSkillDir` | cross_community | 5 |
| `Main → Prepare` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Hooks | 5 calls |
| Scripts | 4 calls |

## How to Explore

1. `gitnexus_context({name: "test"})` — see callers and callees
2. `gitnexus_query({query: "skill-evolution"})` — find related execution flows
3. Read key files listed above for implementation details
