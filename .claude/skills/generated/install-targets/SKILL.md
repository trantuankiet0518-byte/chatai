---
name: install-targets
description: "Skill for the Install-targets area of nextjs-app. 37 symbols across 7 files."
---

# Install-targets

37 symbols | 7 files | Cohesion: 83%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how test, runTests, readInstallState work
- Modifying install-targets-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/install-targets/helpers.js` | supports, resolveRoot, getInstallStatePath, planOperations, supportsModule (+8) |
| `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | listFilesRecursive, isGeneratedRuntimeSourcePath, buildCopyFileOperation, addRecursiveCopyOperations, addFileCopyOperation (+6) |
| `_backup_cleanup/everything-claude-code/scripts/lib/install-manifests.js` | readJson, readModuleTargetsOrThrow, getManifestPaths, loadInstallManifests, resolveModule |
| `_backup_cleanup/everything-claude-code/scripts/lib/install-targets/registry.js` | listInstallTargetAdapters, getInstallTargetAdapter, planInstallTargetScaffold |
| `_backup_cleanup/everything-claude-code/tests/lib/install-targets.test.js` | test, runTests |
| `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | normalizeTargets, buildDiscoveryRecord |
| `_backup_cleanup/everything-claude-code/scripts/lib/install-state.js` | readInstallState |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/install-targets.test.js` | 17 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/lib/install-targets.test.js` | 29 |
| `readInstallState` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-state.js` | 294 |
| `normalizeTargets` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 25 |
| `buildDiscoveryRecord` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-lifecycle.js` | 642 |
| `listFilesRecursive` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 91 |
| `isGeneratedRuntimeSourcePath` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 117 |
| `buildCopyFileOperation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 132 |
| `addRecursiveCopyOperations` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 145 |
| `addFileCopyOperation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 169 |
| `addMatchingRuleOperations` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 186 |
| `isDirectoryNonEmpty` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 217 |
| `planClaudeLegacyInstall` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 221 |
| `planCursorLegacyInstall` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 277 |
| `planAntigravityLegacyInstall` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 364 |
| `materializeScaffoldOperation` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 541 |
| `listInstallTargetAdapters` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-targets/registry.js` | 18 |
| `getInstallTargetAdapter` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-targets/registry.js` | 22 |
| `planInstallTargetScaffold` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-targets/registry.js` | 32 |
| `readJson` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-manifests.js` | 66 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → ListInstallTargetAdapters` | cross_community | 5 |
| `Main → GetInstallTargetAdapter` | cross_community | 5 |
| `Main → ListInstallTargetAdapters` | cross_community | 5 |
| `Main → GetInstallTargetAdapter` | cross_community | 5 |
| `Main → ListInstallTargetAdapters` | cross_community | 5 |
| `Main → GetInstallTargetAdapter` | cross_community | 5 |
| `Main → GetManifestPaths` | cross_community | 4 |
| `Main → ReadJson` | cross_community | 4 |
| `Main → ReadModuleTargetsOrThrow` | cross_community | 4 |
| `Main → GetManifestPaths` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 2 calls |
| Cluster_196 | 1 calls |

## How to Explore

1. `gitnexus_context({name: "test"})` — see callers and callees
2. `gitnexus_query({query: "install-targets"})` — find related execution flows
3. Read key files listed above for implementation details
