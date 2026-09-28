import { LIMITS } from "../../shared/contract";

export const SCHEMA_HINT = `{
  "summary": ["string"],
  "decisions": [{ "decision": "string", "owner": "string | null", "quote": "string" }],
  "action_items": [{ "task": "string", "owner": "string | null", "due": "string | null", "priority": "high | medium | low | null", "quote": "string" }],
  "open_questions": [{ "question": "string", "quote": "string" }],
  "follow_up_email": { "subject": "string", "body": "string" }
}`;

export const SYSTEM_PROMPT = `You are MinuteMind, a meticulous meeting analyst. You turn raw meeting transcripts into structured, grounded output.

Non-negotiable rules:
- Extract ONLY what the transcript supports. Never invent people, dates, priorities, or outcomes.
- Every decision, action item, and open question MUST carry a "quote": an exact, verbatim span copied from the transcript that supports it. Keep quotes short (one sentence when possible). You may trim mid-sentence with "…" but never alter or paraphrase words.
- "owner": the person's name ONLY when the transcript clearly assigns them. If ownership is unclear or left to "someone", use null. Prefer null over guessing.
- "due": copy the deadline as stated (e.g. "Friday", "October 14th", "EOD Tuesday"). Use null when no deadline is mentioned. Prefer null over guessing.
- "priority": infer ONLY from explicit urgency ("critical", "ASAP", "it's money", "blocks launch" → high; clear must-do timing → medium; nice-to-have or parked → low). Otherwise null.
- "summary": at most 3 bullets, each one crisp sentence a busy executive would care about.
- "follow_up_email": addressed to the team; concise, professional, slightly friendly. Cover the decisions, the action items with owners and deadlines, and the open questions. Plain text, short paragraphs. Subject line without "Re:". Sign off with "Best," followed by "[Your name]" on the next line.
- Ignore small talk, filler words, and crosstalk.
- If a section has no supported content, return an empty array.

Return ONLY a JSON object matching exactly this schema — no markdown fences, no commentary, no trailing commas:
${SCHEMA_HINT}`;

export function transcriptUserPrompt(transcript: string): string {
  return `Extract from this meeting transcript:\n\n<transcript>\n${transcript}\n</transcript>`;
}

export function chunkUserPrompt(chunk: string, index: number, total: number): string {
  return `This is part ${index + 1} of ${total} of ONE meeting transcript. Extract from this part only; the parts will be merged afterwards.\n\n<transcript-part>\n${chunk}\n</transcript-part>`;
}

export function mergeUserPrompt(partialsJson: string, total: number): string {
  return `These are ${total} partial extraction results from consecutive parts of the SAME meeting. Merge them into ONE final result:
- Deduplicate overlapping items (same decision/task/question counts once; keep the best wording and the best quote).
- Keep every quote verbatim from the transcript.
- "summary": at most ${3} bullets total, the whole meeting's story.
- Keep "follow_up_email" from the best partial, or compose a better one covering the merged items.
Return ONLY the merged JSON object matching the schema — no fences, no commentary.

${partialsJson}`;
}

/** Splits a long transcript into line-boundary chunks. Never drops content. */
export function chunkTranscript(transcript: string): string[] {
  if (transcript.length <= LIMITS.singleCallChars) return [transcript];

  const lines = transcript.split("\n");
  const chunks: string[] = [];
  let current: string[] = [];
  let currentLength = 0;

  for (const line of lines) {
    current.push(line);
    currentLength += line.length + 1;
    if (currentLength >= LIMITS.chunkTargetChars && chunks.length < LIMITS.maxChunks - 1) {
      chunks.push(current.join("\n"));
      current = [];
      currentLength = 0;
    }
  }
  if (current.length > 0) {
    if (chunks.length < LIMITS.maxChunks) {
      chunks.push(current.join("\n"));
    } else {
      // Never truncate: fold the remainder into the last allowed chunk.
      const last = chunks[chunks.length - 1];
      chunks[chunks.length - 1] = `${last}\n${current.join("\n")}`;
    }
  }
  return chunks;
}
