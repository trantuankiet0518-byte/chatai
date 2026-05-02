import { NextResponse } from "next/server";

import { getVanHanContent } from "./content";
import { success } from "@/lib/api-schema";

export const dynamic = "force-static";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale") === "en" ? "en" : "vi";

  return NextResponse.json(success(getVanHanContent(locale)));
}
