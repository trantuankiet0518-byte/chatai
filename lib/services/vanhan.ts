import type { VanHanContent, VanHanContentResponse } from "@/lib/contracts/vanhan";
import { getJson } from "@/lib/services/api";

export async function getVanHanContentRequest(locale: "vi" | "en" = "vi"): Promise<VanHanContentResponse> {
  return getJson<VanHanContent>(`/api/vanhan?locale=${locale}`);
}
