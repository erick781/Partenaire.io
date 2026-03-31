# Alert System Skill

## Description

Standardized alert creation and routing for all Paperclip agents at Partenaire.io.

## Severity Levels

| Level | Name | Response SLA | Channels |
|-------|------|-------------|----------|
| P0 | Critical | Immediate | SMS + Slack DM + Paperclip UI banner |
| P1 | High | 4 hours | Slack #ops-alerts channel + Paperclip UI |
| P2 | Medium | 24 hours | Daily digest email + Paperclip UI |
| P3 | Info | Next weekly review | Weekly summary only |

## P0 Triggers (Critical)

- Cash runway drops below 2 months
- Payment processor (Stripe) API errors or downtime
- Client representing >10% of MRR shows cancellation signal (2+ missed payments OR contract voided in PandaDoc)
- Agent budget exhausted on critical agent (CFO)

## P1 Triggers (High)

- MRR drops >5% month-over-month
- 3 or more invoices overdue >30 days simultaneously
- Ad spend for any client exceeds approved budget by >15%
- Client health score drops below 40
- A deliverable is >5 business days overdue (read from Command Center)

## P2 Triggers (Medium)

- Client health score drops below 60
- Any invoice overdue >15 days
- Any single client represents >15% of total revenue
- PandaDoc contract value mismatches Stripe invoice by >5%
- Collection rate drops below 90% for the month

## P3 Triggers (Informational)

- Monthly P&L report generated successfully
- New client onboarded (contract completed in PandaDoc)
- All invoices current (zero overdue) — positive signal
- Agent budget at 60% utilization (advisory)

## Alert Format

When creating an alert, write to `ops_alerts` table:

```json
{
  "severity": "p1",
  "category": "financial",
  "title": "MRR declined 7.2% month-over-month",
  "description": "MRR dropped from $42,500 to $39,440. Primary driver: 3 client cancellations in the auto dealer segment.",
  "recommended_action": "Review cancelled accounts and assess if a retention campaign for remaining auto dealer clients is warranted.",
  "source_agent": "cfo_agent",
  "related_client": null,
  "status": "active"
}
```

## Notification Routing

### Slack Integration

Post to `#ops-alerts` webhook:

```yaml
webhook_url: "{{secrets.SLACK_OPS_WEBHOOK_URL}}"
payload:
  text: "[{{severity}}] {{title}}"
  blocks:
    - type: section
      text: "{{description}}"
    - type: section
      text: "*Recommended Action:* {{recommended_action}}"
```

### SMS (P0 only)

Use Twilio or similar:

```yaml
to: "{{secrets.BOARD_PHONE_NUMBER}}"
body: "[P0 CRITICAL] Partenaire.io: {{title}} — Check Paperclip dashboard immediately."
```
