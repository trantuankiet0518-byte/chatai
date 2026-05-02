"use client";

import Icon from "@/components/atoms/Icon";

export default function VanHanEmptyState() {
  return (
    <section className="ui-shell rounded-[2.75rem] p-8 md:p-12">
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-6 text-center">
        <div className="rounded-full bg-surface-container-low p-6">
          <Icon name="calendar_today" className="text-5xl text-on-surface-variant" />
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-on-surface md:text-4xl">
            Chưa có lá số nào
          </h1>
          <p className="max-w-md text-base leading-7 text-on-surface-variant">
            Bạn cần lập và lưu lá số trước khi xem vận hạn. Hãy quay lại trang Lập Lá Số để tạo lá số mới.
          </p>
        </div>
      </div>
    </section>
  );
}
