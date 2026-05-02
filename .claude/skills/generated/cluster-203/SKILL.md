---
name: cluster-203
description: "Skill for the Cluster_203 area of nextjs-app. 19 symbols across 1 files."
---

# Cluster_203

19 symbols | 1 files | Cohesion: 98%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how resolveOperationSourcePath, areFilesEqual, readFileUtf8 work
- Modifying cluster_203-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | resolveOperationSourcePath, areFilesEqual, readFileUtf8, isPlainObject, cloneJsonValue (+14) |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `resolveOperationSourcePath` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 58 |
| `areFilesEqual` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 66 |
| `readFileUtf8` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 80 |
| `isPlainObject` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 84 |
| `cloneJsonValue` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 88 |
| `parseJsonLikeValue` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 96 |
| `getOperationTextContent` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 116 |
| `getOperationJsonPayload` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 134 |
| `getOperationPreviousContent` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 152 |
| `getOperationPreviousJson` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 168 |
| `formatJson` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 184 |
| `readJsonFile` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 188 |
| `ensureParentDir` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 192 |
| `deepMergeJson` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 196 |
| `jsonContainsSubset` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 212 |
| `deepRemoveJsonSubset` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 237 |
| `executeRepairOperation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 311 |
| `executeUninstallOperation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 362 |
| `inspectManagedOperation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 494 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ExecuteRepairOperation → IsPlainObject` | intra_community | 4 |
| `ExecuteRepairOperation → CloneJsonValue` | intra_community | 4 |
| `ExecuteUninstallOperation → IsPlainObject` | intra_community | 4 |
| `ExecuteUninstallOperation → CloneJsonValue` | intra_community | 4 |

## How to Explore

1. `gitnexus_context({name: "resolveOperationSourcePath"})` — see callers and callees
2. `gitnexus_query({query: "cluster_203"})` — find related execution flows
3. Read key files listed above for implementation details
