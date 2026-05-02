"use client";

import { getBranchLabel } from "@/lib/bazi/display";
import type { SavedChart } from "@/lib/services/savedCharts";

interface VanHanChartSelectorProps {
  savedCharts: SavedChart[];
  onSelect: (id: string) => void;
}

export default function VanHanChartSelector({
  savedCharts,
  onSelect,
}: VanHanChartSelectorProps) {
  return (
    <section className="ui-shell rounded-[2.75rem] p-8 md:p-12">
      <div className="space-y-6">
        <h1 className="text-4xl font-black tracking-tight text-on-surface md:text-5xl">
          Chọn lá số để xem vận hạn
        </h1>
        <p className="max-w-3xl text-base leading-7 text-on-surface-variant">
          Chọn một lá số đã lưu để xem phân tích vận hạn chi tiết theo đại hạn, tiểu hạn, nguyệt hạn và nhật hạn.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedCharts.map((chart) => (
            <button
              key={chart.id}
              type="button"
              onClick={() => onSelect(chart.id)}
              className="ui-panel-soft rounded-[1.75rem] p-6 text-left transition-all hover:bg-surface-container-high"
            >
              <p className="text-lg font-black text-on-surface">{chart.result.profile.fullName}</p>
              <p className="mt-2 text-sm text-on-surface-variant">{chart.result.profile.solarDateTime}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-outline-variant/15 bg-surface-container-low/40 px-3 py-1 text-xs font-bold text-on-surface-variant">
                  {getBranchLabel(chart.result.overview.menhBranch)}
                </span>
                <span className="rounded-full border border-outline-variant/15 bg-surface-container-low/40 px-3 py-1 text-xs font-bold text-on-surface-variant">
                  {chart.result.overview.canChiYear}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
