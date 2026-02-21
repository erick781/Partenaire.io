"use client";

import { useState } from "react";

const categories = [
  { id: "housing", label: "Housing", emoji: "\u{1F3E0}" },
  { id: "transport", label: "Transport", emoji: "\u{1F697}" },
  { id: "food", label: "Food", emoji: "\u{1F354}" },
  { id: "business", label: "Business", emoji: "\u{1F4BC}" },
  { id: "entertainment", label: "Entertainment", emoji: "\u{1F3AE}" },
  { id: "utilities", label: "Utilities", emoji: "\u26A1" },
  { id: "debt_payment", label: "Debt Payment", emoji: "\u{1F4B3}" },
  { id: "other", label: "Other", emoji: "\u{1F4E6}" },
];

export default function LogPage() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "income">("expense");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [note, setNote] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Transaction logging will be implemented in Phase 2
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Amount Input */}
      <div className="flex flex-col items-center py-6">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl text-cfo-dim font-light">$</span>
          <input
            type="number"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="bg-transparent text-5xl font-bold text-cfo-text text-center w-[200px] focus:outline-none placeholder-cfo-dim/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            step="0.01"
            min="0"
            required
          />
        </div>
      </div>

      {/* Type Toggle */}
      <div className="flex rounded-cfo-inner overflow-hidden border border-cfo-border">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            type === "expense"
              ? "bg-cfo-red/15 text-cfo-red"
              : "bg-cfo-card text-cfo-muted hover:text-cfo-text"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${
            type === "income"
              ? "bg-cfo-green/15 text-cfo-green"
              : "bg-cfo-card text-cfo-muted hover:text-cfo-text"
          }`}
        >
          Income
        </button>
      </div>

      {/* Category Grid */}
      <div>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-3">
          Category
        </p>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-cfo-inner border transition-colors ${
                selectedCategory === cat.id
                  ? "bg-cfo-green/10 border-cfo-green/30 text-cfo-green"
                  : "bg-cfo-card border-cfo-border text-cfo-muted hover:border-cfo-border-light"
              }`}
            >
              <span className="text-xl">{cat.emoji}</span>
              <span className="text-[10px] font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Note */}
      <div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add a note (optional)"
          className="w-full bg-cfo-card border border-cfo-border rounded-cfo-inner px-4 py-3 text-sm text-cfo-text placeholder-cfo-dim focus:outline-none focus:border-cfo-green/50 transition-colors"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full font-semibold py-4 rounded-cfo-inner transition-colors text-sm ${
          type === "expense"
            ? "bg-cfo-red text-white hover:bg-cfo-red/90"
            : "bg-cfo-green text-cfo-base hover:bg-cfo-green/90"
        }`}
      >
        {type === "expense" ? "Log Expense" : "Log Income"}
      </button>
    </form>
  );
}
