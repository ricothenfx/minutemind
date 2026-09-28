import { LIMITS } from "../../shared/contract.js";

export interface LlmConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
}

export class LlmHttpError extends Error {
  readonly status: number;
  readonly body: string;
  constructor(status: number, body: string) {
    super(`LLM API responded ${status}`);
    this.name = "LlmHttpError";
    this.status = status;
    this.body = body.slice(0, 500);
  }
}

export class LlmParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LlmParseError";
  }
}

function completionsUrl(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/+$/, "");
  if (/\/chat\/completions$/.test(trimmed)) return trimmed;
  return `${trimmed}/chat/completions`;
}

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

interface ChatCompletionResponse {
  choices?: Array<{ message?: { content?: string | null } }>;
}

/** One chat-completions call with strict JSON instructions. Returns the raw content string. */
export async function callChatCompletion(
  cfg: LlmConfig,
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string> {
  const doFetch = async (withResponseFormat: boolean): Promise<Response> => {
    const body: Record<string, unknown> = {
      model: cfg.model,
      temperature: 0.2,
      messages,
    };
    if (withResponseFormat) body.response_format = { type: "json_object" };
    return fetch(completionsUrl(cfg.baseUrl), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cfg.apiKey}`,
      },
      body: JSON.stringify(body),
      signal,
    });
  };

  let res = await doFetch(true);
  // Some OpenAI-compatible providers reject response_format; retry once without it.
  if (!res.ok && res.status === 400) {
    const text = await res.text();
    if (/response_format/i.test(text)) {
      res = await doFetch(false);
      if (res.ok) return extractContent(await res.json());
      throw new LlmHttpError(res.status, await res.text());
    }
    throw new LlmHttpError(res.status, text);
  }
  if (!res.ok) {
    throw new LlmHttpError(res.status, await res.text());
  }
  return extractContent(await res.json());
}

function extractContent(payload: unknown): string {
  const parsed = payload as ChatCompletionResponse;
  const content = parsed.choices?.[0]?.message?.content;
  if (typeof content !== "string" || content.trim() === "") {
    throw new LlmParseError("Model returned an empty completion.");
  }
  return content;
}

/**
 * Defensively parse model output into a JSON value:
 * strips markdown fences, slices to the outermost braces, repairs trailing commas.
 */
export function parseJsonLoose(raw: string): unknown {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) text = fence[1].trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new LlmParseError("No JSON object found in model output.");
  }
  text = text.slice(start, end + 1);

  const attempts: Array<(t: string) => string> = [
    (t) => t,
    (t) => t.replace(/,\s*([}\]])/g, "$1"),
  ];
  let lastError: unknown = null;
  for (const attempt of attempts) {
    try {
      return JSON.parse(attempt(text)) as unknown;
    } catch (err) {
      lastError = err;
    }
  }
  throw new LlmParseError(
    `JSON.parse failed: ${lastError instanceof Error ? lastError.message : "unknown error"}`,
  );
}

export function llmTimeoutSignal(): AbortSignal {
  return AbortSignal.timeout(LIMITS.callTimeoutMs);
}

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
