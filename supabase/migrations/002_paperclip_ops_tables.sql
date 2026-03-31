-- Paperclip AI Operations Bridge Tables
-- Mirrors the "Partenaire.io Business Health Tracker v4.0" spreadsheet
-- and bridges the AI CFO Command Center with Paperclip's agent layer.
--
-- Convention:
--   ops_*  = written by Paperclip agents, read by Command Center
--   cmd_*  = written by Command Center, read by Paperclip agents
--
-- Spreadsheet mapping:
--   ops_clients          → CLIENTS tab (master list, 1 row per client)
--   ops_monthly_snapshots → MONTHLY SNAPSHOT tab (1 row per month)
--   ops_kpi_dashboard     → DASHBOARD tab (auto-calculated)
--   ops_invoice_status   → Invoicing Analyst detail data
--   ops_alerts           → Alert system
--   ops_audit_log        → Audit trail

-- ============================================================
-- CLIENTS (mirrors CLIENTS tab — master list, 1 row per client)
-- CFO Agent writes, Command Center reads
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- INFO CLIENT (données de base)
  client_name TEXT NOT NULL,
  client_type TEXT,                      -- e.g., Restaurant, Courtier, Concessionnaire
  package TEXT,                          -- e.g., Paid+Ads CXD, Ads Only
  date_debut DATE,                       -- Contract start date
  dollars_par_mois_cents BIGINT,         -- $/Mois in cents (CAD)
  duree_mois INTEGER,                    -- Contract duration in months
  mode_paiement TEXT,                    -- Vir/permanent, Carte, etc.
  closer TEXT,                           -- Sales closer name

  -- Stripe / PandaDoc references
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  pandadoc_contract_id TEXT,

  -- MISE À JOUR MENSUELLE (updated by CFO Agent monthly)
  statut_actuel TEXT DEFAULT 'actif' CHECK (statut_actuel IN ('actif', 'en_onboarding', 'paused', 'churned')),
  cash_collecte_ce_mois_cents BIGINT DEFAULT 0,
  remboursement_ce_mois_cents BIGINT DEFAULT 0,
  heures_ce_mois NUMERIC(5,1) DEFAULT 0,
  paye_on BOOLEAN,                       -- Payé? O/N
  retard_jours INTEGER DEFAULT 0,

  -- AUTO-CALCULÉ
  mois_actifs INTEGER,                   -- Months since date_debut
  total_facture_cents BIGINT DEFAULT 0,  -- Cumulative invoiced since contract start
  total_rembourse_cents BIGINT DEFAULT 0,-- Cumulative refunds
  solde_cents BIGINT DEFAULT 0,          -- Total Facturé - Total Remboursé
  ltv_cents BIGINT DEFAULT 0,            -- Lifetime value (total cash collected)
  ltv_contractuelle_cents BIGINT,        -- $/mois × durée contrat
  delta_ltv_cents BIGINT,                -- LTV - LTV Contractuelle (negative = underperforming)
  protection_revenue_pct NUMERIC(5,2),   -- Revenue protection %
  delivery_margin_pct NUMERIC(5,2),      -- Delivery margin %
  safe_interne_par_heure_cents BIGINT,   -- Internal rate $/h

  -- SANTÉ CLIENT
  health_score INTEGER CHECK (health_score BETWEEN 1 AND 10),  -- 1-10 scale
  previous_health_score INTEGER,
  health_trend TEXT CHECK (health_trend IN ('improving', 'stable', 'declining')),
  churn_risk BOOLEAN DEFAULT false,      -- Auto-flagged when health_score < 6
  dnd BOOLEAN DEFAULT false,             -- Do Not Disturb
  raison_churn TEXT,
  icf TEXT,
  upsell_potential TEXT,

  -- Health score components (for transparency)
  score_payment INTEGER CHECK (score_payment BETWEEN 1 AND 10),
  score_tenure INTEGER CHECK (score_tenure BETWEEN 1 AND 10),
  score_revenue_trend INTEGER CHECK (score_revenue_trend BETWEEN 1 AND 10),
  score_delta_ltv INTEGER CHECK (score_delta_ltv BETWEEN 1 AND 10),
  score_engagement INTEGER CHECK (score_engagement BETWEEN 1 AND 10),

  notes TEXT,

  -- Metadata
  last_synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_clients_status ON ops_clients (statut_actuel);
CREATE INDEX idx_clients_health ON ops_clients (health_score) WHERE statut_actuel = 'actif';
CREATE INDEX idx_clients_churn_risk ON ops_clients (churn_risk) WHERE churn_risk = true;
CREATE INDEX idx_clients_stripe ON ops_clients (stripe_customer_id);

-- ============================================================
-- MONTHLY SNAPSHOTS (mirrors MONTHLY SNAPSHOT tab)
-- 1 row per month. ~20 metrics. Source of financial truth.
-- CFO Agent writes on 1st of each month.
-- NEVER DELETE ROWS — they build the history.
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_monthly_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  period_month DATE NOT NULL,            -- First day of the month (e.g., 2026-03-01)

  -- REVENUE & CLIENTS (manual input in spreadsheet, auto from Stripe here)
  cash_collecte_cents BIGINT,            -- Cash Collecté ($)
  credit_balance_cents BIGINT,           -- Crédit Balance
  remboursements_cents BIGINT,           -- Remboursements ($)
  expansion_revenue_cents BIGINT,        -- Expansion Revenue ($)
  clients_debut INTEGER,                 -- Clients at start of month
  clients_fin INTEGER,                   -- Clients at end of month
  clients_churned INTEGER,               -- Clients lost this month
  nouveaux_clients INTEGER,              -- New clients this month
  leads_count INTEGER,                   -- LCA Leads / Leads Meta

  -- COSTS
  ad_spend_cents BIGINT,                 -- Ad Spend / Publicité ($)
  commission_sales_cents BIGINT,         -- Commission Sales ($)
  salaire_employes_cents BIGINT,         -- Salaire Employés ($)
  logiciels_cents BIGINT,                -- Logiciels ($)
  operationnel_cents BIGINT,             -- Opérationnel ($)
  outils_marketing_cents BIGINT,         -- Outils Marketing ($)
  assurance_cents BIGINT,                -- Assurance ($)
  comptabilite_cents BIGINT,             -- Comptabilité ($)
  autres_frais_cents BIGINT,             -- Other costs

  -- AUTO-CALCULATED METRICS
  revenue_brut_cents BIGINT,             -- Cash Collecté - Remboursements
  agi_cents BIGINT,                      -- Revenue - Ad Spend - Commissions
  gross_profit_cents BIGINT,             -- AGI - Salaires
  gross_margin_pct NUMERIC(6,2),         -- Gross Profit / Revenue × 100
  net_profit_cents BIGINT,               -- Revenue - All Costs
  net_margin_pct NUMERIC(6,2),           -- Net Profit / Revenue × 100
  cash_roas NUMERIC(6,2),               -- Revenue / Total Costs

  mrr_cents BIGINT,                      -- MRR ($)
  arr_cents BIGINT,                      -- ARR Estimé ($) = MRR × 12
  mom_growth_pct NUMERIC(6,2),           -- MoM Growth (%)
  churn_rate_pct NUMERIC(5,2),           -- Churn Rate (%)
  retention_rate_pct NUMERIC(5,2),       -- Retention Rate (%)
  nrr_pct NUMERIC(6,2),                 -- Net Revenue Retention (%)
  revenue_per_employe_cents BIGINT,      -- Revenue / Employé ($)

  -- VENTES & ACQUISITION
  deals_closes INTEGER,                  -- Deals Closés
  cac_all_in_cents BIGINT,              -- CAC All-in ($)
  payback_period_months NUMERIC(4,1),    -- Payback Period (months)
  proposal_to_close_pct NUMERIC(5,2),    -- Proposal-to-Close (%)
  lead_to_client_pct NUMERIC(5,2),       -- Lead-to-Client (%)

  -- Cumulative
  cumulative_revenue_cents BIGINT,       -- Running total since inception
  projection_3_mois_cents BIGINT,        -- 3-month revenue projection

  -- Metadata
  generated_by TEXT DEFAULT 'cfo_agent',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_monthly_snapshots_month ON ops_monthly_snapshots (period_month);

-- ============================================================
-- KPI DASHBOARD (mirrors DASHBOARD tab — auto-calculated, read-only)
-- CFO Agent writes after each monthly close
-- ============================================================

CREATE TABLE IF NOT EXISTS ops_kpi_dashboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date DATE NOT NULL,

  -- REVENUE
  cash_collecte_cents BIGINT,
  net_reel_cents BIGINT,                 -- Net Réel ($)
  expansion_revenue_cents BIGINT,
  agi_cents BIGINT,

  -- PROFITABILITÉ
  gross_profit_cents BIGINT,
  gross_margin_pct NUMERIC(6,2),
  net_profit_cents BIGINT,
  net_margin_pct NUMERIC(6,2),           -- Target: 15-25%
  cash_roas NUMERIC(6,2),               -- Target: >3x

  -- CLIENTS & CHURN
  nouveaux_clients INTEGER,
  clients_churned INTEGER,
  clients_actifs INTEGER,
  churn_rate_pct NUMERIC(5,2),           -- Target: <5%/mois
  retention_rate_pct NUMERIC(5,2),       -- Target: >85%/mois
  nps_score NUMERIC(4,1),

  -- VENTES & ACQUISITION
  leads_meta INTEGER,
  deals_closes INTEGER,
  cac_all_in_cents BIGINT,
  payback_period_months NUMERIC(4,1),    -- Target: <3 mois
  proposal_to_close_pct NUMERIC(5,2),
  lead_to_client_pct NUMERIC(5,2),

  -- CROISSANCE
  mrr_cents BIGINT,
  arr_estime_cents BIGINT,
  mom_growth_pct NUMERIC(6,2),
  revenue_per_employe_cents BIGINT,      -- Target: $120K-200K/an
  projection_3_mois_cents BIGINT,

  -- Comparison periods (for M-2, M-1, Ce Mois, Q Actuel, YTD columns)
  m_minus_2 JSONB,                       -- All metrics for 2 months ago
  m_minus_1 JSONB,                       -- All metrics for last month
  q_actuel JSONB,                        -- Quarter-to-date aggregates
  ytd JSONB,                             -- Year-to-date aggregates
  proj_12_mois JSONB,                    -- 12-month projection

  -- Objectifs & Écarts
  objectifs JSONB,                       -- Monthly targets
  ecarts JSONB,                          -- Variance vs targets

  -- Metadata
  generated_by TEXT DEFAULT 'cfo_agent',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE UNIQUE INDEX idx_kpi_dashboard_date ON ops_kpi_dashboard (snapshot_date);

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
  contract_amount_cents BIGINT,
  amount_mismatch BOOLEAN DEFAULT false,

  -- Aging bucket
  aging_bucket TEXT CHECK (aging_bucket IN ('current', '1_15_days', '16_30_days', '31_60_days', '60_plus')),

  last_synced_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_invoice_status_overdue ON ops_invoice_status (status, days_overdue DESC) WHERE status = 'overdue';
CREATE INDEX idx_invoice_status_client ON ops_invoice_status (stripe_customer_id);

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

  source_agent TEXT NOT NULL,
  related_client TEXT,
  related_entity_id TEXT,

  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'acknowledged', 'resolved', 'dismissed')),
  acknowledged_by TEXT,
  resolved_at TIMESTAMPTZ,
  resolution_notes TEXT,

  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_alerts_active ON ops_alerts (severity, created_at DESC) WHERE status = 'active';

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

ALTER TABLE ops_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_monthly_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_kpi_dashboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_invoice_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ops_audit_log ENABLE ROW LEVEL SECURITY;

-- Admin (Erick) can read everything
CREATE POLICY "admin_read_all" ON ops_clients FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_monthly_snapshots FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_kpi_dashboard FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_invoice_status FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_alerts FOR ALL TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "admin_read_all" ON ops_audit_log FOR SELECT TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Service role (Paperclip agents via API key) can read/write all ops tables
CREATE POLICY "service_full_access" ON ops_clients FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_monthly_snapshots FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_kpi_dashboard FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_invoice_status FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_alerts FOR ALL TO service_role USING (true);
CREATE POLICY "service_full_access" ON ops_audit_log FOR ALL TO service_role USING (true);

-- Team members can read alerts and client health (limited visibility)
CREATE POLICY "team_read_alerts" ON ops_alerts FOR SELECT TO authenticated
  USING (severity IN ('p0', 'p1'));
CREATE POLICY "team_read_clients" ON ops_clients FOR SELECT TO authenticated
  USING (true);  -- Team can see client status but not financial details via app-level filtering
