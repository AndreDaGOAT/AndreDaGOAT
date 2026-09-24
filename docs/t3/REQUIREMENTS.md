# T³ requirements baseline

## FOUND IN REPOSITORY

No JECS requirements specification or implementation traceability was found in this checkout.

## PROPOSED FOR T³

**Classification:** everything below is **PROPOSED FOR T³**. No implementation of these
requirements was found in this checkout. Requirement acceptance and traceability must be repeated
against the actual JECS application.

| ID | Requirement | Acceptance signal |
|---|---|---|
| T3-FR-001 | Customers can securely pay for JECS services. | Provider test payment maps to the service. |
| T3-FR-002 | JECS does not store raw card or bank credentials. | Data inventory and secret scan show provider tokens/references only. |
| T3-FR-003 | Financial transactions map to the appropriate customer and service. | Enforced UUID references and audit reconstruction. |
| T3-FR-004 | Wash Pros satisfy required verification before payout. | Ineligible verification states cannot reserve earnings. |
| T3-FR-005 | `Completed` initiates verification and never independently authorizes payout. | Completion test creates at most a verification work item. |
| T3-FR-006 | Tips are attributable to the service and Wash Pro. | Separate immutable tip entry retains source references. |
| T3-FR-007 | Revenue distribution is calculated server-side. | Client-supplied allocations are ignored/rejected. |
| T3-FR-008 | Customers and Wash Pros cannot modify ledger records. | RLS denial tests cover insert/update/delete. |
| T3-FR-009 | Wash Pros can view pending, available, and paid earnings. | Authorized read model agrees with ledger calculation. |
| T3-FR-010 | Eligible independent contractors can request payouts. | Both JECS and provider gates are required. |
| T3-FR-011 | Duplicate payout requests cannot generate duplicate movement. | Same idempotency key/concurrent calls produce one provider operation. |
| T3-FR-012 | Provider webhooks are authenticated and idempotent. | Invalid signatures fail; repeated event ID has one consequence. |
| T3-FR-013 | Failed payouts are recoverable without ledger corruption. | Failure releases/reverses reservations through append-only entries. |
| T3-FR-014 | Privileged financial actions are auditable. | Actor, reason, service, rule, provider event, and result are recorded. |
| T3-FR-015 | AI can assess evidence/risk but cannot authorize money movement. | Deterministic policy is the sole authorization path. |
| T3-FR-016 | Employees and contractors use appropriate separate compensation paths. | Worker classification routes employees to approved payroll, not Connect payout. |
| T3-FR-017 | Revenue-allocation rules are versioned. | Each allocation identifies an immutable effective rule version. |
| T3-FR-018 | Refunds, disputes, and chargebacks preserve history. | Adjustments/reversals are additive and attributable. |
| T3-FR-019 | Standard and provider-eligible instant contractor payouts are supported. | Eligibility is provider-confirmed and server-enforced. |
| T3-FR-020 | No client has provider secret credentials. | Build and runtime configuration review passes. |
| T3-FR-021 | SRN is business-facing; UUID relations are authoritative. | Lookup resolves SRN to a unique request, then UUID appointment relation. |
| T3-FR-022 | The authenticated Wash Pro must be authorized for the completed request. | Cross-worker completion attempts fail and are audited. |
| T3-FR-023 | AI-assisted evidence retains deterministic financial authorization. | Model output cannot transition payout states directly. |
| T3-FR-024 | JECS approval and provider readiness are independent payout gates. | Either false makes the worker financially ineligible. |
| T3-FR-025 | Offboarding blocks new work but preserves required history. | Assignment denial and retention tests pass. |
| T3-FR-026 | Tips are separately auditable events. | Late tip changes only current availability, not original earning. |
| T3-FR-027 | Payout requests do not accept a client-authoritative amount. | Server selects and sums eligible ledger entries under lock. |

## Financial invariants

T3-FIN-001 through T3-FIN-012 are system laws: unique service earning; server-authoritative
amounts; explainable flows; append-only history; correction entries; idempotent webhooks and payout
requests; concurrency-safe spending; no client secrets; no AI money authority; completion is not
payout eligibility; and full audit reconstruction. Schema constraints, transactional procedures,
RLS, and tests must enforce these rather than relying on UI convention.

## Non-functional requirements

- Use `timestamptz` and UTC for financial events; integer minor currency units plus ISO currency.
- Use least privilege, verified provider signatures, rate limits, step-up authentication for
  sensitive actions, monitoring, backups, key rotation, and incident response.
- Never store raw bank/card data, SSNs, identity documents, or production secrets in T³.
- Availability must tolerate retryable provider/network failures without ambiguity or duplication.
