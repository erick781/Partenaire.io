import Card from "@/components/shared/Card";

export default function CalendarPage() {
  const today = new Date();
  const monthName = today.toLocaleString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="space-y-4">
      {/* Month Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-cfo-text">{monthName}</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cfo-green" />
            <span className="text-[10px] text-cfo-muted">Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cfo-red" />
            <span className="text-[10px] text-cfo-muted">Bills</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-cfo-yellow" />
            <span className="text-[10px] text-cfo-muted">Debt</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid Placeholder */}
      <Card>
        <div className="grid grid-cols-7 gap-0.5 mb-2">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="text-center text-[10px] text-cfo-dim font-medium py-1">
              {day}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-cfo-dim text-center">
            Add recurring items to see your cash flow calendar.
          </p>
        </div>
      </Card>

      {/* 14-Day Cash Flow Summary */}
      <Card>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-3">
          14-Day Cash Flow
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-[10px] text-cfo-muted mb-1">Coming In</p>
            <p className="text-lg font-bold text-cfo-green">$0</p>
          </div>
          <div>
            <p className="text-[10px] text-cfo-muted mb-1">Going Out</p>
            <p className="text-lg font-bold text-cfo-red">$0</p>
          </div>
          <div>
            <p className="text-[10px] text-cfo-muted mb-1">Net</p>
            <p className="text-lg font-bold text-cfo-text">$0</p>
          </div>
        </div>
      </Card>

      {/* AI Insight */}
      <Card variant="green">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-cfo-green animate-pulse-dot" />
          <span className="text-[10px] font-semibold text-cfo-green uppercase tracking-wider">
            AI Calendar Insight
          </span>
        </div>
        <p className="text-sm text-cfo-text leading-relaxed">
          Add your bills and income to get AI-powered cash flow analysis.
        </p>
      </Card>
    </div>
  );
}
