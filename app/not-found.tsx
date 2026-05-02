/**
 * Không bọc <html>/<body> — đã có trong app/[locale]/layout.tsx.
 * Lồng html gây DOM không hợp lệ và lỗi hydration.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="space-y-4 text-center">
        <p className="text-6xl font-black text-primary">404</p>
        <p className="text-on-surface-variant">Trang không tồn tại</p>
        <a href="/vi" className="inline-block text-sm text-primary hover:underline">
          Về trang chủ
        </a>
      </div>
    </div>
  );
}
