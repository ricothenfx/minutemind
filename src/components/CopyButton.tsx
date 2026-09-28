import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { copyToClipboard } from "../lib/client-api";

interface CopyButtonProps {
  text: string;
  label: string;
  className?: string;
}

/** Copy-to-clipboard button that confirms with a checkmark. */
export function CopyButton({ text, label, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (!ok) return;
    setCopied(true);
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  const base =
    "inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] active:scale-[0.97]";
  const active = copied ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "";

  return (
    <button type="button" onClick={() => void handleCopy()} className={`${base} ${active} ${className}`}>
      {copied ? (
        <Check className="size-3.5 text-emerald-400" />
      ) : (
        <Copy className="size-3.5 text-zinc-500" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}
