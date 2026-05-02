---
name: services
description: "Skill for the Services area of nextjs-app. 57 symbols across 19 files."
---

# Services

57 symbols | 19 files | Cohesion: 81%

## When to Use

- Working with code in `lib/`
- Understanding how readSavedCharts, writeSavedCharts, saveChart work
- Modifying services-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/services/savedCharts.ts` | readJson, writeJson, serializeSavedCharts, readSavedCharts, writeSavedCharts (+5) |
| `lib/services/authSession.ts` | writeAuthSession, clearAuthSession, readPendingRoute, clearPendingRoute, readJson (+3) |
| `lib/services/profile.ts` | parseSolarDateTime, mapGenderLabelToDraftValue, syncProfileCache, readLatestSavedChart, writeJson (+3) |
| `components/organisms/shared/Navbar.tsx` | handleLogout, hasProfileData, formatProfileLine, Navbar, isActive (+2) |
| `lib/services/api.ts` | isApiResult, toFailureResult, postJson, getJson |
| `lib/services/auth.ts` | buildSession, submitLogin, submitRegister |
| `components/organisms/hoso/ProfileSettingsPanel.tsx` | handleLoadLatest, handleSave, handleReset |
| `components/organisms/shared/Sidebar.tsx` | Sidebar, handleProtectedClick |
| `lib/services/authGuard.ts` | normalizePathname, isProtectedRoute |
| `lib/hooks/useSavedCharts.ts` | useSavedCharts |

## Entry Points

Start here when exploring this area:

- **`readSavedCharts`** (Function) — `lib/services/savedCharts.ts:45`
- **`writeSavedCharts`** (Function) — `lib/services/savedCharts.ts:59`
- **`saveChart`** (Function) — `lib/services/savedCharts.ts:70`
- **`deleteChart`** (Function) — `lib/services/savedCharts.ts:100`
- **`isChartSaved`** (Function) — `lib/services/savedCharts.ts:106`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `readSavedCharts` | Function | `lib/services/savedCharts.ts` | 45 |
| `writeSavedCharts` | Function | `lib/services/savedCharts.ts` | 59 |
| `saveChart` | Function | `lib/services/savedCharts.ts` | 70 |
| `deleteChart` | Function | `lib/services/savedCharts.ts` | 100 |
| `isChartSaved` | Function | `lib/services/savedCharts.ts` | 106 |
| `getSavedChartId` | Function | `lib/services/savedCharts.ts` | 114 |
| `useSavedCharts` | Function | `lib/hooks/useSavedCharts.ts` | 17 |
| `SavedChartsList` | Function | `components/organisms/laplaso/SavedChartsList.tsx` | 84 |
| `LapLaSoDetail` | Function | `components/organisms/laplaso/LapLaSoDetail.tsx` | 16 |
| `writeAuthSession` | Function | `lib/services/authSession.ts` | 42 |
| `clearAuthSession` | Function | `lib/services/authSession.ts` | 59 |
| `readPendingRoute` | Function | `lib/services/authSession.ts` | 74 |
| `clearPendingRoute` | Function | `lib/services/authSession.ts` | 80 |
| `submitLogin` | Function | `lib/services/auth.ts` | 12 |
| `submitRegister` | Function | `lib/services/auth.ts` | 28 |
| `handleSubmit` | Function | `features/auth/RegisterForm.tsx` | 19 |
| `handleSubmit` | Function | `features/auth/LoginForm.tsx` | 19 |
| `handleLogout` | Function | `components/organisms/shared/Navbar.tsx` | 133 |
| `readJson` | Function | `lib/services/authSession.ts` | 14 |
| `readAuthSession` | Function | `lib/services/authSession.ts` | 25 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `ProfileSettingsPanel → ReadJson` | cross_community | 6 |
| `ProfileSettingsPanel → SerializeSavedCharts` | cross_community | 6 |
| `LapLaSoDetail → ReadJson` | intra_community | 5 |
| `LapLaSoDetail → SerializeSavedCharts` | intra_community | 5 |
| `LapLaSoDetail → WriteJson` | intra_community | 5 |
| `HandleSave → ReadJson` | cross_community | 5 |
| `HandleSave → SerializeSavedCharts` | cross_community | 5 |
| `Navbar → NormalizePathname` | cross_community | 4 |
| `ProfileSettingsPanel → ParseSolarDateTime` | cross_community | 4 |
| `ProfileSettingsPanel → MapGenderLabelToDraftValue` | cross_community | 4 |

## Connected Areas

| Area | Connections |
|------|-------------|
| Commands | 5 calls |
| Scripts | 2 calls |
| Molecules | 1 calls |

## How to Explore

1. `gitnexus_context({name: "readSavedCharts"})` — see callers and callees
2. `gitnexus_query({query: "services"})` — find related execution flows
3. Read key files listed above for implementation details
