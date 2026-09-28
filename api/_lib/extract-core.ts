import { countWords, LIMITS, type ExtractErrorCode, type ExtractMeta } from "../../shared/contract";
import {
  nullIfSentinel,
  extractionSchema,
  type ExtractionResult,
  type FollowUpEmail,
} from "../../shared/schema";
import {
  chunkTranscript,
  chunkUserPrompt,
  mergeUserPrompt,
  SYSTEM_PROMPT,
  transcriptUserPrompt,
} from "./prompts";
import { MOCK_RESULT } from "./mock-result";
import {
  callChatCompletion,
  llmTimeoutSignal,
  LlmHttpError,
  parseJsonLoose,
  sleep,
  type LlmConfig,
} from "./llm";

export interface ExtractEnv {
  mock: boolean;
  llm: LlmConfig | null;
}

export interface ExtractOutcome {
  result: ExtractionResult;
  meta: ExtractMeta;
}

export class ExtractError extends Error {
  readonly code: ExtractErrorCode;
  constructor(code: ExtractErrorCode, message: string) {
    super(message);
    this.name = "ExtractError";
    this.code = code;
  }
}

const MERGE_SYSTEM_PROMPT =
  "You merge partial meeting-extraction JSON results from the same meeting into one final result. Return ONLY the merged JSON object, matching the input schema exactly. Never paraphrase or alter quote wording.";

/** Runs the full extraction pipeline for one transcript. Throws ExtractError on failure. */
export async function runExtraction(raw: string, env: ExtractEnv): Promise<ExtractOutcome> {
  const transcript = raw.trim();
  if (transcript.length === 0) {
    throw new ExtractError("empty_input", "The transcript is empty — there is nothing to mine.");
  }
  const words = countWords(transcript);
  if (transcript.length < LIMITS.minChars || words < LIMITS.minWords) {
    throw new ExtractError(
      "too_short",
      `That is only about ${words} words. MinuteMind needs at least ${LIMITS.minWords} words of transcript to find anything real.`,
    );
  }
  if (transcript.length > LIMITS.maxChars) {
    throw new ExtractError(
      "too_long",
      `The transcript is ${transcript.length.toLocaleString("en-US")} characters; the limit is ${LIMITS.maxChars.toLocaleString("en-US")}. Split the meeting into parts and run them separately.`,
    );
  }

  if (env.mock) {
    return { result: MOCK_RESULT, meta: { mock: true, chunks: 1 } };
  }
  if (!env.llm) {
    throw new ExtractError(
      "llm_unconfigured",
      "The server has no LLM configured. Set LLM_API_BASE_URL, LLM_API_KEY and LLM_MODEL — or set MOCK_MODE=true for an offline demo.",
    );
  }

  const chunks = chunkTranscript(transcript);
  const partials = await extractChunks(chunks, env.llm);
  const first = partials[0];
  const merged =
    partials.length === 1 && first !== undefined
      ? first
      : await mergePartials(partials, env.llm);
  const result = normalizeExtraction(merged);
  if (isEmptyResult(result)) {
    throw new ExtractError(
      "no_signal",
      "No decisions, action items, or open questions surfaced from this text. Double-check that you pasted a meeting transcript — or try the sample transcript.",
    );
  }
  return { result, meta: { mock: false, chunks: chunks.length } };
}

async function extractChunks(chunks: readonly string[], cfg: LlmConfig): Promise<ExtractionResult[]> {
  const single = chunks.length === 1;
  const prompts = chunks.map((chunk, i) =>
    single ? transcriptUserPrompt(chunk) : chunkUserPrompt(chunk, i, chunks.length),
  );
  return mapPool(prompts, Math.min(LIMITS.chunkConcurrency, prompts.length), (prompt) =>
    extractWithRetry(prompt, cfg),
  );
}

async function extractWithRetry(userPrompt: string, cfg: LlmConfig): Promise<ExtractionResult> {
  let lastDetail = "unknown error";
  for (let attempt = 1; attempt <= LIMITS.maxAttempts; attempt++) {
    try {
      const content = await callChatCompletion(
        cfg,
        [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        llmTimeoutSignal(),
      );
      const json = parseJsonLoose(content);
      const parsed = extractionSchema.safeParse(json);
      if (parsed.success) return parsed.data;
      lastDetail = parsed.error.issues
        .slice(0, 3)
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join("; ");
    } catch (err) {
      if (err instanceof LlmHttpError && err.status === 401) {
        throw new ExtractError(
          "llm_unconfigured",
          "The LLM API rejected the API key (401). Check LLM_API_KEY on the server.",
        );
      }
      lastDetail = err instanceof Error ? err.message : String(err);
    }
    if (attempt < LIMITS.maxAttempts) await sleep(600 * 2 ** (attempt - 1));
  }
  throw new ExtractError(
    "llm_error",
    `The model output failed validation after ${LIMITS.maxAttempts} attempts (${lastDetail}). This is usually temporary — try again.`,
  );
}

async function mergePartials(
  partials: readonly ExtractionResult[],
  cfg: LlmConfig,
): Promise<ExtractionResult> {
  const trimmed = partials.map((p) => ({
    summary: p.summary.slice(0, 4),
    decisions: p.decisions.slice(0, 8),
    action_items: p.action_items.slice(0, 10),
    open_questions: p.open_questions.slice(0, 8),
    follow_up_email: p.follow_up_email,
  }));
  const payload = JSON.stringify(trimmed);

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const content = await callChatCompletion(
        cfg,
        [
          { role: "system", content: MERGE_SYSTEM_PROMPT },
          { role: "user", content: mergeUserPrompt(payload, partials.length) },
        ],
        llmTimeoutSignal(),
      );
      const parsed = extractionSchema.safeParse(parseJsonLoose(content));
      if (parsed.success) return parsed.data;
    } catch {
      // Merge is an enhancement, not a requirement — fall back to local merge.
      break;
    }
  }
  return localMerge(partials);
}

function dedupeKey(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .slice(0, 72);
}

function dedupeBy<T>(items: readonly T[], key: (item: T) => string): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const item of items) {
    const k = key(item);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(item);
  }
  return out;
}

/** Deterministic merge without the LLM — used if the merge call fails. */
function localMerge(partials: readonly ExtractionResult[]): ExtractionResult {
  const summary: string[] = [];
  for (const p of partials) {
    for (const s of p.summary) {
      if (!summary.some((existing) => dedupeKey(existing) === dedupeKey(s))) summary.push(s);
    }
  }
  const withActions = partials.find((p) => p.action_items.length > 0);
  const fallbackEmail: FollowUpEmail = {
    subject: "Meeting recap",
    body: "No email draft was produced. See the extracted items above.",
  };
  return {
    summary: summary.slice(0, 3),
    decisions: dedupeBy(partials.flatMap((p) => p.decisions), (d) => dedupeKey(d.decision)),
    action_items: dedupeBy(partials.flatMap((p) => p.action_items), (a) => dedupeKey(a.task)),
    open_questions: dedupeBy(partials.flatMap((p) => p.open_questions), (q) => dedupeKey(q.question)),
    follow_up_email: withActions?.follow_up_email ?? partials[0]?.follow_up_email ?? fallbackEmail,
  };
}

function cleanText(value: string): string {
  let t = value.trim();
  if (t.length >= 2) {
    const first = t.charAt(0);
    const last = t.charAt(t.length - 1);
    if (
      (first === '"' && last === '"') ||
      (first === "\u201c" && last === "\u201d") ||
      (first === "'" && last === "'")
    ) {
      t = t.slice(1, -1).trim();
    }
  }
  return t;
}

function capQuote(quote: string): string {
  return quote.length > 600 ? `${quote.slice(0, 599).trimEnd()}…` : quote;
}

/** Trims, caps counts, strips wrapper quotes and sentinel values ("unassigned" → null). */
function normalizeExtraction(x: ExtractionResult): ExtractionResult {
  const decisions = x.decisions
    .slice(0, 12)
    .map((d) => ({
      decision: cleanText(d.decision),
      owner: nullIfSentinel(d.owner),
      quote: capQuote(cleanText(d.quote)),
    }))
    .filter((d) => d.decision !== "" && d.quote !== "");

  const action_items = x.action_items
    .slice(0, 15)
    .map((a) => ({
      task: cleanText(a.task),
      owner: nullIfSentinel(a.owner),
      due: nullIfSentinel(a.due),
      priority: a.priority,
      quote: capQuote(cleanText(a.quote)),
    }))
    .filter((a) => a.task !== "" && a.quote !== "");

  const open_questions = x.open_questions
    .slice(0, 10)
    .map((q) => ({ question: cleanText(q.question), quote: capQuote(cleanText(q.quote)) }))
    .filter((q) => q.question !== "" && q.quote !== "");

  return {
    summary: x.summary.map(cleanText).filter((s) => s !== "").slice(0, 3),
    decisions,
    action_items,
    open_questions,
    follow_up_email: {
      subject: cleanText(x.follow_up_email.subject).replace(/^subject:\s*/i, ""),
      body: x.follow_up_email.body.trim(),
    },
  };
}

function isEmptyResult(result: ExtractionResult): boolean {
  return (
    result.summary.length === 0 &&
    result.decisions.length === 0 &&
    result.action_items.length === 0 &&
    result.open_questions.length === 0
  );
}

/** Small fixed-concurrency pool to keep chunk calls parallel but polite. */
async function mapPool<T, R>(
  items: readonly T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const worker = async (): Promise<void> => {
    for (;;) {
      const index = next++;
      if (index >= items.length) return;
      const item = items[index];
      if (item === undefined) return;
      results[index] = await fn(item);
    }
  };
  const workers = Math.max(1, Math.min(limit, items.length));
  await Promise.all(Array.from({ length: workers }, () => worker()));
  return results;
}
