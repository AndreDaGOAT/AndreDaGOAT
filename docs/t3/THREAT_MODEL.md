# T³ threat-model draft

## FOUND IN REPOSITORY

No code, RLS, role model, data-flow implementation, or security controls were available to validate.
This is a target threat model requiring revision after actual discovery.

## PROPOSED FOR T³

### Assets and actors

Assets include customer funds, contractor earnings, allocation rules, identity/provider references,
service evidence, ledger/audit history, webhook secrets, and administrative authority. Actors are
customers, Wash Pros, admins/support, service-role workloads, Stripe, AI vendors, insiders, and
external attackers. Browsers, AI output, webhook bodies before signature verification, and all
client-supplied financial facts are untrusted.

| Threat | Example | Required controls |
|---|---|---|
| Identity/assignment spoofing | Worker completes another worker's SRN | Server derives actor from JWT; authoritative UUID assignment check; audit denial. |
| Client financial tampering | Modified amount/balance/status | Ignore client totals; server-side rules and locked eligible-entry selection; deny ledger writes by RLS. |
| Replay/race | Double-click or concurrent payout | Unique actor-scoped idempotency key; row/advisory locks; reservations and serializable invariant checks. |
| Webhook forgery/replay | Fake or repeated payout success | Raw-body signature/time tolerance; unique `(provider,event_id)` inbox; transactional handler. |
| Ambiguous provider timeout | Provider accepted, local response lost | Stable provider idempotency key; mark unknown; query/reconcile before retry. |
| Privilege escalation | Client asserts admin role | Trusted claims/profile lookup; no mutable client metadata authorization; least-privilege service roles. |
| Evidence fraud | Reused/edited/unrelated photos | Object hashes, capture metadata, access controls, duplicate signals, human review; no AI-only sanction. |
| AI manipulation/bias | Adversarial image or low confidence | Treat output as untrusted advisory data; version model/prompt; deterministic thresholds; appeal/review. |
| Insider adjustment abuse | Silent balance rewrite | Append-only adjustment with dual control/reason; immutable audit; alerting. |
| Destination takeover | New bank/card then instant payout | Provider-hosted changes; step-up auth, cooldown/risk review, notification, session/device signals. |
| Refund/chargeback loss | Payout precedes reversal | Holds/reserves and exposure limits; additive negative adjustments; review and recovery policy. |
| Data leakage | Identity docs or secrets exposed | Never ingest prohibited data; scoped buckets; encryption; log redaction; retention and access reviews. |
| Offboarding bypass | Inactive worker receives new work/payout | Separate operational/financial gates; resolve lawful final pay while preventing new eligibility. |

### Failure handling

Provider or Supabase outage leaves a durable retryable state, never an assumed success. Out-of-order
events update only through monotonic/provider-object state rules and are retained. Failed payouts
release reservations via explicit reversal. Late tips append independently. Partial refunds and
chargebacks create attributable adjustments. Disputed evidence opens review rather than erasing the
verified event. Every discrepancy becomes a review item; none is silently “fixed.”
