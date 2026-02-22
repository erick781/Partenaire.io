export const EXPENSE_CATEGORIES = [
  { id: "housing", label: "Housing", emoji: "\u{1F3E0}" },
  { id: "transport", label: "Transport", emoji: "\u{1F697}" },
  { id: "food", label: "Food", emoji: "\u{1F354}" },
  { id: "business", label: "Business", emoji: "\u{1F4BC}" },
  { id: "entertainment", label: "Entertainment", emoji: "\u{1F3AE}" },
  { id: "utilities", label: "Utilities", emoji: "\u26A1" },
  { id: "debt_payment", label: "Debt Payment", emoji: "\u{1F4B3}" },
  { id: "other", label: "Other", emoji: "\u{1F4E6}" },
] as const;

export const ACCOUNT_TYPES = [
  "chequing",
  "savings",
  "credit_card",
  "loan",
  "line_of_credit",
] as const;

export const RECURRING_FREQUENCIES = [
  "weekly",
  "biweekly",
  "monthly",
  "quarterly",
  "yearly",
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]["id"];
export type AccountType = (typeof ACCOUNT_TYPES)[number];
export type RecurringFrequency = (typeof RECURRING_FREQUENCIES)[number];
