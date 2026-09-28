import { ShieldCheck, Timer } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/70 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-300 shadow-[0_0_18px_-2px_rgba(122,119,242,0.8)]">
            <Timer className="size-4.5 text-white" strokeWidth={2.2} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            Minute<span className="text-accent-300">Mind</span>
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-400">
          <ShieldCheck className="size-3.5 text-accent-300" />
          <span className="hidden sm:inline">AI extracts. You verify.</span>
          <span className="sm:hidden">Grounded AI</span>
        </div>
      </div>
    </header>
  );
}
