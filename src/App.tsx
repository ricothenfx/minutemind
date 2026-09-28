import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ExtractMeta } from "../shared/contract";
import type { ExtractionResult } from "../shared/schema";
import { ApiError, requestExtraction } from "./lib/client-api";
import { Header } from "./components/Header";
import { Backdrop } from "./components/Backdrop";
import { InputView } from "./components/InputView";
import { LoadingView } from "./components/LoadingView";
import { ResultsView } from "./components/ResultsView";
import { ErrorView } from "./components/ErrorView";
import { viewMotion } from "./components/motion";

type Phase =
  | { kind: "input" }
  | { kind: "loading" }
  | { kind: "results"; data: ExtractionResult; meta: ExtractMeta }
  | { kind: "error"; error: ApiError };

export default function App() {
  const [transcript, setTranscript] = useState("");
  const [phase, setPhase] = useState<Phase>({ kind: "input" });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase.kind]);

  const runExtraction = useCallback(async (text: string) => {
    setTranscript(text);
    setPhase({ kind: "loading" });
    try {
      const response = await requestExtraction(text);
      setPhase({ kind: "results", data: response.data, meta: response.meta });
    } catch (err) {
      setPhase({
        kind: "error",
        error:
          err instanceof ApiError
            ? err
            : new ApiError("llm_error", "Something went wrong. Try again."),
      });
    }
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setPhase({ kind: "input" });
  }, []);

  return (
    <div className="relative min-h-screen">
      <Backdrop />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            {phase.kind === "input" && (
              <motion.div key="input" {...viewMotion}>
                <InputView
                  transcript={transcript}
                  onTranscriptChange={setTranscript}
                  onSubmit={(text) => void runExtraction(text)}
                />
              </motion.div>
            )}
            {phase.kind === "loading" && (
              <motion.div key="loading" {...viewMotion}>
                <LoadingView transcript={transcript} />
              </motion.div>
            )}
            {phase.kind === "results" && (
              <motion.div key="results" {...viewMotion}>
                <ResultsView
                  data={phase.data}
                  meta={phase.meta}
                  transcript={transcript}
                  onReset={reset}
                />
              </motion.div>
            )}
            {phase.kind === "error" && (
              <motion.div key="error" {...viewMotion}>
                <ErrorView
                  error={phase.error}
                  onRetry={() => void runExtraction(transcript)}
                  onEditTranscript={() => setPhase({ kind: "input" })}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <footer className="pb-8 pt-4 text-center">
          <p className="text-[11px] text-zinc-700">
            MinuteMind · stateless by design — your transcript is never stored
          </p>
        </footer>
      </div>
    </div>
  );
}
