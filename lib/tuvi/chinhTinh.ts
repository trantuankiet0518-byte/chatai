// ============================================================
// CHÍNH TINH - Major Star Placement Logic
// ============================================================

import { chiIdxToCungIdx } from "./helpers";
import type { TuViPalaceData } from "./types";

/**
 * Place the 14 major stars (Chính Tinh) into palaces
 * 
 * Two groups:
 * 1. Tử Vi group: placed from Thìn (chiIdx=4), order depends on soCuc
 * 2. Thiên Phủ group: symmetric opposite through Dần-Thân axis
 */
export function placeChinhTinh(
  cungData: Record<string, TuViPalaceData>,
  cungKeys: string[],
  cungMenhIdx: number,
  ngayAm: number,
  soCuc: number
): void {
  // Group 1: Tử Vi group
  // Start from Thìn (chiIdx=4 → cungIdx=2)
  const idxThin = chiIdxToCungIdx(4); // = 2
  const du = ngayAm % soCuc;
  const idxTuVi = du === 0 ? idxThin : (idxThin + du) % 12;

  const getKeyForChi = (cungIdx: number) =>
    cungKeys[(cungIdx - cungMenhIdx + 12) % 12];

  const tinhPos: Record<string, number> = {};
  tinhPos['Tử Vi'] = idxTuVi;
  tinhPos['Thiên Cơ'] = (idxTuVi - 1 + 12) % 12;
  tinhPos['Thái Dương'] = (idxTuVi - 3 + 12) % 12;
  tinhPos['Vũ Khúc'] = (idxTuVi - 4 + 12) % 12;
  tinhPos['Thiên Đồng'] = (idxTuVi - 5 + 12) % 12;
  tinhPos['Liêm Trinh'] = (idxTuVi - 8 + 12) % 12;

  // Group 2: Thiên Phủ group (symmetric through Dần-Thân axis)
  const idxThiênPhủ = (idxTuVi + 8) % 12;
  tinhPos['Thiên Phủ'] = idxThiênPhủ;
  tinhPos['Thái Âm'] = (idxThiênPhủ + 1) % 12;
  tinhPos['Tham Lang'] = (idxThiênPhủ + 2) % 12;
  tinhPos['Cự Môn'] = (idxThiênPhủ + 3) % 12;
  tinhPos['Thiên Tướng'] = (idxThiênPhủ + 4) % 12;
  tinhPos['Thiên Lương'] = (idxThiênPhủ + 5) % 12;
  tinhPos['Thất Sát'] = (idxThiênPhủ + 6) % 12;
  tinhPos['Phá Quân'] = (idxThiênPhủ + 10) % 12;

  // Place all major stars
  for (const [tinh, idx] of Object.entries(tinhPos)) {
    cungData[getKeyForChi(idx)].chinh_tinh.push(tinh);
  }
}

/**
 * Apply Tứ Hóa (Four Transformations) based on year's Can
 */
export function applyTuHoa(
  canIdx: number,
  cungData: Record<string, TuViPalaceData>,
  cungKeys: string[],
  TU_HOA_TINH: Record<number, { loc: string; quyen: string; khoa: string; ky: string }>
): void {
  const th = TU_HOA_TINH[canIdx];
  if (!th) return;

  for (const key of cungKeys) {
    const ct = cungData[key].chinh_tinh;
    const pt = cungData[key].phu_tinh;
    const push = (h: string) => cungData[key].tu_hoa.push(h);

    // Check major stars
    if (ct.includes(th.loc)) push('Hóa Lộc');
    if (ct.includes(th.quyen)) push('Hóa Quyền');
    if (ct.includes(th.khoa)) push('Hóa Khoa');
    if (ct.includes(th.ky)) push('Hóa Kỵ');

    // Check minor stars that can receive transformations
    if (th.khoa === 'Văn Xương' && pt.includes('Văn Xương')) push('Hóa Khoa');
    if (th.ky === 'Văn Khúc' && pt.includes('Văn Khúc')) push('Hóa Kỵ');
    if (th.khoa === 'Hữu Bật' && pt.includes('Hữu Bật')) push('Hóa Khoa');
    if (th.loc === 'Văn Xương' && pt.includes('Văn Xương')) push('Hóa Lộc');
  }
}
