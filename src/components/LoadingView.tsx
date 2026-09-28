import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { countWords } from "../../shared/contract";

const STATUS_MESSAGES = [
  "Reading the room…",
  "Separating signal from small talk…",
  "Finding owners…",
  "Chasing deadlines…",
  "Weighing priorities…",
  "Collecting exact quotes…",
  "Drafting your follow-up…",
  "Grounding every claim…",
];

const MESSAGE_INTERVAL_MS = 2300;

export function LoadingView({ transcript }: { transcript: string }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStep((s) => (s + 1) % STATUS_MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  const words = countWords(transcript);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 pb-24 pt-24 sm:px-6 sm:pt-28">
      <div className="relative grid size-24 place-items-center">
        <span className="orb-ring absolute inset-0 rounded-full border border-accent-500/50" />
        <span
          className="orb-ring absolute inset-0 rounded-full border border-accent-400/40"
          style={{ animationDelay: "0.7s" }}
        />
        <span
          className="orb-ring absolute inset-0 rounded-full border border-accent-300/30"
          style={{ animationDelay: "1.4s" }}
        />
        <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-accent-300 shadow-[0_0_36px_-4px_rgba(122,119,242,0.9)]" />
      </div>

      <div className="mt-8 h-7 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-[15px] font-medium text-zinc-300"
          >
            {STATUS_MESSAGES[step]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-6 h-1 w-64 overflow-hidden rounded-full bg-white/[0.06]">
        <div className="shimmer h-full w-full rounded-full bg-white/[0.06]" />
      </div>

      {words > 0 && (
        <p className="mt-4 text-xs tabular-nums text-zinc-600">
          Mining {words.toLocaleString("en-US")} words · longer transcripts take a little longer
        </p>
      )}
    </div>
  );
}
