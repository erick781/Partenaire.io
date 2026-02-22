"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/ai-cfo", icon: "chart", label: "Home" },
  { href: "/ai-cfo/chat", icon: "ai", label: "AI" },
  { href: "/ai-cfo/calendar", icon: "calendar", label: "Calendar" },
  { href: "/ai-cfo/log", icon: "log", label: "Log" },
  { href: "/ai-cfo/goals", icon: "goals", label: "Goals" },
  { href: "/ai-cfo/governor", icon: "governor", label: "Governor" },
] as const;

function TabIcon({ icon, active }: { icon: string; active: boolean }) {
  const color = active ? "#00D47E" : "#6B6B80";

  switch (icon) {
    case "chart":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 20V10" />
          <path d="M12 20V4" />
          <path d="M6 20v-6" />
        </svg>
      );
    case "ai":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M8 12h8" />
          <path d="M12 16v-4" />
        </svg>
      );
    case "calendar":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
        </svg>
      );
    case "log":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case "goals":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "governor":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/ai-cfo") return pathname === "/ai-cfo";
    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-cfo-card/95 backdrop-blur-xl border-t border-cfo-border">
      <div className="max-w-[430px] mx-auto flex items-center justify-around py-2 px-1">
        {tabs.map((tab) => {
          const active = isActive(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors min-w-[48px] ${
                active ? "" : "opacity-70 hover:opacity-100"
              }`}
            >
              <TabIcon icon={tab.icon} active={active} />
              <span
                className={`text-[10px] font-medium ${
                  active ? "text-cfo-green" : "text-cfo-muted"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
