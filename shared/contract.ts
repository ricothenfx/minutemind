/**
 * Contract shared between the browser client and the /api serverless function.
 * No imports from src/ or api/ — this file is the boundary.
 */

export const LIMITS = {
  /** Below this the transcript is rejected as too short. */
  minChars: 120,
  minWords: 25,
  /** Hard request cap (~30k words) to protect the function and the LLM context. */
  maxChars: 200_000,
  /** A single LLM call is used up to this size; beyond it, chunking kicks in. */
  singleCallChars: 48_000,
  /** Target size of each chunk when splitting. */
  chunkTargetChars: 36_000,
  maxChunks: 8,
  /** Parallel LLM calls while extracting chunks. */
  chunkConcurrency: 3,
  /** LLM call timeout in milliseconds. */
  callTimeoutMs: 45_000,
  /** Attempts per LLM call (initial + retries). */
  maxAttempts: 3,
} as const;

export const EXTRACT_ENDPOINT = "/api/extract";

export type ExtractErrorCode =
  | "bad_request"
  | "empty_input"
  | "too_short"
  | "too_long"
  | "no_signal"
  | "llm_unconfigured"
  | "llm_error"
  | "network_error";

export interface ExtractMeta {
  mock: boolean;
  chunks: number;
}

export interface ExtractSuccess {
  ok: true;
  data: import("./schema.js").ExtractionResult;
  meta: ExtractMeta;
}

export interface ExtractFailure {
  ok: false;
  error: { code: ExtractErrorCode; message: string };
}

export type ExtractResponse = ExtractSuccess | ExtractFailure;

/** Maps an error code to the HTTP status the API responds with. */
export function statusForErrorCode(code: ExtractErrorCode): number {
  switch (code) {
    case "empty_input":
    case "too_short":
    case "too_long":
    case "no_signal":
    case "bad_request":
      return 400;
    case "llm_unconfigured":
      return 500;
    case "llm_error":
      return 502;
    case "network_error":
      return 504;
  }
}

export interface ExtractRequestBody {
  transcript: string;
}

/** Structural validation of the decoded request body. */
export function parseRequestBody(body: unknown): string {
  if (typeof body !== "object" || body === null) {
    throw "Request body must be a JSON object.";
  }
  const transcript = (body as { transcript?: unknown }).transcript;
  if (typeof transcript !== "string") {
    throw "Field 'transcript' (string) is required.";
  }
  return transcript;
}

export function countWords(text: string): number {
  const matches = text.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}
