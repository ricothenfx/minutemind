import { useEffect, useState } from "react";
import { Moon, ShieldCheck, Sun, Timer } from "lucide-react";

type Theme = "light" | "dark";

const THEME_KEY = "minutemind-theme";

function readTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function applyTheme(theme: Theme, persist: boolean) {
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  root.style.colorScheme = theme;
  root.style.background = theme === "light" ? "#f5f5fa" : "";
  if (persist) localStorage.setItem(THEME_KEY, theme);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "light" ? "#f5f5fa" : "#050507");
}

export function Header() {
  const [theme, setTheme] = useState<Theme>(readTheme);

  useEffect(() => {
    applyTheme(theme, false);
  }, [theme]);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next, true);
    setTheme(next);
  };

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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-400">
            <ShieldCheck className="size-3.5 text-accent-300" />
            <span className="hidden sm:inline">AI extracts. You verify.</span>
            <span className="sm:hidden">Grounded AI</span>
          </div>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            aria-pressed={theme === "light"}
            title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            className="grid size-8 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-zinc-200 active:scale-95"
          >
            {theme === "light" ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
