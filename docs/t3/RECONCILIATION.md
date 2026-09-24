# Reconciliation design

## FOUND IN REPOSITORY

No ledger, provider records, reconciliation job, alert mechanism, or audit implementation was found.

## PROPOSED FOR T³

Reconciliation compares three independent truths: operational (service/verification), financial
(transactions, balanced allocations, earnings/reservations), and processor (payments, transfers,
payouts, refunds, disputes). It detects missing/duplicate webhooks, provider/ledger amount or currency
mismatch, stale/unknown payout, orphaned allocation, duplicate source earning, unreconciled refund or
chargeback, and unexpected negative availability.

### Controls and cadence

- Event-driven reconciliation follows every provider event and ambiguous command.
- Scheduled incremental runs revisit open objects; daily control totals cover payments, allocations,
  earnings, reservations, payouts, refunds, fees, and disputes by currency.
- Periodic full sampling/backfill compares provider APIs/reports with immutable internal source IDs.
- Unique source keys and balanced allocation checks detect rather than mask errors.

Each discrepancy becomes an immutable case with type, severity, object references, observed/expected
facts, first/last seen, owner, evidence, resolution, and linked adjustment/audit IDs. Automation may
retry safe idempotent reads/processing; it must not silently rewrite ledger history. Corrections use
reviewed reversals/adjustments. Alerts cover aging unknown payouts, signature failures, replay spikes,
balance violations, missing events, and reconciliation job failure.

Recovery drills must cover provider success with local response loss, missing/out-of-order webhook,
provider outage, database outage mid-processing, failed payout, partial/full refund, chargeback after
payout, and restoration from backup.
