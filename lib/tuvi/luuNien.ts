// ============================================================
// LƯU NIÊN - Annual Fortune Calculation
// ============================================================

import { chiIdxToCungIdx, getKeyForChi } from "./helpers";
import {
  LOC_CHI_IDX,
  VAN_XUONG_CHI,
  VAN_KHUC_CHI,
  KHOI_CHI,
  VIET_CHI,
  THIEN_MA_CHI,
  HOA_TINH_CHI,
  LINH_TINH_CHI,
  VONG_LUU_THAI_TUE,
  VONG_LUU_BAC_SI,
  TU_HOA_TINH,
  DAO_HOA_CHI,
} from "./constants";
import type { TuViPalaceData } from "./types";

interface LuuNienContext {
  cungData: Record<string, TuViPalaceData>;
  cungKeys: string[];
  cungMenhIdx: number;
  canLNIdx: number;
  chiLNIdx: number;
}

/**
 * Helper to add annual fortune star to a palace
 */
function addLuu(
  cungIdx: number,
  star: string,
  cungData: Record<string, TuViPalaceData>,
  cungKeys: string[],
  cungMenhIdx: number
): void {
  cungData[getKeyForChi(cungIdx, cungMenhIdx, cungKeys)].luu_nien.push(star);
}

/**
 * Place all annual fortune stars (Lưu Niên) for prediction year
 */
export function placeLuuNien(context: LuuNienContext): void {
  const { cungData, cungKeys, cungMenhIdx, canLNIdx, chiLNIdx } = context;

  // Lưu Lộc, Lưu Kình, Lưu Đà (by prediction year's Can)
  const luuLocChiIdx = LOC_CHI_IDX[canLNIdx];
  addLuu(chiIdxToCungIdx(luuLocChiIdx), 'Lưu Lộc', cungData, cungKeys, cungMenhIdx);
  addLuu(chiIdxToCungIdx((luuLocChiIdx + 1) % 12), 'Lưu Kình', cungData, cungKeys, cungMenhIdx);
  addLuu(chiIdxToCungIdx((luuLocChiIdx - 1 + 12) % 12), 'Lưu Đà', cungData, cungKeys, cungMenhIdx);

  // Lưu Thiên Mã
  if (THIEN_MA_CHI[chiLNIdx] !== undefined) {
    addLuu(chiIdxToCungIdx(THIEN_MA_CHI[chiLNIdx]), 'Lưu Mã', cungData, cungKeys, cungMenhIdx);
  }

  // Lưu Hỏa Tinh, Lưu Linh Tinh
  if (HOA_TINH_CHI[chiLNIdx] !== undefined) {
    addLuu(chiIdxToCungIdx(HOA_TINH_CHI[chiLNIdx]), 'Lưu Hỏa', cungData, cungKeys, cungMenhIdx);
  }
  if (LINH_TINH_CHI[chiLNIdx] !== undefined) {
    addLuu(chiIdxToCungIdx(LINH_TINH_CHI[chiLNIdx]), 'Lưu Linh', cungData, cungKeys, cungMenhIdx);
  }

  // Lưu Văn Xương, Lưu Văn Khúc
  addLuu(chiIdxToCungIdx(VAN_XUONG_CHI[canLNIdx]), 'Lưu Văn Xương', cungData, cungKeys, cungMenhIdx);
  addLuu(chiIdxToCungIdx(VAN_KHUC_CHI[canLNIdx]), 'Lưu Văn Khúc', cungData, cungKeys, cungMenhIdx);

  // Lưu Thiên Khôi, Lưu Thiên Việt
  addLuu(chiIdxToCungIdx(KHOI_CHI[canLNIdx]), 'Lưu Thiên Khôi', cungData, cungKeys, cungMenhIdx);
  addLuu(chiIdxToCungIdx(VIET_CHI[canLNIdx]), 'Lưu Thiên Việt', cungData, cungKeys, cungMenhIdx);

  // Lưu Tứ Hóa (mark on luu_nien, don't overwrite original tu_hoa)
  applyLuuTuHoa(canLNIdx, cungData, cungKeys, cungMenhIdx);

  // Lưu Niên Vòng Thái Tuế (start at prediction year's Chi)
  for (let i = 0; i < 12; i++) {
    addLuu(
      chiIdxToCungIdx((chiLNIdx + i) % 12),
      VONG_LUU_THAI_TUE[i],
      cungData, cungKeys, cungMenhIdx
    );
  }

  // Lưu Niên Vòng Bác Sĩ (start at Lưu Lộc)
  for (let i = 0; i < 12; i++) {
    addLuu(
      chiIdxToCungIdx((luuLocChiIdx + i) % 12),
      VONG_LUU_BAC_SI[i],
      cungData, cungKeys, cungMenhIdx
    );
  }

  // Lưu Hồng Loan, Lưu Thiên Hỉ
  const luuHongLoanChi = (3 - chiLNIdx + 12) % 12;
  addLuu(chiIdxToCungIdx(luuHongLoanChi), 'Lưu Hồng Loan', cungData, cungKeys, cungMenhIdx);
  addLuu(chiIdxToCungIdx((luuHongLoanChi + 6) % 12), 'Lưu Thiên Hỉ', cungData, cungKeys, cungMenhIdx);
}

/**
 * Apply annual Four Transformations (Lưu Tứ Hóa)
 */
function applyLuuTuHoa(
  canIdx: number,
  cungData: Record<string, TuViPalaceData>,
  cungKeys: string[],
  cungMenhIdx: number
): void {
  const luuTH = TU_HOA_TINH[canIdx];
  if (!luuTH) return;

  for (const key of cungKeys) {
    const ct = cungData[key].chinh_tinh;
    const pt = cungData[key].phu_tinh;
    const luu = cungData[key].luu_nien;

    // Check major stars
    if (ct.includes(luuTH.loc)) luu.push('Lưu Hóa Lộc');
    if (ct.includes(luuTH.quyen)) luu.push('Lưu Hóa Quyền');
    if (ct.includes(luuTH.khoa)) luu.push('Lưu Hóa Khoa');
    if (ct.includes(luuTH.ky)) luu.push('Lưu Hóa Kỵ');

    // Check minor stars
    if (luuTH.khoa === 'Văn Xương' && pt.includes('Văn Xương')) luu.push('Lưu Hóa Khoa');
    if (luuTH.ky === 'Văn Khúc' && pt.includes('Văn Khúc')) luu.push('Lưu Hóa Kỵ');
    if (luuTH.khoa === 'Hữu Bật' && pt.includes('Hữu Bật')) luu.push('Lưu Hóa Khoa');
  }
}
