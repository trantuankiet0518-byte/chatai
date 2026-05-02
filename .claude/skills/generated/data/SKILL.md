---
name: data
description: "Skill for the Data area of nextjs-app. 18 symbols across 2 files."
---

# Data

18 symbols | 2 files | Cohesion: 72%

## When to Use

- Working with code in `_backup_cleanup/`
- Understanding how lum, is_dark, on_color work
- Modifying data-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | lum, is_dark, on_color, derive_row, rebuild_colors (+4) |
| `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | lum, is_dark, on_color, derive_row, rebuild_colors (+4) |

## Entry Points

Start here when exploring this area:

- **`lum`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py:21`
- **`is_dark`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py:26`
- **`on_color`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py:29`
- **`derive_row`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py:41`
- **`rebuild_colors`** (Function) — `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py:187`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `lum` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 21 |
| `is_dark` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 26 |
| `on_color` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 29 |
| `derive_row` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 41 |
| `rebuild_colors` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 187 |
| `lum` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 21 |
| `is_dark` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 26 |
| `on_color` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 29 |
| `derive_row` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 41 |
| `rebuild_colors` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 187 |
| `h2r` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 14 |
| `r2h` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 18 |
| `blend` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 32 |
| `shift` | Function | `_backup_cleanup/ui-ux-pro-max-skill/src/ui-ux-pro-max/data/_sync_all.py` | 37 |
| `h2r` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 14 |
| `r2h` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 18 |
| `blend` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 32 |
| `shift` | Function | `_backup_cleanup/ui-ux-pro-max-skill/cli/assets/data/_sync_all.py` | 37 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `Derive_row → H2r` | cross_community | 4 |
| `Derive_row → H2r` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Scripts | 2 calls |

## How to Explore

1. `gitnexus_context({name: "lum"})` — see callers and callees
2. `gitnexus_query({query: "data"})` — find related execution flows
3. Read key files listed above for implementation details
