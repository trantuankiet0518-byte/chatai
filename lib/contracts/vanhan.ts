import type { ApiResult } from "@/lib/api-schema";

export interface VanHanCycleLevel {
  level: string;
  cycle: string;
  unit: string;
}

export interface VanHanRuleItem {
  label: string;
  value: string;
  verified?: boolean;
}

export interface VanHanCodeExample {
  language: string;
  title: string;
  code: string;
}

export type PredictionTone = "positive" | "neutral" | "caution";

export interface DayPrediction {
  date: string;
  label: string;
  cung: string;
  stars: string[];
  summary: string;
  advice: string;
  tone: PredictionTone;
}

export interface WeekSegment {
  period: string;
  days: DayPrediction[];
}

export interface VanHanPredictionContent {
  title: string;
  subtitle: string;
  lunarToday: string;
  tomorrow: DayPrediction;
  weekSegments: WeekSegment[];
  weekSummary: string;
  weekAdvice: string;
}

export interface VanHanSectionTableRow {
  key: string;
  value: string;
  verified?: boolean;
}

export interface VanHanSection {
  id: string;
  title: string;
  summary: string;
  cards?: VanHanRuleItem[];
  codeExamples?: VanHanCodeExample[];
  tables?: Array<{
    title: string;
    rows: VanHanSectionTableRow[];
  }>;
  bulletGroups?: Array<{
    title: string;
    items: Array<{ text: string; verified?: boolean }>;
  }>;
}

export interface VanHanContent {
  title: string;
  intro: string;
  apiPath: "/api/vanhan";
  overview: {
    title: string;
    levels: VanHanCycleLevel[];
  };
  sections: VanHanSection[];
  pipeline: string[];
  commonMistakes: string[];
  notes: string[];
  prediction: VanHanPredictionContent;
}

export type VanHanContentResponse = ApiResult<VanHanContent>;
