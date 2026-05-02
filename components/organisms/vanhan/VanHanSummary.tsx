"use client";

interface SummaryCardProps {
  label: string;
  value: string;
  subtext: string;
}

function SummaryCard({ label, value, subtext }: SummaryCardProps) {
  return (
    <div className="ui-panel-soft rounded-[1.75rem] p-5">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">
        {label}
      </p>
      <p className="mt-3 text-2xl font-black tracking-tight text-on-surface">{value}</p>
      <p className="mt-2 text-sm leading-7 text-on-surface-variant">{subtext}</p>
    </div>
  );
}

interface VanHanSummaryProps {
  highlights: Array<{
    label: string;
    value: string;
    subtext: string;
  }>;
}

export default function VanHanSummary({ highlights }: VanHanSummaryProps) {
  return (
    <section className="ui-shell rounded-[2.5rem] p-8 md:p-10">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {highlights.map((item) => (
          <SummaryCard key={item.label} {...item} />
        ))}
      </div>
    </section>
  );
}
