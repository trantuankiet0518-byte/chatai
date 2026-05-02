"use client";

import Icon from "@/components/atoms/Icon";

interface VanHanAlertsProps {
  alerts: string[];
}

export default function VanHanAlerts({ alerts }: VanHanAlertsProps) {
  if (alerts.length === 0) return null;

  return (
    <section className="ui-shell rounded-[2.5rem] border border-error/20 bg-error/5 p-8 md:p-10">
      <div className="flex items-start gap-4">
        <div className="rounded-full bg-error/10 p-3">
          <Icon name="warning" className="text-2xl text-error" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-black tracking-tight text-error">Cảnh báo quan trọng</h2>
          <p className="max-w-3xl text-base leading-8 text-on-surface-variant">
            Lá số này đang có dấu hiệu cần phòng thủ hơn vì xuất hiện các chỉ báo nặng.
            Nên ưu tiên an toàn, sức khỏe và tránh quyết định liều trong giai đoạn này.
          </p>
          <ul className="list-inside list-disc space-y-2 text-sm leading-7 text-on-surface-variant">
            {alerts.map((alert, index) => (
              <li key={index}>{alert}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
