---
name: tuvi
description: "Skill for the Tuvi area of nextjs-app. 22 symbols across 6 files."
---

# Tuvi

22 symbols | 6 files | Cohesion: 100%

## When to Use

- Working with code in `lib/`
- Understanding how placePhuTinhByCan, placePhuTinhByChi, placePhuTinhByMonth work
- Modifying tuvi-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/tuvi/phuTinh.ts` | addPhu, placePhuTinhByCan, placePhuTinhByChi, placePhuTinhByMonth, placePhuTinhByHour (+2) |
| `lib/tuvi/helpers.ts` | chiIdxToCungIdx, getCanChiNam, getGioChiIdx, parseDateFlexible, getKeyForChi (+1) |
| `lib/tuvi/luuNien.ts` | addLuu, placeLuuNien, applyLuuTuHoa |
| `lib/tuvi/chinhTinh.ts` | placeChinhTinh, getKeyForChi, applyTuHoa |
| `lib/tuvi/engine.ts` | calculateTuVi, transformToEngineResultFormat |
| `app/api/tuvi/route.ts` | POST |

## Entry Points

Start here when exploring this area:

- **`placePhuTinhByCan`** (Function) — `lib/tuvi/phuTinh.ts:69`
- **`placePhuTinhByChi`** (Function) — `lib/tuvi/phuTinh.ts:126`
- **`placePhuTinhByMonth`** (Function) — `lib/tuvi/phuTinh.ts:223`
- **`placePhuTinhByHour`** (Function) — `lib/tuvi/phuTinh.ts:309`
- **`placePhuTinhByDay`** (Function) — `lib/tuvi/phuTinh.ts:330`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `placePhuTinhByCan` | Function | `lib/tuvi/phuTinh.ts` | 69 |
| `placePhuTinhByChi` | Function | `lib/tuvi/phuTinh.ts` | 126 |
| `placePhuTinhByMonth` | Function | `lib/tuvi/phuTinh.ts` | 223 |
| `placePhuTinhByHour` | Function | `lib/tuvi/phuTinh.ts` | 309 |
| `placePhuTinhByDay` | Function | `lib/tuvi/phuTinh.ts` | 330 |
| `placeFixedStars` | Function | `lib/tuvi/phuTinh.ts` | 360 |
| `placeLuuNien` | Function | `lib/tuvi/luuNien.ts` | 45 |
| `chiIdxToCungIdx` | Function | `lib/tuvi/helpers.ts` | 9 |
| `getCanChiNam` | Function | `lib/tuvi/helpers.ts` | 17 |
| `getGioChiIdx` | Function | `lib/tuvi/helpers.ts` | 34 |
| `parseDateFlexible` | Function | `lib/tuvi/helpers.ts` | 54 |
| `getKeyForChi` | Function | `lib/tuvi/helpers.ts` | 67 |
| `parseGanZhi` | Function | `lib/tuvi/helpers.ts` | 74 |
| `calculateTuVi` | Function | `lib/tuvi/engine.ts` | 36 |
| `transformToEngineResultFormat` | Function | `lib/tuvi/engine.ts` | 385 |
| `placeChinhTinh` | Function | `lib/tuvi/chinhTinh.ts` | 14 |
| `getKeyForChi` | Function | `lib/tuvi/chinhTinh.ts` | 27 |
| `applyTuHoa` | Function | `lib/tuvi/chinhTinh.ts` | 58 |
| `POST` | Function | `app/api/tuvi/route.ts` | 5 |
| `addPhu` | Function | `lib/tuvi/phuTinh.ts` | 56 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `POST → ParseDateFlexible` | intra_community | 3 |
| `POST → GetCanChiNam` | intra_community | 3 |
| `POST → ParseGanZhi` | intra_community | 3 |
| `POST → GetGioChiIdx` | intra_community | 3 |

## How to Explore

1. `gitnexus_context({name: "placePhuTinhByCan"})` — see callers and callees
2. `gitnexus_query({query: "tuvi"})` — find related execution flows
3. Read key files listed above for implementation details
