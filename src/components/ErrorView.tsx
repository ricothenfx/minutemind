import { motion } from "framer-motion";
import {
  AlertTriangle,
  FileStack,
  FileWarning,
  PlugZap,
  RefreshCw,
  SearchX,
  ServerCrash,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import type { ExtractErrorCode } from "../../shared/contract";
import type { ApiError } from "../lib/client-api";

const ERROR_APPEARANCE: Record<ExtractErrorCode, { icon: LucideIcon; title: string }> = {
  empty_input: { icon: FileWarning, title: "There's nothing to mine" },
  too_short: { icon: FileWarning, title: "That's a bit thin" },
  too_long: { icon: FileStack, title: "Transcript too long" },
  no_signal: { icon: SearchX, title: "No meeting signal found" },
  llm_unconfigured: { icon: PlugZap, title: "API key missing" },
  llm_error: { icon: ServerCrash, title: "The model stumbled" },
  network_error: { icon: WifiOff, title: "Can't reach the API" },
  bad_request: { icon: AlertTriangle, title: "Something's off with the input" },
};

interface ErrorViewProps {
  error: ApiError;
  onRetry: () => void;
  onEditTranscript: () => void;
}

export function ErrorView({ error, onRetry, onEditTranscript }: ErrorViewProps) {
  const appearance = ERROR_APPEARANCE[error.code];
  const Icon = appearance.icon;
  const showConfigHint = error.code === "llm_unconfigured";

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="glass p-8 text-center"
      >
        <span className="mx-auto grid size-12 place-items-center rounded-xl border border-red-400/20 bg-red-400/[0.08]">
          <Icon className="size-5.5 text-red-300" />
        </span>
        <h2 className="mt-5 text-lg font-semibold tracking-tight text-zinc-100">
          {appearance.title}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-400">{error.message}</p>

        {showConfigHint && (
          <div className="mx-auto mt-5 max-w-md rounded-xl border border-white/[0.07] bg-ink-900/70 p-4 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Server environment
            </p>
            <pre className="mt-2 overflow-x-auto font-mono text-[12px] leading-relaxed text-zinc-400">
{`LLM_API_BASE_URL=https://api.openai.com/v1
LLM_API_KEY=sk-…
LLM_MODEL=gpt-4o-mini

# or, for an instant offline demo:
MOCK_MODE=true`}
            </pre>
          </div>
        )}

        <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <button
            type="button"
            onClick={onRetry}
            className="cta inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
          >
            <RefreshCw className="size-4" />
            Try again
          </button>
          <button
            type="button"
            onClick={onEditTranscript}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] active:scale-[0.98]"
          >
            Edit transcript
          </button>
        </div>
      </motion.div>
    </div>
  );
}
