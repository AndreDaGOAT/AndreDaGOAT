# T³ target architecture

## FOUND IN REPOSITORY

No JECS architecture, source, or infrastructure definition is present in this checkout.

## PROPOSED FOR T³

### T3-ARCH-001 — Separation of Financial Intelligence and Money Custody

**Decision:** T³ maintains JECS's authoritative service verification, allocation, earnings,
transaction, risk, audit, and reconciliation truth. A regulated provider performs custody,
settlement, transfer, and payout under the approved Connect architecture. JECS does not create a
stored-value wallet merely to offer a modern payout experience.

**Consequences:** provider references/status may be stored, but raw financial credentials may not;
provider success is accepted only through authenticated APIs/webhooks and reconciliation; the T³
ledger remains explainable without pretending to be provider settlement truth.

### Trust boundaries

```text
[Customer/Wash Pro/Admin browser — untrusted amounts, roles, status]
             │ authenticated request
             ▼
[Supabase Auth] → [Trusted Edge/API policy layer — secrets, authorization]
             │ narrowly scoped transaction/RPC
             ▼
[Postgres/RLS — operational + protected T³ financial truth]
             │ signed API calls / verified webhook ingress
             ▼
[Stripe Connect — processor/custody truth]

[Evidence objects] → [AI assessor — advisory only] → [deterministic policy + human review]
```

### Dependency and target flow

The authoritative route should be SRN lookup → unique `service_requests.request_id` → eligible
`appointments.service_request_id` → `appointment_id`; assignment must resolve to the authenticated
Wash Pro through an authoritative UUID FK. Completion creates a verification candidate only.

Verification freezes relevant facts and applies deterministic checks for identity, assignment,
appointment, evidence, time/location policy, worker classification, and captured customer payment.
An accepted contractor service creates one financial transaction, balanced allocations, and one
earning entry under unique constraints. Employees instead create compensation events for an
approved payroll pathway. Payout reservation occurs atomically, then provider outcome is reconciled.

### Service boundaries

- **Operational:** request, appointment, assignment, evidence, completion claim.
- **Verification/risk:** evidence snapshots, advisory AI results, deterministic decision/review.
- **Financial:** immutable source events, rule versions, allocations, earnings, reservations.
- **Provider adapter:** connected-account references, idempotent commands, webhook inbox.
- **Read models:** derived balances and T³ Pay views; never authoritative input.
- **Reconciliation:** compare operational, financial, and processor facts; create review cases.
