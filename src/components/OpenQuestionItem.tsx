import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import type { OpenQuestion } from "../../shared/schema";
import { QuoteExpander } from "./QuoteExpander";
import { itemVariants } from "./motion";

/** Quieter list treatment for unresolved threads. */
export function OpenQuestionItem({ question }: { question: OpenQuestion }) {
  return (
    <motion.li
      variants={itemVariants}
      className="border-b border-white/[0.04] py-3.5 first:pt-0 last:border-0 last:pb-0"
    >
      <div className="flex items-start gap-3">
        <CircleHelp className="mt-0.5 size-4 shrink-0 text-zinc-600" />
        <div className="min-w-0 flex-1">
          <p className="text-[14px] leading-snug text-zinc-300">{question.question}</p>
          <div className="mt-1">
            <QuoteExpander quote={question.quote} />
          </div>
        </div>
      </div>
    </motion.li>
  );
}
