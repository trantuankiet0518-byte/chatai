"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/atoms/Icon";
import StarDetailRow from "@/components/molecules/StarDetailRow";
import { getBranchLabel, getElementLabel, getPalaceLabel, QUALITY_COLORS, QUALITY_LABELS, getStarLabel } from "@/lib/bazi/display";
import {
  PHU_TINH_GROUP,
  PHU_TINH_GROUP_LABEL,
  PHU_TINH_GROUP_ORDER,
} from "@/lib/bazi/phuTinhDocs";
import type { TuViEngineResult, TuViPalace, TuViStar } from "@/lib/bazi/types";

interface Props {
  palace: TuViPalace;
  result: TuViEngineResult;
  onClose: () => void;
}

function groupMinorStars(stars: TuViStar[]): { key: (typeof PHU_TINH_GROUP_ORDER)[number]; stars: TuViStar[] }[] {
  const buckets = new Map<(typeof PHU_TINH_GROUP_ORDER)[number], TuViStar[]>();

  for (const star of stars) {
    const groupKey = PHU_TINH_GROUP[star.name] ?? "khac";
    if (!buckets.has(groupKey)) buckets.set(groupKey, []);
    buckets.get(groupKey)!.push(star);
  }

  return PHU_TINH_GROUP_ORDER.filter((key) => buckets.has(key)).map((key) => ({
    key,
    stars: (buckets.get(key) ?? []).sort((a, b) => a.name.localeCompare(b.name)),
  }));
}

function getPlacements(result: TuViEngineResult, starName: string) {
  return result.palaces
    .filter(
      (item) =>
        item.majorStars.some((star) => star.name === starName) ||
        item.minorStars.some((star) => star.name === starName),
    )
    .map((item) => `${getPalaceLabel(item.name)} · ${getBranchLabel(item.branch)}`);
}

export default function PalaceDetailModal({ palace, result, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"detail" | "tech">("detail");
  const minorGroups = groupMinorStars(palace.minorStars);

  // Tính tuổi hiện tại để xác định đại hạn
  const getCurrentAge = (): number => {
    try {
      const yearMatch = result.profile.solarDateTime.match(/(\d{4})/);
      if (!yearMatch) return 30;
      const birthYear = parseInt(yearMatch[1]);
      return new Date().getFullYear() - birthYear;
    } catch {
      return 30;
    }
  };

  const currentAge = getCurrentAge();
  const currentDecade = result.decadeCycles.find(
    (d) => currentAge >= d.startAge && currentAge <= d.endAge
  );

  // Tính tiểu hạn năm hiện tại
  const currentYear = new Date().getFullYear();
  const birthYearMatch = result.profile.solarDateTime.match(/(\d{4})/);
  const birthYear = birthYearMatch ? parseInt(birthYearMatch[1]) : currentYear;
  const ageThisYear = currentYear - birthYear;
  const tienXuat = (ageThisYear + result.overview.cucNumber - 1) % 12;
  const branchOrder = ["Ty", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const tieuHanBranch = branchOrder[tienXuat];
  const tieuHanStars = result.palaces.find(p => p.branch === tieuHanBranch)?.minorStars || [];

  // Sao đặc biệt cần quan tâm (ngoài tứ hóa, tuần, triệt)
  const specialStars = ["Ta Phu", "Huu Bat", "Thien Ma", "Hoa Tinh", "Kinh Duong", "Da La", "Thien Khoi", "Thien Viet", "Van Xuong", "Van Khuc", "Thai Tue"].filter(
    starName => palace.minorStars.some(s => s.name === starName)
  );

  const technicalOverview = useMemo(
    () => ({
      majorStarCount: new Set(result.palaces.flatMap((item) => item.majorStars.map((star) => star.name))).size,
      minorStarCount: result.palaces.reduce((count, item) => count + item.minorStars.length, 0),
      tuan: getPlacements(result, "Tuan"),
      triet: getPlacements(result, "Triet"),
      hoaLoc: getPlacements(result, "Hoa Loc"),
      hoaQuyen: getPlacements(result, "Hoa Quyen"),
      hoaKhoa: getPlacements(result, "Hoa Khoa"),
      hoaKy: getPlacements(result, "Hoa Ky"),
    }),
    [result],
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="glass-border-panel relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl p-6 scrollbar-thin space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="glass-border-panel-soft absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-on-surface"
        >
          <Icon name="close" className="text-lg" />
        </button>

        <div className="inline-flex rounded-full border border-white/10 bg-white/5 p-1 text-[10px] font-black uppercase tracking-[0.22em]">
          <button
            type="button"
            onClick={() => setActiveTab("detail")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              activeTab === "detail" ? "bg-primary text-white" : "text-outline hover:text-on-surface"
            }`}
          >
            Chi tiết cung
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tech")}
            className={`rounded-full px-3 py-1.5 transition-colors ${
              activeTab === "tech" ? "bg-primary text-white" : "text-outline hover:text-on-surface"
            }`}
          >
            An sao kỹ thuật
          </button>
        </div>

        {activeTab === "detail" ? (
          <>
            <div className="flex items-start gap-4 pr-8">
              <div className="flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-outline">{getBranchLabel(palace.branch)}</span>
                  {palace.isLifePalace ? (
                    <span className="glass-border-panel-soft rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary">
                      Mệnh
                    </span>
                  ) : null}
                  {palace.isBodyPalace ? (
                    <span className="glass-border-panel-soft rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-tertiary">
                      Thân
                    </span>
                  ) : null}
                </div>
                <h2 className="text-2xl font-black tracking-tight text-on-surface">
                  Cung {getPalaceLabel(palace.name)}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-on-surface-variant">{palace.note}</p>
                <p className="mt-2 text-[10px] leading-relaxed text-primary/80">
                  Giải thích dưới đây theo hệ Bắc Tông. Phụ tinh cần luận kèm chính tinh, cục và đại tiểu hạn, không nên
                  kết luận đơn lẻ một sao.
                </p>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center gap-2">
                <Icon name="stars" className="text-primary text-sm" />
                <h3 className="text-xs font-black uppercase tracking-widest text-primary">Chính tinh</h3>
              </div>
              {palace.majorStars.length > 0 ? (
                <div className="space-y-2">
                  {palace.majorStars.map((star) => (
                    <StarDetailRow key={star.name} star={star} />
                  ))}
                </div>
              ) : (
                <p className="px-2 text-xs italic text-outline/60">Vô chính diệu - cần xét phụ tinh và tam hợp.</p>
              )}
            </div>

            {palace.minorStars.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Icon name="auto_awesome" className="text-secondary text-sm" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-secondary">
                    Phụ tinh Bắc Tông ({palace.minorStars.length})
                  </h3>
                </div>

                {minorGroups.map(({ key, stars }) => (
                  <section key={key} className="space-y-3">
                    <h4 className="border-b border-outline-variant/20 pb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
                      {PHU_TINH_GROUP_LABEL[key]}
                    </h4>
                    <div className="space-y-2">
                      {stars.map((star) => (
                        <StarDetailRow key={`${key}-${star.name}`} star={star} isMinor />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="space-y-5">
            {/* Header thông tin cung */}
            <div className="glass-border-panel-soft rounded-xl p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">
                  {getPalaceLabel(palace.name)} · {getBranchLabel(palace.branch)}
                </h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[9px] font-black uppercase text-outline">
                  Hành {getElementLabel(palace.element)}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-on-surface-variant">
                {palace.note}
              </p>
            </div>

            {/* Cục cung */}
            <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="layers" className="text-secondary text-sm" />
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary">Cục cung</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-outline">Cục số</p>
                  <p className="text-sm font-bold text-on-surface">{result.overview.cucNumber}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-outline">Tên cục</p>
                  <p className="text-sm font-bold text-on-surface">{result.overview.cuc}</p>
                </div>
              </div>
              <p className="border-t border-outline-variant/20 pt-2 text-[11px] leading-relaxed text-on-surface-variant">
                Cục số {result.overview.cucNumber} — {result.overview.cuc}. Cách cục ảnh hưởng lớn đến sức mạnh và bản chất của các sao trong cung này.
              </p>
            </div>

            {/* Tổng quan sao */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-border-panel-soft rounded-xl p-3 space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-outline">Chính tinh</p>
                <p className="text-lg font-black text-on-surface">{technicalOverview.majorStarCount}/14</p>
              </div>
              <div className="glass-border-panel-soft rounded-xl p-3 space-y-1">
                <p className="text-[9px] uppercase tracking-widest text-outline">Phụ tinh</p>
                <p className="text-lg font-black text-on-surface">{technicalOverview.minorStarCount}</p>
              </div>
            </div>

            {/* Sao trong cung đang mở */}
            <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="stars" className="text-primary text-sm" />
                <p className="text-[9px] font-black uppercase tracking-widest text-primary">Sao trọng điểm trong cung</p>
              </div>
              <p className="text-sm font-semibold text-on-surface">
                {getPalaceLabel(palace.name)} · {getBranchLabel(palace.branch)}
              </p>
              <p className="text-xs text-on-surface-variant">
                {palace.isLifePalace
                  ? "Cung Mệnh — trọng tâm của lá số, thể hiện bản mệnh và năng khiếu."
                  : palace.isBodyPalace
                    ? "Cung Thân — ảnh hưởng đến sức khỏe, hình tướng và tính cách bên ngoài."
                    : "Cung phụ — cho biết vận trình trong lĩnh vực tương ứng."}
              </p>
            </div>

            {/* Tuần / Triệt */}
            <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="brightness_5" className="text-secondary text-sm" />
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary">Tuần sao & Triệt sao</p>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-outline">Tuần</p>
                  <p className="text-xs text-on-surface-variant">
                    {technicalOverview.tuan.length > 0 ? technicalOverview.tuan.join(", ") : "Không có tuần sao trong cung"}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-outline">Triệt</p>
                  <p className="text-xs text-on-surface-variant">
                    {technicalOverview.triet.length > 0 ? technicalOverview.triet.join(", ") : "Không có triệt sao trong cung"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tứ hóa */}
            <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="auto_awesome" className="text-primary text-sm" />
                <p className="text-[9px] font-black uppercase tracking-widest text-primary">Tứ hóa (Hóa tinh)</p>
              </div>
               <div className="grid grid-cols-2 gap-2">
                 <div className="flex flex-col gap-1 rounded-lg border border-white/8 bg-transparent px-2.5 py-2">
                   <p className="text-[9px] uppercase tracking-wider text-outline">Hóa Lộc</p>
                   <p className={`text-xs font-semibold text-green-400`}>
                     {technicalOverview.hoaLoc.length > 0 ? technicalOverview.hoaLoc.join(", ") : "Chưa an"}
                   </p>
                 </div>
                 <div className="flex flex-col gap-1 rounded-lg border border-white/8 bg-transparent px-2.5 py-2">
                   <p className="text-[9px] uppercase tracking-wider text-outline">Hóa Quyền</p>
                   <p className={`text-xs font-semibold text-blue-400`}>
                     {technicalOverview.hoaQuyen.length > 0 ? technicalOverview.hoaQuyen.join(", ") : "Chưa an"}
                   </p>
                 </div>
                 <div className="flex flex-col gap-1 rounded-lg border border-white/8 bg-transparent px-2.5 py-2">
                   <p className="text-[9px] uppercase tracking-wider text-outline">Hóa Khoa</p>
                   <p className={`text-xs font-semibold text-amber-400`}>
                     {technicalOverview.hoaKhoa.length > 0 ? technicalOverview.hoaKhoa.join(", ") : "Chưa an"}
                   </p>
                 </div>
                 <div className="flex flex-col gap-1 rounded-lg border border-white/8 bg-transparent px-2.5 py-2">
                   <p className="text-[9px] uppercase tracking-wider text-outline">Hóa Kỵ</p>
                   <p className={`text-xs font-semibold text-red-400`}>
                     {technicalOverview.hoaKy.length > 0 ? technicalOverview.hoaKy.join(", ") : "Chưa an"}
                   </p>
                 </div>
               </div>
            </div>

            {/* Các sao đặc biệt khác */}
            {specialStars.length > 0 && (
              <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="sparkles" className="text-tertiary text-sm" />
                  <p className="text-[9px] font-black uppercase tracking-widest text-tertiary">Sao đặc biệt khác</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {specialStars.map(starName => {
                    const star = palace.minorStars.find(s => s.name === starName);
                    if (!star) return null;
                    return (
                      <span
                        key={starName}
                        className={`glass-border-panel-soft inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider ${QUALITY_COLORS[star.quality]}`}
                      >
                        {getStarLabel(starName)}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Đại hạn hiện tại */}
            {currentDecade && palace.name === currentDecade.palace && (
              <div className="glass-border-panel-soft relative overflow-hidden rounded-xl p-4 space-y-3">
                <div className="absolute right-2 top-2 h-16 w-16 rounded-full bg-primary/10 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2">
                    <Icon name="timeline" className="text-primary text-sm" />
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary">Đại hạn hiện tại</p>
                  </div>
                  <p className="mt-1.5 text-sm font-bold text-on-surface">
                    Tuổi {currentDecade.startAge} – {currentDecade.endAge}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    Đang ở cung {getPalaceLabel(currentDecade.palace)} · {getBranchLabel(currentDecade.branch)}
                  </p>
                </div>
              </div>
            )}

            {/* Tiểu hạn năm hiện tại */}
            <div className="glass-border-panel-soft rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <Icon name="calendar_month" className="text-secondary text-sm" />
                <p className="text-[9px] font-black uppercase tracking-widest text-secondary">Tiểu hạn năm {currentYear}</p>
              </div>
              <p className="text-sm font-semibold text-on-surface">
                Cung {getPalaceLabel(tieuHanBranch || "N/A")}
              </p>
              {tieuHanStars.length > 0 ? (
                <div className="space-y-1.5">
                  {tieuHanStars.slice(0, 3).map(star => (
                    <div key={star.name} className="flex items-center justify-between text-[10px]">
                      <span className={QUALITY_COLORS[star.quality]}>{getStarLabel(star.name)}</span>
                      <span className="text-outline/70">{QUALITY_LABELS[star.quality]}</span>
                  </div>
                ))}
                </div>
              ) : (
                <p className="text-xs italic text-outline/60">Không có sao đặc biệt</p>
              )}
            </div>

            {/* Các trợ tinh Bắc Tông */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <Icon name="auto_awesome" className="text-xs text-outline/60" />
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-outline">
                  Phụ tinh Bắc Tông ({palace.minorStars.length})
                </p>
              </div>
              {minorGroups.map(({ key, stars }) => {
                // Lọc ra các sao chưa được hiển thị ở các section riêng
                const alreadyDisplayed = new Set([
                  ...technicalOverview.hoaLoc,
                  ...technicalOverview.hoaQuyen,
                  ...technicalOverview.hoaKhoa,
                  ...technicalOverview.hoaKy,
                  ...technicalOverview.tuan,
                  ...technicalOverview.triet,
                ]);
                const filteredStars = stars.filter(star => !alreadyDisplayed.has(star.name));

                // Bỏ qua nhóm nếu không còn sao nào sau khi lọc
                if (filteredStars.length === 0) return null;

                return (
                  <section key={key} className="glass-border-panel-soft rounded-xl p-3 space-y-2">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">
                      {PHU_TINH_GROUP_LABEL[key]}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {filteredStars.map((star) => (
                        <span
                          key={`${key}-${star.name}`}
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium ${QUALITY_COLORS[star.quality]}`}
                        >
                          {getStarLabel(star.name)}
                          <span className="text-[8px] opacity-60">({QUALITY_LABELS[star.quality]})</span>
                        </span>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
