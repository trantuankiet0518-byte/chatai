---
name: molecules
description: "Skill for the Molecules area of nextjs-app. 20 symbols across 15 files."
---

# Molecules

20 symbols | 15 files | Cohesion: 73%

## When to Use

- Working with code in `components/`
- Understanding how getPalaceLabel, getStarLabel, DecadeItem work
- Modifying molecules-related functionality

## Key Files

| File | Symbols |
|------|---------|
| `lib/bazi/display.ts` | getPalaceLabel, getStarLabel, getBranchLabel |
| `components/organisms/laplaso/LapLaSoVanHanCard.tsx` | getCurrentAge, LapLaSoVanHanCard |
| `components/molecules/DecadeProgressCard.tsx` | getCurrentAge, DecadeProgressCard |
| `components/molecules/FilterBar.tsx` | FilterBar, handleChange |
| `components/molecules/PalaceCell.tsx` | StarLine |
| `components/molecules/DecadeItem.tsx` | DecadeItem |
| `components/molecules/AnalysisSection.tsx` | AnalysisSection |
| `components/organisms/laplaso/LapLaSoPreview.tsx` | LapLaSoPreview |
| `components/molecules/ThienBan.tsx` | ThienBan |
| `components/molecules/SavedChartCard.tsx` | SavedChartCard |

## Entry Points

Start here when exploring this area:

- **`getPalaceLabel`** (Function) — `lib/bazi/display.ts:163`
- **`getStarLabel`** (Function) — `lib/bazi/display.ts:167`
- **`DecadeItem`** (Function) — `components/molecules/DecadeItem.tsx:8`
- **`AnalysisSection`** (Function) — `components/molecules/AnalysisSection.tsx:8`
- **`LapLaSoVanHanCard`** (Function) — `components/organisms/laplaso/LapLaSoVanHanCard.tsx:22`

## Key Symbols

| Symbol | Type | File | Line |
|--------|------|------|------|
| `getPalaceLabel` | Function | `lib/bazi/display.ts` | 163 |
| `getStarLabel` | Function | `lib/bazi/display.ts` | 167 |
| `DecadeItem` | Function | `components/molecules/DecadeItem.tsx` | 8 |
| `AnalysisSection` | Function | `components/molecules/AnalysisSection.tsx` | 8 |
| `LapLaSoVanHanCard` | Function | `components/organisms/laplaso/LapLaSoVanHanCard.tsx` | 22 |
| `LapLaSoPreview` | Function | `components/organisms/laplaso/LapLaSoPreview.tsx` | 12 |
| `getBranchLabel` | Function | `lib/bazi/display.ts` | 159 |
| `ThienBan` | Function | `components/molecules/ThienBan.tsx` | 7 |
| `SavedChartCard` | Function | `components/molecules/SavedChartCard.tsx` | 14 |
| `DecadeProgressCard` | Function | `components/molecules/DecadeProgressCard.tsx` | 18 |
| `VanHanChartSelector` | Function | `components/organisms/vanhan/VanHanChartSelector.tsx` | 10 |
| `LapLaSoMiniChart` | Function | `components/organisms/laplaso/LapLaSoMiniChart.tsx` | 59 |
| `cn` | Function | `lib/utils.ts` | 0 |
| `SearchBar` | Function | `components/molecules/SearchBar.tsx` | 15 |
| `FormField` | Function | `components/molecules/FormField.tsx` | 13 |
| `FilterBar` | Function | `components/molecules/FilterBar.tsx` | 12 |
| `handleChange` | Function | `components/molecules/FilterBar.tsx` | 15 |
| `StarLine` | Function | `components/molecules/PalaceCell.tsx` | 13 |
| `getCurrentAge` | Function | `components/organisms/laplaso/LapLaSoVanHanCard.tsx` | 10 |
| `getCurrentAge` | Function | `components/molecules/DecadeProgressCard.tsx` | 7 |

## Execution Flows

| Flow | Type | Steps |
|------|------|-------|
| `PalaceDetailModal → GetPalaceLabel` | cross_community | 3 |
| `PalaceDetailModal → GetBranchLabel` | cross_community | 3 |

## How to Explore

1. `gitnexus_context({name: "getPalaceLabel"})` — see callers and callees
2. `gitnexus_query({query: "molecules"})` — find related execution flows
3. Read key files listed above for implementation details
