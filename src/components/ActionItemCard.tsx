import { motion } from "framer-motion";
import type { ActionItem } from "../../shared/schema";
import { DueBadge, OwnerBadge, PriorityBadge } from "./Badges";
import { QuoteExpander } from "./QuoteExpander";
import { itemVariants } from "./motion";

export function ActionItemCard({ item }: { item: ActionItem }) {
  return (
    <motion.li
      variants={itemVariants}
      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-colors duration-200 hover:border-white/[0.12]"
    >
      <p className="text-[15px] font-medium leading-snug text-zinc-100">{item.task}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <OwnerBadge owner={item.owner} />
        <DueBadge due={item.due} />
        <PriorityBadge priority={item.priority} />
      </div>
      <div className="mt-1.5">
        <QuoteExpander quote={item.quote} />
      </div>
    </motion.li>
  );
}
