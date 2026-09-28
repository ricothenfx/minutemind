import { motion } from "framer-motion";
import {
  CircleHelp,
  CheckCircle2,
  Download,
  Gavel,
  ListChecks,
  RotateCcw,
} from "lucide-react";
import type { ExtractMeta } from "../../shared/contract";
import type { ExtractionResult } from "../../shared/schema";
import { resultToMarkdown, slugFilename } from "../../shared/markdown";
import { countWords } from "../../shared/contract";
import { downloadText } from "../lib/client-api";
import { SummarySection } from "./SummarySection";
import { SectionCard } from "./SectionCard";
import { DecisionItem } from "./DecisionItem";
import { ActionItemCard } from "./ActionItemCard";
import { OpenQuestionItem } from "./OpenQuestionItem";
import { EmailPreview } from "./EmailPreview";
import { CopyButton } from "./CopyButton";

interface ResultsViewProps {
  data: ExtractionResult;
  meta: ExtractMeta;
  transcript: string;
  onReset: () => void;
}

export function ResultsView({ data, meta, transcript, onReset }: ResultsViewProps) {
  const markdown = resultToMarkdown(data);
  const totalItems =
    data.decisions.length + data.action_items.length + data.open_questions.length;

  const handleDownload = () => {
    downloadText(slugFilename(), markdown);
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="sticky top-14 z-30 -mx-4 mb-7 border-b border-white/[0.06] bg-ink-950/75 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-2.5">
            <CheckCircle2 className="size-4.5 shrink-0 text-emerald-400" />
            <p className="text-sm font-semibold text-zinc-100">Extraction complete</p>
            <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] tabular-nums text-zinc-500 md:inline">
              {countWords(transcript).toLocaleString("en-US")} words in
            </span>
            <span className="hidden rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] tabular-nums text-zinc-500 md:inline">
              {totalItems} items
            </span>
            {meta.mock && (
              <span className="rounded-full border border-accent-400/25 bg-accent-500/[0.1] px-2 py-0.5 text-[11px] font-medium text-accent-300">
                demo data
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <CopyButton text={markdown} label="Copy all (Markdown)" />
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.97]"
            >
              <Download className="size-3.5 text-zinc-500" />
              <span className="hidden sm:inline">Download .md</span>
              <span className="sm:hidden">.md</span>
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.97]"
            >
              <RotateCcw className="size-3.5 text-zinc-500" />
              New meeting
            </button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-5">
        <SummarySection items={data.summary} />

        {data.decisions.length > 0 && (
          <SectionCard
            icon={Gavel}
            title="Decisions"
            count={data.decisions.length}
            subtitle="each with its receipt"
          >
            <ul className="space-y-2.5">
              {data.decisions.map((decision, i) => (
                <DecisionItem key={i} decision={decision} />
              ))}
            </ul>
          </SectionCard>
        )}

        {data.action_items.length > 0 && (
          <SectionCard
            icon={ListChecks}
            title="Action items"
            count={data.action_items.length}
            subtitle="owners, deadlines, receipts"
          >
            <ul className="space-y-2.5">
              {data.action_items.map((item, i) => (
                <ActionItemCard key={i} item={item} />
              ))}
            </ul>
          </SectionCard>
        )}

        {data.open_questions.length > 0 && (
          <SectionCard
            icon={CircleHelp}
            title="Open questions"
            count={data.open_questions.length}
            subtitle="unresolved threads"
          >
            <ul>
              {data.open_questions.map((question, i) => (
                <OpenQuestionItem key={i} question={question} />
              ))}
            </ul>
          </SectionCard>
        )}

        <EmailPreview email={data.follow_up_email} />
      </div>

      <p className="mt-8 text-center text-xs text-zinc-600">
        Every item above links back to the exact line it came from. AI extracts. You verify.
      </p>
    </div>
  );
}
