"use client";

import { useState } from "react";
import Card from "@/components/shared/Card";

export default function GovernorPage() {
  const [lockInMode, setLockInMode] = useState(false);

  return (
    <div className="space-y-4">
      {/* Weekly Budget Ring */}
      <Card>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-4 text-center">
          Weekly Budget
        </p>
        <div className="flex justify-center mb-4">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              {/* Track */}
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="#1E1E2A"
                strokeWidth="10"
              />
              {/* Progress — empty state */}
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="#2A2A3A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 68}`}
                strokeDashoffset={`${2 * Math.PI * 68}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-cfo-text">$0</span>
              <span className="text-[10px] text-cfo-dim">of $0 left</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-cfo-text">$0</p>
            <p className="text-[10px] text-cfo-muted">Spent</p>
          </div>
          <div>
            <p className="text-lg font-bold text-cfo-text">7</p>
            <p className="text-[10px] text-cfo-muted">Days Left</p>
          </div>
          <div>
            <p className="text-lg font-bold text-cfo-text">$0</p>
            <p className="text-[10px] text-cfo-muted">$/Day</p>
          </div>
        </div>
      </Card>

      {/* No-Spend Streak */}
      <Card variant="purple">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold text-cfo-purple uppercase tracking-wider mb-1">
              No-Spend Streak
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-cfo-text">0</span>
              <span className="text-sm text-cfo-dim">days</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-cfo-muted mb-1">Best</p>
            <p className="text-lg font-bold text-cfo-dim">0</p>
          </div>
        </div>
      </Card>

      {/* Today&apos;s Transactions */}
      <Card>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-3">
          Today&apos;s Transactions
        </p>
        <div className="flex items-center justify-center py-6">
          <p className="text-sm text-cfo-dim">
            No transactions logged today.
          </p>
        </div>
      </Card>

      {/* Lock-In Mode */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            <p className="text-sm font-semibold text-cfo-text mb-1">
              Lock-In Mode
            </p>
            <p className="text-xs text-cfo-dim leading-relaxed">
              Activate a spending freeze. The AI will flag every non-essential
              transaction.
            </p>
          </div>
          <button
            onClick={() => setLockInMode(!lockInMode)}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              lockInMode ? "bg-cfo-green" : "bg-cfo-border"
            }`}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${
                lockInMode ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </Card>
    </div>
  );
}
