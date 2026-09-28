import type { LlmConfig } from "./llm.js";

export interface AppEnv {
  mock: boolean;
  llm: LlmConfig | null;
}

const TRUTHY = new Set(["true", "1", "yes", "on"]);

/** Reads the server-side configuration from process env. Never throws. */
export function readEnv(source: NodeJS.ProcessEnv = process.env): AppEnv {
  const mock = TRUTHY.has((source.MOCK_MODE ?? "").trim().toLowerCase());
  const baseUrl = source.LLM_API_BASE_URL?.trim();
  const apiKey = source.LLM_API_KEY?.trim();
  const model = source.LLM_MODEL?.trim();
  const llm =
    baseUrl !== undefined && baseUrl !== "" && apiKey !== undefined && apiKey !== "" && model !== undefined && model !== ""
      ? { baseUrl, apiKey, model }
      : null;
  return { mock, llm };
}
