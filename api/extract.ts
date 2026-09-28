import type { VercelRequest, VercelResponse } from "@vercel/node";
import { parseRequestBody, statusForErrorCode, type ExtractResponse } from "../shared/contract.js";
import { ExtractError, runExtraction } from "./_lib/extract-core.js";
import { readEnv } from "./_lib/env.js";

/**
 * MinuteMind extraction endpoint.
 * POST { transcript: string } → 200 { ok: true, data, meta } | 4xx/5xx { ok: false, error }.
 * The LLM API key never leaves the server.
 */
export const maxDuration = 60;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    send(res, 405, {
      ok: false,
      error: { code: "bad_request", message: "Method not allowed. POST a JSON body: { transcript: string }." },
    });
    return;
  }

  let transcript: string;
  try {
    transcript = parseRequestBody(req.body);
  } catch (message) {
    send(res, 400, {
      ok: false,
      error: { code: "bad_request", message: typeof message === "string" ? message : "Invalid request body." },
    });
    return;
  }

  try {
    const { result, meta } = await runExtraction(transcript, readEnv());
    send(res, 200, { ok: true, data: result, meta });
  } catch (err) {
    if (err instanceof ExtractError) {
      send(res, statusForErrorCode(err.code), {
        ok: false,
        error: { code: err.code, message: err.message },
      });
      return;
    }
    send(res, 502, {
      ok: false,
      error: { code: "llm_error", message: "Unexpected server error while extracting. Try again." },
    });
  }
}

function send(res: VercelResponse, status: number, payload: ExtractResponse): void {
  res.status(status).json(payload);
}
