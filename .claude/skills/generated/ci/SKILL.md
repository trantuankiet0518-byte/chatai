---
name: ci
description: "Skill for the Ci area of nextjs-app. 50 symbols across 7 files."
---

# Ci

50 symbols | 7 files | Cohesion: 93%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how listMatchingFiles, buildCatalog, readFileOrThrow work
- Modifying ci-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | listMatchingFiles, buildCatalog, readFileOrThrow, writeFileOrThrow, evaluateExpectations (+10) |
| `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | test, createTestDir, cleanupTestDir, writeJson, writeInstallComponentsManifest (+8) |
| `_backup_cleanup/everything-claude-code/scripts/ci/check-unicode-safety.js` | lineAndColumn, isAllowedEmojiLikeSymbol, isDangerousInvisibleCodePoint, stripDangerousInvisibleChars, sanitizeText (+5) |
| `_backup_cleanup/everything-claude-code/scripts/ci/validate-install-manifests.js` | readJson, normalizeRelativePath, validateSchema, validateInstallManifests |
| `_backup_cleanup/everything-claude-code/scripts/ci/validate-hooks.js` | isNonEmptyString, isNonEmptyStringArray, validateHookEntry, validateHooks |
| `_backup_cleanup/everything-claude-code/scripts/ci/validate-rules.js` | collectRuleFiles, validateRules |
| `_backup_cleanup/everything-claude-code/scripts/ci/validate-agents.js` | extractFrontmatter, validateAgents |

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `listMatchingFiles` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 35 |
| `buildCatalog` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 47 |
| `readFileOrThrow` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 61 |
| `writeFileOrThrow` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 69 |
| `evaluateExpectations` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 348 |
| `formatExpectation` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 363 |
| `renderText` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 570 |
| `renderMarkdown` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 589 |
| `main` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/catalog.js` | 610 |
| `test` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 22 |
| `createTestDir` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 34 |
| `cleanupTestDir` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 38 |
| `writeJson` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 42 |
| `writeInstallComponentsManifest` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 47 |
| `runValidator` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 136 |
| `writeCatalogFixture` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 182 |
| `runTests` | Function | `_backup_cleanup/everything-claude-code/tests/ci/validators.test.js` | 231 |
| `lineAndColumn` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/check-unicode-safety.js` | 95 |
| `isAllowedEmojiLikeSymbol` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/check-unicode-safety.js` | 102 |
| `isDangerousInvisibleCodePoint` | Function | `_backup_cleanup/everything-claude-code/scripts/ci/check-unicode-safety.js` | 106 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 1 calls |

## How to Explore

1. `gitnexus_context({name: "listMatchingFiles"})` — see callers and callees
2. `gitnexus_query({query: "ci"})` — find related execution flows
3. Read key files listed above for implementation details
