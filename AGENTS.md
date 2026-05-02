# AI Agent Guide — Project nextjs-app

## Harness Bootstrap

For any coding agent entering this repository:

1. Read `AI_HARNESS.md`
2. Read `.ai/project-context.md`
3. **Read `.ai/workflow.md`** ← Application workflow (auth → laplaso → vanhan → hoso)
4. Read `.ai/current-focus.md`
5. Read `.ai/handoff.md`
6. Run `node scripts/ai-context.mjs`

Use the harness files for short shared memory instead of rebuilding context from scratch in every session.

Dưới đây là hướng dẫn chi tiết về cấu trúc, nghiệp vụ và quy tắc phát triển cho dự án **nextjs-app**. Mọi thông tin đều được trích xuất trực tiếp từ codebase.

---

## 1. TỔNG QUAN DỰ ÁN
- **Tên dự án:** nextjs-app
- **Mục đích:** Nền tảng tra cứu, lập lá số và dự đoán vận hạn dựa trên các bộ môn phương Đông (Bát Tự, Tử Vi).
- **Domain nghiệp vụ:** Spiritual Technology (Phong thủy, Mệnh lý số).
- **Tech Stack:**
  - **Framework:** Next.js 16.2.2 (App Router)
  - **Ngôn ngữ:** TypeScript 5
  - **UI/UX:** React 19.2.4, Tailwind CSS 4, Framer Motion 12.38.0, Lucide React 1.7.0.
  - **Logic Thiên văn/Lịch:** `tyme4ts` 1.4.5, `date-fns` 4.1.0, `date-fns-tz` 3.2.0.
  - **Đa ngôn ngữ:** `next-intl` 4.9.0.
- **Locale mặc định:** `vi` (Tiếng Việt). Hỗ trợ: `vi`, `en`.

---

## 2. KIẾN TRÚC THƯ MỤC
Dự án áp dụng mô hình **Atomic Design** kết hợp với **Feature-based structure**:

```text
nextjs-app/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Các trang hiển thị đa ngôn ngữ
│   │   ├── (auth)/               # Route Group: Đăng nhập, Đăng ký
│   │   ├── (marketing)/          # Route Group: Landing page, giới thiệu
│   │   └── views/                # Các view chi tiết cho từng chức năng
│   └── api/                      # Backend API routes (Bazi, Tuvi, Vanhan)
├── components/                   # Hệ thống UI Components (Atomic Design)
│   ├── atoms/                    # Các nút, nhãn cơ bản (Button, Input, Badge...)
│   ├── molecules/                # Các khối tổ hợp (FormField, Modal, UserCard...)
│   ├── organisms/                # Các khối chức năng lớn (Navbar, Sidebar, Forms...)
│   └── templates/                # Layout khung cho trang (AuthTemplate, DashboardTemplate)
├── features/                     # Logic nghiệp vụ theo module (Auth, Billing, Dashboard)
├── lib/                          # "Bộ não" của dự án
│   ├── bazi/                     # Thuật toán Bát Tự (engine.ts, display.ts)
│   ├── contracts/                # Định nghĩa Types/Interfaces cho data models
│   ├── services/                 # Xử lý gọi API và logic nghiệp vụ trung gian
│   ├── hooks/                    # Các custom React hooks (useSavedCharts...)
│   ├── api-schema.ts             # Chuẩn phản hồi API (ApiResult)
│   └── vanhan_predict.ts         # Logic dự báo vận hạn
├── i18n/                         # Cấu hình đa ngôn ngữ (routing.ts, request.ts)
├── messages/                     # File JSON dịch thuật (vi.json, en.json)
└── public/                       # Tài nguyên tĩnh (SVG, Icons)
```

---

## 3. DOMAIN NGHIỆP VỤ
Dự án tập trung vào 3 trụ cột chính:
- **Bát Tự (Bazi):** Sử dụng engine `lib/bazi/engine.ts` để tính toán Thiên Can, Địa Chi, Thần Sát từ ngày giờ sinh.
- **Tử Vi (Tuvi):** Lập lá số Tử Vi, xác định các Cung (Palace) và Sao (Star), tính toán các Đại hạn (Decade Cycles).
- **Vận Hạn (Vanhan):** Dự đoán vận trình hàng năm/tháng dựa trên dữ liệu người dùng (`lib/vanhan_predict.ts`).

**Luồng dữ liệu chính:**
`User Input (Form)` → `API Route (/api/bazi hoặc /api/tuvi)` → `Engine (lib/bazi/engine.ts)` → `ApiResult<T>` → `UI Display (Organisms/Molecules)`.

---

## 4. DATA MODELS & TYPES (Trích từ lib/contracts & lib/bazi/types.ts)

### Interface yêu cầu tính toán (FortuneRequest)
```typescript
export interface FortuneRequest {
  fullName: string;
  gender: "nam" | "nu";
  calendarType: "duong" | "am";
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  timezone: string;
  eightCharProviderSect?: 1 | 2;
}
```

### Model Hồ sơ người dùng (ProfileSettingsDraft)
```typescript
export type ProfileSettingsDraft = {
  fullName: string;
  email: string;
  phone: string;
  gender: "nam" | "nu" | "khac";
  calendarType: "duong" | "am";
  birthDate: string;
  birthTime: string;
  timezone: string;
  birthPlace: string;
  lunarDateTime: string;
  notes: string;
  updatedAt: string;
};
```

### Model Lá số Tử Vi (TuviPalace & Star)
```typescript
export interface TuViStar {
  name: string;
  type: "chinh_tinh" | "phu_tinh";
  quality: "mieu_dia" | "vuong_dia" | "dac_dia" | "binh_hoa" | "ham_dia";
  element: string;
}

export interface TuViPalace {
  name: string;
  branch: string;
  element: string;
  isLifePalace: boolean;
  isBodyPalace: boolean;
  majorStars: TuViStar[];
  minorStars: TuViStar[];
}
```

---

## 5. COMPONENT INVENTORY

### Atoms (Cơ bản)
- `Button`, `Input`, `Badge`, `Avatar`, `Label`: Các thành phần giao diện chuẩn.
- `ThemeToggle`, `ProgressBar`, `StarQualityBadge`: Chuyên biệt cho dự án.

### Molecules (Tổ hợp)
- `FormField`: Tổ hợp Label + Input + Error.
- `PalaceCell`, `ThienBan`: Thành phần hiển thị đặc thù của lá số.
- `DataTable`, `Modal`, `UserCard`.

### Organisms (Phức tạp)
- `LapLaSoForm`: Form nhập liệu thông tin ngày giờ sinh.
- `LapLaSoPreview`: Hiển thị lá số tóm tắt.
- `LapLaSoDetail`: Hiển thị lá số chi tiết (Tử Vi/Bát Tự).
- `Navbar`, `Sidebar`: Điều hướng chính.
- `VanHanTimeline`: Hiển thị dòng thời gian vận hạn.

---

## 6. ROUTING & PAGES
- **Base Route:** `/[locale]/` (Trang chủ).
- **Auth:**
  - `/[locale]/login`: Trang đăng nhập.
  - `/[locale]/register`: Trang đăng ký.
- **Core Views:**
  - `/[locale]/views/lap-la-so`: Chức năng lập lá số mới.
  - `/[locale]/views/ho-so`: Quản lý danh sách hồ sơ đã lưu.
  - `/[locale]/views/van-han`: Xem vận hạn chi tiết.
- **Locale Prefix:** Bắt buộc (`/vi/...` hoặc `/en/...`). Sử dụng middleware của `next-intl` để điều hướng.

---

## 7. API ENDPOINTS

Dự án sử dụng chuẩn `ApiResult<T>` cho mọi response:

| Endpoint | Method | Chức năng | Input | Output |
|---|---|---|---|---|
| `/api/bazi` | POST | Tính toán Bát Tự | `FortuneRequest` | `ApiResult<BaziEngineResult>` |
| `/api/tuvi` | POST | Lập lá số Tử Vi | `FortuneRequest` | `ApiResult<TuViEngineResult>` |
| `/api/vanhan` | GET | Lấy nội dung vận hạn | `profileId` | `ApiResult<VanHanContent>` |

**Response Format chuẩn:**
```typescript
{
  "ok": true,
  "data": { ... }
}
// Hoặc
{
  "ok": false,
  "error": { "code": "ERROR_CODE", "message": "Thông báo lỗi" }
}
```

---

## 8. STATE MANAGEMENT & DATA FLOW
- **Server State:** Sử dụng API routes và các hàm fetch trực tiếp trong Server Components (hoặc Client Components gọi qua `lib/services/api.ts`).
- **Local State:** React `useState` / `useReducer` cho các form (ví dụ: `LapLaSoForm`).
- **Context:** (Chưa thấy Context phức tạp trong codebase hiện tại).
- **Service Layer:** `lib/services/api.ts` là nơi tập trung các hàm gọi API, bọc trong các phương thức như `get`, `post`, `put`, `delete`.

---

## 9. QUY TẮC & CONVENTIONS BẮT BUỘC

### Naming Conventions
- **Files/Folders:** `camelCase` cho file logic, `PascalCase` cho components (`LapLaSoForm.tsx`).
- **Functions/Variables:** `camelCase`.
- **i18n Keys:** `snake_case` hoặc `camelCase` (trong `messages/*.json`).

### Coding Rules
- **TypeScript:** Không sử dụng `any`. Ưu tiên `interface` cho data models.
- **Components:**
  - Sử dụng `"use client"` ở đầu file nếu component có tương tác người dùng (onClick, useState).
  - Mặc định là Server Component nếu chỉ hiển thị dữ liệu tĩnh.
- **Styling:** Sử dụng Tailwind CSS. Hạn chế viết CSS thuần. Tuân thủ responsive breakpoints (sm, md, lg, xl).
- **Imports:** Luôn sử dụng Path Aliases (ví dụ: `@/components/...`, `@/lib/...`).

---

## 10. AUTHENTICATION & AUTHORIZATION
- **Cơ chế:** (Đang trong quá trình hoàn thiện dựa trên `lib/auth.ts`).
- **Contract:**
  ```typescript
  export type AuthProfile = {
    authenticated: boolean;
    email?: string;
    name?: string;
  };
  ```
- **Service:** `lib/services/auth.ts` xử lý đăng nhập, đăng ký và lấy thông tin session.

---

## 11. FILES QUAN TRỌNG — KHÔNG ĐƯỢC SỬA BỪA
- `lib/bazi/engine.ts`: Chứa thuật toán cốt lõi tính toán Bát Tự. Sửa sai sẽ làm sai lệch toàn bộ kết quả lá số.
- `lib/api-schema.ts`: Định nghĩa format dữ liệu API. Thay đổi sẽ gây lỗi hàng loạt ở Client.
- `i18n/routing.ts` & `i18n/request.ts`: Cấu hình đa ngôn ngữ và định hướng.
- `next.config.ts`: Cấu hình framework Next.js.

---

## 12. APPLICATION WORKFLOW (Luồng vận hành chính)

> **Đây là workflow cốt lõi của ứng dụng. Mọi model/agent phải tuân theo luồng này khi phát triển feature mới hoặc sửa đổi logic.**

### 12.1. Sơ đồ tổng quan

```
┌─────────────────────────────────────────────────────────────────────┐
│                     WORKFLOW TỔNG QUAN                             │
│                                                                     │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐  │
│  │ TRANG CHỦ│────▶│ ĐĂNG NHẬP│────▶│ LẬP LÁ SỐ│────▶│ VẬN HẠN  │  │
│  │  (public) │     │ (gate)   │     │(protected)│     │(protected)│  │
│  └──────────┘     └──────────┘     └──────────┘     └──────────┘  │
│       │                │                │                │         │
│       │                │                │                │         │
│       ▼                ▼                ▼                ▼         │
│  Xem giới thiệu  Session vào     Nhập form →        Chọn lá số → │
│  Không cần login  localStorage    Gọi /api/tuvi →    predictVanHan│
│                                   Lưu savedChart     → Hiển thị   │
│                                   Lưu profile         dự đoán     │
└─────────────────────────────────────────────────────────────────────┘
```

### 12.2. Phân loại trang theo quyền truy cập

| Trang | Route | Quyền | Mô tả |
|-------|-------|-------|-------|
| **Trang chủ** | `/[locale]/` | 🟢 Public | Landing page, giới thiệu sản phẩm. Ai cũng xem được. |
| **Đăng nhập** | `/[locale]/login` | 🟢 Public | Form đăng nhập. |
| **Đăng ký** | `/[locale]/register` | 🟢 Public | Form đăng ký tài khoản. |
| **Lập lá số** | `/[locale]/laplaso` | 🔴 Protected | Nhập thông tin → lập lá số Tử Vi. Yêu cầu đăng nhập. |
| **Vận hạn** | `/[locale]/vanhan` | 🔴 Protected | Xem dự đoán vận hạn dựa trên lá số đã lập. Yêu cầu đăng nhập. |
| **Thư viện** | `/[locale]/thuvien` | 🔴 Protected | Tra cứu kiến thức. Yêu cầu đăng nhập. |
| **Hồ sơ** | `/[locale]/hoso` | 🔴 Protected | Quản lý thông tin cá nhân. Yêu cầu đăng nhập. |
| **Views** | `/[locale]/views/*` | 🔴 Protected | Xem chi tiết lá số đã lưu. Yêu cầu đăng nhập. |

**Danh sách protected route prefixes** (định nghĩa tại `lib/services/authGuard.ts`):
```typescript
export const protectedRoutePrefixes = [
  "/laplaso", "/vanhan", "/thuvien", "/hoso", "/views",
];
```

### 12.3. Luồng Authentication (Xác thực)

```
User chưa đăng nhập
        │
        ├── Click vào trang Protected (VD: /laplaso)
        │       │
        │       ▼
        │   Navbar.handleProtectedClick()
        │       │
        │       ├── isProtectedRoute(href) → true
        │       ├── authenticated → false
        │       │
        │       ▼
        │   1. writePendingRoute(href)     ← Lưu route đang muốn vào sessionStorage
        │   2. Hiển thị LoginRequiredModal ← Modal yêu cầu đăng nhập
        │       │
        │       ├── User click "Đăng nhập ngay"
        │       │       │
        │       │       ▼
        │       │   Redirect → /login
        │       │       │
        │       │       ▼
        │       │   LoginForm.handleSubmit()
        │       │       │
        │       │       ├── submitLogin({ email, password })
        │       │       ├── writeAuthSession({ authenticated: true, email, name })
        │       │       ├── clearPendingRoute()
        │       │       ├── target = readPendingRoute() ?? "/"
        │       │       │
        │       │       ▼
        │       │   router.replace(target)  ← Redirect về trang ban đầu muốn vào
        │       │
        │       └── User click "Để sau" → Đóng modal, ở lại trang hiện tại
        │
        └── Click vào trang Public (VD: /) → Vào bình thường, không chặn
```

**Files liên quan:**
- `lib/services/authSession.ts` — Quản lý session trong localStorage (`tuvi_auth_state`)
- `lib/services/authGuard.ts` — Xác định route nào là protected
- `lib/services/auth.ts` — Xử lý logic đăng nhập/đăng ký
- `components/organisms/shared/Navbar.tsx` — Xử lý click navigation + hiển thị modal
- `components/organisms/shared/LoginRequiredModal.tsx` — Modal yêu cầu đăng nhập
- `features/auth/LoginForm.tsx` — Form đăng nhập + redirect sau login

**Storage keys:**
- `tuvi_auth_state` (localStorage) — Lưu AuthSession `{ authenticated, email, name, updatedAt }`
- `tuvi_pending_route` (sessionStorage) — Lưu route user muốn vào trước khi bị chặn

### 12.4. Luồng Lập Lá Số (Core Flow)

```
User đã đăng nhập → Vào /laplaso
        │
        ▼
    LapLaSoExperience (Orchestrator Component)
        │
        ├── Khởi tạo form state từ loadInitialProfile()
        │   (merge dữ liệu từ localStorage: profile + savedCharts)
        │
        ├── Hiển thị:
        │   ├── LapLaSoForm          ← Form nhập: Họ tên, Giới tính, Ngày sinh, Giờ sinh, Múi giờ
        │   ├── LapLaSoPreview       ← Preview loading/error
        │   └── SavedChartsList      ← Danh sách lá số đã lưu trước đó
        │
        ├── User nhập thông tin → Click "Lập lá số"
        │       │
        │       ▼
        │   handleSubmit()
        │       │
        │       ├── Validate: birthDate + birthTime + timezone phải có
        │       ├── submitFortuneRequest(form)
        │       │       │
        │       │       ▼
        │       │   POST /api/tuvi  ← Body: FortuneRequest
        │       │       │
        │       │       ▼
        │       │   TuVi Engine tính toán:
        │       │   - 12 cung (Palaces) với Chính tinh + Phụ tinh
        │       │   - Đại hạn (Decade Cycles)
        │       │   - Tổng quan: Mệnh, Thân, Cục, Can Chi, Ngũ hành
        │       │   - Phân tích: Tính cách, Sự nghiệp, Tình duyên
        │       │       │
        │       │       ▼
        │       │   ApiResult<TuViEngineResult>
        │       │
        │       ├── saveChart(result)      ← Lưu vào localStorage (tuvi_saved_charts)
        │       ├── saveProfile(...)       ← Cập nhật profile vào localStorage
        │       ├── setResult(result)      ← Chuyển sang hiển thị chi tiết
        │       │
        │       ▼
        │   LapLaSoDetail (Hiển thị kết quả)
        │       │
        │       ├── LapLaSoMiniChart    ← Bảng thiên bàn 12 cung dạng grid
        │       ├── LapLaSoVanHanCard   ← Card tóm tắt vận hạn hiện tại (Đại vận, sao trọng tâm)
        │       ├── AnalysisSection     ← Phân tích chi tiết: Tính cách, Sự nghiệp, Tình duyên
        │       ├── Nút "Lưu lá số"     ← Toggle lưu/bỏ lưu vào savedCharts
        │       └── Nút "Lập lại"       ← Reset form, quay lại LapLaSoForm
        │
        └── User click vào lá số đã lưu (SavedChartsList)
                │
                ▼
            handleLoadSaved(result) → Hiển thị LapLaSoDetail với data đã lưu
```

**Data được tạo ra sau khi lập lá số (`TuViEngineResult`):**
```typescript
{
  profile: { fullName, genderLabel, solarDateTime, lunarDateTime, timezone },
  overview: { chartType, zodiac, amDuong, cuc, cucNumber, menhPalace, thanPalace, ... },
  palaces: TuViPalace[12],          // 12 cung đầy đủ sao
  keyStars: string[],               // Sao chủ đạo
  decadeCycles: TuViDecadeCycle[],   // Các giai đoạn đại hạn
  summary: string[],                // Tóm tắt lá số
  analysis: { coreTraits, career, relationship },  // Phân tích theo chủ đề
  lifePalace, bodyPalace, careerPalace, wealthPalace, spousePalace, travelPalace  // Cung quan trọng
}
```

**Storage key:** `tuvi_saved_charts` (localStorage) — Mảng `SavedChart[]`, tối đa 20 lá số.

### 12.5. Luồng Vận Hạn (Prediction Flow)

```
User đã đăng nhập → Vào /vanhan
        │
        ▼
    VanHanPage
        │
        ├── Đọc savedCharts từ localStorage (useSyncExternalStore)
        │
        ├── CASE 1: Không có lá số nào đã lưu
        │       │
        │       ▼
        │   VanHanEmptyState → Hướng dẫn user đi lập lá số trước
        │
        ├── CASE 2: Có lá số nhưng chưa chọn
        │       │
        │       ▼
        │   VanHanChartSelector → Hiển thị danh sách lá số để user chọn
        │
        └── CASE 3: Đã chọn lá số
                │
                ▼
            predictVanHan(selectedChart.result, targetDate)
                │
                ├── Input: TuViEngineResult + targetDate (mặc định = hôm nay)
                │
                ├── Thuật toán tính:
                │   1. Tính tuổi âm lịch (getTuoiAmLich)
                │   2. Tìm Đại hạn hiện tại (từ decadeCycles)
                │   3. Tính Tiểu hạn:
                │      - getTieuHanCung(chiNamSinh, gioiTinh, tuoiAmLich)
                │      - Xác định cung, sao trong cung
                │      - Tính Lưu sao (getLuuSao): Lưu Thái Tuế, Lưu Tang Môn, Lưu Bạch Hổ...
                │      - Đánh giá: Khởi Sắc / Ổn Định / Cẩn Trọng
                │   4. Tính Nguyệt hạn:
                │      - getNguyetHanCung(tieuHanCung, gioiTinh, thangAmLich)
                │      - Đánh giá cát tinh / sát tinh
                │   5. Tính Nhật hạn (giờ tốt/xấu, màu may mắn)
                │   6. Tổng hợp alerts (cảnh báo)
                │
                ▼
            VanHanPrediction (Output)
                │
                ├── VanHanHeader      ← Thông tin người xem, ngày đang xem, nút chọn ngày
                ├── VanHanSummary     ← 4 highlight: Nhịp năm, Nhịp tháng, Đại hạn, Ngày xem
                ├── VanHanPredictionContent  ← Chi tiết Tiểu hạn + Nguyệt hạn
                ├── VanHanAlerts      ← Cảnh báo (nếu có hung tinh, giao hội mạnh)
                └── VanHanRelation    ← Quan hệ ngũ hành Mệnh ↔ Hạn
```

**Mối liên hệ Lập lá số → Vận hạn:**
- Trang Vận hạn **BẮT BUỘC phải có lá số đã lưu** (từ `tuvi_saved_charts` trong localStorage)
- Nếu chưa có → hiển thị `VanHanEmptyState` hướng dẫn đi lập lá số trước
- `predictVanHan()` nhận `TuViEngineResult` (từ lá số đã lập) + `targetDate` → tính toán dự đoán
- User có thể thay đổi `targetDate` để xem vận hạn ngày khác
- User có thể quay lại chọn lá số khác (nút Back)

**Output `VanHanPrediction`:**
```typescript
{
  context: { targetDate, lunarDate, canChi, age, gender },
  daiHan: { startAge, endAge, palace, branch, focus, isHeavy, stars },
  tieuHan: { year, age, palace, branch, luuSao[], status, desc, majorStars, minorStars, catTinh, satTinh },
  nguyetHan: { month, palace, branch, status, desc, catTinh, satTinh },
  nhatHan: { date, goodHours, badHours, luckyColors, caution, fortune },
  analysisBasis: { tieuHanPalaceStars, favorableSignals, cautionSignals, heavyIndicators },
  alerts: string[]
}
```

### 12.6. Luồng Cập Nhật Thông Tin

```
User vào /hoso
        │
        ▼
    ProfileSettingsPanel
        │
        ├── Load dữ liệu từ loadInitialProfile()
        │   (merge: DEFAULT_PROFILE + latestSavedChart + saved profile settings)
        │
        ├── User chỉnh sửa các trường:
        │   fullName, email, phone, gender, calendarType,
        │   birthDate, birthTime, timezone, birthPlace, notes
        │
        ├── Click "Lưu"
        │       │
        │       ▼
        │   saveProfile(profileDraft)
        │       ├── Validate: ít nhất 1 trường có dữ liệu
        │       ├── Lưu vào localStorage (tuvi_profile_settings)
        │       ├── Dispatch event PROFILE_UPDATED_EVENT
        │       └── Các component khác (Navbar, LapLaSoForm) reactive cập nhật
        │
        └── Khi user lập lá số mới:
            - LapLaSoExperience đọc loadInitialProfile() để pre-fill form
            - Sau khi lập xong, saveProfile() được gọi để cập nhật lại
```

### 12.7. Data Flow & Storage Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     LOCALSTORAGE ARCHITECTURE                      │
│                                                                     │
│  tuvi_auth_state          ← AuthSession (đăng nhập)                │
│  tuvi_saved_charts        ← SavedChart[] (lá số đã lưu, max 20)   │
│  tuvi_profile_settings    ← ProfileSettingsDraft (hồ sơ cá nhân)  │
│                                                                     │
│  SESSIONSTORAGE:                                                    │
│  tuvi_pending_route       ← Route user muốn vào trước khi login   │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     EVENT-DRIVEN REACTIVITY                        │
│                                                                     │
│  tuvi-auth-updated            ← Khi auth session thay đổi         │
│  tuvi-saved-charts-updated    ← Khi savedCharts thay đổi          │
│  tuvi-profile-updated         ← Khi profile thay đổi              │
│  storage                      ← Cross-tab sync (native event)     │
│                                                                     │
│  Components dùng useSyncExternalStore() để subscribe các event này │
│  → Auto re-render khi data thay đổi                                │
└─────────────────────────────────────────────────────────────────────┘
```

### 12.8. Tóm tắt luồng end-to-end

```
1. User vào trang chủ (/)                    → Xem giới thiệu (public)
2. User click "Lập lá số" hoặc bất kỳ       → Bị chặn → LoginRequiredModal
   trang protected nào
3. User đăng nhập (/login)                   → writeAuthSession() → redirect về trang muốn vào
4. User nhập thông tin tại /laplaso          → POST /api/tuvi → TuViEngineResult
5. Hệ thống lưu lá số (savedCharts)          → localStorage tuvi_saved_charts
   + cập nhật profile (profile settings)     → localStorage tuvi_profile_settings
6. User xem kết quả lá số chi tiết          → LapLaSoDetail (bảng thiên bàn, phân tích, vận hạn card)
7. User qua trang /vanhan                   → Chọn lá số đã lưu
8. predictVanHan() tính toán                 → Đại hạn, Tiểu hạn, Nguyệt hạn, Nhật hạn
9. User xem dự đoán + có thể đổi ngày       → VanHanPrediction hiển thị đầy đủ
10. User có thể cập nhật thông tin (/hoso)   → saveProfile() → reactive update khắp app
```

---

## 13. WORKFLOW PHÁT TRIỂN CHO AI AGENT

### Khi thêm Feature mới
1.  Định nghĩa Data Model trong `lib/contracts`.
2.  Xây dựng Service trong `lib/services`.
3.  Tạo UI Components theo Atomic Design (Atoms → Molecules → Organisms).
4.  Thêm Route mới trong `app/[locale]/(marketing)/` hoặc `app/[locale]/views/`.
5.  Nếu route mới cần bảo vệ → thêm prefix vào `protectedRoutePrefixes` trong `lib/services/authGuard.ts`.
6.  Thêm chuỗi dịch thuật vào `messages/vi.json` và `messages/en.json`.
7.  Thêm link vào `navLinks` trong `Navbar.tsx` nếu cần hiện trên navigation.

### Khi sửa UI Component
1.  Xác định component thuộc tầng nào (Atom, Molecule, Organism).
2.  Kiểm tra xem component có đang được dùng ở nhiều nơi không (Search global).
3.  Sử dụng Tailwind CSS để thay đổi style.
4.  Kiểm tra hiển thị trên mobile và desktop.

### Khi thêm i18n string mới
1.  Thêm key vào `messages/vi.json`.
2.  Thêm key tương ứng vào `messages/en.json` (bắt buộc).
3.  Sử dụng `useTranslations` từ `next-intl` trong component.

### Khi sửa logic nghiệp vụ
1.  **KHÔNG** sửa `lib/bazi/engine.ts` hoặc `lib/tuvi/engine.ts` trừ khi được yêu cầu rõ ràng.
2.  Thuật toán vận hạn nằm tại `lib/vanhan_predict.ts` + `lib/vanhan.ts`.
3.  Khi thay đổi output shape → cập nhật type tương ứng trong `lib/bazi/types.ts`.
4.  Luôn test với nhiều ngày sinh khác nhau để đảm bảo tính chính xác.

---

## 14. GOTCHAS & ANTI-PATTERNS
- **Gotcha:** Dữ liệu ngày giờ sinh phải luôn đi kèm `timezone`. Nếu thiếu, engine sẽ trả về kết quả sai.
- **Anti-pattern:** Tránh việc gọi API trực tiếp bằng `fetch` bên trong UI Component. Luôn sử dụng Service layer trong `lib/services`.
- **Anti-pattern:** Đừng quên thêm `"use client"` khi sử dụng các hooks như `useState`, `useEffect`.
- **i18n:** Tuyệt đối không hardcode text tiếng Việt/Anh trực tiếp vào JSX.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **nextjs-app** (3533 symbols, 9162 relationships, 275 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/nextjs-app/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/nextjs-app/context` | Codebase overview, check index freshness |
| `gitnexus://repo/nextjs-app/clusters` | All functional areas |
| `gitnexus://repo/nextjs-app/processes` | All execution flows |
| `gitnexus://repo/nextjs-app/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |
| Work in the Scripts area (429 symbols) | `.claude/skills/generated/scripts/SKILL.md` |
| Work in the Hooks area (242 symbols) | `.claude/skills/generated/hooks/SKILL.md` |
| Work in the Tui area (85 symbols) | `.claude/skills/generated/tui/SKILL.md` |
| Work in the Session area (79 symbols) | `.claude/skills/generated/session/SKILL.md` |
| Work in the Skill-evolution area (76 symbols) | `.claude/skills/generated/skill-evolution/SKILL.md` |
| Work in the Services area (57 symbols) | `.claude/skills/generated/services/SKILL.md` |
| Work in the Commands area (52 symbols) | `.claude/skills/generated/commands/SKILL.md` |
| Work in the Ci area (50 symbols) | `.claude/skills/generated/ci/SKILL.md` |
| Work in the State-store area (47 symbols) | `.claude/skills/generated/state-store/SKILL.md` |
| Work in the Tests area (40 symbols) | `.claude/skills/generated/tests/SKILL.md` |
| Work in the Session-adapters area (39 symbols) | `.claude/skills/generated/session-adapters/SKILL.md` |
| Work in the Install-targets area (37 symbols) | `.claude/skills/generated/install-targets/SKILL.md` |
| Work in the Install area (37 symbols) | `.claude/skills/generated/install/SKILL.md` |
| Work in the Codex area (24 symbols) | `.claude/skills/generated/codex/SKILL.md` |
| Work in the Tuvi area (22 symbols) | `.claude/skills/generated/tuvi/SKILL.md` |
| Work in the Molecules area (20 symbols) | `.claude/skills/generated/molecules/SKILL.md` |
| Work in the Skill-improvement area (20 symbols) | `.claude/skills/generated/skill-improvement/SKILL.md` |
| Work in the Cluster_203 area (19 symbols) | `.claude/skills/generated/cluster-203/SKILL.md` |
| Work in the Observability area (18 symbols) | `.claude/skills/generated/observability/SKILL.md` |
| Work in the Data area (18 symbols) | `.claude/skills/generated/data/SKILL.md` |

<!-- gitnexus:end -->
