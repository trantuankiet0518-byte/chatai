---
name: install
description: "Skill for the Install area of nextjs-app. 37 symbols across 9 files."
---

# Install

37 symbols | 9 files | Cohesion: 74%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how getSourceRoot, getPackageVersion, getManifestVersion work
- Modifying install-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | getSourceRoot, getPackageVersion, getManifestVersion, getRepoCommit, validateLegacyTarget (+4) |
| `_backup_cleanup/everything-claude-code/scripts/lib/install/apply.js` | readJsonObject, findHooksSourcePath, buildMergedSettings, applyInstallPlan, replacePluginRootPlaceholders (+3) |
| `_backup_cleanup/everything-claude-code/scripts/lib/install/config.js` | resolveInstallConfigPath, readJson, getValidator, dedupeStrings, formatValidationErrors (+1) |
| `_backup_cleanup/everything-claude-code/tests/lib/install-config.test.js` | test, createTempDir, cleanup, writeJson, runTests |
| `_backup_cleanup/everything-claude-code/scripts/lib/install/request.js` | dedupeStrings, parseInstallArgs, normalizeInstallRequest |
| `_backup_cleanup/everything-claude-code/tests/lib/selective-install.test.js` | test, runTests |
| `_backup_cleanup/everything-claude-code/tests/lib/install-request.test.js` | test, runTests |
| `_backup_cleanup/everything-claude-code/scripts/lib/install/runtime.js` | createInstallPlanFromRequest |
| `_backup_cleanup/everything-claude-code/scripts/lib/install-manifests.js` | listInstallComponents |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getSourceRoot` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 20 |
| `getPackageVersion` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 24 |
| `getManifestVersion` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 35 |
| `getRepoCommit` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 46 |
| `validateLegacyTarget` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 78 |
| `createStatePreview` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 122 |
| `createLegacyInstallPlan` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 442 |
| `createLegacyCompatInstallPlan` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 509 |
| `createManifestInstallPlan` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-executor.js` | 578 |
| `createInstallPlanFromRequest` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install/runtime.js` | 8 |
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/selective-install.test.js` | 29 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/lib/selective-install.test.js` | 41 |
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/install-request.test.js` | 11 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/lib/install-request.test.js` | 23 |
| `listInstallComponents` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install-manifests.js` | 227 |
| `dedupeStrings` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install/request.js` | 6 |
| `parseInstallArgs` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install/request.js` | 10 |
| `normalizeInstallRequest` | Function | `_backup_cleanup/everything-claude-code/scripts/lib/install/request.js` | 69 |
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/lib/install-config.test.js` | 15 |
| `createTempDir` | Function | `_backup_cleanup/everything-claude-code/tests/lib/install-config.test.js` | 27 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Main → ReadJson` | cross_community | 4 |
| `CreateLegacyInstallPlan → BuildCopyFileOperation` | cross_community | 4 |
| `Main → DedupeStrings` | cross_community | 3 |
| `Main → ResolveInstallConfigPath` | cross_community | 3 |
| `Main → FormatValidationErrors` | cross_community | 3 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Install-targets | 5 calls |
| Cluster_199 | 4 calls |
| Scripts | 3 calls |

## How to Explore

1. `gitnexus_context({name: "getSourceRoot"})` — see callers and callees
2. `gitnexus_query({query: "install"})` — find related execution flows
3. Read key files listed above for implementation details
