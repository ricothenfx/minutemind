import { useMemo } from "react";
import { motion } from "framer-motion";
import { ClipboardPaste, Sparkles, TriangleAlert } from "lucide-react";
import { LIMITS, countWords } from "../../shared/contract";
import { SAMPLE_TRANSCRIPT } from "../fixtures/sample-transcript";

interface InputViewProps {
  transcript: string;
  onTranscriptChange: (text: string) => void;
  onSubmit: (text: string) => void;
}

export function InputView({ transcript, onTranscriptChange, onSubmit }: InputViewProps) {
  const words = useMemo(() => countWords(transcript), [transcript]);
  const tooShort = transcript.trim().length > 0 && (words < LIMITS.minWords || transcript.length < LIMITS.minChars);
  const tooLong = transcript.length > LIMITS.maxChars;
  const canSubmit = words >= LIMITS.minWords && transcript.length >= LIMITS.minChars && !tooLong;

  const hint = (() => {
    if (tooLong) {
      return `That's over the ${LIMITS.maxChars.toLocaleString("en-US")} character limit. Split the meeting into parts and run them one by one.`;
    }
    if (tooShort) {
      return "Add a little more — about 25 words minimum before there's anything to mine.";
    }
    return "Nothing is stored. The text goes to the model, structure comes back.";
  })();

  const hintTone = tooLong || tooShort ? "text-amber-300/90" : "text-zinc-500";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20">
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-xs font-semibold uppercase tracking-[0.22em] text-accent-300"
        >
          AI meeting intelligence
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.06 }}
          className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-50 sm:text-[3.4rem]"
        >
          Meetings end.
          <br />
          <span className="bg-gradient-to-r from-accent-300 via-accent-400 to-accent-300 bg-clip-text text-transparent">
            Decisions vanish.
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
          className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-base"
        >
          Paste a raw transcript — filler words, crosstalk and all. MinuteMind returns the decisions,
          action items and a ready-to-send follow-up email. Every single point carries the exact
          quote it came from, so you can check the AI's homework.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
        className="glass mt-10 p-2"
      >
        <div className="relative">
          <textarea
            value={transcript}
            onChange={(e) => onTranscriptChange(e.target.value)}
            spellCheck={false}
            placeholder={"Paste the raw transcript here — uh, crosstalk, tangents and all.\nThe messier, the better."}
            className="h-72 w-full resize-y rounded-2xl bg-transparent px-5 py-4 font-mono text-[13px] leading-relaxed text-zinc-200 outline-none placeholder:text-zinc-600 sm:h-80 sm:text-sm"
            aria-label="Meeting transcript"
          />
          <div className="pointer-events-none absolute bottom-3 right-4 flex items-center gap-2 text-[11px] tabular-nums">
            <span className={words > 0 ? "text-zinc-500" : "text-zinc-600"}>{words.toLocaleString("en-US")} words</span>
            <span className="text-zinc-700">·</span>
            <span className={tooLong ? "font-medium text-red-400" : "text-zinc-600"}>
              {transcript.length.toLocaleString("en-US")} / {LIMITS.maxChars.toLocaleString("en-US")} chars
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.26 }}
        className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
      >
        <div className="order-2 flex w-full items-center gap-1.5 text-xs sm:order-1 sm:w-auto sm:max-w-xs">
          {(tooShort || tooLong) && <TriangleAlert className="size-3.5 shrink-0 text-amber-300/80" />}
          <p className={hintTone}>{hint}</p>
        </div>
        <div className="order-1 flex w-full flex-col gap-2.5 sm:order-2 sm:w-auto sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => onTranscriptChange(SAMPLE_TRANSCRIPT)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] active:scale-[0.98]"
          >
            <ClipboardPaste className="size-4 text-zinc-500" />
            Load sample transcript
          </button>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => canSubmit && onSubmit(transcript)}
            className="cta inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            <Sparkles className="size-4" />
            Extract decisions &amp; action items
          </button>
        </div>
      </motion.div>
    </div>
  );
}
