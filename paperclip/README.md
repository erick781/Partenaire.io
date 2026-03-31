# Paperclip AI — Partenaire.io Operations

## Overview

This directory contains the Paperclip AI company configuration for Partenaire.io's operational intelligence layer. It orchestrates AI agents that manage the agency's finances, invoicing, and business health metrics.

## Architecture

```
Command Center (Next.js + Supabase)     Paperclip AI (Agent Orchestration)
├── Marketing deliverables              ├── Financial intelligence
├── Client reports & strategies         ├── Invoice monitoring
├── Team task management                ├── KPI tracking & alerts
│                                       ├── Churn detection
│   ◄─── Supabase bridge tables ───►    ├── Revenue forecasting
│                                       └── Governance & audit
```

## Quick Start

```bash
# 1. Install Paperclip
npx paperclipai onboard --yes

# 2. Import this company config
npx paperclipai company import --from ./paperclip

# 3. Copy environment variables
cp paperclip/.env.example .env
# Fill in your Stripe, PandaDoc, Supabase, and Slack keys

# 4. Run Supabase migration (bridge tables)
npx supabase db push

# 5. Start Paperclip
npx paperclipai run
```

## Agents (Phase 1)

| Agent | Role | Heartbeat | Budget |
|-------|------|-----------|--------|
| Le Directeur | CEO — delegates & escalates | Every 4h | $50/mo |
| Le Comptable | CFO — all financial intelligence | Daily 7AM ET | $100/mo |
| L'Analyste Facturation | Invoicing — AR tracking | Daily 9AM ET | $30/mo |

## Directory Structure

```
paperclip/
├── COMPANY.md              # Company mission & org chart
├── .paperclip.yaml         # Paperclip platform config
├── .env.example            # Required environment variables
├── README.md               # This file
├── agents/
│   ├── ceo/
│   │   └── SOUL.md         # CEO agent identity & behavior
│   ├── cfo/
│   │   └── SOUL.md         # CFO agent identity & behavior
│   └── invoicing-analyst/
│       └── SOUL.md         # Invoicing agent identity & behavior
├── skills/
│   ├── stripe-revenue.md   # Stripe API integration skill
│   ├── pandadoc-contracts.md # PandaDoc API integration skill
│   └── alert-system.md     # Alert routing & severity config
└── governance/
    └── rules.yaml          # Approval gates, budgets, escalation rules
```

## Integrations

| Service | Purpose | Required Keys |
|---------|---------|---------------|
| Stripe | Revenue, MRR/ARR, invoices, payments | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` |
| PandaDoc | Contracts, proposals, deal tracking | `PANDADOC_API_KEY` |
| Supabase | Bridge to Command Center | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Slack | Alert notifications | `SLACK_OPS_WEBHOOK_URL` |
| Twilio | P0 SMS alerts | `TWILIO_*` keys |

## Governance

See `governance/rules.yaml` for the full ruleset.

- **Autonomous**: Reports, calculations, KPI updates, internal flags
- **CFO approval**: Budget forecasts, financial alerts, client reviews
- **Board approval (Erick)**: Anything client-facing, billing changes, refunds

## Future Phases

- **Phase 2**: COO Agent + Team Capacity + PM tool integration
- **Phase 3**: CRO Agent + Sales Pipeline + CRM integration
- **Phase 4**: Full Command Center UI integration
