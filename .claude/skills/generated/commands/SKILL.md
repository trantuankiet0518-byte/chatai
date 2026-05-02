---
name: commands
description: "Skill for the Commands area of nextjs-app. 52 symbols across 12 files."
---

# Commands

52 symbols | 12 files | Cohesion: 88%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how loadPlatformConfig, loadAllPlatformConfigs, renderSkillFile work
- Modifying commands-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/everything-claude-code/skills/ck/commands/shared.mjs` | daysAgoLabel, stalenessIcon, renderBriefingBox, pad, row (+17) |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts` | exists, loadPlatformConfig, loadAllPlatformConfigs, loadTemplate, renderFrontmatter (+4) |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | GitHubRateLimitError, GitHubDownloadError, checkRateLimit, fetchReleases, getLatestRelease (+2) |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/src/commands/init.ts` | templateInstall, initCommand, tryGitHubInstall |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/detect.ts` | detectAIType, getAITypeDescription |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/src/commands/uninstall.ts` | removeSkillDir, uninstallCommand |
| `_backup_cleanup/everything-claude-code/skills/ck/commands/migrate.mjs` | parseBullets, parseLeftOff |
| `lib/api-schema.ts` | success |
| `app/api/vanhan/route.ts` | GET |
| `app/api/vanhan/content.ts` | getVanHanContent |

## Entry Points

Start here when exploring this area:

- **`loadPlatformConfig`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts:62`
- **`loadAllPlatformConfigs`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts:76`
- **`renderSkillFile`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts:122`
- **`generatePlatformFiles`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts:186`
- **`generateAllPlatformFiles`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts:222`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `GitHubRateLimitError` | Class | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | 7 |
| `GitHubDownloadError` | Class | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | 14 |
| `loadPlatformConfig` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts` | 62 |
| `loadAllPlatformConfigs` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts` | 76 |
| `renderSkillFile` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts` | 122 |
| `generatePlatformFiles` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts` | 186 |
| `generateAllPlatformFiles` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/template.ts` | 222 |
| `success` | Function | `lib/api-schema.ts` | 18 |
| `GET` | Function | `app/api/vanhan/route.ts` | 7 |
| `getVanHanContent` | Function | `app/api/vanhan/content.ts` | 642 |
| `detectAIType` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/detect.ts` | 9 |
| `getAITypeDescription` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/detect.ts` | 78 |
| `updateCommand` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/commands/update.ts` | 11 |
| `uninstallCommand` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/commands/uninstall.ts` | 38 |
| `initCommand` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/commands/init.ts` | 116 |
| `fetchReleases` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | 33 |
| `getLatestRelease` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | 52 |
| `downloadRelease` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | 71 |
| `getAssetUrl` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/utils/github.ts` | 89 |
| `versionsCommand` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/src/commands/versions.ts` | 5 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `InitCommand → Prepare` | cross_community | 6 |
| `InitCommand → GitHubRateLimitError` | cross_community | 5 |
| `InitCommand → EnsureDir` | cross_community | 5 |
| `LapLaSoExperience → Success` | cross_community | 4 |
| `InitCommand → GitHubDownloadError` | cross_community | 4 |
| `GET → Prepare` | cross_community | 3 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 2 calls |
| Cluster_274 | 2 calls |
| Hooks | 1 calls |

## How to Explore

1. `gitnexus_context({name: "loadPlatformConfig"})` — see callers and callees
2. `gitnexus_query({query: "commands"})` — find related execution flows
3. Read key files listed above for implementation details
