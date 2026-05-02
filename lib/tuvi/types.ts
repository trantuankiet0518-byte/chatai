// ============================================================
// TYPES - TuVi Type Definitions
// ============================================================

export interface TuViInput {
  ho_ten: string;
  ngay_sinh: string;
  loai_lich: string;
  gio_sinh: string;
  gioi_tinh: string;
  ngay_du_doan: string;
}

export interface TuViPalaceData {
  dia_chi: string;
  chinh_tinh: string[];
  phu_tinh: string[];
  tu_hoa: string[];
  luu_nien: string[];
}

export interface TuViThongTinCoBan {
  ho_ten: string;
  gioi_tinh: string;
  duong_lich: string;
  am_lich: string;
  gio_sinh: string;
  gio_chi: string;
  can_chi_nam: string;
  can_chi_ngay_sinh: string;
  ngu_hanh_menh_cuc: string;
  so_cuc: number;
  am_duong: string;
}

export interface TuViCungMenhThan {
  cung_menh: TuViPalaceData;
  cung_than: TuViPalaceData;
}

export interface TuViDaiHan {
  cung: string;
  tuoi_bat_dau: number;
  tuoi_ket_thuc: number;
  chinh_tinh: string[];
  phu_tinh: string[];
  tu_hoa: string[];
  luu_nien: string[];
}

export interface TuViVanHan {
  dai_han_hien_tai: TuViDaiHan;
  dai_han_tiep_theo: TuViDaiHan;
  tieu_han_hien_tai: {
    nam: number;
    can_chi_nam: string;
    cung: string;
    chinh_tinh: string[];
    phu_tinh: string[];
    tu_hoa: string[];
    luu_nien: string[];
  };
}

export interface TuViLuuNienNam {
  can_chi_nam_du_doan: string;
  nam_am: number;
  can_idx: number;
  chi_idx: number;
}

export interface TuViDuDoanNgay {
  ngay: string;
  can_chi_ngay: string;
  ngu_hanh_ngay: string;
  tuong_sinh_khac: string;
  ket_qua_tong_quat: string;
  diem_may_man: number;
  linh_vuc_tot: string[];
  linh_vuc_can_chu_y: string[];
  gio_tot: string[];
  huong_xuat_hanh: string;
  mau_sac_ho_tro: string;
}

export interface TuViResult {
  thong_tin_co_ban: TuViThongTinCoBan;
  cung_menh_than: TuViCungMenhThan;
  '12_cung': Record<string, TuViPalaceData>;
  van_han: TuViVanHan;
  luu_nien_nam: TuViLuuNienNam;
  du_doan_ngay: TuViDuDoanNgay;
}
