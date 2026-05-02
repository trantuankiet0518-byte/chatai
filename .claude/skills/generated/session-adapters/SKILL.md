---
name: session-adapters
description: "Skill for the Session-adapters area of nextjs-app. 39 symbols across 6 files."
---

# Session-adapters

39 symbols | 6 files | Cohesion: 82%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how getSessionContent, parseSessionMetadata, getSessionStats work
- Modifying session-adapters-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | isObject, parseContextSeedPaths, buildAggregates, summarizeRawWorkerStates, deriveDmuxSessionState (+16) |
| `_backup_cleanup/everything-claude-code/scripts/lib/session-manager.js` | getSessionContent, parseSessionMetadata, getSessionStats, getSessionById, getSessionTitle |
| `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/claude-history.js` | parseClaudeTarget, isSessionFileTarget, hydrateSessionFromPath, resolveSessionRecord, createClaudeHistoryAdapter |
| `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/registry.js` | buildDefaultAdapterOptions, createDefaultAdapters, coerceTargetValue, normalizeStructuredTarget |
| `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/dmux-tmux.js` | createDmuxTmuxAdapter, isPlanFileTarget, buildSourceTarget |
| `_backup_cleanup/everything-claude-code/tests/lib/session-adapters.test.js` | loadStateStoreImpl |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getSessionContent` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-manager.js` | 215 |
| `parseSessionMetadata` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-manager.js` | 224 |
| `getSessionStats` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-manager.js` | 321 |
| `getSessionById` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-manager.js` | 396 |
| `getSessionTitle` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-manager.js` | 429 |
| `parseClaudeTarget` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/claude-history.js` | 9 |
| `isSessionFileTarget` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/claude-history.js` | 23 |
| `hydrateSessionFromPath` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/claude-history.js` | 34 |
| `resolveSessionRecord` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/claude-history.js` | 56 |
| `isObject` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 10 |
| `parseContextSeedPaths` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 21 |
| `buildAggregates` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 91 |
| `summarizeRawWorkerStates` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 111 |
| `deriveDmuxSessionState` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 125 |
| `normalizeDmuxSnapshot` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 419 |
| `deriveClaudeWorkerId` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 465 |
| `normalizeClaudeHistorySession` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 473 |
| `readExistingRecording` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 280 |
| `writeFallbackSessionRecording` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 292 |
| `loadStateStore` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/session-adapters/canonical-session.js` | 325 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → CreateClaudeHistoryAdapter` | cross_community | 4 |
| `Main → BuildDefaultAdapterOptions` | cross_community | 4 |
| `Main → CreateDmuxTmuxAdapter` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Cluster_120 | 3 calls |
| Cluster_121 | 1 calls |
| Scripts | 1 calls |

## How to Explore

1. `gitnexus_context({name: "getSessionContent"})` — see callers and callees
2. `gitnexus_query({query: "session-adapters"})` — find related execution flows
3. Read key files listed above for implementation details
