// ============================================================
// BẢNG DỮ LIỆU CƠ BẢN - TuVi Constants
// ============================================================

export const CAN = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"] as const;
export const CHI = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"] as const;
export const CUNG = ["Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu"] as const;

export const NAP_AM_NGU_HANH: Record<string, string> = {
  "Giáp Tý": "Kim", "Ất Sửu": "Kim", "Bính Dần": "Hỏa", "Đinh Mão": "Hỏa",
  "Mậu Thìn": "Mộc", "Kỷ Tỵ": "Mộc", "Canh Ngọ": "Thổ", "Tân Mùi": "Thổ",
  "Nhâm Thân": "Kim", "Quý Dậu": "Kim", "Giáp Tuất": "Hỏa", "Ất Hợi": "Hỏa",
  "Bính Tý": "Thủy", "Đinh Sửu": "Thủy", "Mậu Dần": "Thổ", "Kỷ Mão": "Thổ",
  "Canh Thìn": "Mộc", "Tân Tỵ": "Mộc", "Nhâm Ngọ": "Mộc", "Quý Mùi": "Mộc",
  "Giáp Thân": "Thủy", "Ất Dậu": "Thủy", "Bính Tuất": "Thổ", "Đinh Hợi": "Thổ",
  "Mậu Tý": "Hỏa", "Kỷ Sửu": "Hỏa", "Canh Dần": "Mộc", "Tân Mão": "Mộc",
  "Nhâm Thìn": "Thủy", "Quý Tỵ": "Thủy", "Giáp Ngọ": "Kim", "Ất Mùi": "Kim",
  "Bính Thân": "Hỏa", "Đinh Dậu": "Hỏa", "Mậu Tuất": "Mộc", "Kỷ Hợi": "Mộc",
  "Canh Tý": "Thổ", "Tân Sửu": "Thổ", "Nhâm Dần": "Kim", "Quý Mão": "Kim",
  "Giáp Thìn": "Hỏa", "Ất Tỵ": "Hỏa", "Bính Ngọ": "Thủy", "Đinh Mùi": "Thủy",
  "Mậu Thân": "Thổ", "Kỷ Dậu": "Thổ", "Canh Tuất": "Kim", "Tân Hợi": "Kim",
  "Nhâm Tý": "Mộc", "Quý Sửu": "Mộc", "Giáp Dần": "Thủy", "Ất Mão": "Thủy",
  "Bính Thìn": "Thổ", "Đinh Tỵ": "Thổ", "Mậu Ngọ": "Hỏa", "Kỷ Mùi": "Hỏa",
  "Canh Thân": "Mộc", "Tân Dậu": "Mộc", "Nhâm Tuất": "Thủy", "Quý Hợi": "Thủy",
};

export const SO_CUC_MAP: Record<string, number> = {
  Thủy: 2, Mộc: 3, Kim: 4, Thổ: 5, Hỏa: 6,
};

// ============================================================
// LOOKUP TABLES
// ============================================================

// Lộc Tồn chi index theo Can năm (canIdx 0–9)
export const LOC_CHI_IDX: Record<number, number> = {
  0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0,
};

// Tứ Hóa – sao chịu hóa theo Can năm
export const TU_HOA_TINH: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
  0: { loc: "Liêm Trinh", quyen: "Phá Quân", khoa: "Vũ Khúc", ky: "Thái Dương" },
  1: { loc: "Thiên Cơ", quyen: "Thiên Lương", khoa: "Tử Vi", ky: "Thái Âm" },
  2: { loc: "Thiên Đồng", quyen: "Thiên Cơ", khoa: "Văn Xương", ky: "Liêm Trinh" },
  3: { loc: "Thái Âm", quyen: "Thiên Đồng", khoa: "Thiên Cơ", ky: "Cự Môn" },
  4: { loc: "Tham Lang", quyen: "Thái Âm", khoa: "Hữu Bật", ky: "Thiên Lương" },
  5: { loc: "Vũ Khúc", quyen: "Tham Lang", khoa: "Thiên Lương", ky: "Văn Khúc" },
  6: { loc: "Thái Dương", quyen: "Vũ Khúc", khoa: "Thái Âm", ky: "Thiên Đồng" },
  7: { loc: "Cự Môn", quyen: "Thái Dương", khoa: "Văn Xương", ky: "Văn Khúc" },
  8: { loc: "Thiên Lương", quyen: "Tử Vi", khoa: "Hữu Bật", ky: "Vũ Khúc" },
  9: { loc: "Phá Quân", quyen: "Cự Môn", khoa: "Thái Âm", ky: "Tham Lang" },
};

// Văn Xương (chi index): an nghịch từ Tuất (chiIdx=10) theo Can
export const VAN_XUONG_CHI: Record<number, number> = {
  0: 10, 1: 9, 2: 8, 3: 7, 4: 6, 5: 5, 6: 4, 7: 3, 8: 2, 9: 1,
};
// Văn Khúc (chi index): an thuận từ Thìn (chiIdx=4) theo Can
export const VAN_KHUC_CHI: Record<number, number> = {
  0: 4, 1: 3, 2: 2, 3: 1, 4: 0, 5: 11, 6: 10, 7: 9, 8: 8, 9: 7,
};

// Thiên Khôi & Thiên Việt theo Can năm
export const KHOI_CHI: Record<number, number> = {
  0: 1, 1: 0, 2: 11, 3: 11, 4: 1, 5: 0, 6: 6, 7: 6, 8: 3, 9: 3,
};
export const VIET_CHI: Record<number, number> = {
  0: 7, 1: 8, 2: 9, 3: 9, 4: 7, 5: 8, 6: 2, 7: 2, 8: 6, 9: 5,
};

// Thiên Mã theo Chi năm
export const THIEN_MA_CHI: Record<number, number> = {
  2: 8, 6: 8, 10: 8, 8: 2, 0: 2, 4: 2, 5: 11, 9: 11, 1: 11, 11: 5, 3: 5, 7: 5,
};

// Hỏa Tinh theo Chi năm
export const HOA_TINH_CHI: Record<number, number> = {
  2: 0, 6: 0, 10: 0, 8: 6, 0: 6, 4: 6, 5: 10, 9: 7, 1: 10, 11: 1, 3: 1, 7: 1,
};
// Linh Tinh theo Chi năm
export const LINH_TINH_CHI: Record<number, number> = {
  2: 8, 6: 1, 10: 8, 8: 1, 0: 1, 4: 1, 5: 7, 9: 7, 1: 7, 11: 10, 3: 10, 7: 10,
};

// Vòng Thái Tuế (an tại Chi năm, thuận chiều)
export const VONG_THAI_TUE = [
  "Thái Tuế", "Thiếu Dương", "Tang Môn", "Thiếu Âm",
  "Quan Phù", "Tử Phù", "Tuế Phá", "Long Đức",
  "Bạch Hổ", "Phúc Đức", "Điếu Khách", "Bệnh Phù",
];

// Vòng Bác Sĩ (an tại Lộc Tồn, thuận chiều) – 12 sao đúng thứ tự
export const VONG_BAC_SI = [
  "Bác Sĩ", "Lực Sĩ", "Thanh Long", "Tiểu Hao",
  "Tướng Quân", "Tấu Thư", "Phi Liêm", "Hỷ Thần",
  "Bệnh Phù (Bác Sĩ)", "Đại Hao", "Phục Binh", "Quan Phủ",
];

// Cô Thần & Quả Tú theo Chi năm
export const CO_THAN_CHI: Record<number, number> = {
  2: 5, 3: 5, 4: 5, 5: 8, 6: 8, 7: 8, 8: 11, 9: 11, 10: 11, 11: 2, 0: 2, 1: 2,
};
export const QUA_TU_CHI: Record<number, number> = {
  2: 1, 3: 1, 4: 1, 5: 4, 6: 4, 7: 4, 8: 7, 9: 7, 10: 7, 11: 10, 0: 10, 1: 10,
};

// Thiên Diêu / Đào Hoa (Tứ Đào) theo Chi năm
export const DAO_HOA_CHI: Record<number, number> = {
  2: 3, 6: 3, 10: 3, 8: 9, 0: 9, 4: 9, 5: 6, 9: 6, 1: 6, 11: 0, 3: 0, 7: 0,
};

// Kiếp Sát theo Chi năm
export const KIEP_SAT_CHI: Record<number, number> = {
  2: 5, 6: 5, 10: 5, 8: 11, 0: 11, 4: 11, 5: 2, 9: 2, 1: 2, 11: 8, 3: 8, 7: 8,
};

// Phá Toái theo Chi năm
export const PHA_TOAI_CHI: Record<number, number> = {
  0: 9, 1: 0, 2: 6, 3: 3, 4: 3, 5: 6, 6: 9, 7: 0, 8: 3, 9: 6, 10: 9, 11: 0,
};

// Lưu Hà theo Chi năm
export const LUU_HA_CHI: Record<number, number> = {
  0: 1, 1: 0, 2: 11, 3: 10, 4: 9, 5: 8, 6: 7, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2,
};

// Hoa Cái theo Chi năm
export const HOA_CAI_CHI: Record<number, number> = {
  2: 10, 6: 10, 10: 10, 8: 4, 0: 4, 4: 4, 5: 1, 9: 1, 1: 1, 11: 7, 3: 7, 7: 7,
};

// Giải Thần theo Chi năm
export const GIAI_THAN_CHI: Record<number, number> = {
  2: 6, 6: 6, 10: 6, 8: 0, 0: 0, 4: 0, 5: 9, 9: 9, 1: 9, 11: 3, 3: 3, 7: 3,
};

// Thiên Quan theo Can năm
export const THIEN_QUAN_CHI: Record<number, number> = {
  0: 7, 1: 4, 2: 3, 3: 8, 4: 11, 5: 0, 6: 7, 7: 4, 8: 3, 9: 8,
};

// Thiên Phúc theo Can năm
export const THIEN_PHUC_CHI: Record<number, number> = {
  0: 9, 1: 6, 2: 11, 3: 2, 4: 1, 5: 4, 6: 9, 7: 6, 8: 11, 9: 2,
};

// Thiên Thọ theo Can ngày
export const THIEN_THO_CHI: Record<number, number> = {
  0: 2, 1: 3, 2: 5, 3: 6, 4: 5, 5: 6, 6: 8, 7: 9, 8: 11, 9: 0,
};

// Ân Quang theo Can năm
export const AN_QUANG_CHI: Record<number, number> = {
  0: 10, 1: 11, 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7,
};

// Thiên Quý theo Can năm
export const THIEN_QUY_CHI: Record<number, number> = {
  0: 11, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8,
};

// Thiên Trù theo Can năm
export const THIEN_TRU_CHI: Record<number, number> = {
  0: 9, 1: 10, 2: 11, 3: 0, 4: 1, 5: 2, 6: 3, 7: 4, 8: 5, 9: 6,
};

// Quốc Ấn theo Can năm
export const QUOC_AN_CHI: Record<number, number> = {
  0: 11, 1: 10, 2: 9, 3: 8, 4: 7, 5: 6, 6: 5, 7: 4, 8: 3, 9: 2,
};

// Đường Phù theo Chi năm
export const DUONG_PHU_CHI: Record<number, number> = {
  0: 0, 1: 3, 2: 6, 3: 9, 4: 0, 5: 3, 6: 6, 7: 9, 8: 0, 9: 3, 10: 6, 11: 9,
};

// Long Trì theo Chi năm
export const LONG_TRI_CHI: Record<number, number> = {
  0: 4, 1: 5, 2: 6, 3: 7, 4: 8, 5: 9, 6: 10, 7: 11, 8: 0, 9: 1, 10: 2, 11: 3,
};

// Triệt Lộ theo Can năm (2 chi bị triệt)
export const TRIET_LO_CHI: Record<number, [number, number]> = {
  0: [10, 11], 1: [10, 11], // Giáp, Ất -> Tuất, Hợi
  2: [8, 9], 3: [8, 9],     // Bính, Đinh -> Thân, Dậu
  4: [6, 7], 5: [6, 7],     // Mậu, Kỷ -> Ngọ, Mùi
  6: [4, 5], 7: [4, 5],     // Canh, Tân -> Thìn, Tỵ
  8: [2, 3], 9: [2, 3],     // Nhâm, Quý -> Dần, Mão
};

// Nguyệt Đức theo tháng âm
export const NGUYET_DUC_CHI: Record<number, number> = {
  1: 2, 2: 5, 3: 8, 4: 11, 5: 2, 6: 5, 7: 8, 8: 11, 9: 2, 10: 5, 11: 8, 12: 11,
};

// Bát Tọa theo Chi năm
export const BAT_TOA_CHI: Record<number, number> = {
  0: 2, 1: 5, 2: 8, 3: 11, 4: 2, 5: 5, 6: 8, 7: 11, 8: 2, 9: 5, 10: 8, 11: 11,
};

// Phong Cáo theo Can năm
export const PHONG_CAO_CHI: Record<number, number> = {
  0: 10, 1: 11, 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 7: 5, 8: 6, 9: 7,
};

// Trực Phù theo Can năm
export const TRUC_PHU_CHI: Record<number, number> = {
  0: 6, 1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 0, 7: 1, 8: 2, 9: 3,
};

// Lưu Niên – Vòng Bác Sĩ (12 sao prefix "Lưu")
export const VONG_LUU_BAC_SI = [
  "Lưu Bác Sĩ", "Lưu Lực Sĩ", "Lưu Thanh Long", "Lưu Tiểu Hao",
  "Lưu Tướng Quân", "Lưu Tấu Thư", "Lưu Phi Liêm", "Lưu Hỷ Thần",
  "Lưu Bệnh Phù", "Lưu Đại Hao", "Lưu Phục Binh", "Lưu Quan Phủ",
];

// Lưu Niên – Vòng Thái Tuế (12 sao prefix "Lưu")
export const VONG_LUU_THAI_TUE = [
  "Lưu Thái Tuế", "Lưu Thiếu Dương", "Lưu Tang Môn", "Lưu Thiếu Âm",
  "Lưu Quan Phù", "Lưu Tử Phù", "Lưu Tuế Phá", "Lưu Long Đức",
  "Lưu Bạch Hổ", "Lưu Phúc Đức", "Lưu Điếu Khách", "Lưu Bệnh Phù",
];
