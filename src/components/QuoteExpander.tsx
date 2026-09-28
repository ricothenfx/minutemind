import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Quote } from "lucide-react";

interface QuoteExpanderProps {
  quote: string;
}

/**
 * Collapsible verbatim quote — the grounding behind every extracted item.
 * Defaults to open on desktop (grounding is the product) and collapsed on mobile.
 */
export function QuoteExpander({ quote }: QuoteExpanderProps) {
  const [open, setOpen] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches,
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="group -ml-1.5 inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
      >
        <Quote className="size-3" />
        {open ? "Hide quote" : "Show quote"}
        <ChevronDown
          className={`size-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <blockquote className="mt-1.5 rounded-r-lg border-l-2 border-accent-500/40 bg-accent-500/[0.05] px-3 py-2 text-[13px] italic leading-relaxed text-zinc-400">
              “{quote}”
              <span className="mt-1 block text-[10px] font-medium not-italic uppercase tracking-wider text-zinc-600">
                from the transcript
              </span>
            </blockquote>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
