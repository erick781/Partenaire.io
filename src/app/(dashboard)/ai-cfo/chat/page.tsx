"use client";

import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {/* AI Welcome Message */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-lg bg-cfo-green/20 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-cfo-green font-bold text-xs">AI</span>
          </div>
          <div className="cfo-card p-4 max-w-[85%]">
            <p className="text-sm text-cfo-text leading-relaxed">
              I&apos;m your AI CFO. Ask me anything about your finances — &quot;Can I
              afford this?&quot;, &quot;When should I pay this bill?&quot;, or &quot;How do I hit my
              credit score goal faster?&quot;
            </p>
            <p className="text-xs text-cfo-dim mt-2">
              Connect your accounts first to get personalized answers.
            </p>
          </div>
        </div>
      </div>

      {/* Input Bar */}
      <div className="border-t border-cfo-border pt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // AI chat will be implemented in Phase 3
            setMessage("");
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your AI CFO anything..."
            className="flex-1 bg-cfo-card border border-cfo-border rounded-full px-4 py-3 text-sm text-cfo-text placeholder-cfo-dim focus:outline-none focus:border-cfo-green/50 transition-colors"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-cfo-green flex items-center justify-center flex-shrink-0 hover:bg-cfo-green/90 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
