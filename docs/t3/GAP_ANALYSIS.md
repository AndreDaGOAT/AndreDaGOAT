# Gap analysis

## FOUND IN REPOSITORY

Only profile README content is available. Consequently, no target capability can be marked
implemented, partially implemented, or contradicted. “Not found” below means absent from this
checkout, not absent from production.

## PROPOSED FOR T³

The priorities and actions below are proposed remediation and validation work; they are not claims
about deployed JECS behavior.

| Priority | Capability | Evidence status | Required validation/action |
|---|---|---|---|
| Blocker | Authoritative schema and migrations | Not found | Obtain intended repository; compare migrations with read-only deployed metadata. |
| Blocker | Auth identities, roles, worker classification | Not found | Trace `auth.uid()` through profiles and employee/contractor records. |
| Blocker | Request→appointment→assignment relationship | Not found | Confirm keys, constraints, cardinality, lifecycle, and historical data. |
| Blocker | `assigned_wash_pro_id` type | Unconfirmed | Inventory data/types/dependencies before any dual-write migration. |
| Critical | Completion authorization and evidence | Not found | Identify every writer, RLS policy, RPC, trigger, and storage bucket policy. |
| Critical | Customer payment semantics | Not found | Establish provider, states, currency/amount representation, refunds, and linkage. |
| Critical | Ledger, allocation rules, tips | Not found | Design append-only authoritative domain after overlap review. |
| Critical | Payout concurrency/idempotency | Not found | Use server-only transactional reservation and unique idempotency keys. |
| Critical | Webhook authentication/inbox | Not found | Verify signatures before durable idempotent processing. |
| High | Onboarding and two independent gates | Not found | Map JECS approval separately from provider capability. |
| High | Offboarding | Not found | Define no-new-work, open-work resolution, final-pay, and retention workflow. |
| High | Audit/reconciliation | Not found | Add immutable events and discrepancy review queues. |
| High | AI evidence workflow | Not found | Define evidence provenance, model versioning, review and appeal. |
| High | RLS/security tests | Not found | Build role-by-operation matrix and negative tests. |

## Key unknowns for architectural review

1. Are request, appointment, payment, and Wash Pro keys UUIDs in the deployed schema?
2. Is assignment stored on `service_requests`, `appointments`, route membership, or elsewhere?
3. Can clients currently update status directly, and which RLS predicate permits it?
4. Can one request have multiple appointments or attempts, and which is financially relevant?
5. Does `payments` represent intent, charge, capture, invoice, or a mixed lifecycle?
6. What evidence object metadata and retention/consent rules already exist?
7. Which payment and payroll providers/contracts are approved?

## Stop/go assessment

**No-go for database or financial implementation.** Documentation and review can proceed, but any
DDL, RLS, Edge Function, Stripe, or production change would be speculative and unsafe.
