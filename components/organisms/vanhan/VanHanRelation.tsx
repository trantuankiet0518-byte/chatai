"use client";

interface VanHanRelationProps {
  lifePalaceElement?: string;
  tieuHanPalaceName: string;
  tieuHanElement?: string;
  relation: {
    label: string;
    desc: string;
  };
}

export default function VanHanRelation({
  lifePalaceElement,
  tieuHanPalaceName,
  tieuHanElement,
  relation,
}: VanHanRelationProps) {
  return (
    <section className="ui-shell rounded-[2.5rem] p-8 md:p-10">
      <h2 className="text-2xl font-black tracking-tight text-on-surface">
        Luận vận hạn theo đúng lá số này
      </h2>
      <p className="mt-3 max-w-4xl text-sm leading-7 text-on-surface-variant">
        Phần dưới đây áp dụng trực tiếp vào chính lá số đang xem, thay vì chỉ giải thích lý thuyết chung.
        Tức là app đang nối chu kỳ hạn, lưu sao, cung Mệnh/Thân, ngũ hành và các sao nhập hạn với dữ liệu thật của chart này.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Ngũ hành Mệnh</p>
          <p className="mt-2 text-lg font-black text-on-surface">{lifePalaceElement || "Chưa rõ"}</p>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Lấy theo cung Mệnh gốc của lá số.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-outline-variant/12 bg-surface-container-low/20 p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-on-surface-variant">Ngũ hành cung hạn</p>
          <p className="mt-2 text-lg font-black text-on-surface">{tieuHanElement || "Chưa rõ"}</p>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            Lấy theo cung {tieuHanPalaceName} đang làm tiểu hạn năm nay.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-primary/12 bg-primary/5 p-5">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-primary">Kết luận sinh khắc</p>
          <p className="mt-2 text-lg font-black text-on-surface">{relation.label}</p>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">{relation.desc}</p>
        </div>
      </div>
    </section>
  );
}
