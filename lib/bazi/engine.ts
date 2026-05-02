import "server-only";
// @ts-ignore
import { Solar, Lunar } from "lunar-javascript";

import type {
  FortuneRequest, TuViEngineResult, TuViPalace, TuViStar, TuViDecadeCycle,
} from "./types";

// ─── Bảng dữ liệu ─────────────────────────────────────────────────────────────

const CAN  = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI  = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];
// 12 cung theo thứ tự vòng tròn bắt đầu từ Dần
const CUNG = ["Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi","Tý","Sửu"];

const PALACE_KEYS = [
  "menh","phu_mau","phuc_duc","dien_trach",
  "quan_loc","no_boc","thien_di","tat_ach",
  "tai_bach","tu_tuc","phu_the","huynh_de",
] as const;

const PALACE_NAMES_VI: Record<string, string> = {
  menh:"Mệnh", phu_mau:"Phụ Mẫu", phuc_duc:"Phúc Đức", dien_trach:"Điền Trạch",
  quan_loc:"Quan Lộc", no_boc:"Nô Bộc", thien_di:"Thiên Di", tat_ach:"Tật Ách",
  tai_bach:"Tài Bạch", tu_tuc:"Tử Tức", phu_the:"Phu Thê", huynh_de:"Huynh Đệ",
};

// Nạp Âm 60 hoa giáp → ngũ hành
const NAP_AM: Record<string, string> = {
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

const SO_CUC: Record<string, number> = { Thủy:2, Mộc:3, Kim:4, Thổ:5, Hỏa:6 };

// Chất lượng sao
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

// Tứ Hóa Bắc Tông (Thái Thứ Lang)
const TU_HOA: Record<number, { loc:string; quyen:string; khoa:string; ky:string }> = {
  0: { loc:"Liêm Trinh",  quyen:"Phá Quân",    khoa:"Vũ Khúc",      ky:"Thái Dương"  },
  1: { loc:"Thiên Cơ",    quyen:"Thiên Lương",  khoa:"Tử Vi",        ky:"Thái Âm"     },
  2: { loc:"Thiên Đồng",  quyen:"Thiên Cơ",     khoa:"Văn Xương",    ky:"Liêm Trinh"  },
  3: { loc:"Thái Âm",     quyen:"Thiên Đồng",   khoa:"Thiên Cơ",     ky:"Cự Môn"      },
  4: { loc:"Tham Lang",   quyen:"Thái Âm",      khoa:"Hữu Bật",      ky:"Thiên Lương" },
  5: { loc:"Vũ Khúc",     quyen:"Tham Lang",    khoa:"Thiên Lương",  ky:"Văn Khúc"    },
  6: { loc:"Thái Dương",  quyen:"Vũ Khúc",      khoa:"Thái Âm",      ky:"Thiên Đồng"  },
  7: { loc:"Cự Môn",      quyen:"Thái Dương",   khoa:"Văn Xương",    ky:"Văn Khúc"    },
  8: { loc:"Thiên Lương", quyen:"Tử Vi",        khoa:"Hữu Bật",      ky:"Vũ Khúc"     },
  9: { loc:"Phá Quân",    quyen:"Cự Môn",       khoa:"Thái Âm",      ky:"Tham Lang"   },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const mod12 = (n: number) => ((n % 12) + 12) % 12;

// chiIdx (0=Tý..11=Hợi) → cungIdx (0=Dần..11=Sửu)
const chiToCung = (chiIdx: number) => mod12(chiIdx - 2);

// cungIdx → chiIdx
const cungToChi = (cungIdx: number) => mod12(cungIdx + 2);

function getQuality(starName: string, cungIdx: number): TuViStar["quality"] {
  const q = STAR_QUALITY[starName];
  if (!q) return "binh_hoa";
  if (q.mieu.includes(cungIdx)) return "mieu_dia";
  if (q.vuong.includes(cungIdx)) return "vuong_dia";
  if (q.dac.includes(cungIdx))  return "dac_dia";
  if (q.ham.includes(cungIdx))  return "ham_dia";
  return "binh_hoa";
}

// Chuyển giờ → chi index (0=Tý..11=Hợi)
function hourToChiIdx(hour: number, minute: number): number {
  const h = hour + minute / 60;
  if (h >= 23 || h < 1)  return 0;
  if (h < 3)  return 1;
  if (h < 5)  return 2;
  if (h < 7)  return 3;
  if (h < 9)  return 4;
  if (h < 11) return 5;
  if (h < 13) return 6;
  if (h < 15) return 7;
  if (h < 17) return 8;
  if (h < 19) return 9;
  if (h < 21) return 10;
  return 11;
}

// Parse GanZhi từ chữ Hán (lunar-javascript trả về Hán tự)
const CAN_HAN: Record<string,string> = {
  '甲':'Giáp','乙':'Ất','丙':'Bính','丁':'Đinh','戊':'Mậu',
  '己':'Kỷ','庚':'Canh','辛':'Tân','壬':'Nhâm','癸':'Quý',
};
const CHI_HAN: Record<string,string> = {
  '子':'Tý','丑':'Sửu','寅':'Dần','卯':'Mão','辰':'Thìn','巳':'Tỵ',
  '午':'Ngọ','未':'Mùi','申':'Thân','酉':'Dậu','戌':'Tuất','亥':'Hợi',
};

function parseGanZhi(s: string): { can: string; chi: string; canIdx: number; chiIdx: number } {
  const can = CAN_HAN[s[0]] ?? s[0];
  const chi = CHI_HAN[s[1]] ?? s[1];
  return { can, chi, canIdx: CAN.indexOf(can), chiIdx: CHI.indexOf(chi) };
}

// ─── Tính Tử Vi ───────────────────────────────────────────────────────────────
// Thuật toán: tìm X nhỏ nhất để (ngayAm + X) % soCuc = 0
// X chẵn → tiến từ Thìn; X lẻ → lùi từ Thìn

function getTuViCungIdx(ngayAm: number, soCuc: number): number {
  let x = 0;
  while ((ngayAm + x) % soCuc !== 0) x++;
  const q = (ngayAm + x) / soCuc;
  // Thìn = chiIdx 4 → cungIdx = chiToCung(4) = 2
  const thinCung = 2;
  return x % 2 === 0
    ? mod12(thinCung + q - 1)   // tiến
    : mod12(thinCung - q + 1);  // lùi
}

// ─── Build 12 cung ────────────────────────────────────────────────────────────

function buildPalaces(
  menhCungIdx: number,
  thanCungIdx: number,
  canNamIdx: number,
  chiNamIdx: number,
  thangAm: number,
  ngayAm: number,
  gioChiIdx: number,
  soCuc: number
): TuViPalace[] {
  // Khởi 12 cung
  const palaces: TuViPalace[] = PALACE_KEYS.map((key, i) => {
    const cungIdx = mod12(menhCungIdx + i);
    return {
      name: key,
      branch: CUNG[cungIdx],
      element: "",
      isLifePalace: i === 0,
      isBodyPalace: cungIdx === thanCungIdx,
      majorStars: [],
      minorStars: [],
      note: "",
    };
  });

  const addMajor = (name: string, cungIdx: number, element: string) => {
    const p = palaces.find(p => CUNG.indexOf(p.branch) === cungIdx);
    if (p) p.majorStars.push({ name, type:"chinh_tinh", quality: getQuality(name, cungIdx), element });
  };

  const addMinor = (name: string, cungIdx: number, element = "Thổ") => {
    const p = palaces.find(p => CUNG.indexOf(p.branch) === cungIdx);
    if (p) p.minorStars.push({ name, type:"phu_tinh", quality:"binh_hoa", element });
  };

  // ── Chính tinh ──
  const tvIdx = getTuViCungIdx(ngayAm, soCuc);
  const tpIdx = mod12(tvIdx + 8); // Thiên Phủ đối xứng qua Dần-Thân

  addMajor("Tử Vi",       tvIdx,           "Thổ");
  addMajor("Thiên Cơ",    mod12(tvIdx-1),  "Mộc");
  addMajor("Thái Dương",  mod12(tvIdx-3),  "Hỏa");
  addMajor("Vũ Khúc",     mod12(tvIdx-4),  "Kim");
  addMajor("Thiên Đồng",  mod12(tvIdx-5),  "Thủy");
  addMajor("Liêm Trinh",  mod12(tvIdx-8),  "Hỏa");
  addMajor("Thiên Phủ",   tpIdx,           "Thổ");
  addMajor("Thái Âm",     mod12(tpIdx+1),  "Thủy");
  addMajor("Tham Lang",   mod12(tpIdx+2),  "Mộc");
  addMajor("Cự Môn",      mod12(tpIdx+3),  "Thủy");
  addMajor("Thiên Tướng", mod12(tpIdx+4),  "Thủy");
  addMajor("Thiên Lương", mod12(tpIdx+5),  "Thổ");
  addMajor("Thất Sát",    mod12(tpIdx+6),  "Kim");
  addMajor("Phá Quân",    mod12(tpIdx+10), "Thủy");

  // ── Tứ Hóa ──
  const tuHoa = TU_HOA[canNamIdx];
  if (tuHoa) {
    for (const p of palaces) {
      const names = [...p.majorStars.map(s=>s.name), ...p.minorStars.map(s=>s.name)];
      if (names.includes(tuHoa.loc))   addMinor("Hóa Lộc",   CUNG.indexOf(p.branch), "Mộc");
      if (names.includes(tuHoa.quyen)) addMinor("Hóa Quyền", CUNG.indexOf(p.branch), "Hỏa");
      if (names.includes(tuHoa.khoa))  addMinor("Hóa Khoa",  CUNG.indexOf(p.branch), "Thủy");
      if (names.includes(tuHoa.ky))    addMinor("Hóa Kỵ",    CUNG.indexOf(p.branch), "Thủy");
    }
  }

  // ── Lộc Tồn, Kình Dương, Đà La ──
  const LOC_CHI: Record<number,number> = {0:2,1:3,2:5,3:6,4:5,5:6,6:8,7:9,8:11,9:0};
  const locChiIdx = LOC_CHI[canNamIdx] ?? 2;
  addMinor("Lộc Tồn",   chiToCung(locChiIdx),           "Thổ");
  addMinor("Kình Dương", chiToCung(mod12(locChiIdx+1)), "Kim");
  addMinor("Đà La",      chiToCung(mod12(locChiIdx-1)), "Kim");

  // ── Văn Xương, Văn Khúc ──
  const VX_CHI: Record<number,number> = {0:10,1:9,2:8,3:7,4:6,5:5,6:4,7:3,8:2,9:1};
  const VK_CHI: Record<number,number> = {0:4,1:3,2:2,3:1,4:0,5:11,6:10,7:9,8:8,9:7};
  addMinor("Văn Xương", chiToCung(VX_CHI[canNamIdx] ?? 10), "Kim");
  addMinor("Văn Khúc",  chiToCung(VK_CHI[canNamIdx] ?? 4),  "Thủy");

  // ── Tả Phụ, Hữu Bật ──
  addMinor("Tả Phụ",  chiToCung(mod12(4 + thangAm - 1)),  "Thổ");
  addMinor("Hữu Bật", chiToCung(mod12(10 - thangAm + 1)), "Thổ");

  // ── Thiên Khôi, Thiên Việt ──
  const KHOI: Record<number,number> = {0:1,1:0,2:11,3:11,4:1,5:0,6:6,7:6,8:3,9:3};
  const VIET: Record<number,number> = {0:7,1:8,2:9,3:9,4:7,5:8,6:2,7:2,8:6,9:5};
  addMinor("Thiên Khôi", chiToCung(KHOI[canNamIdx] ?? 1), "Hỏa");
  addMinor("Thiên Việt", chiToCung(VIET[canNamIdx] ?? 7), "Hỏa");

  // ── Thiên Mã ──
  const MA: Record<number,number> = {2:8,6:8,10:8, 8:2,0:2,4:2, 5:11,9:11,1:11, 11:5,3:5,7:5};
  if (MA[chiNamIdx] !== undefined) addMinor("Thiên Mã", chiToCung(MA[chiNamIdx]), "Hỏa");

  // ── Hỏa Tinh, Linh Tinh ──
  const HOA_BASE: Record<number,number> = {2:0,6:0,10:0, 8:6,0:6,4:6, 5:10,9:7,1:10, 11:1,3:1,7:1};
  const LINH_BASE: Record<number,number> = {2:8,6:1,10:8, 8:1,0:1,4:1, 5:7,9:7,1:7, 11:10,3:10,7:10};
  if (HOA_BASE[chiNamIdx] !== undefined)  addMinor("Hỏa Tinh",  chiToCung(HOA_BASE[chiNamIdx]),  "Hỏa");
  if (LINH_BASE[chiNamIdx] !== undefined) addMinor("Linh Tinh", chiToCung(LINH_BASE[chiNamIdx]), "Hỏa");

  // ── Địa Không, Địa Kiếp ──
  addMinor("Địa Không", chiToCung(mod12(11 - gioChiIdx)), "Hỏa");
  addMinor("Địa Kiếp",  chiToCung(mod12(11 + gioChiIdx)), "Hỏa");

  // ── Hồng Loan, Thiên Hỉ ──
  const hongLoanChi = mod12(3 - chiNamIdx);
  addMinor("Hồng Loan", chiToCung(hongLoanChi),           "Thủy");
  addMinor("Thiên Hỉ",  chiToCung(mod12(hongLoanChi+6)), "Hỏa");

  // ── Đào Hoa ──
  const DAO_HOA: Record<number,number> = {2:3,6:3,10:3, 8:9,0:9,4:9, 5:6,9:6,1:6, 11:0,3:0,7:0};
  if (DAO_HOA[chiNamIdx] !== undefined) addMinor("Đào Hoa", chiToCung(DAO_HOA[chiNamIdx]), "Mộc");

  // ── Vòng Thái Tuế ──
  const THAI_TUE = ["Thái Tuế","Thiếu Dương","Tang Môn","Thiếu Âm","Quan Phù","Tử Phù","Tuế Phá","Long Đức","Bạch Hổ","Phúc Đức","Điếu Khách","Bệnh Phù"];
  for (let i = 0; i < 12; i++) {
    addMinor(THAI_TUE[i], mod12(chiToCung(chiNamIdx) + i), "Hỏa");
  }

  // ── Thiên La, Địa Võng ──
  addMinor("Thiên La", chiToCung(4),  "Thổ"); // Thìn
  addMinor("Địa Võng", chiToCung(10), "Thổ"); // Tuất

  // ── Cô Thần, Quả Tú ──
  const CO_THAN: Record<number,number> = {2:5,3:5,4:5, 5:8,6:8,7:8, 8:11,9:11,10:11, 11:2,0:2,1:2};
  const QUA_TU:  Record<number,number> = {2:1,3:1,4:1, 5:4,6:4,7:4, 8:7,9:7,10:7, 11:10,0:10,1:10};
  if (CO_THAN[chiNamIdx] !== undefined) addMinor("Cô Thần", chiToCung(CO_THAN[chiNamIdx]), "Thổ");
  if (QUA_TU[chiNamIdx]  !== undefined) addMinor("Quả Tú",  chiToCung(QUA_TU[chiNamIdx]),  "Thổ");

  // ── Kiếp Sát ──
  const KIEP_SAT: Record<number,number> = {2:5,6:5,10:5, 8:11,0:11,4:11, 5:2,9:2,1:2, 11:8,3:8,7:8};
  if (KIEP_SAT[chiNamIdx] !== undefined) addMinor("Kiếp Sát", chiToCung(KIEP_SAT[chiNamIdx]), "Hỏa");

  // ── Thiên Quan, Thiên Phúc ──
  const T_QUAN: Record<number,number> = {0:7,1:4,2:3,3:8,4:11,5:0,6:7,7:4,8:3,9:8};
  const T_PHUC: Record<number,number> = {0:9,1:6,2:11,3:2,4:1,5:4,6:9,7:6,8:11,9:2};
  addMinor("Thiên Quan", chiToCung(T_QUAN[canNamIdx] ?? 7), "Hỏa");
  addMinor("Thiên Phúc", chiToCung(T_PHUC[canNamIdx] ?? 9), "Hỏa");

  // ── Thiên Hình, Thiên Riêu ──
  addMinor("Thiên Hình", chiToCung(mod12(9 + thangAm - 1)),  "Hỏa");
  addMinor("Thiên Riêu", chiToCung(mod12(10 - thangAm + 1)), "Thủy");

  // ── Thiên Y ──
  addMinor("Thiên Y", chiToCung(mod12(9 + thangAm - 1)), "Thủy");

  // ── Thiên Đức, Nguyệt Đức ──
  addMinor("Thiên Đức", chiToCung(mod12(9 - thangAm + 1)), "Hỏa");

  // ── Long Trì, Phượng Các ──
  const LONG_TRI: Record<number,number> = {0:4,1:5,2:6,3:7,4:8,5:9,6:10,7:11,8:0,9:1,10:2,11:3};
  const ltChi = LONG_TRI[chiNamIdx] ?? 4;
  addMinor("Long Trì",    chiToCung(ltChi),           "Thủy");
  addMinor("Phượng Các",  chiToCung(mod12(ltChi+6)), "Thổ");

  // ── Thiên Khốc, Thiên Hư ──
  addMinor("Thiên Khốc", chiToCung(mod12(6 + chiNamIdx)),  "Thủy");
  addMinor("Thiên Hư",   chiToCung(mod12(6 - chiNamIdx)), "Thủy");

  // ── Hoa Cái ──
  const HOA_CAI: Record<number,number> = {2:10,6:10,10:10, 8:4,0:4,4:4, 5:1,9:1,1:1, 11:7,3:7,7:7};
  if (HOA_CAI[chiNamIdx] !== undefined) addMinor("Hoa Cái", chiToCung(HOA_CAI[chiNamIdx]), "Kim");

  // ── Ân Quang, Thiên Quý ──
  const AN_QUANG: Record<number,number> = {0:10,1:11,2:0,3:1,4:2,5:3,6:4,7:5,8:6,9:7};
  const T_QUY:    Record<number,number> = {0:11,1:0,2:1,3:2,4:3,5:4,6:5,7:6,8:7,9:8};
  addMinor("Ân Quang",  chiToCung(AN_QUANG[canNamIdx] ?? 10), "Mộc");
  addMinor("Thiên Quý", chiToCung(T_QUY[canNamIdx]    ?? 11), "Thổ");

  // ── Ghi chú cung ──
  return palaces.map(p => ({
    ...p,
    note: buildNote(p),
  }));
}

function buildNote(p: TuViPalace): string {
  const stars = p.majorStars.map(s => s.name).join(", ") || "vô chính diệu";
  const notes: Record<string, string> = {
    menh:       `Cung Mệnh chủ về cốt cách. Chính tinh: ${stars}.`,
    quan_loc:   `Cung Quan Lộc quyết định sự nghiệp. Chính tinh: ${stars}.`,
    tai_bach:   `Cung Tài Bạch phản ánh tài lộc. Chính tinh: ${stars}.`,
    phu_the:    `Cung Phu Thê cho biết duyên phận. Chính tinh: ${stars}.`,
    thien_di:   `Cung Thiên Di thể hiện vận hội ngoài xa. Chính tinh: ${stars}.`,
    phuc_duc:   `Cung Phúc Đức thể hiện phúc phần. Chính tinh: ${stars}.`,
    tu_tuc:     `Cung Tử Tức liên quan con cái. Chính tinh: ${stars}.`,
    dien_trach: `Cung Điền Trạch cho biết bất động sản. Chính tinh: ${stars}.`,
    no_boc:     `Cung Nô Bộc phản ánh quan hệ đối tác. Chính tinh: ${stars}.`,
    tat_ach:    `Cung Tật Ách liên quan sức khỏe. Chính tinh: ${stars}.`,
    phu_mau:    `Cung Phụ Mẫu phản ánh quan hệ cha mẹ. Chính tinh: ${stars}.`,
    huynh_de:   `Cung Huynh Đệ cho biết anh em bạn bè. Chính tinh: ${stars}.`,
  };
  return notes[p.name] ?? `Cung ${PALACE_NAMES_VI[p.name] ?? p.name}: ${stars}.`;
}

// ─── Đại hạn ──────────────────────────────────────────────────────────────────

function buildDecadeCycles(
  palaces: TuViPalace[],
  soCuc: number,
  ngayAm: number,
  isMale: boolean,
  isYangYear: boolean
): TuViDecadeCycle[] {
  // Số năm đại hạn đầu = ngayAm % soCuc (nếu = 0 thì = soCuc)
  const rem = ngayAm % soCuc;
  const startAge = rem === 0 ? soCuc : rem;

  // Dương Nam / Âm Nữ: thuận; Âm Nam / Dương Nữ: nghịch
  const forward = (isMale && isYangYear) || (!isMale && !isYangYear);

  return palaces.map((_, i) => {
    const idx = forward ? i : mod12(12 - i);
    const p   = palaces[idx];
    const s   = startAge + i * 10;
    const stars = p.majorStars.slice(0, 2).map(x => x.name).join(" + ") || "bộ cục";
    return {
      palace:   p.name,
      branch:   p.branch,
      startAge: s,
      endAge:   s + 9,
      focus:    `Đại hạn ${PALACE_NAMES_VI[p.name] ?? p.name} (${p.branch}): ${stars}. Cục ${soCuc}.`,
    };
  });
}

// ─── Phân tích ────────────────────────────────────────────────────────────────

function buildAnalysis(palaces: TuViPalace[]) {
  const g = (n: string) => palaces.find(p => p.name === n);
  const s = (p: TuViPalace | undefined) => p?.majorStars.map(x => x.name).join(", ") || "vô chính diệu";
  return {
    coreTraits: [
      `Mệnh (${g("menh")?.branch}): ${s(g("menh"))}.`,
      `Thân cư ${PALACE_NAMES_VI[palaces.find(p => p.isBodyPalace)?.name ?? "menh"] ?? "Mệnh"}.`,
      "Phúc Đức và Thiên Di cần đối chiếu để biết phúc phần và quý nhân.",
    ],
    career: [
      `Quan Lộc (${g("quan_loc")?.branch}): ${s(g("quan_loc"))}.`,
      `Tài Bạch (${g("tai_bach")?.branch}): ${s(g("tai_bach"))}.`,
    ],
    relationship: [
      `Phu Thê (${g("phu_the")?.branch}): ${s(g("phu_the"))}.`,
      `Thiên Di (${g("thien_di")?.branch}): ${s(g("thien_di"))}.`,
    ],
  };
}

function buildSummary(r: TuViEngineResult): string[] {
  const g = (n: string) => r.palaces.find(p => p.name === n);
  const s = (p: TuViPalace | undefined) => p?.majorStars.map(x => x.name).join(", ") || "vô chính diệu";
  return [
    `${r.profile.fullName || "Bạn"}: Mệnh ${r.overview.menhBranch}, Thân ${r.overview.thanBranch}, ${r.overview.cuc}.`,
    `Cung Mệnh: ${s(g("menh"))}.`,
    `Quan Lộc: ${s(g("quan_loc"))}. Tài Bạch: ${s(g("tai_bach"))}.`,
    `Phu Thê: ${s(g("phu_the"))}.`,
  ];
}

// ─── Export chính ─────────────────────────────────────────────────────────────

export function calculateTuVi(input: FortuneRequest): TuViEngineResult {
  // Chuyển đổi ngày sinh
  const [year, month, day] = input.birthDate.split("-").map(Number);
  const [hour, minute]     = input.birthTime.split(":").map(Number);

  if ([year, month, day, hour, minute].some(Number.isNaN))
    throw new Error("Ngày giờ sinh không hợp lệ.");

  let lunar: any;
  if (input.calendarType === "am") {
    lunar = Lunar.fromYmd(year, month, day);
  } else {
    const solar = Solar.fromYmd(year, month, day);
    lunar = solar.getLunar();
  }

  const namAm   = lunar.getYear()  as number;
  const thangAm = lunar.getMonth() as number;
  const ngayAm  = lunar.getDay()   as number;

  // Can Chi năm (từ Hán tự)
  const yearGZ  = parseGanZhi(lunar.getYearInGanZhi() as string);
  const dayGZ   = parseGanZhi(lunar.getDayInGanZhi()  as string);
  const canNamIdx  = yearGZ.canIdx;
  const chiNamIdx  = yearGZ.chiIdx;
  const isYangYear = canNamIdx % 2 === 0;
  const isMale     = input.gender === "nam";

  // Giờ chi
  const gioChiIdx = hourToChiIdx(hour, minute);

  // Mệnh & Thân cung
  // Mệnh: khởi Dần(cungIdx=0), thuận tháng, nghịch giờ
  // Thân: khởi Dần(cungIdx=0), thuận tháng, thuận giờ
  const menhCungIdx = mod12((thangAm - 1) - gioChiIdx);
  const thanCungIdx = mod12((thangAm - 1) + gioChiIdx);

  // Cục từ Nạp Âm Can Chi năm
  const napAmKey = `${yearGZ.can} ${yearGZ.chi}`;
  const nguHanh  = NAP_AM[napAmKey] ?? "Hỏa";
  const soCuc    = SO_CUC[nguHanh] ?? 6;

  const palaces = buildPalaces(
    menhCungIdx, thanCungIdx,
    canNamIdx, chiNamIdx,
    thangAm, ngayAm, gioChiIdx, soCuc
  );

  const canChiYear = `${yearGZ.can} ${yearGZ.chi}`;
  const canChiDay  = `${dayGZ.can} ${dayGZ.chi}`;
  const cucName    = `${nguHanh === "Thủy" ? "Thủy nhị" : nguHanh === "Mộc" ? "Mộc tam" : nguHanh === "Kim" ? "Kim tứ" : nguHanh === "Thổ" ? "Thổ ngũ" : "Hỏa lục"} cục`;

  const lifePalace   = palaces.find(p => p.isLifePalace)!;
  const bodyPalace   = palaces.find(p => p.isBodyPalace) ?? lifePalace;
  const careerPalace = palaces.find(p => p.name === "quan_loc")!;
  const wealthPalace = palaces.find(p => p.name === "tai_bach")!;
  const spousePalace = palaces.find(p => p.name === "phu_the")!;
  const travelPalace = palaces.find(p => p.name === "thien_di")!;

  const result: TuViEngineResult = {
    lifePalace,
    bodyPalace,
    careerPalace,
    wealthPalace,
    spousePalace,
    travelPalace,
    profile: {
      fullName:      input.fullName.trim(),
      genderLabel:   isMale ? "Nam" : "Nữ",
      solarDateTime: `${input.birthDate} ${input.birthTime}`,
      lunarDateTime: `${ngayAm}/${thangAm}/${namAm} âm lịch`,
      timezone:      input.timezone,
    },
    overview: {
      chartType:   "Tử Vi Đẩu Số Bắc Tông",
      zodiac:      String(lunar.getYearShengXiao()),
      amDuong:     isYangYear ? "Dương" : "Âm",
      cuc:         cucName,
      cucNumber:   soCuc,
      menhPalace:  "menh",
      thanPalace:  palaces.find(p => p.isBodyPalace)?.name ?? "menh",
      menhBranch:  CUNG[menhCungIdx],
      thanBranch:  CUNG[thanCungIdx],
      canChiYear,
      canChiDay,
      menhChu:     CUNG[menhCungIdx],
      thanChu:     CUNG[thanCungIdx],
    },
    palaces,
    keyStars: palaces
      .filter(p => p.isLifePalace || p.isBodyPalace || p.name === "quan_loc" || p.name === "tai_bach")
      .flatMap(p => p.majorStars.slice(0, 2).map(s => s.name)),
    decadeCycles: buildDecadeCycles(palaces, soCuc, ngayAm, isMale, isYangYear),
    summary: [],
    analysis: buildAnalysis(palaces),
  };

  result.summary = buildSummary(result);
  return result;
}

export const calculateBazi = calculateTuVi;
