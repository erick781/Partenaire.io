import Card from "@/components/shared/Card";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* AI Morning Briefing */}
      <Card variant="green">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-cfo-green animate-pulse-dot" />
          <span className="text-[10px] font-semibold text-cfo-green uppercase tracking-wider">
            AI Briefing — Today
          </span>
        </div>
        <p className="text-sm text-cfo-text leading-relaxed">
          Connect your accounts to get your personalized morning briefing. Your
          AI CFO will analyze your finances and give you a daily action plan.
        </p>
      </Card>

      {/* Cash Position */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-1">
            Available Cash
          </p>
          <p className="text-2xl font-bold text-cfo-green">$0.00</p>
          <p className="text-xs text-cfo-dim mt-1">After bills: $0.00</p>
        </Card>
        <Card>
          <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-1">
            This Month&apos;s Burn
          </p>
          <p className="text-2xl font-bold text-cfo-text">$0.00</p>
          <p className="text-xs text-cfo-dim mt-1">No data yet</p>
        </Card>
      </div>

      {/* Financial Health Score */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider">
            Financial Health
          </p>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cfo-muted/[0.18] text-cfo-muted">
            NO DATA
          </span>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-3xl font-bold text-cfo-text">--</span>
          <span className="text-sm text-cfo-dim mb-1">/ 100</span>
        </div>
        <div className="w-full h-1.5 bg-cfo-border rounded-full overflow-hidden">
          <div className="h-full w-0 bg-cfo-muted rounded-full" />
        </div>
        <p className="text-xs text-cfo-dim mt-2">
          Add your accounts and transactions to calculate your health score.
        </p>
      </Card>

      {/* Next 7 Days */}
      <Card>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-3">
          Next 7 Days
        </p>
        <div className="flex items-center justify-center py-6">
          <p className="text-sm text-cfo-dim">
            Add recurring bills and income to see upcoming cash flow.
          </p>
        </div>
      </Card>

      {/* Today&apos;s Budget */}
      <Card variant="purple">
        <p className="text-[10px] font-medium text-cfo-purple uppercase tracking-wider mb-2">
          Today&apos;s Budget
        </p>
        <div className="flex items-end gap-2 mb-2">
          <span className="text-2xl font-bold text-cfo-text">$0.00</span>
          <span className="text-xs text-cfo-dim mb-1">remaining</span>
        </div>
        <div className="w-full h-1.5 bg-cfo-border rounded-full overflow-hidden">
          <div className="h-full w-0 bg-cfo-purple rounded-full" />
        </div>
        <p className="text-xs text-cfo-dim mt-2">
          Set a budget to track your daily spending.
        </p>
      </Card>
    </div>
  );
}
