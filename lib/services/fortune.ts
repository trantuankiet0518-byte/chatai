import type { ApiResult } from "@/lib/api-schema";
import type { TuViEngineResult } from "@/lib/bazi/types";
import type { FortuneRequestPayload, TuViCalculationResponse } from "@/lib/contracts/fortune";
import { postJson } from "@/lib/services/api";

export async function submitFortuneRequest(
  request: FortuneRequestPayload
): Promise<ApiResult<TuViEngineResult>> {
  return postJson<TuViEngineResult, FortuneRequestPayload>("/api/tuvi", request);
}

export type { TuViCalculationResponse };
