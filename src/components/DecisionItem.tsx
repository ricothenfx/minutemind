import { motion } from "framer-motion";
import type { Decision } from "../../shared/schema";
import { OwnerBadge } from "./Badges";
import { QuoteExpander } from "./QuoteExpander";
import { itemVariants } from "./motion";

export function DecisionItem({ decision }: { decision: Decision }) {
  return (
    <motion.li
      variants={itemVariants}
      className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-colors duration-200 hover:border-white/[0.12]"
    >
      <p className="text-[15px] font-medium leading-snug text-zinc-100">{decision.decision}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {decision.owner !== null && <OwnerBadge owner={decision.owner} />}
      </div>
      <div className="mt-1.5">
        <QuoteExpander quote={decision.quote} />
      </div>
    </motion.li>
  );
}
