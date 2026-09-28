import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ServerResponse } from "node:http";
import { defineConfig, type Connect, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { parseRequestBody, EXTRACT_ENDPOINT, LIMITS, statusForErrorCode, type ExtractResponse } from "./shared/contract";
import { ExtractError, runExtraction } from "./api/_lib/extract-core";
import { readEnv } from "./api/_lib/env";

/**
 * Dev-only middleware that exposes the exact same extraction pipeline as
 * api/extract.ts at /api/extract, so `npm run dev` works without the Vercel CLI.
 * In production Vercel serves the real serverless function at the same path.
 */
function minuteMindApiPlugin(): Plugin {
  return {
    name: "minutemind-api",
    configureServer(server) {
      server.middlewares.use(EXTRACT_ENDPOINT, (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end("POST only");
          return;
        }
        void readBody(req)
          .then((raw) => {
            let body: unknown;
            try {
              body = JSON.parse(raw);
            } catch {
              throw new ExtractError("bad_request", "Request body is not valid JSON.");
            }
            try {
              return parseRequestBody(body);
            } catch (message) {
              throw new ExtractError(
                "bad_request",
                typeof message === "string" ? message : "Invalid request body.",
              );
            }
          })
          .then((transcript) => runExtraction(transcript, readEnv()))
          .then((outcome) => {
            sendJson(res, 200, { ok: true, data: outcome.result, meta: outcome.meta });
          })
          .catch((err: unknown) => {
            if (err instanceof ExtractError) {
              sendJson(res, statusForErrorCode(err.code), {
                ok: false,
                error: { code: err.code, message: err.message },
              });
              return;
            }
            sendJson(res, 502, {
              ok: false,
              error: { code: "llm_error", message: "Unexpected server error while extracting." },
            });
          });
      });
    },
  };
}

const MAX_BODY_BYTES = LIMITS.maxChars * 4 + 4096;

function readBody(req: Connect.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new ExtractError("too_long", "Request body too large."));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function sendJson(res: ServerResponse, status: number, payload: ExtractResponse): void {
  const body = JSON.stringify(payload);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Content-Length", Buffer.byteLength(body));
  res.end(body);
}

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss(), minuteMindApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(here, "src"),
    },
  },
});
