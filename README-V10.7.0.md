# AVORA V10.7.0 — Parent Reports + Family Billing / Paystack Foundation

- Parent-owned family subscription: parent dashboard does not consume a learner seat.
- Linked child accounts inherit access from active billing student seats, so the same payment covers the child according to plan seat count.
- Paystack transaction initialization, server-side verification and signed webhook handling.
- Paystack subscription state stored separately from card/payment credentials.
- Weekly parent report + in-app parent notification data foundation.
- Billing UI explains exactly which linked children are covered.
- Base plan defaults to 1 learner seat; schema supports multi-child plans later.

Required env vars before payment testing:
- PAYSTACK_SECRET_KEY
- PAYSTACK_PLAN_CODE_FAMILY_MONTHLY
- AVORA_FAMILY_MONTHLY_PRICE_NGN (display only)
- APP_URL

Paystack webhook URL:
`/api/billing/paystack/webhook`

Weekly report generator endpoint: `/api/cron/weekly-parent-reports` (POST with `Authorization: Bearer $CRON_SECRET`). Scheduling time can be chosen at deployment instead of being hard-coded.
