"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/ai-cfo": "Dashboard",
  "/ai-cfo/chat": "AI Chat",
  "/ai-cfo/calendar": "Cash Calendar",
  "/ai-cfo/log": "Log Entry",
  "/ai-cfo/goals": "Goal Tracker",
  "/ai-cfo/governor": "Spending Governor",
};

export default function CFOHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "AI CFO";

  return (
    <header className="sticky top-0 z-40 bg-cfo-base/95 backdrop-blur-xl border-b border-cfo-border">
      <div className="max-w-[430px] mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cfo-green/20 flex items-center justify-center">
            <span className="text-cfo-green font-bold text-xs">AI</span>
          </div>
          <span className="text-sm font-semibold text-cfo-text font-cfo">
            AI CFO
          </span>
          <span className="text-cfo-muted text-sm font-cfo">/</span>
          <span className="text-sm text-cfo-muted font-cfo">{title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-cfo-green animate-pulse-dot" />
          <span className="text-[10px] font-semibold text-cfo-green uppercase tracking-wider font-cfo">
            LIVE
          </span>
        </div>
      </div>
    </header>
  );
}
