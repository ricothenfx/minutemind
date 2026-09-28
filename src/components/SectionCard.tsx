import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { listVariants } from "./motion";
import { CountPill } from "./Badges";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  count?: number;
  subtitle?: string;
  children: ReactNode;
}

/** Glassy section card with an icon chip, title and optional count pill. */
export function SectionCard({ icon: Icon, title, count, subtitle, children }: SectionCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass glass-hover p-5 sm:p-6"
    >
      <header className="flex items-center gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-accent-400/20 bg-accent-500/[0.12]">
          <Icon className="size-4 text-accent-300" />
        </span>
        <h2 className="text-[15px] font-semibold tracking-tight text-zinc-100">{title}</h2>
        {count !== undefined && <CountPill n={count} />}
        {subtitle && <span className="ml-auto hidden text-xs text-zinc-600 sm:block">{subtitle}</span>}
      </header>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="show"
        className="mt-4"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}
