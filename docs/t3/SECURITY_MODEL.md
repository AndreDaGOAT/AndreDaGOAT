# T³ security and RLS model

## FOUND IN REPOSITORY

No Supabase configuration, auth code, RLS policies, storage policies, or secret-loading convention
is available. An RLS inventory therefore contains zero discovered policies and is incomplete by
definition.

## PROPOSED FOR T³

### Authorization principles

- Derive identity from verified Supabase Auth JWTs; derive worker/admin relationships server-side.
- Customers and Wash Pros receive narrowly scoped SELECT access to their own read models and no
  direct INSERT/UPDATE/DELETE access to authoritative financial tables.
- Financial writes occur through hardened server functions/Edge Functions with fixed `search_path`,
  least-privilege owners, explicit grants, input validation, and auditable actor/reason context.
- Service-role credentials and Stripe secrets remain only in managed server secret storage.
- Admin is not a universal bypass: separate support, reviewer, finance, and reconciliation duties;
  require step-up authentication and dual control for high-impact corrections.

### Proposed RLS matrix

| Object class | Customer | Wash Pro | Finance/reviewer | Trusted service |
|---|---|---|---|---|
| Operational own records | Scoped read/write per workflow | Assigned scoped workflow | Review scope | Controlled |
| Evidence | Own scoped upload/read | Assigned scoped upload/read | Review | Controlled |
| Verification/risk | Limited outcome read | Limited outcome read | Review/decision via function | Create/process |
| Ledger/allocation/audit | Own redacted read model | Own redacted read model | Read + controlled adjustment RPC | Append/process |
| Payout request | None | Invoke request RPC, no amount authority | Review/hold | Reserve/process |
| Connected account | None | Safe status only | Safe status | Provider sync |
| Webhook inbox | None | None | Diagnostic read | Signature-verified ingest/process |

Every policy needs positive and negative tests, including cross-tenant UUID substitution. Storage
bucket policies require equivalent object ownership/assignment checks and signed short-lived access.

### Sensitive-action controls

Payout and destination-change flows use recent authentication/MFA where supported, CSRF-safe
sessions, device/risk signals, rate limits, cooldown/notification, idempotency, and transaction
locking. Logs redact tokens, signatures, documents, and personal data. Rotate keys, monitor privileged
calls, test backup restoration, and maintain incident runbooks.
