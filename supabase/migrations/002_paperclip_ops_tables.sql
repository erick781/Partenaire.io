-- Paperclip AI Operations Bridge Tables
-- These tables sit in Supabase and bridge the AI CFO Command Center
-- with Paperclip's agent operations layer.
--
-- Convention:
--   ops_*  = written by Paperclip agents, read by Command Center
--   cmd_*  = written by Command Center, read by Paperclip agents

-- ============================================================
-- FINANCIAL SUMMARIES (CFO Agent writes, Command Center reads)
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_financial_summaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly', 'monthly')),
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,

  -- Revenue metrics
  mrr_cents BIGINT,                    -- Monthly Recurring Revenue in cents (CAD)
  arr_cents BIGINT,                    -- Annual Recurring Revenue in cents (CAD)
  mrr_change_pct NUMERIC(6,2),        -- MRR % change vs previous period
  new_revenue_cents BIGINT,            -- New revenue in period
  churned_revenue_cents BIGINT,        -- Lost revenue from cancellations

  -- Expense metrics
  total_expenses_cents BIGINT,
  ad_spend_cents BIGINT,               -- Total ad spend under management
  gross_margin_pct NUMERIC(6,2),

  -- Cash
  cash_balance_cents BIGINT,
  cash_runway_months NUMERIC(4,1),

  -- Counts
  active_clients INTEGER,
  new_clients INTEGER,
  churned_clients INTEGER,

  -- Agent metadata
  generated_by TEXT DEFAULT 'cfo_agent',
  confidence TEXT CHECK (confidence IN ('high', 'medium', 'low')),
  raw_data JSONB,                      -- Full breakdown for drill-down
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_financial_summaries_period ON ops_financial_summaries (period_type, period_start DESC);

-- ============================================================
-- INVOICE TRACKING (Invoicing Analyst Agent writes)
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_invoice_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_invoice_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  client_name TEXT,

  amount_cents BIGINT NOT NULL,
  currency TEXT DEFAULT 'cad',
  status TEXT NOT NULL CHECK (status IN ('draft', 'open', 'paid', 'overdue', 'void', 'uncollectible')),

  issued_date DATE,
  due_date DATE,
  paid_date DATE,
  days_overdue INTEGER DEFAULT 0,

  -- PandaDoc cross-reference
  pandadoc_document_id TEXT,
  contract_amount_cents BIGINT,        -- Expected amount from contract
  amount_mismatch BOOLEAN DEFAULT false,

  -- Aging bucket (auto-calculated)
  aging_bucket TEXT CHECK (aging_bucket IN ('current', '1_15_days', '16_30_days', '31_60_days', '60_plus')),

  last_synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_invoice_status_overdue ON ops_invoice_status (status, days_overdue DESC) WHERE status = 'overdue';
CREATE INDEX idx_invoice_status_client ON ops_invoice_status (stripe_customer_id);

-- ============================================================
-- CLIENT HEALTH SCORES (future: Client Health Agent writes)
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_client_health (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_customer_id TEXT,
  client_name TEXT NOT NULL,

  health_score INTEGER CHECK (health_score BETWEEN 0 AND 100),
  previous_score INTEGER,
  score_trend TEXT CHECK (score_trend IN ('improving', 'stable', 'declining')),

  -- Score components
  payment_score INTEGER CHECK (payment_score BETWEEN 0 AND 100),      -- Pays on time?
  engagement_score INTEGER CHECK (engagement_score BETWEEN 0 AND 100), -- Responsive?
  tenure_months INTEGER,
  revenue_cents BIGINT,                                                -- Monthly revenue from client
  revenue_pct_of_total NUMERIC(5,2),                                   -- Concentration risk

  risk_level TEXT CHECK (risk_level IN ('healthy', 'watch', 'at_risk', 'critical')),
  risk_factors TEXT[],                 -- Array of contributing factors

  generated_by TEXT DEFAULT 'cfo_agent',  -- Phase 1: CFO does basic scoring
  scored_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_client_health_risk ON ops_client_health (risk_level, health_score);

-- ============================================================
-- ALERTS (Any Paperclip agent writes, Command Center reads)
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  severity TEXT NOT NULL CHECK (severity IN ('p0', 'p1', 'p2', 'p3')),
  category TEXT NOT NULL CHECK (category IN ('financial', 'invoicing', 'churn', 'operations', 'sales', 'system')),

  title TEXT NOT NULL,
  description TEXT,
  recommended_action TEXT,

  source_agent TEXT NOT NULL,          -- Which agent raised this
  related_client TEXT,                 -- Client name if applicable
  related_entity_id TEXT,              -- Stripe ID, invoice ID, etc.

  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_by TEXT,                -- User who acknowledged
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_alerts_active ON ops_alerts (severity, created_at DESC) WHERE status = 'active';

-- ============================================================
-- KPI DASHBOARD (CFO Agent writes, Command Center reads)
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_kpi_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date DATE NOT NULL,

  -- Financial KPIs
  mrr_cents BIGINT,
  arr_cents BIGINT,
  gross_margin_pct NUMERIC(6,2),
  cash_runway_months NUMERIC(4,1),
  revenue_per_employee_cents BIGINT,
  ad_spend_total_cents BIGINT,

  -- Invoice KPIs
  ar_outstanding_cents BIGINT,
  invoices_overdue_count INTEGER,
  invoices_overdue_amount_cents BIGINT,
  collection_rate_pct NUMERIC(5,2),
  avg_days_to_payment NUMERIC(5,1),

  -- Client KPIs
  total_active_clients INTEGER,
  clients_at_risk_count INTEGER,
  avg_client_health_score NUMERIC(5,1),
  churn_rate_pct NUMERIC(5,2),
  net_revenue_retention_pct NUMERIC(6,2),
  revenue_concentration_top3_pct NUMERIC(5,2),

  -- Metadata
  generated_by TEXT DEFAULT 'cfo_agent',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_kpi_snapshots_date ON ops_kpi_snapshots (snapshot_date);

-- ============================================================
-- AUDIT LOG (All agents write, Board reads)
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent TEXT NOT NULL,
  action TEXT NOT NULL,
  category TEXT CHECK (category IN ('report', 'alert', 'calculation', 'escalation', 'data_sync', 'governance')),

  description TEXT,
  input_data JSONB,
  output_data JSONB,

  approval_required BOOLEAN DEFAULT false,
  approved_by TEXT,
  approved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_audit_log_agent ON ops_audit_log (agent, created_at DESC);
CREATE INDEX idx_audit_log_pending ON ops_audit_log (approved_by) WHERE approval_required = true AND approved_by IS NULL;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE ops_financial_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_invoice_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_client_health ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_kpi_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_audit_log ENABLE ROW LEVEL SECURITY;

-- Admin (Erick) can read everything
CREATE POLICY "admin_read_all" ON ops_financial_summaries FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_invoice_status FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_client_health FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_alerts FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_kpi_snapshots FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_audit_log FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Service role (Paperclip agents via API key) can read/write all ops tables
CREATE POLICY "service_full_access" ON ops_financial_summaries FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_invoice_status FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_client_health FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_alerts FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_kpi_snapshots FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_audit_log FOR ALL TO service_role USING (true);

-- Team members can read alerts and client health (limited visibility)
CREATE POLICY "team_read_alerts" ON ops_alerts FOR SELECT TO authenticated
  USING (severity IN ('p0', 'p1'));
CREATE POLICY "team_read_health" ON ops_client_health FOR SELECT TO authenticated
  USING (true);
