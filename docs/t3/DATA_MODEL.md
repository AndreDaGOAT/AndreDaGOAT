# Data model and proposed Migration 001

## FOUND IN REPOSITORY

No schema, migrations, generated database types, or table references exist in this checkout. The
reported `SMALLINT`/UUID mismatch is **unconfirmed** and must not be changed on this evidence.

## PROPOSED FOR T³ (post-discovery target)

Candidate entities are `t3_service_verifications`, `t3_risk_assessments`, versioned allocation
rules, `t3_financial_transactions`, balanced `t3_revenue_allocations`, append-only
`t3_earnings_ledger`, `t3_payout_requests` plus entry reservations, `t3_connected_accounts`,
`t3_provider_webhook_events`, reconciliation cases, and `t3_financial_audit_events`.

Use UUID primary/foreign keys, `timestamptz`, integer minor units with currency, explicit checks,
and unique source/idempotency constraints. Derived balance views must sum posted available entries
minus active reservations; they are not stored client-writeable balances. Tips, refunds, disputes,
bonuses, adjustments, and payouts are separate immutable event types. Store only provider account
references/status—not bank/card/identity data.

## Migration 001 proposal: assignment integrity prerequisite

**Status: design only; intentionally no executable SQL.** Migration 001 should address only the
assignment-key prerequisite *if* actual discovery confirms `service_requests.assigned_wash_pro_id`
is `SMALLINT` while the authoritative `wash_pro_profiles.wash_pro_id` is UUID and no existing UUID
relationship supersedes it.

### Reason and affected objects

Financial verification cannot safely prove the earning recipient through incompatible or ambiguous
identifiers. Potentially affected objects include `service_requests`, `wash_pro_profiles`, assignment
indexes/FKs, RLS policies, triggers/functions/views, generated API types, Edge Functions, frontend
queries/forms, route scheduling, reports, and historical exports. The actual list must come from
dependency queries and source search.

### Safe expand/backfill/contract plan

1. **Preflight:** snapshot schema/dependencies; profile nulls/duplicates/orphans; identify what the
   small integer means and find a deterministic, reviewed mapping to one Wash Pro UUID. Abort if
   mapping is non-unique. Back up and rehearse restore.
2. **Expand:** add a nullable, explicitly named UUID assignment column and index; add a `NOT VALID`
   FK to the actual Wash Pro key. Do not reuse/cast the old column in place.
3. **Backfill:** populate batches using an approved mapping table with provenance; produce counts and
   exception report. Never guess unresolved rows.
4. **Compatibility:** update trusted assignment writes to atomically dual-write during rollout;
   readers prefer UUID with monitored legacy fallback. Prevent divergent values.
5. **Validate:** reconcile every active/historical row, validate FK, validate authorization/RLS and
   application paths, then make UUID required only if lifecycle rules prove assignment mandatory.
6. **Contract later:** after a separately approved observation window and rollback cutoff, remove
   legacy dependencies/column in a later migration—not Migration 001.

### RLS and API impact

Policies must compare authenticated identity through the confirmed profile-to-Wash-Pro mapping—not
user-supplied UUIDs. Until policies are atomically updated and negative-tested, exposing the new
column could broaden access. Generated REST/GraphQL/types may change; additive nullable rollout and
explicit field selection reduce breakage. Status completion must call a trusted authorization path.

### Rollback

Before contract, roll back application reads/writes to the legacy field while retaining the UUID
column and mapping evidence for diagnosis; disable dual-write only after draining traffic. Do not
reverse a partial backfill destructively. After legacy removal, rollback requires a tested restore
or reverse mapping and is a separate high-risk operation.

### Tests and deployment order

Run schema lint; mapping cardinality/orphan checks; FK checks; RLS matrices for anonymous, customer,
other Wash Pro, assigned Wash Pro, admin, and service role; assignment/status integration tests;
concurrent assignment/completion tests; generated-client compatibility; backfill rehearsal and
rollback; performance plans. Order: read-only discovery → mapping approval → staging backup/rehearsal
→ additive DDL → dual-write → backfill/exception review → FK validation → reader switch → monitor.

If discovery finds an existing authoritative UUID assignment, Migration 001 should not add another;
it should instead be re-scoped or declared unnecessary through an architecture decision.
