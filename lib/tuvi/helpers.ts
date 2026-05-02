// ============================================================
// HELPER FUNCTIONS - TuVi Helpers
// ============================================================

import { CHI, CUNG } from "./constants";

/**
 * Convert CHI index (0=Tý, 1=Sửu, 2=Dần, ...) to CUNG index (0=Dần, 1=Mão, ..., 11=Sửu)
 */
export function chiIdxToCungIdx(chiIdx: number): number {
  const map = [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return map[chiIdx];
}

/**
 * Get Can Chi for a given lunar year
 */
export function getCanChiNam(namAm: number): {
  can: string;
  chi: string;
  canIdx: number;
  chiIdx: number;
} {
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  
  const canIdx = ((namAm - 4) % 10 + 10) % 10;
  const chiIdx = ((namAm - 4) % 12 + 12) % 12;
  return { can: CAN[canIdx], chi: CHI[chiIdx], canIdx, chiIdx };
}

/**
 * Get CHI index for a given time (hour:minute)
 */
export function getGioChiIdx(gio: number, phut: number): number {
  const h = gio + phut / 60;
  if (h >= 23 || h < 1) return 0; // Tý
  if (h >= 1 && h < 3) return 1; // Sửu
  if (h >= 3 && h < 5) return 2; // Dần
  if (h >= 5 && h < 7) return 3; // Mão
  if (h >= 7 && h < 9) return 4; // Thìn
  if (h >= 9 && h < 11) return 5; // Tỵ
  if (h >= 11 && h < 13) return 6; // Ngọ
  if (h >= 13 && h < 15) return 7; // Mùi
  if (h >= 15 && h < 17) return 8; // Thân
  if (h >= 17 && h < 19) return 9; // Dậu
  if (h >= 19 && h < 21) return 10; // Tuất
  if (h >= 21 && h < 23) return 11; // Hợi
  return 0;
}

/**
 * Parse date string in either DD/MM/YYYY or YYYY-MM-DD format
 */
export function parseDateFlexible(dateStr: string): [number, number, number] {
  const parts = dateStr.split(/[\/\-]/).map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    throw new Error(`Ngày không hợp lệ: ${dateStr}`);
  }
  return parts[0] > 1000
    ? [parts[2], parts[1], parts[0]] // YYYY-MM-DD -> [d, m, y]
    : [parts[0], parts[1], parts[2]]; // DD/MM/YYYY
}

/**
 * Get CUNG key from CHI index relative to Menh palace
 */
export function getKeyForChi(cungIdx: number, cungMenhIdx: number, cungKeys: string[]): string {
  return cungKeys[(cungIdx - cungMenhIdx + 12) % 12];
}

/**
 * Parse GanZhi string to get Can and Chi
 */
export function parseGanZhi(ganZhi: string): { can: string; chi: string; canIdx: number; chiIdx: number } {
  const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
  const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  
  let can = '';
  let chi = '';
  
  for (const c of CAN) {
    if (ganZhi.startsWith(c)) {
      can = c;
      chi = ganZhi.slice(c.length).trim();
      break;
    }
  }
  
  const canIdx = CAN.indexOf(can);
  const chiIdx = CHI.indexOf(chi);
  
  return { can, chi, canIdx, chiIdx };
}
