import { NextResponse } from "next/server";
import { calculateTuVi, transformToEngineResultFormat } from "@/lib/tuvi/engine";
import type { TuViInput } from "@/lib/tuvi/types";
import type { FortuneRequest } from "@/lib/bazi/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<FortuneRequest>;

    if (!body.birthDate || !body.birthTime || !body.calendarType || !body.gender || !body.timezone) {
      return NextResponse.json(
        { ok: false, error: { code: "MISSING_FIELDS", message: "Thiếu trường bắt buộc để lập lá số." } },
        { status: 400 }
      );
    }

    // Transform FortuneRequest to TuViInput
    const input: TuViInput = {
      ho_ten: body.fullName ?? "",
      ngay_sinh: body.birthDate,
      loai_lich: body.calendarType,
      gio_sinh: body.birthTime,
      gioi_tinh: body.gender,
      ngay_du_doan: new Date().toISOString().split('T')[0], // Use current date as default
    };

    const result = await calculateTuVi(input);

    // Transform to legacy format for backward compatibility with existing components
    const legacyResult = transformToEngineResultFormat(result, {
      fullName: body.fullName ?? "",
      gender: body.gender,
      calendarType: body.calendarType,
      birthDate: body.birthDate,
      birthTime: body.birthTime,
      timezone: body.timezone,
    });

    return NextResponse.json({ ok: true, data: legacyResult });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Không thể tính lá số.";
    return NextResponse.json({ ok: false, error: { code: "TUVI_ERROR", message } }, { status: 500 });
  }
}
