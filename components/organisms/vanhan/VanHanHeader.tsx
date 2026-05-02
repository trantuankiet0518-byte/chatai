"use client";

import Icon from "@/components/atoms/Icon";

interface VanHanHeaderProps {
  fullName: string;
  solarDateTime: string;
  targetDate: string;
  onTargetDateChange: (date: string) => void;
  onBack: () => void;
}

export default function VanHanHeader({
  fullName,
  solarDateTime,
  targetDate,
  onTargetDateChange,
  onBack,
}: VanHanHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="space-y-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-xs text-on-surface-variant transition-colors hover:text-primary"
        >
          <Icon name="arrow_back" className="text-sm" />
          Chọn lá số khác
        </button>
        <h1 className="text-4xl font-black tracking-tight text-on-surface md:text-5xl">
          Vận hạn - {fullName}
        </h1>
        <p className="text-sm font-medium text-on-surface-variant">
          {solarDateTime}
        </p>
      </div>

      <div className="ui-shell flex flex-wrap items-center gap-4 rounded-[1.75rem] p-4">
        <label
          htmlFor="target-date"
          className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant"
        >
          Chọn ngày xem
        </label>
        <input
          id="target-date"
          type="date"
          value={targetDate}
          onChange={(event) => onTargetDateChange(event.target.value)}
          className="cursor-pointer rounded-xl border border-outline-variant/15 bg-surface-container-low/30 px-4 py-2 font-bold text-primary outline-none"
        />
      </div>
    </div>
  );
}
