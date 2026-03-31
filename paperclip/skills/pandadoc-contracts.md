# PandaDoc Contracts Skill

## Description

Pull contract and proposal data from PandaDoc API for deal tracking and revenue verification.

## Adapter

http

## Configuration

```yaml
base_url: "https://api.pandadoc.com/public/v1"
auth:
  type: bearer
  token: "{{secrets.PANDADOC_API_KEY}}"
headers:
  Content-Type: "application/json"
```

## Available Operations

### List Documents (Contracts & Proposals)

```
GET /documents?status=document.completed&count=50&order_by=date_modified
GET /documents?status=document.sent&count=50
GET /documents?status=document.viewed&count=50
GET /documents?status=document.waiting_approval&count=50
```

### Get Document Details

```
GET /documents/{{document_id}}/details
```

Returns pricing tables, total value, recipient info, and completion status.

### List Documents by Status

| Status | Meaning | Agent Use |
|---|---|---|
| `document.draft` | Not yet sent | Pipeline tracking |
| `document.sent` | Sent, awaiting signature | Pipeline tracking |
| `document.viewed` | Recipient opened it | Engagement signal |
| `document.waiting_approval` | Internal approval needed | Governance flag |
| `document.completed` | Signed and done | Revenue confirmation |
| `document.voided` | Cancelled | Churn signal |
| `document.declined` | Rejected by recipient | Lost deal |
| `document.expired` | Past expiry date | Stale deal flag |

## Data Mapping

| PandaDoc Field | KPI | Agent |
|---|---|---|
| `pricing.total` on completed docs | Contract value | CFO |
| `date_completed` | Deal close date | CFO |
| `status = sent` count | Active proposals | CFO (pipeline value) |
| `status = expired/declined` | Lost deals | CFO |
| `date_expiration` approaching | Renewal alerts | Invoicing Analyst |
| `pricing.total` vs Stripe invoice | Revenue reconciliation | Invoicing Analyst |

## Webhook Events

- `document_state_change` → wake CFO when a contract is completed (new revenue confirmed) or voided (churn signal)
- `recipient_completed` → informational log

## Cross-Reference with Stripe

The Invoicing Analyst should compare:
- PandaDoc contract value vs. Stripe subscription amount
- Flag any mismatch > 5% (could indicate pricing errors or unapplied discounts)
- Track renewal dates in PandaDoc against subscription renewal in Stripe
