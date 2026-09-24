# AI-assisted evidence verification

## FOUND IN REPOSITORY

No AI dependency, evidence/photo model, object-storage policy, completion artifact, model invocation,
or review UI was found in this checkout.

## PROPOSED FOR T³

Evidence should retain immutable object reference/hash, capture/upload times, submitting actor,
service/request/appointment UUIDs, allowed metadata, consent/retention classification, and access
history. Before/after evidence may be assessed for same-vehicle consistency, required views,
request/vehicle consistency, duplicates/reuse, timing/duration/location plausibility, visible service
completion, and anomaly patterns.

An assessment records model/provider and version, policy/input version, evidence hashes, confidence,
signals/reasons, timestamps, errors, and recommendation. Minimize data sent to a model and contractually
validate retention/training behavior. Do not send payment or unnecessary identity data.

```text
Evidence → integrity/quality checks → AI advisory assessment
         → deterministic policy → auto-verify | more evidence | human review
```

AI cannot call payout functions, write ledger entries, silently change compensation, or permanently
sanction a worker. Low confidence or high-impact ambiguity routes to trained human review with reason,
appeal, override audit, and bias/false-positive monitoring. Duplicate detection requires secure hash
or embedding access controls and documented retention. Model drift, prompt/model changes, and outage
fallbacks require versioned evaluation before rollout.
