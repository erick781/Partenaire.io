# Stripe Revenue Skill

## Description

Pull revenue, subscription, and invoice data from Stripe API for financial analysis.

## Adapter

http

## Configuration

```yaml
base_url: "https://api.stripe.com/v1"
auth:
  type: bearer
  token: "{{secrets.STRIPE_SECRET_KEY}}"
headers:
  Content-Type: "application/x-www-form-urlencoded"
```

## Available Operations

### Get MRR (Monthly Recurring Revenue)

```
GET /subscriptions?status=active&limit=100
```

Calculate MRR by summing `plan.amount * quantity` for all active subscriptions, divided by `plan.interval_count` if interval is not monthly.

### Get Recent Payments

```
GET /charges?created[gte]={{timestamp_start}}&created[lte]={{timestamp_end}}&limit=100
```

Returns all charges in the specified time window. Filter by `status=succeeded` for revenue.

### Get Invoices

```
GET /invoices?status=open&limit=100
GET /invoices?status=past_due&limit=100
```

### Get Failed Charges

```
GET /charges?created[gte]={{timestamp_24h_ago}}&limit=100
```

Filter for `status=failed` in response.

### Get Refunds

```
GET /refunds?created[gte]={{timestamp_start}}&limit=100
```

### Get Customer Details

```
GET /customers/{{customer_id}}
```

### Get Balance Transactions (P&L)

```
GET /balance_transactions?created[gte]={{timestamp_start}}&created[lte]={{timestamp_end}}&limit=100&type=charge
GET /balance_transactions?created[gte]={{timestamp_start}}&created[lte]={{timestamp_end}}&limit=100&type=refund
```

## Data Mapping

| Stripe Field | KPI | Agent |
|---|---|---|
| `subscription.plan.amount` | MRR calculation | CFO |
| `charge.amount` (succeeded) | Daily revenue | CFO |
| `charge.amount` (failed) | Failed charges alert | CFO |
| `invoice.status = past_due` | Overdue invoices | Invoicing Analyst |
| `invoice.due_date` vs `now` | Aging calculation | Invoicing Analyst |
| `refund.amount` | Refund tracking | CFO |
| `balance_transaction.net` | Net revenue / P&L | CFO |

## Webhook Events to Listen For

Configure these Stripe webhooks to trigger agent wakeups:

- `invoice.payment_failed` → wake Invoicing Analyst (P1 if recurring)
- `invoice.overdue` → wake Invoicing Analyst
- `customer.subscription.deleted` → wake CFO (churn event)
- `charge.dispute.created` → wake CFO (P1)
- `charge.refunded` → wake CFO

## Rate Limits

Stripe allows 100 read requests per second in live mode. Agents should batch requests and cache results for the heartbeat window.
