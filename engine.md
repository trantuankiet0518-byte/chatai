// Cần cài đặt package: npm install lunar-javascript
import { Solar, Lunar } from "lunar-javascript";

// ============================================================
// BẢNG DỮ LIỆU CƠ BẢN
// ============================================================

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
const CUNG = ["Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu"];

const NAP_AM_NGU_HANH: Record<string, string> = {
"Giáp Tý":"Kim","Ất Sửu":"Kim","Bính Dần":"Hỏa","Đinh Mão":"Hỏa",
"Mậu Thìn":"Mộc","Kỷ Tỵ":"Mộc","Canh Ngọ":"Thổ","Tân Mùi":"Thổ",
"Nhâm Thân":"Kim","Quý Dậu":"Kim","Giáp Tuất":"Hỏa","Ất Hợi":"Hỏa",
"Bính Tý":"Thủy","Đinh Sửu":"Thủy","Mậu Dần":"Thổ","Kỷ Mão":"Thổ",
"Canh Thìn":"Mộc","Tân Tỵ":"Mộc","Nhâm Ngọ":"Mộc","Quý Mùi":"Mộc",
"Giáp Thân":"Thủy","Ất Dậu":"Thủy","Bính Tuất":"Thổ","Đinh Hợi":"Thổ",
"Mậu Tý":"Hỏa","Kỷ Sửu":"Hỏa","Canh Dần":"Mộc","Tân Mão":"Mộc",
"Nhâm Thìn":"Thủy","Quý Tỵ":"Thủy","Giáp Ngọ":"Kim","Ất Mùi":"Kim",
"Bính Thân":"Hỏa","Đinh Dậu":"Hỏa","Mậu Tuất":"Mộc","Kỷ Hợi":"Mộc",
"Canh Tý":"Thổ","Tân Sửu":"Thổ","Nhâm Dần":"Kim","Quý Mão":"Kim",
"Giáp Thìn":"Hỏa","Ất Tỵ":"Hỏa","Bính Ngọ":"Thủy","Đinh Mùi":"Thủy",
"Mậu Thân":"Thổ","Kỷ Dậu":"Thổ","Canh Tuất":"Kim","Tân Hợi":"Kim",
"Nhâm Tý":"Mộc","Quý Sửu":"Mộc","Giáp Dần":"Thủy","Ất Mão":"Thủy",
"Bính Thìn":"Thổ","Đinh Tỵ":"Thổ","Mậu Ngọ":"Hỏa","Kỷ Mùi":"Hỏa",
"Canh Thân":"Mộc","Tân Dậu":"Mộc","Nhâm Tuất":"Thủy","Quý Hợi":"Thủy",
};

const SO_CUC_MAP: Record<string, number> = {
Thủy: 2, Mộc: 3, Kim: 4, Thổ: 5, Hỏa: 6,
};

// ============================================================
// HELPER FUNCTIONS
// ============================================================

function chiIdxToCungIdx(chiIdx: number): number {
// CHI: 0=Tý,1=Sửu,2=Dần,... CUNG: 0=Dần,1=Mão,...,10=Tý,11=Sửu
const map = [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
return map[chiIdx];
}

function getCanChiNam(namAm: number): {
can: string; chi: string; canIdx: number; chiIdx: number;
} {
const canIdx = ((namAm - 4) % 10 + 10) % 10;
const chiIdx = ((namAm - 4) % 12 + 12) % 12;
return { can: CAN[canIdx], chi: CHI[chiIdx], canIdx, chiIdx };
}

function getGioChiIdx(gio: number, phut: number): number {
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

function parseDateFlexible(dateStr: string): [number, number, number] {
const parts = dateStr.split(/[\/\-]/).map(Number);
if (parts.length !== 3 || parts.some(isNaN))
throw new Error(`Ngày không hợp lệ: ${dateStr}`);
return parts[0] > 1000
? [parts[2], parts[1], parts[0]] // YYYY-MM-DD -> [d, m, y]
: [parts[0], parts[1], parts[2]]; // DD/MM/YYYY
}

// ============================================================
// LOOKUP TABLES
// ============================================================

// Lộc Tồn chi index theo Can năm (canIdx 0–9)
const LOC_CHI_IDX: Record<number, number> = {
0:2, 1:3, 2:5, 3:6, 4:5, 5:6, 6:8, 7:9, 8:11, 9:0,
};

// Tứ Hóa – sao chịu hóa theo Can năm
const TU_HOA_TINH: Record<number, { loc: string; quyen: string; khoa: string; ky: string }> = {
0: { loc:"Liêm Trinh", quyen:"Phá Quân", khoa:"Vũ Khúc", ky:"Thái Dương" },
1: { loc:"Thiên Cơ", quyen:"Thiên Lương", khoa:"Tử Vi", ky:"Thái Âm" },
2: { loc:"Thiên Đồng", quyen:"Thiên Cơ", khoa:"Văn Xương", ky:"Liêm Trinh" },
3: { loc:"Thái Âm", quyen:"Thiên Đồng", khoa:"Thiên Cơ", ky:"Cự Môn" },
4: { loc:"Tham Lang", quyen:"Thái Âm", khoa:"Hữu Bật", ky:"Thiên Lương"},
5: { loc:"Vũ Khúc", quyen:"Tham Lang", khoa:"Thiên Lương",ky:"Văn Khúc" },
6: { loc:"Thái Dương", quyen:"Vũ Khúc", khoa:"Thái Âm", ky:"Thiên Đồng" },
7: { loc:"Cự Môn", quyen:"Thái Dương", khoa:"Văn Xương", ky:"Văn Khúc" },
8: { loc:"Thiên Lương", quyen:"Tử Vi", khoa:"Hữu Bật", ky:"Vũ Khúc" },
9: { loc:"Phá Quân", quyen:"Cự Môn", khoa:"Thái Âm", ky:"Tham Lang" },
};

// Văn Xương (chi index): an nghịch từ Tuất (chiIdx=10) theo Can
const VAN_XUONG_CHI: Record<number, number> = {
0:10, 1:9, 2:8, 3:7, 4:6, 5:5, 6:4, 7:3, 8:2, 9:1,
};
// Văn Khúc (chi index): an thuận từ Thìn (chiIdx=4) theo Can
const VAN_KHUC_CHI: Record<number, number> = {
0:4, 1:3, 2:2, 3:1, 4:0, 5:11, 6:10, 7:9, 8:8, 9:7,
};

// Thiên Khôi & Thiên Việt theo Can năm
const KHOI_CHI: Record<number, number> = {
0:1, 1:0, 2:11, 3:11, 4:1, 5:0, 6:6, 7:6, 8:3, 9:3,
};
const VIET_CHI: Record<number, number> = {
0:7, 1:8, 2:9, 3:9, 4:7, 5:8, 6:2, 7:2, 8:6, 9:5,
};

// Thiên Mã theo Chi năm
const THIEN_MA_CHI: Record<number, number> = {
2:8, 6:8, 10:8, 8:2, 0:2, 4:2, 5:11, 9:11, 1:11, 11:5, 3:5, 7:5,
};

// Hỏa Tinh theo Chi năm
const HOA_TINH_CHI: Record<number, number> = {
2:0, 6:0, 10:0, 8:6, 0:6, 4:6, 5:10, 9:7, 1:10, 11:1, 3:1, 7:1,
};
// Linh Tinh theo Chi năm
const LINH_TINH_CHI: Record<number, number> = {
2:8, 6:1, 10:8, 8:1, 0:1, 4:1, 5:7, 9:7, 1:7, 11:10, 3:10, 7:10,
};

// Vòng Thái Tuế (an tại Chi năm, thuận chiều)
const VONG_THAI_TUE = [
"Thái Tuế","Thiếu Dương","Tang Môn","Thiếu Âm",
"Quan Phù","Tử Phù","Tuế Phá","Long Đức",
"Bạch Hổ","Phúc Đức","Điếu Khách","Bệnh Phù",
];

// Vòng Bác Sĩ (an tại Lộc Tồn, thuận chiều) – 12 sao đúng thứ tự
const VONG_BAC_SI = [
"Bác Sĩ","Lực Sĩ","Thanh Long","Tiểu Hao",
"Tướng Quân","Tấu Thư","Phi Liêm","Hỷ Thần",
"Bệnh Phù (Bác Sĩ)","Đại Hao","Phục Binh","Quan Phủ",
];

// Cô Thần & Quả Tú theo Chi năm
const CO_THAN_CHI: Record<number, number> = {
2:5, 3:5, 4:5, 5:8, 6:8, 7:8, 8:11, 9:11, 10:11, 11:2, 0:2, 1:2,
};
const QUA_TU_CHI: Record<number, number> = {
2:1, 3:1, 4:1, 5:4, 6:4, 7:4, 8:7, 9:7, 10:7, 11:10, 0:10, 1:10,
};

// Thiên Diêu / Đào Hoa (Tứ Đào) theo Chi năm
const DAO_HOA_CHI: Record<number, number> = {
2:3, 6:3, 10:3, 8:9, 0:9, 4:9, 5:6, 9:6, 1:6, 11:0, 3:0, 7:0,
};

// Kiếp Sát theo Chi năm
const KIEP_SAT_CHI: Record<number, number> = {
2:5, 6:5, 10:5, 8:11, 0:11, 4:11, 5:2, 9:2, 1:2, 11:8, 3:8, 7:8,
};

// Phá Toái theo Chi năm
const PHA_TOAI_CHI: Record<number, number> = {
0:9, 1:0, 2:6, 3:3, 4:3, 5:6, 6:9, 7:0, 8:3, 9:6, 10:9, 11:0,
};

// Lưu Hà theo Chi năm
const LUU_HA_CHI: Record<number, number> = {
0:1, 1:0, 2:11, 3:10, 4:9, 5:8, 6:7, 7:6, 8:5, 9:4, 10:3, 11:2,
};

// Hoa Cái theo Chi năm
const HOA_CAI_CHI: Record<number, number> = {
2:10, 6:10, 10:10, 8:4, 0:4, 4:4, 5:1, 9:1, 1:1, 11:7, 3:7, 7:7,
};

// Giải Thần theo Chi năm
const GIAI_THAN_CHI: Record<number, number> = {
2:6, 6:6, 10:6, 8:0, 0:0, 4:0, 5:9, 9:9, 1:9, 11:3, 3:3, 7:3,
};

// Thiên Quan theo Can năm
const THIEN_QUAN_CHI: Record<number, number> = {
0:7, 1:4, 2:3, 3:8, 4:11, 5:0, 6:7, 7:4, 8:3, 9:8,
};

// Thiên Phúc theo Can năm
const THIEN_PHUC_CHI: Record<number, number> = {
0:9, 1:6, 2:11, 3:2, 4:1, 5:4, 6:9, 7:6, 8:11, 9:2,
};

// Thiên Thọ theo Can ngày
const THIEN_THO_CHI: Record<number, number> = {
0:2, 1:3, 2:5, 3:6, 4:5, 5:6, 6:8, 7:9, 8:11, 9:0,
};

// Ân Quang theo Can năm
const AN_QUANG_CHI: Record<number, number> = {
0:10, 1:11, 2:0, 3:1, 4:2, 5:3, 6:4, 7:5, 8:6, 9:7,
};

// Thiên Quý theo Can năm
const THIEN_QUY_CHI: Record<number, number> = {
0:11, 1:0, 2:1, 3:2, 4:3, 5:4, 6:5, 7:6, 8:7, 9:8,
};

// Thiên Trù theo Can năm
const THIEN_TRU_CHI: Record<number, number> = {
0:9, 1:10, 2:11, 3:0, 4:1, 5:2, 6:3, 7:4, 8:5, 9:6,
};

// Quốc Ấn theo Can năm
const QUOC_AN_CHI: Record<number, number> = {
0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2,
};

// Đường Phù theo Chi năm
const DUONG_PHU_CHI: Record<number, number> = {
0:0, 1:3, 2:6, 3:9, 4:0, 5:3, 6:6, 7:9, 8:0, 9:3, 10:6, 11:9,
};

// Long Trì theo Chi năm
const LONG_TRI_CHI: Record<number, number> = {
0:4, 1:5, 2:6, 3:7, 4:8, 5:9, 6:10, 7:11, 8:0, 9:1, 10:2, 11:3,
};

// Tướng Quân theo Chi năm (used in some non-Bác Sĩ systems – here kept for reference)
// NOTE: Tướng Quân is at offset +4 from Lộc Tồn in Vòng Bác Sĩ.

// Hỷ Thần theo Chi năm (reference – now placed via Bác Sĩ vòng)
const HY_THAN_CHI_REF: Record<number, number> = {
0:11, 1:10, 2:9, 3:8, 4:7, 5:6, 6:5, 7:4, 8:3, 9:2, 10:1, 11:0,
};

// Triệt Lộ theo Can năm (2 chi bị triệt)
const TRIET_LO_CHI: Record<number, [number, number]> = {
0:[10,11], 1:[10,11], // Giáp, Ất -> Tuất, Hợi
2:[8,9], 3:[8,9], // Bính, Đinh -> Thân, Dậu
4:[6,7], 5:[6,7], // Mậu, Kỷ -> Ngọ, Mùi
6:[4,5], 7:[4,5], // Canh, Tân -> Thìn, Tỵ
8:[2,3], 9:[2,3], // Nhâm, Quý -> Dần, Mão
};

// Nguyệt Đức theo tháng âm
const NGUYET_DUC_CHI: Record<number, number> = {
1:2, 2:5, 3:8, 4:11, 5:2, 6:5, 7:8, 8:11, 9:2, 10:5, 11:8, 12:11,
};

// Phi Liêm theo Chi năm (reference – offset +6 from Lộc Tồn trong Bác Sĩ vòng)
const PHI_LIEM_CHI_REF: Record<number, number> = {
0:3, 1:4, 2:5, 3:0, 4:1, 5:2, 6:9, 7:10, 8:11, 9:6, 10:7, 11:8,
};

// Bát Tọa theo Chi năm
const BAT_TOA_CHI: Record<number, number> = {
0:2, 1:5, 2:8, 3:11, 4:2, 5:5, 6:8, 7:11, 8:2, 9:5, 10:8, 11:11,
};

// Phong Cáo theo Can năm
const PHONG_CAO_CHI: Record<number, number> = {
0:10, 1:11, 2:0, 3:1, 4:2, 5:3, 6:4, 7:5, 8:6, 9:7,
};

// Trực Phù theo Can năm
const TRUC_PHU_CHI: Record<number, number> = {
0:6, 1:7, 2:8, 3:9, 4:10, 5:11, 6:0, 7:1, 8:2, 9:3,
};

// Tấu Thư theo Can năm (reference – offset +5 from Lộc Tồn trong Bác Sĩ vòng)
const TAU_THU_CHI_REF: Record<number, number> = {
0:5, 1:4, 2:3, 3:2, 4:1, 5:0, 6:11, 7:10, 8:9, 9:8,
};

// Thiên Quan không (Tuần Không) – không có bảng, tính theo Can-Chi ngày

// Lưu Niên – Vòng Bác Sĩ (12 sao prefix "Lưu")
const VONG_LUU_BAC_SI = [
"Lưu Bác Sĩ","Lưu Lực Sĩ","Lưu Thanh Long","Lưu Tiểu Hao",
"Lưu Tướng Quân","Lưu Tấu Thư","Lưu Phi Liêm","Lưu Hỷ Thần",
"Lưu Bệnh Phù","Lưu Đại Hao","Lưu Phục Binh","Lưu Quan Phủ",
];

// Lưu Niên – Vòng Thái Tuế (12 sao prefix "Lưu")
const VONG_LUU_THAI_TUE = [
"Lưu Thái Tuế","Lưu Thiếu Dương","Lưu Tang Môn","Lưu Thiếu Âm",
"Lưu Quan Phù","Lưu Tử Phù","Lưu Tuế Phá","Lưu Long Đức",
"Lưu Bạch Hổ","Lưu Phúc Đức","Lưu Điếu Khách","Lưu Bệnh Phù",
];

// ============================================================
// MAIN FUNCTION
// ============================================================

export async function calculateTuVi(input: any): Promise<any> {
const { ho_ten, ngay_sinh, loai_lich, gio_sinh, gioi_tinh, ngay_du_doan } = input;

// ──────────────────────────────────────────────
// 1. Parse và convert sang Âm lịch
// ──────────────────────────────────────────────
let d: number, m: number, y: number;
[d, m, y] = parseDateFlexible(ngay_sinh);

let lunar: any;
const loaiLichToken = String(loai_lich).toLowerCase().trim().split(' ')[0];
const isDuong = ['duong','dương','solar','duong_lich'].includes(loaiLichToken);

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
const thangAm = lunar.getMonth(); // 1-12
const ngayAm = lunar.getDay();

// ──────────────────────────────────────────────
// 2. Can Chi năm / giờ
// ──────────────────────────────────────────────
const { can: canNam, chi: chiNam, canIdx: canNamIdx, chiIdx: chiNamIdx } = getCanChiNam(namAm);

// Can Chi ngày sinh (từ GanZhi string)
const ganZhiNgaySinh = lunar.getDayInGanZhi() as string;
let canNgay = ''; let chiNgay = '';
for (const c of CAN) {
if (ganZhiNgaySinh.startsWith(c)) { canNgay = c; chiNgay = ganZhiNgaySinh.slice(c.length).trim(); break; }
}
const canNgayIdx = CAN.indexOf(canNgay);
const chiNgayIdx = CHI.indexOf(chiNgay);

// Giờ sinh
const [gio, phut] = gio_sinh.split(':').map(Number);
const gioChiIdx = getGioChiIdx(gio, phut);
const gioChi = CHI[gioChiIdx];

// ──────────────────────────────────────────────
// 3. Mệnh cục
// ──────────────────────────────────────────────
const nguHanh = NAP_AM_NGU_HANH[`${canNam} ${chiNam}`] || 'Mộc';
const soCuc = SO_CUC_MAP[nguHanh];
const amDuong = canNamIdx % 2 === 0 ? 'Dương' : 'Âm';

// ──────────────────────────────────────────────
// 4. Cung Mệnh & Thân
// ──────────────────────────────────────────────
// thangAm 1→Dần (chiIdx=2), 2→Mão, ...
const chiThangIdx = (thangAm + 1) % 12;
const cungThangIdx = chiIdxToCungIdx(chiThangIdx);

const cungMenhIdx = (cungThangIdx - gioChiIdx + 12) % 12;
const cungThanIdx = (cungThangIdx + gioChiIdx) % 12;
const cungMenh = CUNG[cungMenhIdx];
const cungThan = CUNG[cungThanIdx];

// ──────────────────────────────────────────────
// 5. Khởi tạo 12 cung
// ──────────────────────────────────────────────
const cungKeys = [
'menh','phu_mau','phuc_duc','dien_trach',
'quan_loc','no_boc','thien_di','tat_ach',
'tai_bach','tu_tuc','phu_the','huynh_de',
];

const cungData: Record<string, {
dia_chi: string;
chinh_tinh: string[];
phu_tinh: string[];
tu_hoa: string[];
luu_nien: string[];
}> = {};

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

// Helper: cung key từ CUNG index
const getKeyForChi = (cungIdx: number) =>
cungKeys[(cungIdx - cungMenhIdx + 12) % 12];

// Helper: thêm phụ tinh
const addPhu = (cungIdx: number, star: string) =>
cungData[getKeyForChi(cungIdx)].phu_tinh.push(star);

// Helper: thêm lưu niên
const addLuu = (cungIdx: number, star: string) =>
cungData[getKeyForChi(cungIdx)].luu_nien.push(star);

// ──────────────────────────────────────────────
// 6. An 14 Chính tinh
// ──────────────────────────────────────────────
// Nhóm Tử Vi: an từ Thìn (chiIdx=4 → cungIdx=2), thuận/nghịch theo soCuc
const idxThin = chiIdxToCungIdx(4); // = 2
const du = ngayAm % soCuc;
const idxTuVi = du === 0 ? idxThin : (idxThin + du) % 12;

const tinhPos: Record<string, number> = {};
tinhPos['Tử Vi'] = idxTuVi;
tinhPos['Thiên Cơ'] = (idxTuVi - 1 + 12) % 12;
tinhPos['Thái Dương']= (idxTuVi - 3 + 12) % 12;
tinhPos['Vũ Khúc'] = (idxTuVi - 4 + 12) % 12;
tinhPos['Thiên Đồng']= (idxTuVi - 5 + 12) % 12;
tinhPos['Liêm Trinh']= (idxTuVi - 8 + 12) % 12;

// Nhóm Thiên Phủ: đối xứng qua trục Dần-Thân
const idxThiênPhủ = (idxTuVi + 8) % 12;
tinhPos['Thiên Phủ'] = idxThiênPhủ;
tinhPos['Thái Âm'] = (idxThiênPhủ + 1) % 12;
tinhPos['Tham Lang'] = (idxThiênPhủ + 2) % 12;
tinhPos['Cự Môn'] = (idxThiênPhủ + 3) % 12;
tinhPos['Thiên Tướng']=(idxThiênPhủ + 4) % 12;
tinhPos['Thiên Lương']=(idxThiênPhủ + 5) % 12;
tinhPos['Thất Sát'] = (idxThiênPhủ + 6) % 12;
tinhPos['Phá Quân'] = (idxThiênPhủ + 10)% 12;

for (const [tinh, idx] of Object.entries(tinhPos))
cungData[getKeyForChi(idx)].chinh_tinh.push(tinh);

// ──────────────────────────────────────────────
// 7. Tứ Hóa (theo Can năm)
// ──────────────────────────────────────────────
const applyTuHoa = (canIdx: number, prefix = '') => {
const th = TU_HOA_TINH[canIdx];
if (!th) return;
for (const key of cungKeys) {
const ct = cungData[key].chinh_tinh;
const pt = cungData[key].phu_tinh;
const push = (h: string) => cungData[key].tu_hoa.push(prefix + h);
if (ct.includes(th.loc)) push('Hóa Lộc');
if (ct.includes(th.quyen)) push('Hóa Quyền');
if (ct.includes(th.khoa)) push('Hóa Khoa');
if (ct.includes(th.ky)) push('Hóa Kỵ');
// Phụ tinh có thể nhận Hóa Khoa / Hóa Kỵ
if (th.khoa === 'Văn Xương' && pt.includes('Văn Xương')) push('Hóa Khoa');
if (th.ky === 'Văn Khúc' && pt.includes('Văn Khúc')) push('Hóa Kỵ');
if (th.khoa === 'Hữu Bật' && pt.includes('Hữu Bật')) push('Hóa Khoa');
if (th.loc === 'Văn Xương' && pt.includes('Văn Xương')) push('Hóa Lộc');
}
};
applyTuHoa(canNamIdx);

// ──────────────────────────────────────────────
// 8. Phụ tinh theo Can năm
// ──────────────────────────────────────────────

// Lộc Tồn, Kình Dương, Đà La
const locChiIdx = LOC_CHI_IDX[canNamIdx];
addPhu(chiIdxToCungIdx(locChiIdx), 'Lộc Tồn');
addPhu(chiIdxToCungIdx((locChiIdx + 1) % 12), 'Kình Dương');
addPhu(chiIdxToCungIdx((locChiIdx - 1 + 12) % 12), 'Đà La');

// Văn Xương, Văn Khúc
addPhu(chiIdxToCungIdx(VAN_XUONG_CHI[canNamIdx]), 'Văn Xương');
addPhu(chiIdxToCungIdx(VAN_KHUC_CHI[canNamIdx]), 'Văn Khúc');

// Thiên Khôi, Thiên Việt
addPhu(chiIdxToCungIdx(KHOI_CHI[canNamIdx]), 'Thiên Khôi');
addPhu(chiIdxToCungIdx(VIET_CHI[canNamIdx]), 'Thiên Việt');

// ─── VÒNG BÁC SĨ (12 sao, an tại Lộc Tồn, thuận chiều) ───
// Thứ tự chuẩn Bắc Tông: Bác Sĩ(0) → Lực Sĩ(1) → ... → Quan Phủ(11)
for (let i = 0; i < 12; i++)
addPhu(chiIdxToCungIdx((locChiIdx + i) % 12), VONG_BAC_SI[i]);

// Thiên Quan, Thiên Phúc
addPhu(chiIdxToCungIdx(THIEN_QUAN_CHI[canNamIdx]), 'Thiên Quan');
addPhu(chiIdxToCungIdx(THIEN_PHUC_CHI[canNamIdx]), 'Thiên Phúc');

// Ân Quang, Thiên Quý
addPhu(chiIdxToCungIdx(AN_QUANG_CHI[canNamIdx]), 'Ân Quang');
addPhu(chiIdxToCungIdx(THIEN_QUY_CHI[canNamIdx]), 'Thiên Quý');

// Thiên Trù
addPhu(chiIdxToCungIdx(THIEN_TRU_CHI[canNamIdx]), 'Thiên Trù');

// Quốc Ấn
addPhu(chiIdxToCungIdx(QUOC_AN_CHI[canNamIdx]), 'Quốc Ấn');

// Phong Cáo
addPhu(chiIdxToCungIdx(PHONG_CAO_CHI[canNamIdx]), 'Phong Cáo');

// Trực Phù
addPhu(chiIdxToCungIdx(TRUC_PHU_CHI[canNamIdx]), 'Trực Phù');

// Triệt Lộ (2 cung bị triệt theo Can năm)
const trietLo = TRIET_LO_CHI[canNamIdx];
if (trietLo) {
addPhu(chiIdxToCungIdx(trietLo[0]), 'Triệt Lộ');
addPhu(chiIdxToCungIdx(trietLo[1]), 'Triệt Lộ');
}

// ──────────────────────────────────────────────
// 9. Phụ tinh theo Chi năm
// ──────────────────────────────────────────────

// Thiên Mã
if (THIEN_MA_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(THIEN_MA_CHI[chiNamIdx]), 'Thiên Mã');

// Hỏa Tinh, Linh Tinh
if (HOA_TINH_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(HOA_TINH_CHI[chiNamIdx]), 'Hỏa Tinh');
if (LINH_TINH_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(LINH_TINH_CHI[chiNamIdx]), 'Linh Tinh');

// Vòng Thái Tuế (12 sao, an tại Chi năm, thuận chiều)
for (let i = 0; i < 12; i++)
addPhu(chiIdxToCungIdx((chiNamIdx + i) % 12), VONG_THAI_TUE[i]);

// Hồng Loan (nghịch từ Mão theo Chi năm), Thiên Hỉ (đối cung +6)
const hongLoanChi = (3 - chiNamIdx + 12) % 12;
addPhu(chiIdxToCungIdx(hongLoanChi), 'Hồng Loan');
addPhu(chiIdxToCungIdx((hongLoanChi + 6) % 12), 'Thiên Hỉ');

// Cô Thần, Quả Tú
if (CO_THAN_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(CO_THAN_CHI[chiNamIdx]), 'Cô Thần');
if (QUA_TU_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(QUA_TU_CHI[chiNamIdx]), 'Quả Tú');

// Thiên Diêu & Đào Hoa (cùng vị trí – Tứ Đào)
if (DAO_HOA_CHI[chiNamIdx] !== undefined) {
addPhu(chiIdxToCungIdx(DAO_HOA_CHI[chiNamIdx]), 'Thiên Diêu');
addPhu(chiIdxToCungIdx(DAO_HOA_CHI[chiNamIdx]), 'Đào Hoa');
}

// Kiếp Sát, Phá Toái
if (KIEP_SAT_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(KIEP_SAT_CHI[chiNamIdx]), 'Kiếp Sát');
if (PHA_TOAI_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(PHA_TOAI_CHI[chiNamIdx]), 'Phá Toái');

// Lưu Hà
if (LUU_HA_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(LUU_HA_CHI[chiNamIdx]), 'Lưu Hà');

// Hoa Cái
if (HOA_CAI_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(HOA_CAI_CHI[chiNamIdx]), 'Hoa Cái');

// Giải Thần
if (GIAI_THAN_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(GIAI_THAN_CHI[chiNamIdx]), 'Giải Thần');

// Đường Phù
if (DUONG_PHU_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(DUONG_PHU_CHI[chiNamIdx]), 'Đường Phù');

// Long Trì, Phượng Các (đối cung +6)
const longTriChi = LONG_TRI_CHI[chiNamIdx];
if (longTriChi !== undefined) {
addPhu(chiIdxToCungIdx(longTriChi), 'Long Trì');
addPhu(chiIdxToCungIdx((longTriChi + 6) % 12), 'Phượng Các');
}

// Thiên Khốc (chiNamIdx+6), Thiên Hư (6-chiNamIdx)
addPhu(chiIdxToCungIdx((chiNamIdx + 6) % 12), 'Thiên Khốc');
addPhu(chiIdxToCungIdx((6 - chiNamIdx + 12) % 12), 'Thiên Hư');

// Bát Tọa
if (BAT_TOA_CHI[chiNamIdx] !== undefined)
addPhu(chiIdxToCungIdx(BAT_TOA_CHI[chiNamIdx]), 'Bát Tọa');

// Tướng Quân (backup theo Chi năm – trùng với Bác Sĩ vòng, bỏ qua để tránh trùng)
// Hỷ Thần (idem)
// Phi Liêm (idem)

// Thiên Tài (theo Chi ngày)
if (chiNgayIdx >= 0)
addPhu(chiIdxToCungIdx(chiNgayIdx), 'Thiên Tài');

// ──────────────────────────────────────────────
// 10. Phụ tinh theo tháng âm
// ──────────────────────────────────────────────

// Tả Phụ (thuận từ Thìn chiIdx=4 theo tháng)
addPhu(chiIdxToCungIdx((4 + (thangAm - 1)) % 12), 'Tả Phụ');
// Hữu Bật (nghịch từ Tuất chiIdx=10 theo tháng)
addPhu(chiIdxToCungIdx((10 - (thangAm - 1) + 12) % 12), 'Hữu Bật');

// Thiên Y (thuận từ Dậu chiIdx=9 theo tháng)
addPhu(chiIdxToCungIdx((9 + (thangAm - 1)) % 12), 'Thiên Y');
// Thiên Đức (nghịch từ Dậu theo tháng)
addPhu(chiIdxToCungIdx((9 - (thangAm - 1) + 12) % 12), 'Thiên Đức');

// Thiên Hình (thuận từ Dậu chiIdx=9 theo tháng) – cùng Thiên Y
addPhu(chiIdxToCungIdx((9 + (thangAm - 1)) % 12), 'Thiên Hình');

// Thiên Riêu (nghịch từ Tuất chiIdx=10 theo tháng)
addPhu(chiIdxToCungIdx((10 - (thangAm - 1) + 12) % 12), 'Thiên Riêu');

// Nguyệt Đức
if (NGUYET_DUC_CHI[thangAm] !== undefined)
addPhu(chiIdxToCungIdx(NGUYET_DUC_CHI[thangAm]), 'Nguyệt Đức');

// Thiên Giải (nghịch từ Thân chiIdx=8 theo tháng)
addPhu(chiIdxToCungIdx((8 - (thangAm - 1) + 12) % 12), 'Thiên Giải');
// Địa Giải (thuận từ Hợi chiIdx=11 theo tháng)
addPhu(chiIdxToCungIdx((11 + (thangAm - 1)) % 12), 'Địa Giải');

// Tam Thai (thuận từ Dần chiIdx=2 theo tháng)
addPhu(chiIdxToCungIdx((2 + (thangAm - 1)) % 12), 'Tam Thai');

// Thiên Sứ (thuận từ tháng+1)
addPhu(chiIdxToCungIdx((thangAm + 1) % 12), 'Thiên Sứ');

// ──────────────────────────────────────────────
// 11. Phụ tinh theo giờ sinh
// ──────────────────────────────────────────────

// Địa Không (nghịch từ Hợi chiIdx=11 theo giờ)
addPhu(chiIdxToCungIdx((11 - gioChiIdx + 12) % 12), 'Địa Không');
// Địa Kiếp (thuận từ Hợi theo giờ)
addPhu(chiIdxToCungIdx((11 + gioChiIdx) % 12), 'Địa Kiếp');

// ──────────────────────────────────────────────
// 12. Phụ tinh theo ngày sinh
// ──────────────────────────────────────────────

// Thiên Thọ (theo Can ngày)
const canNgayIdxSafe = canNgayIdx >= 0 ? canNgayIdx : 0;
addPhu(chiIdxToCungIdx(THIEN_THO_CHI[canNgayIdxSafe]), 'Thiên Thọ');

// Tuần Không (2 chi trống trong tuần giáp của ngày sinh)
// Công thức: start = (chiNgayIdx - canNgayIdx + 12) % 12
// Tuần Không là 2 chi ngay sau cuối tuần (offset +10, +11)
if (chiNgayIdx >= 0 && canNgayIdx >= 0) {
const tuanStartChi = (chiNgayIdx - canNgayIdx + 12) % 12;
addPhu(chiIdxToCungIdx((tuanStartChi + 10) % 12), 'Tuần Không');
addPhu(chiIdxToCungIdx((tuanStartChi + 11) % 12), 'Tuần Không');
}

// ──────────────────────────────────────────────
// 13. Sao cố định
// ──────────────────────────────────────────────

// Thiên La (Thìn chiIdx=4), Địa Võng (Tuất chiIdx=10)
addPhu(chiIdxToCungIdx(4), 'Thiên La');
addPhu(chiIdxToCungIdx(10), 'Địa Võng');

// ──────────────────────────────────────────────
// 14. Đại hạn / Tiểu hạn / Tuổi hiện tại
// ──────────────────────────────────────────────
const solarNow = Solar.fromYmd(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
const lunarNow = solarNow.getLunar();
const namAmNow = lunarNow.getYear();
const tuoiHT = namAmNow - namAm + 1;

const startDai = (cungMenhIdx + 1) % 12;
const soThuTuDai = Math.ceil(tuoiHT / soCuc);
const soThuTuMod = ((((soThuTuDai - 1) % 12) + 12) % 12) + 1;
const idxDaiHT = (startDai + soThuTuMod - 1) % 12;
const soThuTuTiep = (soThuTuMod % 12) + 1;
const idxDaiTiep = (startDai + soThuTuTiep - 1) % 12;

const tuoiDaiHTStart = (soThuTuMod - 1) _ soCuc + 1;
const tuoiDaiHTEnd = soThuTuMod _ soCuc;

// Tiểu hạn
let idxTieuHanHT: number;
if (gioi_tinh.toLowerCase() === 'nam') {
idxTieuHanHT = (tuoiHT - 1) % 12;
} else {
idxTieuHanHT = (6 - (tuoiHT - 1) + 12 \* 1000) % 12;
}
const cungTieuHanHT = CUNG[idxTieuHanHT];

// ──────────────────────────────────────────────
// 15. Ngày dự đoán & Lưu Niên
// ──────────────────────────────────────────────
let d2: number, m2: number, y2: number;
[d2, m2, y2] = parseDateFlexible(ngay_du_doan);

const solarPred = Solar.fromYmd(y2, m2, d2);
const lunarPred = solarPred.getLunar();
const namAmPred = lunarPred.getYear();

// Can Chi năm dự đoán
const { can: canLN, chi: chiLN, canIdx: canLNIdx, chiIdx: chiLNIdx } = getCanChiNam(namAmPred);

// Can Chi ngày dự đoán
const ganZhiPred = lunarPred.getDayInGanZhi() as string;
let canNgayPred = ''; let chiNgayPred = '';
for (const c of CAN) {
if (ganZhiPred.startsWith(c)) { canNgayPred = c; chiNgayPred = ganZhiPred.slice(c.length).trim(); break; }
}
if (!canNgayPred) { canNgayPred = CAN[0]; chiNgayPred = CHI[0]; }

// ─── AN SAO LƯU NIÊN (流年) ───────────────────────
// Tất cả lưu niên an vào cung tương ứng qua field `luu_nien`

// Lưu Lộc, Lưu Kình, Lưu Đà (theo Can năm dự đoán)
const luuLocChiIdx = LOC_CHI_IDX[canLNIdx];
addLuu(chiIdxToCungIdx(luuLocChiIdx), 'Lưu Lộc');
addLuu(chiIdxToCungIdx((luuLocChiIdx + 1) % 12), 'Lưu Kình');
addLuu(chiIdxToCungIdx((luuLocChiIdx - 1 + 12) % 12), 'Lưu Đà');

// Lưu Thiên Mã
if (THIEN_MA_CHI[chiLNIdx] !== undefined)
addLuu(chiIdxToCungIdx(THIEN_MA_CHI[chiLNIdx]), 'Lưu Mã');

// Lưu Hỏa Tinh, Lưu Linh Tinh
if (HOA_TINH_CHI[chiLNIdx] !== undefined)
addLuu(chiIdxToCungIdx(HOA_TINH_CHI[chiLNIdx]), 'Lưu Hỏa');
if (LINH_TINH_CHI[chiLNIdx] !== undefined)
addLuu(chiIdxToCungIdx(LINH_TINH_CHI[chiLNIdx]), 'Lưu Linh');

// Lưu Văn Xương, Lưu Văn Khúc
addLuu(chiIdxToCungIdx(VAN_XUONG_CHI[canLNIdx]), 'Lưu Văn Xương');
addLuu(chiIdxToCungIdx(VAN_KHUC_CHI[canLNIdx]), 'Lưu Văn Khúc');

// Lưu Thiên Khôi, Lưu Thiên Việt
addLuu(chiIdxToCungIdx(KHOI_CHI[canLNIdx]), 'Lưu Thiên Khôi');
addLuu(chiIdxToCungIdx(VIET_CHI[canLNIdx]), 'Lưu Thiên Việt');

// Lưu Tứ Hóa (đánh dấu lên luu_nien, không ghi đè tu_hoa gốc)
const luuTH = TU_HOA_TINH[canLNIdx];
if (luuTH) {
for (const key of cungKeys) {
const ct = cungData[key].chinh_tinh;
const pt = cungData[key].phu_tinh;
const luu = cungData[key].luu_nien;
if (ct.includes(luuTH.loc)) luu.push('Lưu Hóa Lộc');
if (ct.includes(luuTH.quyen)) luu.push('Lưu Hóa Quyền');
if (ct.includes(luuTH.khoa)) luu.push('Lưu Hóa Khoa');
if (ct.includes(luuTH.ky)) luu.push('Lưu Hóa Kỵ');
if (luuTH.khoa === 'Văn Xương' && pt.includes('Văn Xương')) luu.push('Lưu Hóa Khoa');
if (luuTH.ky === 'Văn Khúc' && pt.includes('Văn Khúc')) luu.push('Lưu Hóa Kỵ');
if (luuTH.khoa === 'Hữu Bật' && pt.includes('Hữu Bật')) luu.push('Lưu Hóa Khoa');
}
}

// Lưu Niên Vòng Thái Tuế (an tại Chi năm dự đoán)
for (let i = 0; i < 12; i++)
addLuu(chiIdxToCungIdx((chiLNIdx + i) % 12), VONG_LUU_THAI_TUE[i]);

// Lưu Niên Vòng Bác Sĩ (an tại Lưu Lộc)
for (let i = 0; i < 12; i++)
addLuu(chiIdxToCungIdx((luuLocChiIdx + i) % 12), VONG_LUU_BAC_SI[i]);

// Lưu Địa Không, Lưu Địa Kiếp (theo giờ ngày dự đoán – nếu có, dùng 0:0 mặc định)
// Đơn giản hóa: an tại Hợi (chiIdx=11) khi không biết giờ ngày dự đoán
// Nếu muốn chính xác, cần thêm gio_du_doan vào input

// Lưu Hồng Loan, Lưu Thiên Hỉ
const luuHongLoanChi = (3 - chiLNIdx + 12) % 12;
addLuu(chiIdxToCungIdx(luuHongLoanChi), 'Lưu Hồng Loan');
addLuu(chiIdxToCungIdx((luuHongLoanChi + 6) % 12), 'Lưu Thiên Hỉ');

// Lưu Hao (Đại Hao và Tiểu Hao của Lưu Bác Sĩ đã có ở trên)

// ──────────────────────────────────────────────
// 16. Dự đoán ngày / Ngũ hành tương sinh khắc
// ──────────────────────────────────────────────
const hanhCanNgayPred = NAP_AM_NGU_HANH[`${canNgayPred} ${chiNgayPred}`] || 'Mộc';
const nguHanhOrder = ['Mộc','Hỏa','Thổ','Kim','Thủy'];
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
Mộc: { tot:'Mộc: giáo dục, sáng tạo', chuy:'Mộc: quyết định chậm' },
Hỏa: { tot:'Hỏa: truyền thông, năng lượng', chuy:'Hỏa: dễ nóng giận' },
Thổ: { tot:'Thổ: bất động sản, tài chính', chuy:'Thổ: bảo thủ' },
Kim: { tot:'Kim: kim hoàn, công nghệ', chuy:'Kim: cứng nhắc' },
Thủy: { tot:'Thủy: giao thông, thương mại', chuy:'Thủy: dễ thay đổi' },
};
const linhVucTot = hanhDesc[hanhCanNgayPred] ? [hanhDesc[hanhCanNgayPred].tot] : [];
const linhVucCanChuY = hanhDesc[hanhCanNgayPred] ? [hanhDesc[hanhCanNgayPred].chuy] : [];

const huongMap: Record<string,string> = { Mộc:'Đông',Hỏa:'Nam',Thổ:'Trung',Kim:'Tây',Thủy:'Bắc' };
const mauMap: Record<string,string> = { Mộc:'Xanh lá',Hỏa:'Đỏ',Thổ:'Vàng/Nâu',Kim:'Trắng',Thủy:'Đen/Xanh dương' };

// ──────────────────────────────────────────────
// 17. Build result
// ──────────────────────────────────────────────
const daiHanKey = getKeyForChi(idxDaiHT);
const tiepKey = getKeyForChi(idxDaiTiep);
const tieuHanKey = getKeyForChi(idxTieuHanHT);

const result: any = {
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
        dia_chi:    cungMenh,
        chinh_tinh: cungData['menh'].chinh_tinh,
        phu_tinh:   cungData['menh'].phu_tinh,
        tu_hoa:     cungData['menh'].tu_hoa,
        luu_nien:   cungData['menh'].luu_nien,
      },
      cung_than: {
        dia_chi:    cungThan,
        chinh_tinh: cungData[getKeyForChi(cungThanIdx)].chinh_tinh,
        phu_tinh:   cungData[getKeyForChi(cungThanIdx)].phu_tinh,
        tu_hoa:     cungData[getKeyForChi(cungThanIdx)].tu_hoa,
        luu_nien:   cungData[getKeyForChi(cungThanIdx)].luu_nien,
      },
    },

    '12_cung': {} as Record<string, any>,

    van_han: {
      dai_han_hien_tai: {
        cung:          CUNG[idxDaiHT],
        tuoi_bat_dau:  tuoiDaiHTStart,
        tuoi_ket_thuc: tuoiDaiHTEnd,
        chinh_tinh:    cungData[daiHanKey].chinh_tinh,
        phu_tinh:      cungData[daiHanKey].phu_tinh,
        tu_hoa:        cungData[daiHanKey].tu_hoa,
        luu_nien:      cungData[daiHanKey].luu_nien,
      },
      dai_han_tiep_theo: {
        cung:          CUNG[idxDaiTiep],
        tuoi_bat_dau:  tuoiDaiHTEnd + 1,
        tuoi_ket_thuc: tuoiDaiHTEnd + soCuc,
        chinh_tinh:    cungData[tiepKey].chinh_tinh,
        phu_tinh:      cungData[tiepKey].phu_tinh,
        tu_hoa:        cungData[tiepKey].tu_hoa,
        luu_nien:      cungData[tiepKey].luu_nien,
      },
      tieu_han_hien_tai: {
        nam:           namAmNow,
        can_chi_nam:   `${CAN[(namAmNow + idxTieuHanHT) % 10]} ${CHI[idxTieuHanHT]}`,
        cung:          cungTieuHanHT,
        chinh_tinh:    cungData[tieuHanKey].chinh_tinh,
        phu_tinh:      cungData[tieuHanKey].phu_tinh,
        tu_hoa:        cungData[tieuHanKey].tu_hoa,
        luu_nien:      cungData[tieuHanKey].luu_nien,
      },
    },

    luu_nien_nam: {
      can_chi_nam_du_doan: `${canLN} ${chiLN}`,
      nam_am:              namAmPred,
      can_idx:             canLNIdx,
      chi_idx:             chiLNIdx,
    },

    du_doan_ngay: {
      ngay:                  ngay_du_doan,
      can_chi_ngay:          `${canNgayPred} ${chiNgayPred}`,
      ngu_hanh_ngay:         hanhCanNgayPred,
      tuong_sinh_khac:       tuongSinh,
      ket_qua_tong_quat:     tuongSinh.includes('tương sinh')
        ? 'Ngày tốt, hợp với mệnh'
        : tuongSinh.includes('tương khắc')
          ? 'Ngày khó, cần cẩn trọng'
          : 'Bình thường',
      diem_may_man:          diem,
      linh_vuc_tot:          linhVucTot,
      linh_vuc_can_chu_y:    linhVucCanChuY,
      gio_tot:               ['11h-13h (Ngọ)'],
      huong_xuat_hanh:       huongMap[nguHanh] || 'Trung',
      mau_sac_ho_tro:        mauMap[nguHanh]   || '',
    },

};

// Fill 12 cung
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
