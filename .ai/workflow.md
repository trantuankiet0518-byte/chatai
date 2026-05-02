# Application Workflow — nextjs-app

> Đây là tài liệu workflow cốt lõi. Mọi AI agent/model phải đọc file này trước khi phát triển feature mới.

---

## QUICK REFERENCE — Luồng end-to-end

```
TRANG CHỦ (public) → ĐĂNG NHẬP (gate) → LẬP LÁ SỐ (protected) → VẬN HẠN (protected)
     │                     │                      │                       │
     │                     │                      │                       │
  Xem giới thiệu    Session vào LS      Nhập form → /api/tuvi      Chọn lá số →
  Không cần login                      → Lưu savedChart           predictVanHan()
                                       → Lưu profile              → Hiển thị dự đoán
```

---

## 1. PHÂN LOẠI ROUTE THEO QUYỀN

### Public Routes (không cần đăng nhập):
- `/[locale]/` — Trang chủ (landing page)
- `/[locale]/login` — Đăng nhập
- `/[locale]/register` — Đăng ký

### Protected Routes (bắt buộc đăng nhập):
- `/[locale]/laplaso` — Lập lá số
- `/[locale]/vanhan` — Xem vận hạn
- `/[locale]/thuvien` — Thư viện kiến thức
- `/[locale]/hoso` — Quản lý hồ sơ
- `/[locale]/views/*` — Xem chi tiết lá số

**Config tại:** `lib/services/authGuard.ts`
```typescript
export const protectedRoutePrefixes = ["/laplaso", "/vanhan", "/thuvien", "/hoso", "/views"];
```

---

## 2. LUỒNG AUTHENTICATION

### Khi user chưa đăng nhập click vào trang protected:

```
1. Navbar.handleProtectedClick(href)
2. → isProtectedRoute(href) = true, authenticated = false
3. → writePendingRoute(href)           // Lưu route vào sessionStorage
4. → Hiển thị LoginRequiredModal       // Modal hỏi đăng nhập
5. → User click "Đăng nhập ngay"
6. → Redirect tới /login
7. → LoginForm.handleSubmit()
8. → submitLogin({ email, password })
9. → writeAuthSession({ authenticated: true, email, name })
10. → clearPendingRoute()
11. → target = readPendingRoute() ?? "/"
12. → router.replace(target)            // Redirect về trang ban đầu
```

### Files liên quan:
| File | Vai trò |
|------|---------|
| `lib/services/authSession.ts` | Quản lý session (localStorage: `tuvi_auth_state`) |
| `lib/services/authGuard.ts` | Xác định route protected |
| `lib/services/auth.ts` | Logic đăng nhập/đăng ký |
| `components/organisms/shared/Navbar.tsx` | Navigation + chặn route |
| `components/organisms/shared/LoginRequiredModal.tsx` | Modal yêu cầu đăng nhập |
| `features/auth/LoginForm.tsx` | Form đăng nhập + redirect |

### Storage keys:
- `tuvi_auth_state` (localStorage) — `{ authenticated, email, name, updatedAt }`
- `tuvi_pending_route` (sessionStorage) — Route user muốn vào trước khi bị chặn

---

## 3. LUỒNG LẬP LÁ SỐ

### Orchestrator: `LapLaSoExperience` (`components/organisms/laplaso/LapLaSoExperience.tsx`)

```
User đã đăng nhập → Vào /laplaso
│
├── Khởi tạo form từ loadInitialProfile()
│   (merge: DEFAULT + latestSavedChart + saved profile settings)
│
├── Hiển thị:
│   ├── LapLaSoForm         — Form nhập: Họ tên, Giới tính, Ngày sinh, Giờ sinh, Múi giờ
│   ├── LapLaSoPreview      — Preview loading/error
│   └── SavedChartsList     — Danh sách lá số đã lưu
│
├── User nhập → Click "Lập lá số"
│   │
│   ├── Validate: birthDate + birthTime + timezone phải có
│   ├── submitFortuneRequest(form) → POST /api/tuvi
│   │   │
│   │   └── TuVi Engine tính toán:
│   │       - 12 cung (Palaces) với Chính tinh + Phụ tinh
│   │       - Đại hạn (Decade Cycles)
│   │       - Tổng quan: Mệnh, Thân, Cục, Can Chi, Ngũ hành
│   │       - Phân tích: Tính cách, Sự nghiệp, Tình duyên
│   │
│   ├── saveChart(result)     → localStorage (tuvi_saved_charts)
│   ├── saveProfile(...)      → localStorage (tuvi_profile_settings)
│   └── setResult(result)     → Chuyển sang LapLaSoDetail
│
├── LapLaSoDetail hiển thị:
│   ├── LapLaSoMiniChart    — Bảng thiên bàn 12 cung
│   ├── LapLaSoVanHanCard   — Card tóm tắt Đại vận + sao trọng tâm
│   ├── AnalysisSection     — Phân tích: Tính cách, Sự nghiệp, Tình duyên
│   ├── Nút "Lưu lá số"    — Toggle lưu/bỏ lưu
│   └── Nút "Lập lại"      — Reset form
│
└── SavedChartsList → User click lá số đã lưu → LapLaSoDetail
```

### Data output — TuViEngineResult:
```typescript
{
  profile: { fullName, genderLabel, solarDateTime, lunarDateTime, timezone },
  overview: { chartType, zodiac, amDuong, cuc, cucNumber, menhPalace, thanPalace, canChiYear, canChiDay, menhChu, thanChu },
  palaces: TuViPalace[12],
  keyStars: string[],
  decadeCycles: TuViDecadeCycle[],
  summary: string[],
  analysis: { coreTraits, career, relationship },
  lifePalace, bodyPalace, careerPalace, wealthPalace, spousePalace, travelPalace
}
```

### Storage: `tuvi_saved_charts` (localStorage) — `SavedChart[]`, max 20 charts.

---

## 4. LUỒNG VẬN HẠN

### Page: `/[locale]/vanhan` → `VanHanPage`

```
User đã đăng nhập → Vào /vanhan
│
├── Đọc savedCharts từ localStorage (useSyncExternalStore)
│
├── CASE 1: Không có lá số → VanHanEmptyState (hướng dẫn đi lập lá số)
├── CASE 2: Có lá số, chưa chọn → VanHanChartSelector (danh sách để chọn)
└── CASE 3: Đã chọn lá số
    │
    └── predictVanHan(selectedChart.result, targetDate)
        │
        ├── Input: TuViEngineResult + targetDate (mặc định = hôm nay)
        │
        ├── Thuật toán:
        │   1. Tính tuổi âm lịch (getTuoiAmLich)
        │   2. Tìm Đại hạn hiện tại (từ decadeCycles)
        │   3. Tính Tiểu hạn: getTieuHanCung(chiNamSinh, gioiTinh, tuoiAmLich)
        │      → Xác định cung, sao, Lưu sao (Lưu Thái Tuế, Tang Môn, Bạch Hổ...)
        │      → Đánh giá: Khởi Sắc / Ổn Định / Cẩn Trọng
        │   4. Tính Nguyệt hạn: getNguyetHanCung(tieuHanCung, gioiTinh, thangAmLich)
        │   5. Tính Nhật hạn (giờ tốt/xấu, màu may mắn)
        │   6. Tổng hợp alerts
        │
        └── Output: VanHanPrediction
            │
            ├── VanHanHeader            — Thông tin + chọn ngày
            ├── VanHanSummary           — 4 highlights
            ├── VanHanPredictionContent — Chi tiết Tiểu hạn + Nguyệt hạn
            ├── VanHanAlerts            — Cảnh báo
            └── VanHanRelation          — Quan hệ ngũ hành Mệnh ↔ Hạn
```

### MỐI LIÊN HỆ LẬP LÁ SỐ ↔ VẬN HẠN:
- Trang Vận hạn **BẮT BUỘC phải có lá số đã lưu** từ `tuvi_saved_charts`
- `predictVanHan()` nhận `TuViEngineResult` + `targetDate` → tính dự đoán
- User có thể thay đổi `targetDate` để xem vận hạn ngày khác
- User có thể quay lại chọn lá số khác (nút Back)

### Files liên quan:
| File | Vai trò |
|------|---------|
| `lib/vanhan_predict.ts` | Thuật toán predictVanHan() chính |
| `lib/vanhan.ts` | Helper: getTieuHanCung, getNguyetHanCung, getTuoiAmLich |
| `lib/services/savedCharts.ts` | CRUD savedCharts trong localStorage |
| `app/[locale]/(marketing)/vanhan/page.tsx` | VanHanPage component |
| `components/organisms/vanhan/*` | Các component hiển thị vận hạn |

---

## 5. LUỒNG CẬP NHẬT HỒ SƠ

```
User vào /hoso → ProfileSettingsPanel
│
├── loadInitialProfile() — merge: DEFAULT + latestSavedChart + saved settings
├── User chỉnh sửa các trường
├── Click "Lưu" → saveProfile(profileDraft)
│   ├── Validate: ít nhất 1 trường có dữ liệu
│   ├── Lưu vào localStorage (tuvi_profile_settings)
│   └── Dispatch event PROFILE_UPDATED_EVENT
│       → Navbar, LapLaSoForm reactive cập nhật
│
└── Khi user lập lá số mới:
    - LapLaSoExperience đọc loadInitialProfile() để pre-fill form
    - Sau khi lập xong, saveProfile() được gọi để cập nhật lại
```

---

## 6. DATA STORAGE ARCHITECTURE

### localStorage:
| Key | Type | Mô tả |
|-----|------|-------|
| `tuvi_auth_state` | `AuthSession` | Session đăng nhập |
| `tuvi_saved_charts` | `SavedChart[]` | Lá số đã lưu (max 20) |
| `tuvi_profile_settings` | `ProfileSettingsDraft` | Hồ sơ cá nhân |

### sessionStorage:
| Key | Type | Mô tả |
|-----|------|-------|
| `tuvi_pending_route` | `string` | Route user muốn vào trước khi login |

### Custom Events (reactive):
| Event | Trigger |
|-------|---------|
| `tuvi-auth-updated` | Khi auth session thay đổi |
| `tuvi-saved-charts-updated` | Khi savedCharts thay đổi |
| `tuvi-profile-updated` | Khi profile thay đổi |
| `storage` | Cross-tab sync (native) |

Components dùng `useSyncExternalStore()` để subscribe → auto re-render.

---

## 7. TÓM TẮT END-TO-END

```
 1. User vào trang chủ (/)                  → Xem giới thiệu (public)
 2. User click trang protected              → Bị chặn → LoginRequiredModal
 3. User đăng nhập (/login)                 → writeAuthSession() → redirect
 4. User nhập thông tin tại /laplaso        → POST /api/tuvi → TuViEngineResult
 5. Hệ thống lưu lá số + cập nhật profile  → localStorage
 6. User xem kết quả lá số chi tiết        → LapLaSoDetail
 7. User qua trang /vanhan                  → Chọn lá số đã lưu
 8. predictVanHan() tính toán               → Đại hạn, Tiểu hạn, Nguyệt hạn, Nhật hạn
 9. User xem dự đoán + có thể đổi ngày     → VanHanPrediction đầy đủ
10. User có thể cập nhật thông tin (/hoso)  → saveProfile() → reactive update
```

---

## 8. QUY TẮC QUAN TRỌNG KHI PHÁT TRIỂN

1. **Route mới cần bảo vệ** → thêm prefix vào `lib/services/authGuard.ts`
2. **Trang vận hạn luôn phụ thuộc vào lá số đã lưu** — không bao giờ tự generate data
3. **Profile tự động pre-fill** cho form lập lá số từ `loadInitialProfile()`
4. **Mọi thay đổi data đều phải dispatch event** để reactive update across components
5. **KHÔNG sửa engine files** (`lib/bazi/engine.ts`, `lib/tuvi/engine.ts`) trừ khi được yêu cầu rõ ràng
6. **Thuật toán vận hạn** nằm tại `lib/vanhan_predict.ts` + `lib/vanhan.ts`
