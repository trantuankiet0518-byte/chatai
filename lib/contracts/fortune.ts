import type { ApiResult } from "@/lib/api-schema";
import type { BaziEngineResult, FortuneRequest, TuViEngineResult } from "@/lib/bazi/types";

export type FortuneRequestPayload = FortuneRequest;

export type FortuneApiPath = "/api/bazi" | "/api/tuvi";

export type TuViCalculationResponse = ApiResult<TuViEngineResult>;

export type BaziCalculationResponse = ApiResult<BaziEngineResult>;
