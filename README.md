# MinuteMind — AI Meeting Intelligence

MinuteMind turns messy meeting transcripts into clear, actionable output: a three-bullet summary, the decisions made, the action items with owners and deadlines, the open questions, and a ready-to-send follow-up email. The differentiator is **grounded output** — every extracted item carries the exact verbatim quote from the transcript it came from, so you can verify the AI didn't hallucinate. **AI extracts. You verify.**

One page. Stateless. No auth, no database, no integrations — paste a transcript, get structure.

## Features

- **Grounded extraction** — decisions, action items and open questions each include a "quote" pulled verbatim from your transcript, collapsible right under the item.
- **Action items done right** — owner, due date and priority per item; unknown owners render as an amber *Unassigned* badge, missing deadlines as a gray *No deadline* badge. The prompt is explicitly biased toward "unassigned / no deadline" over guessing.
- **Follow-up email** — realistic email preview with subject line, copy buttons per field.
- **Long transcripts** — inputs beyond ~12k tokens are split at line boundaries, extracted in parallel, then merged (deduplicated) — never silently truncated. The UI stays responsive; a 10k-word paste is fine.
- **Defensive LLM layer** — strict JSON schema validated with Zod, markdown-fence/trailing-comma tolerant parsing, 3 attempts per call, deterministic local merge fallback, and honest designed error states (too short, garbage input, API failure).
- **MOCK_MODE** — run the whole product with zero API keys using a pre-baked extraction of the sample transcript.
- **Copy all as Markdown / Download .md / New meeting** — results are portable.

## Run locally

Requires Node 20+.

```bash
npm install

# Option A — instant demo, no API key needed:
cp .env.example .env   # set MOCK_MODE=true inside
npm run dev

# Option B — real extraction:
cp .env.example .env   # set LLM_API_BASE_URL, LLM_API_KEY, LLM_MODEL
npm run dev
```

Open http://localhost:5173, click **Load sample transcript**, then **Extract decisions & action items**.

`MOCK_MODE=true` returns a pre-baked result (based on the bundled sample transcript) regardless of which text you paste — perfect for demos and UI work.

> The dev server serves the API through a Vite middleware that runs the exact same pipeline as the production serverless function — no Vercel CLI needed.

Scripts: `npm run dev` · `npm run build` (typecheck + build) · `npm run typecheck` · `npm run preview`

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `LLM_API_BASE_URL` | unless `MOCK_MODE=true` | Base URL of an OpenAI-compatible API, e.g. `https://api.openai.com/v1` |
| `LLM_API_KEY` | unless `MOCK_MODE=true` | API key — server-side only, never exposed to the browser |
| `LLM_MODEL` | unless `MOCK_MODE=true` | Model name, e.g. `gpt-4o-mini` |
| `MOCK_MODE` | no | `true` → skip the LLM entirely and return the pre-baked demo extraction |

All variables are read by the serverless function only. Nothing is prefixed with `VITE_`, so nothing leaks to the client bundle.

## Deploy to Vercel

1. Push this repo to GitHub/GitLab.
2. In Vercel: **Add New → Project** and import the repo. Vercel auto-detects Vite; no build settings needed (`api/extract.ts` deploys as a serverless function automatically).
3. Under **Settings → Environment Variables**, add for *Production*, *Preview* and *Development*:
   - `LLM_API_BASE_URL`
   - `LLM_API_KEY`
   - `LLM_MODEL`
   - `MOCK_MODE=false` (or omit it; set `true` only for a keyless preview deployment)
4. Deploy. The app calls `/api/extract` on the same origin, so no CORS configuration is needed.

Notes:
- `api/extract.ts` sets `maxDuration = 60` for long transcripts. On plans that don't allow it, remove that line — extraction still works, with a tighter ceiling on very long inputs.
- Works with any OpenAI-compatible provider; you only change the three LLM env vars.

## Project structure

```
api/
  extract.ts          # Vercel serverless function (thin handler)
  _lib/
    extract-core.ts   # pipeline: validation → chunking → parallel extract → merge → normalize
    llm.ts            # OpenAI-compatible chat-completions client, tolerant JSON parsing
    prompts.ts        # system/user prompts + transcript chunker
    env.ts            # server env parsing
    mock-result.ts    # pre-baked MOCK_MODE extraction (quotes the sample fixture verbatim)
shared/               # contract between client and server
  schema.ts           # Zod schema = the single source of truth for the output JSON
  contract.ts         # request/response envelope, limits, error codes
  markdown.ts         # results → Markdown (copy/download)
src/
  components/         # UI only — no LLM logic
  lib/client-api.ts   # typed fetch wrapper + clipboard/download helpers
  fixtures/           # the sample transcript
```

## Output schema

```json
{
  "summary": ["string"],
  "decisions": [{ "decision": "string", "owner": "string | null", "quote": "string" }],
  "action_items": [{ "task": "string", "owner": "string | null", "due": "string | null", "priority": "high | medium | low | null", "quote": "string" }],
  "open_questions": [{ "question": "string", "quote": "string" }],
  "follow_up_email": { "subject": "string", "body": "string" }
}
```

`null` owner → amber **Unassigned** badge · `null` due → gray **No deadline** badge.
