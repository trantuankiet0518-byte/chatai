---
name: hooks
description: "Skill for the Hooks area of nextjs-app. 242 symbols across 46 files."
---

# Hooks

242 symbols | 46 files | Cohesion: 89%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how update work
- Modifying hooks-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | getHomeDir, getClaudeDir, getSessionsDir, getLegacySessionsDir, getSessionSearchDirs (+23) |
| `_backup_cleanup/everything-claude-code/scripts/hooks/mcp-health-check.js` | envNumber, configPaths, readJsonFile, loadState, saveState (+20) |
| `_backup_cleanup/everything-claude-code/tests/hooks/hooks.test.js` | toBashPath, fromBashPath, normalizeComparablePath, sleepMs, getCanonicalSessionsDir (+16) |
| `_backup_cleanup/everything-claude-code/scripts/lib/observer-sessions.js` | getHomunculusDir, getProjectsDir, getProjectRegistryPath, readProjectRegistry, resolveProjectContext (+9) |
| `_backup_cleanup/everything-claude-code/tests/hooks/mcp-health-check.test.js` | test, asyncTest, createTempDir, cleanupTempDir, writeConfig (+5) |
| `_backup_cleanup/everything-claude-code/scripts/hooks/session-end.js` | extractSessionSummary, runMain, extractHeaderField, buildSessionHeader, mergeSessionHeader (+5) |
| `_backup_cleanup/everything-claude-code/scripts/hooks/governance-capture.js` | generateEventId, detectSecrets, detectApprovalRequired, detectSensitivePath, emitGovernanceEvent (+4) |
| `_backup_cleanup/everything-claude-code/scripts/hooks/stop-format-typecheck.js` | formatBatch, getAccumFile, parseAccumulator, findTsConfigDir, typecheckBatch (+2) |
| `_backup_cleanup/everything-claude-code/scripts/hooks/pre-bash-commit-quality.js` | getStagedFiles, getStagedFileContent, findFileIssues, validateCommitMessage, runLinter (+2) |
| `_backup_cleanup/everything-claude-code/tests/hooks/suggest-compact.test.js` | test, runCompact, getCounterFilePath, createCounterContext, cleanup (+1) |

## Entry Points

Start here when exploring this area:

- **`update`** (Function) — `components/organisms/hoso/ProfileSettingsPanel.tsx:54`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `update` | Function | `components/organisms/hoso/ProfileSettingsPanel.tsx` | 54 |
| `setProject` | Function | `_backup_cleanup/everything-claude-code/scripts/setup-package-manager.js` | 137 |
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/utils.test.js` | 15 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/lib/utils.test.js` | 28 |
| `getHomeDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 26 |
| `getClaudeDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 37 |
| `getSessionsDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 44 |
| `getLegacySessionsDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 51 |
| `getSessionSearchDirs` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 58 |
| `getLearnedSkillsDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 65 |
| `getTempDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 72 |
| `ensureDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 82 |
| `getTimeString` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 110 |
| `getGitRepoName` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 120 |
| `getProjectName` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 129 |
| `getSessionIdShort` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 174 |
| `getDateTimeString` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 186 |
| `findFiles` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 203 |
| `searchDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 222 |
| `readStdinJson` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/utils.js` | 269 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Run → GetHomeDir` | cross_community | 7 |
| `Run → Update` | cross_community | 6 |
| `Main → RunCommand` | cross_community | 5 |
| `InitCommand → EnsureDir` | cross_community | 5 |
| `Main → GetHomeDir` | intra_community | 4 |
| `Main → Update` | cross_community | 4 |
| `Main → GetHomeDir` | cross_community | 4 |
| `Main → Update` | cross_community | 4 |
| `Main → Prepare` | cross_community | 4 |
| `Main → GetHomeDir` | intra_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 8 calls |
| Cluster_193 | 2 calls |
| State-store | 1 calls |
| Cluster_121 | 1 calls |
| Cluster_129 | 1 calls |

## How to Explore

1. `gitnexus_context({name: "update"})` — see callers and callees
2. `gitnexus_query({query: "hooks"})` — find related execution flows
3. Read key files listed above for implementation details
