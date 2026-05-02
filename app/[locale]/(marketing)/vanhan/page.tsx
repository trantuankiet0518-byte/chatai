"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { predictVanHan, type VanHanPrediction } from "@/lib/vanhan_predict";
import { readSavedCharts, subscribeToSavedCharts, type SavedChart } from "@/lib/services/savedCharts";
import { getElementRelation, toneForStatus } from "@/lib/vanhan";

import VanHanHeader from "@/components/organisms/vanhan/VanHanHeader";
import VanHanSummary from "@/components/organisms/vanhan/VanHanSummary";
import VanHanPredictionContent from "@/components/organisms/vanhan/VanHanPredictionContent";
import VanHanAlerts from "@/components/organisms/vanhan/VanHanAlerts";
import VanHanRelation from "@/components/organisms/vanhan/VanHanRelation";
import VanHanChartSelector from "@/components/organisms/vanhan/VanHanChartSelector";
import VanHanEmptyState from "@/components/organisms/vanhan/VanHanEmptyState";

export default function VanHanPage() {
  const t = useTranslations("vanhan.page");
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [targetDate, setTargetDate] = useState("");
  const isHydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const savedCharts = useSyncExternalStore(
    subscribeToSavedCharts,
    readSavedCharts,
    () => []
  );

  const effectiveTargetDate = useMemo(() => {
    if (!isHydrated) {
      return "";
    }
    return targetDate || new Date().toISOString().split("T")[0];
  }, [isHydrated, targetDate]);

  const selectedChart = useMemo<SavedChart | null>(() => {
    if (!isHydrated || !selectedChartId) {
      return null;
    }
    return savedCharts.find((chart) => chart.id === selectedChartId) ?? null;
  }, [selectedChartId, savedCharts, isHydrated]);

  const prediction = useMemo<VanHanPrediction | null>(() => {
    if (!selectedChart || !effectiveTargetDate) {
      return null;
    }
    return predictVanHan(selectedChart.result, effectiveTargetDate);
  }, [selectedChart, effectiveTargetDate]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
        <p className="font-medium text-on-surface-variant">Đang tải...</p>
      </div>
    );
  }

  if (savedCharts.length === 0) {
    return (
      <main className="mx-auto max-w-7xl space-y-10 px-6 pb-16 pt-24">
        <VanHanEmptyState />
      </main>
    );
  }

  if (!selectedChart) {
    return (
      <main className="mx-auto max-w-7xl space-y-10 px-6 pb-16 pt-24">
        <VanHanChartSelector
          savedCharts={savedCharts}
          onSelect={setSelectedChartId}
        />
      </main>
    );
  }

  if (!prediction) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary" />
        <p className="font-medium text-on-surface-variant">Đang tính toán vận hạn...</p>
      </div>
    );
  }

  const yearTone = toneForStatus(prediction.tieuHan.status);
  const monthTone = toneForStatus(prediction.nguyetHan.status);

  const highlights = [
    {
      label: "Nhịp của năm",
      value: prediction.tieuHan.status,
      subtext: `Tiểu hạn tại cung ${prediction.tieuHan.palace} (${prediction.tieuHan.branch}).`,
    },
    {
      label: "Nhịp của tháng",
      value: prediction.nguyetHan.status,
      subtext: `Tháng âm ${prediction.nguyetHan.month} đi qua cung ${prediction.nguyetHan.palace} (${prediction.nguyetHan.branch}).`,
    },
    {
      label: "Đại hạn hiện tại",
      value: `${prediction.daiHan.startAge}-${prediction.daiHan.endAge}`,
      subtext: `Trọng tâm chính đang nằm ở cung ${prediction.daiHan.palace}.`,
    },
    {
      label: "Ngày đang xem",
      value: prediction.nhatHan.date,
      subtext: `Âm lịch ${prediction.context.lunarDate.day}/${prediction.context.lunarDate.month}/${prediction.context.lunarDate.year}.`,
    },
  ];

  const lifePalace = selectedChart.result.palaces.find((palace) => palace.isLifePalace);
  const tieuHanPalace = selectedChart.result.palaces.find(
    (palace) => palace.name === prediction.tieuHan.palace
  );
  const lifePalaceElement = lifePalace?.element;
  const tieuHanElement = tieuHanPalace?.element;
  const relation = getElementRelation(lifePalaceElement, tieuHanElement);

  return (
    <main className="mx-auto max-w-7xl space-y-8 pb-16">
      <VanHanHeader
        fullName={selectedChart.result.profile.fullName || "Ẩn danh"}
        solarDateTime={selectedChart.result.profile.solarDateTime}
        targetDate={effectiveTargetDate}
        onTargetDateChange={setTargetDate}
        onBack={() => setSelectedChartId(null)}
      />

      <VanHanSummary highlights={highlights} />

      <VanHanPredictionContent
        prediction={prediction}
        yearTone={yearTone}
        monthTone={monthTone}
      />

      <VanHanAlerts alerts={prediction.alerts} />

      <VanHanRelation
        lifePalaceElement={lifePalaceElement}
        tieuHanPalaceName={prediction.tieuHan.palace}
        tieuHanElement={tieuHanElement}
        relation={relation}
      />
    </main>
  );
}
