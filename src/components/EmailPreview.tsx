import { Mail } from "lucide-react";
import type { FollowUpEmail } from "../../shared/schema";
import { SectionCard } from "./SectionCard";
import { CopyButton } from "./CopyButton";

/** Realistic email-client preview with per-field copy actions. */
export function EmailPreview({ email }: { email: FollowUpEmail }) {
  return (
    <SectionCard
      icon={Mail}
      title="Follow-up email"
      subtitle="ready to send — tweak freely"
    >
      <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-ink-900/70">
        <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.015] px-4 py-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-accent-300 text-[11px] font-bold text-white">
            MM
          </span>
          <div className="min-w-0 flex-1 text-[13px] leading-snug">
            <p className="truncate text-zinc-300">
              <span className="text-zinc-600">From&nbsp;&nbsp;</span> You
            </p>
            <p className="truncate text-zinc-300">
              <span className="text-zinc-600">To&nbsp;&nbsp;</span> The team
            </p>
          </div>
          <CopyButton text={fullEmailText(email)} label="Copy email" className="shrink-0" />
        </div>

        <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-600">Subject</p>
            <p className="mt-0.5 break-words text-[15px] font-semibold text-zinc-100">
              {email.subject}
            </p>
          </div>
          <CopyButton text={email.subject} label="Copy" className="shrink-0" />
        </div>

        <div className="whitespace-pre-wrap px-4 py-4 text-[14px] leading-relaxed text-zinc-300">
          {email.body}
        </div>
      </div>
    </SectionCard>
  );
}

function fullEmailText(email: FollowUpEmail): string {
  return `Subject: ${email.subject}\n\n${email.body}`;
}
