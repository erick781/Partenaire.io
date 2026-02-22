import Card from "@/components/shared/Card";
import StatusPill from "@/components/shared/StatusPill";
import ProgressBar from "@/components/shared/ProgressBar";

export default function GoalsPage() {
  return (
    <div className="space-y-4">
      {/* Active Goal Card */}
      <Card variant="green">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] font-semibold text-cfo-green uppercase tracking-wider">
            Active Goal
          </p>
          <StatusPill status="neutral" label="NO GOAL SET" />
        </div>
        <p className="text-sm text-cfo-text leading-relaxed">
          Set a financial goal by telling your AI CFO what you want to achieve.
          It will create a step-by-step action plan to get you there.
        </p>
        <p className="text-xs text-cfo-dim mt-3">
          Try: &quot;I need my credit score at 700 and all debts cleared in 5
          months for a mortgage renewal&quot;
        </p>
      </Card>

      {/* This Week&apos;s Actions */}
      <Card>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-3">
          This Week&apos;s Actions
        </p>
        <div className="flex items-center justify-center py-8">
          <p className="text-sm text-cfo-dim text-center">
            Set a goal to get AI-generated weekly action items.
          </p>
        </div>
      </Card>

      {/* AI Debt Strategy */}
      <Card>
        <p className="text-[10px] font-medium text-cfo-muted uppercase tracking-wider mb-3">
          AI Debt Strategy
        </p>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-sm text-cfo-dim">
              Add your debt accounts to see an AI-optimized payoff strategy.
            </p>
            <div className="mt-4 space-y-2">
              {/* Example placeholder debt items */}
              <div className="flex items-center gap-3 opacity-30">
                <span className="text-xs font-bold text-cfo-yellow w-5">#1</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-cfo-text">Example Visa</span>
                    <span className="text-xs text-cfo-muted">$0 • 19.9%</span>
                  </div>
                  <ProgressBar value={0} max={100} color="yellow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
