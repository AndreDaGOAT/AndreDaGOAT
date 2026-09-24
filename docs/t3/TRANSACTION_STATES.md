# Transaction state machines

## FOUND IN REPOSITORY

No service-request status enum, transition code, payment lifecycle, or payout state machine was
found. Even the casing/allowed value of `Completed` cannot be confirmed from repository evidence.

## PROPOSED FOR T³

### Service verification

```text
completion_claimed → pending_checks → auto_verified
                                  ↘ needs_more_evidence
                                  ↘ human_review → verified | rejected
```

Only an authorized transition to completion creates an idempotent verification candidate. AI may
recommend a branch but cannot set `verified` or any financial state. A later dispute opens a review
and adjustment workflow; it does not rewrite the original decision.

### Financial transaction and earning

```text
candidate → validated → posted → available → reserved → paid
                ↘ rejected       ↘ held       ↘ reservation_released
```

Service source uniqueness prevents duplicate earnings. `posted/available/paid` facts are append-only
events or monotonic state plus immutable history. Tips enter as independent validated sources and can
become available after an earlier service payout. Employee compensation exits to payroll before the
contractor earning/payout states.

### Payout request

```text
requested → reserving → provider_pending → succeeded
                     ↘ rejected          ↘ failed → released/retryable
                                          ↘ unknown → reconcile
```

The request contains intent and an idempotency key, not an authoritative amount. In one database
transaction, T³ locks/selects eligible entries, checks both authorization gates/risk/limits, and
records reservations. A stable provider idempotency key survives retries. Only authenticated provider
truth plus reconciliation finalizes success.

### Provider webhook inbox

```text
received → signature_verified → processing → processed
                 ↘ rejected                  ↘ retryable_error | manual_review
```

Unique `(provider, provider_event_id)` insertion precedes effects. Out-of-order events are retained
and compared to provider-object versions/timestamps without regressing a terminal state.

### Failure expectations

Simultaneous requests serialize over eligible entries; timeout-after-acceptance enters `unknown`;
duplicate deliveries are no-ops; failed payout releases through an explicit event; refunds,
chargebacks, and manual corrections append adjustments; outages preserve retryable intent.
