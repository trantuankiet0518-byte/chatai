// ============================================================
// TU VI ENGINE - Main Calculation Function
// ============================================================

import { Solar, Lunar } from "lunar-javascript";
import {
  CAN,
  CHI,
  CUNG,
  NAP_AM_NGU_HANH,
  SO_CUC_MAP,
  TU_HOA_TINH,
} from "./constants";
import {
  chiIdxToCungIdx,
  getCanChiNam,
  getGioChiIdx,
  parseDateFlexible,
  getKeyForChi,
  parseGanZhi,
} from "./helpers";
import { placeChinhTinh, applyTuHoa } from "./chinhTinh";
import {
  placePhuTinhByCan,
  placePhuTinhByChi,
  placePhuTinhByMonth,
  placePhuTinhByHour,
  placePhuTinhByDay,
  placeFixedStars,
} from "./phuTinh";
import { placeLuuNien } from "./luuNien";
import type { TuViInput, TuViResult, TuViPalaceData } from "./types";

/**
 * Main TuVi calculation function
 */
export async function calculateTuVi(input: TuViInput): Promise<TuViResult> {
  const { ho_ten, ngay_sinh, loai_lich, gio_sinh, gioi_tinh, ngay_du_doan } = input;

  // ──────────────────────────────────────────────
  // 1. Parse and convert to Lunar calendar
  // ──────────────────────────────────────────────
  let d: number, m: number, y: number;
  [d, m, y] = parseDateFlexible(ngay_sinh);

  let lunar: any;
  const loaiLichToken = String(loai_lich).toLowerCase().trim().split(' ')[0];
  const isDuong = ['duong', 'dương', 'solar', 'duong_lich'].includes(loaiLichToken);

  try {
    if (isDuong) {
      lunar = Solar.fromYmd(y, m, d).getLunar();
    } else {
      if (y < 1900 || y > 2100) throw new Error('Năm âm không hợp lệ (1900-2100)');
      lunar = Lunar.fromYmd(y, m, d);
    }
  } catch (e: any) {
    throw new Error(`Ngày ${d}/${m}/${y} (${loai_lich}) không hợp lệ: ${e.message}`);
  }

  const namAm = lunar.getYear();
  const thangAm = lunar.getMonth();
  const ngayAm = lunar.getDay();

  // ──────────────────────────────────────────────
  // 2. Can Chi for year/hour
  // ──────────────────────────────────────────────
  const { can: canNam, chi: chiNam, canIdx: canNamIdx, chiIdx: chiNamIdx } = getCanChiNam(namAm);

  // Can Chi for birth day
  const ganZhiNgaySinh = lunar.getDayInGanZhi() as string;
  const { can: canNgay, chi: chiNgay, canIdx: canNgayIdx, chiIdx: chiNgayIdx } = parseGanZhi(ganZhiNgaySinh);

  // Birth hour
  const [gio, phut] = gio_sinh.split(':').map(Number);
  const gioChiIdx = getGioChiIdx(gio, phut);
  const gioChi = CHI[gioChiIdx];

  // ──────────────────────────────────────────────
  // 3. Destiny elements
  // ──────────────────────────────────────────────
  const nguHanh = NAP_AM_NGU_HANH[`${canNam} ${chiNam}`] || 'Mộc';
  const soCuc = SO_CUC_MAP[nguHanh];
  const amDuong = canNamIdx % 2 === 0 ? 'Dương' : 'Âm';

  // ──────────────────────────────────────────────
  // 4. Menh and Than palaces
  // ──────────────────────────────────────────────
  const chiThangIdx = (thangAm + 1) % 12;
  const cungThangIdx = chiIdxToCungIdx(chiThangIdx);

  const cungMenhIdx = (cungThangIdx - gioChiIdx + 12) % 12;
  const cungThanIdx = (cungThangIdx + gioChiIdx) % 12;
  const cungMenh = CUNG[cungMenhIdx];
  const cungThan = CUNG[cungThanIdx];

  // ──────────────────────────────────────────────
  // 5. Initialize 12 palaces
  // ──────────────────────────────────────────────
  const cungKeys = [
    'menh', 'phu_mau', 'phuc_duc', 'dien_trach',
    'quan_loc', 'no_boc', 'thien_di', 'tat_ach',
    'tai_bach', 'tu_tuc', 'phu_the', 'huynh_de',
  ];

  const cungData: Record<string, TuViPalaceData> = {};

  for (let i = 0; i < 12; i++) {
    const idx = (cungMenhIdx + i) % 12;
    cungData[cungKeys[i]] = {
      dia_chi: CUNG[idx],
      chinh_tinh: [],
      phu_tinh: [],
      tu_hoa: [],
      luu_nien: [],
    };
  }

  // ──────────────────────────────────────────────
  // 6. Place major stars (Chính Tinh)
  // ──────────────────────────────────────────────
  placeChinhTinh(cungData, cungKeys, cungMenhIdx, ngayAm, soCuc);

  // ──────────────────────────────────────────────
  // 7. Apply Four Transformations (Tứ Hóa)
  // ──────────────────────────────────────────────
  applyTuHoa(canNamIdx, cungData, cungKeys, TU_HOA_TINH);

  // ──────────────────────────────────────────────
  // 8. Place minor stars (Phụ Tinh)
  // ──────────────────────────────────────────────
  const starContext = {
    cungData, cungKeys, cungMenhIdx,
    canNamIdx, chiNamIdx,
    canNgayIdx, chiNgayIdx,
    thangAm, gioChiIdx,
  };

  placePhuTinhByCan(starContext);
  placePhuTinhByChi(starContext);
  placePhuTinhByMonth(starContext);
  placePhuTinhByHour(starContext);
  placePhuTinhByDay(starContext);
  placeFixedStars(cungData, cungKeys, cungMenhIdx);

  // ──────────────────────────────────────────────
  // 9. Calculate Dai Han / Tieu Han / Current age
  // ──────────────────────────────────────────────
  const solarNow = Solar.fromYmd(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  const lunarNow = solarNow.getLunar();
  const namAmNow = lunarNow.getYear();
  const tuoiHT = namAmNow - namAm + 1;

  const startDai = (cungMenhIdx + 1) % 12;
  const soThuTuDai = Math.ceil(tuoiHT / soCuc);
  const soThuTuMod = ((((soThuTuDai - 1) % 12) + 12) % 12) + 1;
  const idxDaiHT = (startDai + soThuTuMod - 1) % 12;
  const soThuTuTiep = (soThuTuMod % 12) + 1;
  const idxDaiTiep = (startDai + soThuTuTiep - 1) % 12;

  const tuoiDaiHTStart = (soThuTuMod - 1) * soCuc + 1;
  const tuoiDaiHTEnd = soThuTuMod * soCuc;

  // Tieu han
  let idxTieuHanHT: number;
  if (gioi_tinh.toLowerCase() === 'nam') {
    idxTieuHanHT = (tuoiHT - 1) % 12;
  } else {
    idxTieuHanHT = (6 - (tuoiHT - 1) + 12 * 1000) % 12;
  }
  const cungTieuHanHT = CUNG[idxTieuHanHT];

  // ──────────────────────────────────────────────
  // 10. Prediction date & Annual Fortune
  // ──────────────────────────────────────────────
  let d2: number, m2: number, y2: number;
  [d2, m2, y2] = parseDateFlexible(ngay_du_doan);

  const solarPred = Solar.fromYmd(y2, m2, d2);
  const lunarPred = solarPred.getLunar();
  const namAmPred = lunarPred.getYear();

  // Can Chi for prediction year
  const { can: canLN, chi: chiLN, canIdx: canLNIdx, chiIdx: chiLNIdx } = getCanChiNam(namAmPred);

  // Place annual fortune stars
  placeLuuNien({
    cungData, cungKeys, cungMenhIdx,
    canLNIdx, chiLNIdx,
  });

  // ──────────────────────────────────────────────
  // 11. Daily prediction & Five Elements
  // ──────────────────────────────────────────────
  const ganZhiPred = lunarPred.getDayInGanZhi() as string;
  const { can: canNgayPred, chi: chiNgayPred } = parseGanZhi(ganZhiPred);

  const hanhCanNgayPred = NAP_AM_NGU_HANH[`${canNgayPred} ${chiNgayPred}`] || 'Mộc';
  const nguHanhOrder = ['Mộc', 'Hỏa', 'Thổ', 'Kim', 'Thủy'];
  const idxHanh = nguHanhOrder.indexOf(hanhCanNgayPred);
  const idxMenh = nguHanhOrder.indexOf(nguHanh);

  let tuongSinh = 'trung hòa';
  if ((idxHanh + 1) % 5 === idxMenh) tuongSinh = 'tương sinh (ngày sinh mệnh)';
  else if ((idxMenh + 1) % 5 === idxHanh) tuongSinh = 'tương sinh (mệnh sinh ngày)';
  else if ((idxHanh + 2) % 5 === idxMenh) tuongSinh = 'tương khắc (ngày khắc mệnh)';
  else if ((idxMenh + 2) % 5 === idxHanh) tuongSinh = 'tương khắc (mệnh khắc ngày)';

  let diem = 5;
  if (tuongSinh.includes('tương sinh')) diem += 3;
  if (tuongSinh.includes('tương khắc')) diem -= 3;
  diem = Math.max(0, Math.min(10, diem));

  const hanhDesc: Record<string, { tot: string; chuy: string }> = {
    Mộc: { tot: 'Mộc: giáo dục, sáng tạo', chuy: 'Mộc: quyết định chậm' },
    Hỏa: { tot: 'Hỏa: truyền thông, năng lượng', chuy: 'Hỏa: dễ nóng giận' },
    Thổ: { tot: 'Thổ: bất động sản, tài chính', chuy: 'Thổ: bảo thủ' },
    Kim: { tot: 'Kim: kim hoàn, công nghệ', chuy: 'Kim: cứng nhắc' },
    Thủy: { tot: 'Thủy: giao thông, thương mại', chuy: 'Thủy: dễ thay đổi' },
  };
  const linhVucTot = hanhDesc[hanhCanNgayPred] ? [hanhDesc[hanhCanNgayPred].tot] : [];
  const linhVucCanChuY = hanhDesc[hanhCanNgayPred] ? [hanhDesc[hanhCanNgayPred].chuy] : [];

  const huongMap: Record<string, string> = { Mộc: 'Đông', Hỏa: 'Nam', Thổ: 'Trung', Kim: 'Tây', Thủy: 'Bắc' };
  const mauMap: Record<string, string> = { Mộc: 'Xanh lá', Hỏa: 'Đỏ', Thổ: 'Vàng/Nâu', Kim: 'Trắng', Thủy: 'Đen/Xanh dương' };

  // ──────────────────────────────────────────────
  // 12. Build result
  // ──────────────────────────────────────────────
  const daiHanKey = getKeyForChi(idxDaiHT, cungMenhIdx, cungKeys);
  const tiepKey = getKeyForChi(idxDaiTiep, cungMenhIdx, cungKeys);
  const tieuHanKey = getKeyForChi(idxTieuHanHT, cungMenhIdx, cungKeys);

  const result: TuViResult = {
    thong_tin_co_ban: {
      ho_ten, gioi_tinh,
      duong_lich: `${ngay_sinh} ${gio_sinh}`,
      am_lich: `${ngayAm}/${thangAm}/${namAm} ${gio_sinh}`,
      gio_sinh, gio_chi: gioChi,
      can_chi_nam: `${canNam} ${chiNam}`,
      can_chi_ngay_sinh: `${canNgay} ${chiNgay}`,
      ngu_hanh_menh_cuc: nguHanh,
      so_cuc: soCuc,
      am_duong: amDuong,
    },

    cung_menh_than: {
      cung_menh: {
        dia_chi: cungMenh,
        chinh_tinh: cungData['menh'].chinh_tinh,
        phu_tinh: cungData['menh'].phu_tinh,
        tu_hoa: cungData['menh'].tu_hoa,
        luu_nien: cungData['menh'].luu_nien,
      },
      cung_than: {
        dia_chi: cungThan,
        chinh_tinh: cungData[getKeyForChi(cungThanIdx, cungMenhIdx, cungKeys)].chinh_tinh,
        phu_tinh: cungData[getKeyForChi(cungThanIdx, cungMenhIdx, cungKeys)].phu_tinh,
        tu_hoa: cungData[getKeyForChi(cungThanIdx, cungMenhIdx, cungKeys)].tu_hoa,
        luu_nien: cungData[getKeyForChi(cungThanIdx, cungMenhIdx, cungKeys)].luu_nien,
      },
    },

    '12_cung': {} as Record<string, TuViPalaceData>,

    van_han: {
      dai_han_hien_tai: {
        cung: CUNG[idxDaiHT],
        tuoi_bat_dau: tuoiDaiHTStart,
        tuoi_ket_thuc: tuoiDaiHTEnd,
        chinh_tinh: cungData[daiHanKey].chinh_tinh,
        phu_tinh: cungData[daiHanKey].phu_tinh,
        tu_hoa: cungData[daiHanKey].tu_hoa,
        luu_nien: cungData[daiHanKey].luu_nien,
      },
      dai_han_tiep_theo: {
        cung: CUNG[idxDaiTiep],
        tuoi_bat_dau: tuoiDaiHTEnd + 1,
        tuoi_ket_thuc: tuoiDaiHTEnd + soCuc,
        chinh_tinh: cungData[tiepKey].chinh_tinh,
        phu_tinh: cungData[tiepKey].phu_tinh,
        tu_hoa: cungData[tiepKey].tu_hoa,
        luu_nien: cungData[tiepKey].luu_nien,
      },
      tieu_han_hien_tai: {
        nam: namAmNow,
        can_chi_nam: `${CAN[(namAmNow + idxTieuHanHT) % 10]} ${CHI[idxTieuHanHT]}`,
        cung: cungTieuHanHT,
        chinh_tinh: cungData[tieuHanKey].chinh_tinh,
        phu_tinh: cungData[tieuHanKey].phu_tinh,
        tu_hoa: cungData[tieuHanKey].tu_hoa,
        luu_nien: cungData[tieuHanKey].luu_nien,
      },
    },

    luu_nien_nam: {
      can_chi_nam_du_doan: `${canLN} ${chiLN}`,
      nam_am: namAmPred,
      can_idx: canLNIdx,
      chi_idx: chiLNIdx,
    },

    du_doan_ngay: {
      ngay: ngay_du_doan,
      can_chi_ngay: `${canNgayPred} ${chiNgayPred}`,
      ngu_hanh_ngay: hanhCanNgayPred,
      tuong_sinh_khac: tuongSinh,
      ket_qua_tong_quat: tuongSinh.includes('tương sinh')
        ? 'Ngày tốt, hợp với mệnh'
        : tuongSinh.includes('tương khắc')
          ? 'Ngày khó, cần cẩn trọng'
          : 'Bình thường',
      diem_may_man: diem,
      linh_vuc_tot: linhVucTot,
      linh_vuc_can_chu_y: linhVucCanChuY,
      gio_tot: ['11h-13h (Ngọ)'],
      huong_xuat_hanh: huongMap[nguHanh] || 'Trung',
      mau_sac_ho_tro: mauMap[nguHanh] || '',
    },
  };

  // Fill 12 palaces
  for (const key of cungKeys) {
    result['12_cung'][key] = {
      dia_chi: cungData[key].dia_chi,
      chinh_tinh: cungData[key].chinh_tinh,
      phu_tinh: cungData[key].phu_tinh,
      tu_hoa: cungData[key].tu_hoa,
      luu_nien: cungData[key].luu_nien,
    };
  }

  return result;
}

/**
 * Transform TuViResult to legacy TuViEngineResult format for backward compatibility
 */

// Star quality calculation (same as lib/bazi/engine.ts)
const STAR_QUALITY: Record<string, { mieu:number[]; vuong:number[]; dac:number[]; ham:number[] }> = {
  "Tử Vi":      { mieu:[2,8],  vuong:[0,6],  dac:[1,3,7,9], ham:[4,5,10,11] },
  "Thiên Cơ":   { mieu:[1,5,7,11], vuong:[0,6], dac:[2,8], ham:[3,4,9,10] },
  "Thái Dương": { mieu:[2,6],  vuong:[3,9],  dac:[1,7],  ham:[0,4,5,8,10,11] },
  "Vũ Khúc":    { mieu:[3,9],  vuong:[1,7],  dac:[2,8],  ham:[0,5,6,11] },
  "Thiên Đồng": { mieu:[0,6],  vuong:[3,9],  dac:[2,8],  ham:[1,4,5,7,10,11] },
  "Liêm Trinh": { mieu:[2,8],  vuong:[0,6],  dac:[3,9],  ham:[1,5,7,11] },
  "Thiên Phủ":  { mieu:[2,8],  vuong:[0,6],  dac:[4,10], ham:[1,5,7,11] },
  "Thái Âm":    { mieu:[0,6],  vuong:[9,10], dac:[1,7],  ham:[3,4,5] },
  "Tham Lang":  { mieu:[2,8],  vuong:[0,6],  dac:[4,10], ham:[1,5,7,11] },
  "Cự Môn":     { mieu:[3,9],  vuong:[0,6],  dac:[1,7],  ham:[4,10] },
  "Thiên Tướng":{ mieu:[1,7],  vuong:[2,8],  dac:[0,6],  ham:[3,5,9,11] },
  "Thiên Lương":{ mieu:[2,8],  vuong:[0,6],  dac:[3,9],  ham:[1,5,7,11] },
  "Thất Sát":   { mieu:[1,7],  vuong:[2,8],  dac:[4,10], ham:[0,3,6,9] },
  "Phá Quân":   { mieu:[0,6],  vuong:[3,9],  dac:[2,8],  ham:[1,5,7,11] },
};

// Star elements
const STAR_ELEMENT: Record<string, string> = {
  "Tử Vi": "Thổ", "Thiên Cơ": "Mộc", "Thái Dương": "Hỏa", "Vũ Khúc": "Kim",
  "Thiên Đồng": "Thủy", "Liêm Trinh": "Hỏa", "Thiên Phủ": "Thổ", "Thái Âm": "Thủy",
  "Tham Lang": "Mộc", "Cự Môn": "Thủy", "Thiên Tướng": "Thủy", "Thiên Lương": "Thổ",
  "Thất Sát": "Kim", "Phá Quân": "Thủy",
};

function getStarQuality(starName: string, cungIdx: number): "mieu_dia" | "vuong_dia" | "dac_dia" | "binh_hoa" | "ham_dia" {
  const q = STAR_QUALITY[starName];
  if (!q) return "binh_hoa";
  if (q.mieu.includes(cungIdx)) return "mieu_dia";
  if (q.vuong.includes(cungIdx)) return "vuong_dia";
  if (q.dac.includes(cungIdx))  return "dac_dia";
  if (q.ham.includes(cungIdx))  return "ham_dia";
  return "binh_hoa";
}

// Map chi to cung index for quality calculation
const CHI_TO_CUNG_IDX: Record<string, number> = {
  "Tý": 10, "Sửu": 11, "Dần": 0, "Mão": 1, "Thìn": 2, "Tỵ": 3,
  "Ngọ": 4, "Mùi": 5, "Thân": 6, "Dậu": 7, "Tuất": 8, "Hợi": 9,
};

export function transformToEngineResultFormat(result: TuViResult, profile: {
  fullName: string;
  gender: string;
  calendarType: string;
  birthDate: string;
  birthTime: string;
  timezone: string;
}): any {
  const { thong_tin_co_ban, cung_menh_than, '12_cung': twelvePalaces, van_han, du_doan_ngay } = result;

  // Transform palaces to expected format
  const palaces = Object.entries(twelvePalaces).map(([key, palace]) => {
    const cungIdx = CHI_TO_CUNG_IDX[palace.dia_chi] ?? 0;
    
    return {
      name: key,
      branch: palace.dia_chi,
      element: '',
      isLifePalace: key === 'menh',
      isBodyPalace: key === 'than',
      majorStars: palace.chinh_tinh.map(name => ({
        name,
        type: 'chinh_tinh' as const,
        quality: getStarQuality(name, cungIdx),
        element: STAR_ELEMENT[name] || 'Thổ',
      })),
      minorStars: palace.phu_tinh.map(name => ({
        name,
        type: 'phu_tinh' as const,
        quality: 'binh_hoa' as const,
        element: 'Thổ',
      })),
      note: palace.tu_hoa.join(', '),
    };
  });

  // Build summary
  const summary = [
    `Mệnh: ${cung_menh_than.cung_menh.dia_chi}`,
    `Thân: ${cung_menh_than.cung_than.dia_chi}`,
    `Ngũ hành: ${thong_tin_co_ban.ngu_hanh_menh_cuc}`,
    `Số cục: ${thong_tin_co_ban.so_cuc}`,
    `Âm Dương: ${thong_tin_co_ban.am_duong}`,
    `Can Chi năm: ${thong_tin_co_ban.can_chi_nam}`,
    `Can Chi ngày: ${thong_tin_co_ban.can_chi_ngay_sinh}`,
  ];

  // Extract key stars
  const keyStars = [...new Set([
    ...cung_menh_than.cung_menh.chinh_tinh,
    ...cung_menh_than.cung_menh.phu_tinh,
  ])].slice(0, 10);

  // Decade cycles
  const decadeCycles = [
    {
      palace: van_han.dai_han_hien_tai.cung,
      branch: '',
      startAge: van_han.dai_han_hien_tai.tuoi_bat_dau,
      endAge: van_han.dai_han_hien_tai.tuoi_ket_thuc,
      focus: 'Đại hạn hiện tại',
    },
    {
      palace: van_han.dai_han_tiep_theo.cung,
      branch: '',
      startAge: van_han.dai_han_tiep_theo.tuoi_bat_dau,
      endAge: van_han.dai_han_tiep_theo.tuoi_ket_thuc,
      focus: 'Đại hạn tiếp theo',
    },
  ];

  // Analysis
  const coreTraits = [
    `Mệnh cư ${cung_menh_than.cung_menh.dia_chi}`,
    `Thân cư ${cung_menh_than.cung_than.dia_chi}`,
    `Ngũ hành ${thong_tin_co_ban.ngu_hanh_menh_cuc}`,
  ];

  const career = [
    'Phân tích nghề nghiệp đang được phát triển',
  ];

  const relationship = [
    'Phân tích tình duyên đang được phát triển',
  ];

  // Get cungIdx for menh and than
  const menhCungIdx = CHI_TO_CUNG_IDX[cung_menh_than.cung_menh.dia_chi] ?? 0;
  const thanCungIdx = CHI_TO_CUNG_IDX[cung_menh_than.cung_than.dia_chi] ?? 0;

  return {
    lifePalace: {
      name: 'menh',
      branch: cung_menh_than.cung_menh.dia_chi,
      element: thong_tin_co_ban.ngu_hanh_menh_cuc,
      isLifePalace: true,
      isBodyPalace: false,
      majorStars: cung_menh_than.cung_menh.chinh_tinh.map(name => ({
        name,
        type: 'chinh_tinh' as const,
        quality: getStarQuality(name, menhCungIdx),
        element: STAR_ELEMENT[name] || 'Thổ',
      })),
      minorStars: cung_menh_than.cung_menh.phu_tinh.map(name => ({
        name,
        type: 'phu_tinh' as const,
        quality: 'binh_hoa' as const,
        element: 'Thổ',
      })),
      note: cung_menh_than.cung_menh.tu_hoa.join(', '),
    },
    bodyPalace: {
      name: 'than',
      branch: cung_menh_than.cung_than.dia_chi,
      element: '',
      isLifePalace: false,
      isBodyPalace: true,
      majorStars: cung_menh_than.cung_than.chinh_tinh.map(name => ({
        name,
        type: 'chinh_tinh' as const,
        quality: getStarQuality(name, thanCungIdx),
        element: STAR_ELEMENT[name] || 'Thổ',
      })),
      minorStars: cung_menh_than.cung_than.phu_tinh.map(name => ({
        name,
        type: 'phu_tinh' as const,
        quality: 'binh_hoa' as const,
        element: 'Thổ',
      })),
      note: cung_menh_than.cung_than.tu_hoa.join(', '),
    },
    careerPalace: palaces.find(p => p.name === 'quan_loc') || palaces[4],
    wealthPalace: palaces.find(p => p.name === 'tai_bach') || palaces[8],
    spousePalace: palaces.find(p => p.name === 'phu_the') || palaces[10],
    travelPalace: palaces.find(p => p.name === 'thien_di') || palaces[6],
    profile: {
      fullName: profile.fullName,
      genderLabel: profile.gender,
      solarDateTime: `${profile.birthDate} ${profile.birthTime}`,
      lunarDateTime: thong_tin_co_ban.am_lich,
      timezone: profile.timezone,
    },
    overview: {
      chartType: 'Tử Vi Đẩu Số',
      zodiac: thong_tin_co_ban.can_chi_nam,
      amDuong: thong_tin_co_ban.am_duong,
      cuc: thong_tin_co_ban.ngu_hanh_menh_cuc,
      cucNumber: thong_tin_co_ban.so_cuc,
      menhPalace: 'menh',
      thanPalace: 'than',
      menhBranch: cung_menh_than.cung_menh.dia_chi,
      thanBranch: cung_menh_than.cung_than.dia_chi,
      canChiYear: thong_tin_co_ban.can_chi_nam,
      canChiDay: thong_tin_co_ban.can_chi_ngay_sinh,
      menhChu: '',
      thanChu: '',
    },
    palaces,
    keyStars,
    decadeCycles,
    summary,
    analysis: {
      coreTraits,
      career,
      relationship,
    },
  };
}
