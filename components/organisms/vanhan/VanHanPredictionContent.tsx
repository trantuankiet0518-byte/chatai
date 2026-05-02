"use client";

import Icon from "@/components/atoms/Icon";

interface Tone {
  badge: string;
  panel: string;
  icon: string;
  title: string;
}

interface VanHanPredictionContentProps {
  prediction: {
    tieuHan: {
      status: string;
      palace: string;
      branch: string;
      desc: string;
      luuSaoAtPalace: string[];
    };
    daiHan: {
      palace: string;
      branch: string;
      focus: string;
    };
    analysisBasis: {
      heavyIndicators: string[];
    };
    nguyetHan: {
      status: string;
      month: number;
      palace: string;
      branch: string;
      desc: string;
    };
    nhatHan: {
      goodHours: string[];
      badHours: string[];
    };
  };
  yearTone: Tone;
  monthTone: Tone;
}

export default function VanHanPredictionContent({
  prediction,
  yearTone,
  monthTone,
}: VanHanPredictionContentProps) {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <div className={`ui-shell rounded-[2.5rem] border p-8 md:p-10 ${yearTone.panel}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.24em] ${yearTone.badge}`}>
              Tiểu hạn {prediction.tieuHan.status}
            </div>
            <h2 className="text-3xl font-black tracking-tight text-on-surface">{yearTone.title}</h2>
            <p className="max-w-3xl text-base leading-8 text-on-surface-variant">
              {prediction.tieuHan.desc}
            </p>
          </div>
          <div className="hidden rounded-[1.75rem] bg-surface-container-low/40 p-4 text-on-surface md:block">
            <Icon name={yearTone.icon} className="text-4xl" />
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="ui-panel-soft rounded-[1.5rem] p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Đại hạn nền</p>
            <p className="mt-3 text-lg font-black text-on-surface">
              {prediction.daiHan.palace} ({prediction.daiHan.branch})
            </p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">{prediction.daiHan.focus}</p>
          </div>

          <div className="ui-panel-soft rounded-[1.5rem] p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-secondary">Lưu sao tại cung hạn</p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              {prediction.tieuHan.luuSaoAtPalace.join(", ") || "Chưa có lưu sao nổi bật nhập thẳng cung hạn."}
            </p>
          </div>

          <div className="ui-panel-soft rounded-[1.5rem] p-5">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-tertiary">Chỉ báo nặng</p>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              {prediction.analysisBasis.heavyIndicators.join(", ") || "Chưa có chỉ báo hạn nặng nổi bật."}
            </p>
          </div>
        </div>
      </div>

      <div className="ui-shell rounded-[2.5rem] p-8 md:p-10">
        <h2 className="text-2xl font-black tracking-tight text-on-surface">Nguyệt hạn</h2>
        <div className={`mt-6 rounded-[1.5rem] border p-6 ${monthTone.panel}`}>
          <div className={`inline-flex rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.24em] ${monthTone.badge}`}>
            Tháng {prediction.nguyetHan.status}
          </div>
          <p className="mt-4 text-xl font-black text-on-surface">
            Tháng âm {prediction.nguyetHan.month} - {prediction.nguyetHan.palace} ({prediction.nguyetHan.branch})
          </p>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">{prediction.nguyetHan.desc}</p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-black text-on-surface">Giờ tốt/xấu trong ngày</h3>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-primary/15 bg-primary/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Giờ tốt</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.nhatHan.goodHours.join(", ") || "Không có giờ tốt nổi bật."}
              </p>
            </div>
            <div className="rounded-[1.25rem] border border-error/15 bg-error/5 p-5">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-error">Giờ xấu</p>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">
                {prediction.nhatHan.badHours.join(", ") || "Không có giờ xấu đáng lo."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
