// ============================================================
// PHỤ TINH - Minor Star Placement Logic
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
  VONG_THAI_TUE,
  VONG_BAC_SI,
  CO_THAN_CHI,
  QUA_TU_CHI,
  DAO_HOA_CHI,
  KIEP_SAT_CHI,
  PHA_TOAI_CHI,
  LUU_HA_CHI,
  HOA_CAI_CHI,
  GIAI_THAN_CHI,
  THIEN_QUAN_CHI,
  THIEN_PHUC_CHI,
  THIEN_THO_CHI,
  AN_QUANG_CHI,
  THIEN_QUY_CHI,
  THIEN_TRU_CHI,
  QUOC_AN_CHI,
  DUONG_PHU_CHI,
  LONG_TRI_CHI,
  TRIET_LO_CHI,
  NGUYET_DUC_CHI,
  BAT_TOA_CHI,
  PHONG_CAO_CHI,
  TRUC_PHU_CHI,
} from "./constants";
import type { TuViPalaceData } from "./types";

interface StarPlacementContext {
  cungData: Record<string, TuViPalaceData>;
  cungKeys: string[];
  cungMenhIdx: number;
  canNamIdx: number;
  chiNamIdx: number;
  canNgayIdx: number;
  chiNgayIdx: number;
  thangAm: number;
  gioChiIdx: number;
}

/**
 * Helper to add minor star to a palace
 */
function addPhu(
  cungIdx: number,
  star: string,
  cungData: Record<string, TuViPalaceData>,
  cungKeys: string[],
  cungMenhIdx: number
): void {
  cungData[getKeyForChi(cungIdx, cungMenhIdx, cungKeys)].phu_tinh.push(star);
}

/**
 * Place all minor stars based on year's Can
 */
export function placePhuTinhByCan(context: StarPlacementContext): void {
  const { cungData, cungKeys, cungMenhIdx, canNamIdx } = context;

  // Lộc Tồn, Kình Dương, Đà La
  const locChiIdx = LOC_CHI_IDX[canNamIdx];
  addPhu(chiIdxToCungIdx(locChiIdx), 'Lộc Tồn', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx((locChiIdx + 1) % 12), 'Kình Dương', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx((locChiIdx - 1 + 12) % 12), 'Đà La', cungData, cungKeys, cungMenhIdx);

  // Văn Xương, Văn Khúc
  addPhu(chiIdxToCungIdx(VAN_XUONG_CHI[canNamIdx]), 'Văn Xương', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx(VAN_KHUC_CHI[canNamIdx]), 'Văn Khúc', cungData, cungKeys, cungMenhIdx);

  // Thiên Khôi, Thiên Việt
  addPhu(chiIdxToCungIdx(KHOI_CHI[canNamIdx]), 'Thiên Khôi', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx(VIET_CHI[canNamIdx]), 'Thiên Việt', cungData, cungKeys, cungMenhIdx);

  // Vòng Bác Sĩ (12 stars, start at Lộc Tồn, clockwise)
  for (let i = 0; i < 12; i++) {
    addPhu(
      chiIdxToCungIdx((locChiIdx + i) % 12),
      VONG_BAC_SI[i],
      cungData, cungKeys, cungMenhIdx
    );
  }

  // Thiên Quan, Thiên Phúc
  addPhu(chiIdxToCungIdx(THIEN_QUAN_CHI[canNamIdx]), 'Thiên Quan', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx(THIEN_PHUC_CHI[canNamIdx]), 'Thiên Phúc', cungData, cungKeys, cungMenhIdx);

  // Ân Quang, Thiên Quý
  addPhu(chiIdxToCungIdx(AN_QUANG_CHI[canNamIdx]), 'Ân Quang', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx(THIEN_QUY_CHI[canNamIdx]), 'Thiên Quý', cungData, cungKeys, cungMenhIdx);

  // Thiên Trù
  addPhu(chiIdxToCungIdx(THIEN_TRU_CHI[canNamIdx]), 'Thiên Trù', cungData, cungKeys, cungMenhIdx);

  // Quốc Ấn
  addPhu(chiIdxToCungIdx(QUOC_AN_CHI[canNamIdx]), 'Quốc Ấn', cungData, cungKeys, cungMenhIdx);

  // Phong Cáo
  addPhu(chiIdxToCungIdx(PHONG_CAO_CHI[canNamIdx]), 'Phong Cáo', cungData, cungKeys, cungMenhIdx);

  // Trực Phù
  addPhu(chiIdxToCungIdx(TRUC_PHU_CHI[canNamIdx]), 'Trực Phù', cungData, cungKeys, cungMenhIdx);

  // Triệt Lộ (2 palaces)
  const trietLo = TRIET_LO_CHI[canNamIdx];
  if (trietLo) {
    addPhu(chiIdxToCungIdx(trietLo[0]), 'Triệt Lộ', cungData, cungKeys, cungMenhIdx);
    addPhu(chiIdxToCungIdx(trietLo[1]), 'Triệt Lộ', cungData, cungKeys, cungMenhIdx);
  }
}

/**
 * Place all minor stars based on year's Chi
 */
export function placePhuTinhByChi(context: StarPlacementContext): void {
  const { cungData, cungKeys, cungMenhIdx, chiNamIdx, chiNgayIdx } = context;

  // Thiên Mã
  if (THIEN_MA_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(THIEN_MA_CHI[chiNamIdx]), 'Thiên Mã', cungData, cungKeys, cungMenhIdx);
  }

  // Hỏa Tinh, Linh Tinh
  if (HOA_TINH_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(HOA_TINH_CHI[chiNamIdx]), 'Hỏa Tinh', cungData, cungKeys, cungMenhIdx);
  }
  if (LINH_TINH_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(LINH_TINH_CHI[chiNamIdx]), 'Linh Tinh', cungData, cungKeys, cungMenhIdx);
  }

  // Vòng Thái Tuế (12 stars, start at year's Chi, clockwise)
  for (let i = 0; i < 12; i++) {
    addPhu(
      chiIdxToCungIdx((chiNamIdx + i) % 12),
      VONG_THAI_TUE[i],
      cungData, cungKeys, cungMenhIdx
    );
  }

  // Hồng Loan (reverse from Mão), Thiên Hỉ (opposite +6)
  const hongLoanChi = (3 - chiNamIdx + 12) % 12;
  addPhu(chiIdxToCungIdx(hongLoanChi), 'Hồng Loan', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx((hongLoanChi + 6) % 12), 'Thiên Hỉ', cungData, cungKeys, cungMenhIdx);

  // Cô Thần, Quả Tú
  if (CO_THAN_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(CO_THAN_CHI[chiNamIdx]), 'Cô Thần', cungData, cungKeys, cungMenhIdx);
  }
  if (QUA_TU_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(QUA_TU_CHI[chiNamIdx]), 'Quả Tú', cungData, cungKeys, cungMenhIdx);
  }

  // Thiên Diêu & Đào Hoa (same position)
  if (DAO_HOA_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(DAO_HOA_CHI[chiNamIdx]), 'Thiên Diêu', cungData, cungKeys, cungMenhIdx);
    addPhu(chiIdxToCungIdx(DAO_HOA_CHI[chiNamIdx]), 'Đào Hoa', cungData, cungKeys, cungMenhIdx);
  }

  // Kiếp Sát, Phá Toái
  if (KIEP_SAT_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(KIEP_SAT_CHI[chiNamIdx]), 'Kiếp Sát', cungData, cungKeys, cungMenhIdx);
  }
  if (PHA_TOAI_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(PHA_TOAI_CHI[chiNamIdx]), 'Phá Toái', cungData, cungKeys, cungMenhIdx);
  }

  // Lưu Hà
  if (LUU_HA_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(LUU_HA_CHI[chiNamIdx]), 'Lưu Hà', cungData, cungKeys, cungMenhIdx);
  }

  // Hoa Cái
  if (HOA_CAI_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(HOA_CAI_CHI[chiNamIdx]), 'Hoa Cái', cungData, cungKeys, cungMenhIdx);
  }

  // Giải Thần
  if (GIAI_THAN_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(GIAI_THAN_CHI[chiNamIdx]), 'Giải Thần', cungData, cungKeys, cungMenhIdx);
  }

  // Đường Phù
  if (DUONG_PHU_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(DUONG_PHU_CHI[chiNamIdx]), 'Đường Phù', cungData, cungKeys, cungMenhIdx);
  }

  // Long Trì, Phượng Các (opposite +6)
  const longTriChi = LONG_TRI_CHI[chiNamIdx];
  if (longTriChi !== undefined) {
    addPhu(chiIdxToCungIdx(longTriChi), 'Long Trì', cungData, cungKeys, cungMenhIdx);
    addPhu(chiIdxToCungIdx((longTriChi + 6) % 12), 'Phượng Các', cungData, cungKeys, cungMenhIdx);
  }

  // Thiên Khốc, Thiên Hư
  addPhu(chiIdxToCungIdx((chiNamIdx + 6) % 12), 'Thiên Khốc', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx((6 - chiNamIdx + 12) % 12), 'Thiên Hư', cungData, cungKeys, cungMenhIdx);

  // Bát Tọa
  if (BAT_TOA_CHI[chiNamIdx] !== undefined) {
    addPhu(chiIdxToCungIdx(BAT_TOA_CHI[chiNamIdx]), 'Bát Tọa', cungData, cungKeys, cungMenhIdx);
  }

  // Thiên Tài (by day's Chi)
  if (chiNgayIdx >= 0) {
    addPhu(chiIdxToCungIdx(chiNgayIdx), 'Thiên Tài', cungData, cungKeys, cungMenhIdx);
  }
}

/**
 * Place minor stars based on lunar month
 */
export function placePhuTinhByMonth(context: StarPlacementContext): void {
  const { cungData, cungKeys, cungMenhIdx, thangAm } = context;

  // Tả Phụ (clockwise from Thìn chiIdx=4)
  addPhu(
    chiIdxToCungIdx((4 + (thangAm - 1)) % 12),
    'Tả Phụ',
    cungData, cungKeys, cungMenhIdx
  );

  // Hữu Bật (counter-clockwise from Tuất chiIdx=10)
  addPhu(
    chiIdxToCungIdx((10 - (thangAm - 1) + 12) % 12),
    'Hữu Bật',
    cungData, cungKeys, cungMenhIdx
  );

  // Thiên Y (clockwise from Dậu chiIdx=9)
  addPhu(
    chiIdxToCungIdx((9 + (thangAm - 1)) % 12),
    'Thiên Y',
    cungData, cungKeys, cungMenhIdx
  );

  // Thiên Đức (counter-clockwise from Dậu)
  addPhu(
    chiIdxToCungIdx((9 - (thangAm - 1) + 12) % 12),
    'Thiên Đức',
    cungData, cungKeys, cungMenhIdx
  );

  // Thiên Hình (same as Thiên Y)
  addPhu(
    chiIdxToCungIdx((9 + (thangAm - 1)) % 12),
    'Thiên Hình',
    cungData, cungKeys, cungMenhIdx
  );

  // Thiên Riêu (counter-clockwise from Tuất)
  addPhu(
    chiIdxToCungIdx((10 - (thangAm - 1) + 12) % 12),
    'Thiên Riêu',
    cungData, cungKeys, cungMenhIdx
  );

  // Nguyệt Đức
  if (NGUYET_DUC_CHI[thangAm] !== undefined) {
    addPhu(
      chiIdxToCungIdx(NGUYET_DUC_CHI[thangAm]),
      'Nguyệt Đức',
      cungData, cungKeys, cungMenhIdx
    );
  }

  // Thiên Giải (counter-clockwise from Thân chiIdx=8)
  addPhu(
    chiIdxToCungIdx((8 - (thangAm - 1) + 12) % 12),
    'Thiên Giải',
    cungData, cungKeys, cungMenhIdx
  );

  // Địa Giải (clockwise from Hợi chiIdx=11)
  addPhu(
    chiIdxToCungIdx((11 + (thangAm - 1)) % 12),
    'Địa Giải',
    cungData, cungKeys, cungMenhIdx
  );

  // Tam Thai (clockwise from Dần chiIdx=2)
  addPhu(
    chiIdxToCungIdx((2 + (thangAm - 1)) % 12),
    'Tam Thai',
    cungData, cungKeys, cungMenhIdx
  );

  // Thiên Sứ (clockwise from thangAm+1)
  addPhu(
    chiIdxToCungIdx((thangAm + 1) % 12),
    'Thiên Sứ',
    cungData, cungKeys, cungMenhIdx
  );
}

/**
 * Place minor stars based on birth hour
 */
export function placePhuTinhByHour(context: StarPlacementContext): void {
  const { cungData, cungKeys, cungMenhIdx, gioChiIdx } = context;

  // Địa Không (counter-clockwise from Hợi chiIdx=11)
  addPhu(
    chiIdxToCungIdx((11 - gioChiIdx + 12) % 12),
    'Địa Không',
    cungData, cungKeys, cungMenhIdx
  );

  // Địa Kiếp (clockwise from Hợi)
  addPhu(
    chiIdxToCungIdx((11 + gioChiIdx) % 12),
    'Địa Kiếp',
    cungData, cungKeys, cungMenhIdx
  );
}

/**
 * Place minor stars based on birth day
 */
export function placePhuTinhByDay(context: StarPlacementContext): void {
  const { cungData, cungKeys, cungMenhIdx, canNgayIdx, chiNgayIdx } = context;

  // Thiên Thọ (by day's Can)
  const canNgayIdxSafe = canNgayIdx >= 0 ? canNgayIdx : 0;
  addPhu(
    chiIdxToCungIdx(THIEN_THO_CHI[canNgayIdxSafe]),
    'Thiên Thọ',
    cungData, cungKeys, cungMenhIdx
  );

  // Tuần Không (2 empty branches in the 10-year cycle)
  if (chiNgayIdx >= 0 && canNgayIdx >= 0) {
    const tuanStartChi = (chiNgayIdx - canNgayIdx + 12) % 12;
    addPhu(
      chiIdxToCungIdx((tuanStartChi + 10) % 12),
      'Tuần Không',
      cungData, cungKeys, cungMenhIdx
    );
    addPhu(
      chiIdxToCungIdx((tuanStartChi + 11) % 12),
      'Tuần Không',
      cungData, cungKeys, cungMenhIdx
    );
  }
}

/**
 * Place fixed stars (always at same positions)
 */
export function placeFixedStars(
  cungData: Record<string, TuViPalaceData>,
  cungKeys: string[],
  cungMenhIdx: number
): void {
  // Thiên La (Thìn chiIdx=4), Địa Võng (Tuất chiIdx=10)
  addPhu(chiIdxToCungIdx(4), 'Thiên La', cungData, cungKeys, cungMenhIdx);
  addPhu(chiIdxToCungIdx(10), 'Địa Võng', cungData, cungKeys, cungMenhIdx);
}
