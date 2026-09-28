import { motion } from "framer-motion";
import { AlignLeft } from "lucide-react";
import type { ExtractionResult } from "../../shared/schema";
import { SectionCard } from "./SectionCard";
import { itemVariants } from "./motion";

export function SummarySection({ items }: { items: ExtractionResult["summary"] }) {
  if (items.length === 0) return null;
  return (
    <SectionCard icon={AlignLeft} title="Summary" subtitle="the meeting in three breaths">
      <ul className="space-y-3">
        {items.map((bullet, i) => (
          <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
            <span className="mt-[9px] grid size-1.5 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-300 to-accent-500 shadow-[0_0_8px_rgba(122,119,242,0.9)]" />
            <p className="text-[15px] leading-relaxed text-zinc-200">{bullet}</p>
          </motion.li>
        ))}
      </ul>
    </SectionCard>
  );
}
