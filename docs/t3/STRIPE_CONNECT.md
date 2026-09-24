# Stripe Connect integration design

## FOUND IN REPOSITORY

No Stripe package, API usage, Connect account reference, webhook endpoint, secret convention, or
provider architecture was found. Stripe is therefore a proposed provider, not a discovered dependency.

## PROPOSED FOR T³

Provider architecture (account/controller type, charges, transfers, fees, negative balances, tax and
loss liability) must receive legal/finance/provider review before implementation. Use provider-hosted
onboarding and store only account reference, safe capability/requirements status, and synchronization
times. Never store raw bank/card numbers, SSNs, or provider identity documents.

Financial activation requires both independent gates:

```text
JECS operational approval AND Stripe payouts/capability readiness
```

Neither gate grants the other. Contractors may enter Connect payout eligibility; employees route to
approved payroll. Standard and instant payout availability is confirmed server-side from provider
capabilities, jurisdiction, destination, and policy.

Commands use stable idempotency keys bound to internal request UUIDs. Webhook ingress must receive
the raw body, validate Stripe's signature and tolerance before trust, insert a unique provider event,
then process transactionally. A 2xx acknowledges durable acceptance, not necessarily completion.
Network ambiguity triggers provider-object retrieval/reconciliation rather than a new command.

Secrets belong in Supabase/approved server secret storage with rotation and environment separation.
The browser gets only provider-publishable/client artifacts explicitly intended for it and never a
secret/service-role key. All development begins with provider test mode and staged limits; this task
does not activate Connect or create accounts.
