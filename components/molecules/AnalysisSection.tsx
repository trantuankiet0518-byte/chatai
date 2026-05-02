import type { TuViEngineResult } from "@/lib/bazi/types";
import { getPalaceLabel, getStarLabel, getBranchLabel, QUALITY_COLORS, QUALITY_LABELS } from "@/lib/bazi/display";
import Icon from "@/components/atoms/Icon";

interface AnalysisSectionProps {
  result: TuViEngineResult;
}

export default function AnalysisSection({ result }: AnalysisSectionProps) {
  const { summary, analysis, decadeCycles, keyStars } = result;

  return (
    <>
      <div className="col-span-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          className="space-y-3 rounded-2xl border border-white/10 bg-transparent p-6 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="summarize" className="text-sm text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Tổng quan lá số</h3>
          </div>
          {summary.map((line, i) => (
            <p key={i} className="text-sm leading-relaxed text-on-surface-variant">
              {line}
            </p>
          ))}
        </div>

        <div
          className="space-y-3 rounded-2xl border border-white/10 bg-transparent p-6 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="stars" className="text-sm text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Cụm sao trọng tâm</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {keyStars.length > 0 ? (
              keyStars.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-primary/20 bg-transparent px-3 py-1 text-xs font-black uppercase text-primary"
                >
                  {getStarLabel(s)}
                </span>
              ))
            ) : (
              <p className="text-sm text-on-surface-variant">Không có sao trọng tâm.</p>
            )}
          </div>
          {result.lifePalace.majorStars.length > 0 && (
            <div className="space-y-1 border-t border-outline-variant/10 pt-2">
              <p className="text-[9px] font-black uppercase tracking-widest text-outline">
                Cung Mệnh · {getBranchLabel(result.lifePalace.branch)}
              </p>
              {result.lifePalace.majorStars.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${QUALITY_COLORS[s.quality]}`}>
                    {getStarLabel(s.name)}
                  </span>
                  <span className="text-[9px] text-outline">{QUALITY_LABELS[s.quality]}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div
          className="rounded-2xl border border-white/10 bg-transparent p-6 space-y-3 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="timeline" className="text-tertiary text-sm" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Đại hạn mở đầu</h3>
          </div>
          {decadeCycles.slice(0, 4).map((d) => (
            <div key={`${d.palace}-${d.startAge}`} className="space-y-1 rounded-xl border border-white/8 bg-transparent p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-black text-primary">
                  {getPalaceLabel(d.palace)} · {getBranchLabel(d.branch)}
                </span>
                <span className="font-mono text-[10px] text-on-surface-variant">
                  {d.startAge}–{d.endAge} tuổi
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-on-surface-variant">{d.focus}</p>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl border border-white/10 bg-transparent p-6 space-y-4 shadow-lg backdrop-blur-xl"
          style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <Icon name="psychology" className="text-sm text-secondary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-on-surface">Phân tích nhanh</h3>
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Cốt cách</p>
            {analysis.coreTraits.map((t, i) => (
              <p key={i} className="text-xs leading-relaxed text-on-surface-variant">
                {t}
              </p>
            ))}
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Sự nghiệp</p>
            {analysis.career.map((t, i) => (
              <p key={i} className="text-xs leading-relaxed text-on-surface-variant">
                {t}
              </p>
            ))}
            {result.careerPalace && (
              <p className="mt-1 text-[9px] text-outline">
                Quan Lộc ({getBranchLabel(result.careerPalace.branch)}):&nbsp;
                {result.careerPalace.majorStars.length > 0
                  ? result.careerPalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-[9px] font-black uppercase tracking-widest text-primary">Tình cảm</p>
            {analysis.relationship.map((t, i) => (
              <p key={i} className="text-xs leading-relaxed text-on-surface-variant">
                {t}
              </p>
            ))}
            {result.spousePalace && (
              <p className="mt-1 text-[9px] text-outline">
                Phu Thê ({getBranchLabel(result.spousePalace.branch)}):&nbsp;
                {result.spousePalace.majorStars.length > 0
                  ? result.spousePalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            )}
          </div>

          {result.wealthPalace && (
            <div className="space-y-1">
              <p className="text-[9px] font-black uppercase tracking-widest text-primary">Tài lộc</p>
              <p className="text-[9px] text-outline">
                Tài Bạch ({getBranchLabel(result.wealthPalace.branch)}):&nbsp;
                {result.wealthPalace.majorStars.length > 0
                  ? result.wealthPalace.majorStars.map((s) => getStarLabel(s.name)).join(", ")
                  : "Vô chính diệu"}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
