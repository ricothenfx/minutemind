import { CalendarDays, UserRound } from "lucide-react";
import type { Priority } from "../../shared/schema";

/** Neutral chip when an owner exists; amber dashed chip when unassigned. */
export function OwnerBadge({ owner }: { owner: string | null }) {
  if (owner === null) {
    return (
      <span className="inline-flex items-center rounded-full border border-dashed border-amber-400/40 bg-amber-400/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-amber-300">
        Unassigned
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
      <UserRound className="size-3 text-zinc-500" />
      {owner}
    </span>
  );
}

/** Chip with the due date; quiet gray chip when there is no deadline. */
export function DueBadge({ due }: { due: string | null }) {
  if (due === null) {
    return (
      <span className="inline-flex items-center rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-0.5 text-[11px] font-medium text-zinc-500">
        No deadline
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">
      <CalendarDays className="size-3 text-zinc-500" />
      {due}
    </span>
  );
}

const PRIORITY_STYLES: Record<Exclude<Priority, null>, { dot: string; text: string }> = {
  high: { dot: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]", text: "text-red-300" },
  medium: { dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)]", text: "text-amber-300" },
  low: { dot: "bg-sky-400/80 shadow-[0_0_8px_rgba(56,189,248,0.5)]", text: "text-sky-300" },
};

/** Small glowing dot + label; renders nothing when priority is null. */
export function PriorityBadge({ priority }: { priority: Priority | null }) {
  if (priority === null) return null;
  const styles = PRIORITY_STYLES[priority];
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
      <span className={`size-1.5 rounded-full ${styles.dot}`} />
      <span className={styles.text}>{priority}</span>
    </span>
  );
}

export function CountPill({ n }: { n: number }) {
  return (
    <span className="rounded-full bg-accent-500/[0.14] px-2 py-0.5 text-[11px] font-semibold text-accent-300">
      {n}
    </span>
  );
}
