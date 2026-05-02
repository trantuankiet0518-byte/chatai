---
name: codex
description: "Skill for the Codex area of nextjs-app. 24 symbols across 5 files."
---

# Codex

24 symbols | 5 files | Cohesion: 78%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how escapeRegExp, getTomlSection, findTableRange work
- Modifying codex-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | findTableRange, stringifyValue, updateInlineTableKeys, appendToTable, getNested (+10) |
| `_backup_cleanup/everything-claude-code/scripts/codex/merge-mcp-config.js` | configDiffers, removeSectionFromText, findSubSections, removeServerFromText, main |
| `_backup_cleanup/everything-claude-code/tests/codex-config.test.js` | escapeRegExp, getTomlSection |
| `_backup_cleanup/everything-claude-code/scripts/lib/state-store/index.js` | exec |
| `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/versioning.js` | parseVersionNumber |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `escapeRegExp` | Function | `_backup_cleanup/everything-claude-code/tests/codex-config.test.js` | 27 |
| `getTomlSection` | Function | `_backup_cleanup/everything-claude-code/tests/codex-config.test.js` | 31 |
| `findTableRange` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 73 |
| `stringifyValue` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 111 |
| `updateInlineTableKeys` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 115 |
| `appendToTable` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 159 |
| `parseVersionNumber` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/skill-evolution/versioning.js` | 79 |
| `getNested` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 45 |
| `findFirstTableIndex` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 68 |
| `ensureTrailingNewline` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 88 |
| `insertBeforeFirstTable` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 92 |
| `stringifyRootKeys` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 182 |
| `stringifyTableKeys` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 200 |
| `main` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 211 |
| `configDiffers` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-mcp-config.js` | 127 |
| `removeSectionFromText` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-mcp-config.js` | 146 |
| `findSubSections` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-mcp-config.js` | 174 |
| `removeServerFromText` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-mcp-config.js` | 192 |
| `main` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-mcp-config.js` | 207 |
| `setNested` | Function | `_backup_cleanup/everything-claude-code/scripts/codex/merge-codex-config.js` | 56 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `VanHanPage → Exec` | cross_community | 6 |
| `Main → Exec` | cross_community | 5 |
| `Main → Exec` | cross_community | 5 |
| `Main → SetNested` | cross_community | 5 |
| `Main → Exec` | cross_community | 5 |
| `Main → StringifyValue` | cross_community | 4 |
| `Main → AppendBlock` | cross_community | 4 |

## How to Explore

1. `gitnexus_context({name: "escapeRegExp"})` — see callers and callees
2. `gitnexus_query({query: "codex"})` — find related execution flows
3. Read key files listed above for implementation details
