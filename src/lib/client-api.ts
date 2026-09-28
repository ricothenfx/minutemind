import {
  EXTRACT_ENDPOINT,
  type ExtractErrorCode,
  type ExtractMeta,
  type ExtractResponse,
  type ExtractSuccess,
} from "../../shared/contract";
import { extractionSchema } from "../../shared/schema";

export class ApiError extends Error {
  readonly code: ExtractErrorCode;
  constructor(code: ExtractErrorCode, message: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }
}

function isExtractResponse(value: unknown): value is ExtractResponse {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  if (typeof record.ok !== "boolean") return false;
  if (record.ok) return "data" in record && "meta" in record;
  const error = record.error as Record<string, unknown> | undefined;
  return (
    error !== undefined &&
    typeof error.code === "string" &&
    typeof error.message === "string"
  );
}

async function copyFallback(text: string): Promise<void> {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try {
    document.execCommand("copy");
  } finally {
    area.remove();
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      await copyFallback(text);
      return true;
    } catch {
      return false;
    }
  }
}

export function downloadText(filename: string, text: string): void {
  const blob = new Blob([text], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

/** POSTs the transcript and returns a validated extraction. Throws ApiError. */
export async function requestExtraction(
  transcript: string,
  signal?: AbortSignal,
): Promise<ExtractSuccess> {
  let response: Response;
  try {
    response = await fetch(EXTRACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
      signal,
    });
  } catch {
    throw new ApiError(
      "network_error",
      "Could not reach the MinuteMind API. Check that the dev server is running, then try again.",
    );
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new ApiError("llm_error", "The API returned a malformed response.");
  }
  if (!isExtractResponse(payload)) {
    throw new ApiError("llm_error", "The API returned an unexpected response shape.");
  }
  if (!payload.ok) {
    throw new ApiError(payload.error.code, payload.error.message);
  }

  const checked = extractionSchema.safeParse(payload.data);
  if (!checked.success) {
    throw new ApiError("llm_error", "The extraction came back in an unexpected shape. Try again.");
  }
  const meta: ExtractMeta = {
    mock: payload.meta.mock === true,
    chunks: typeof payload.meta.chunks === "number" ? payload.meta.chunks : 1,
  };
  return { ok: true, data: checked.data, meta };
}
