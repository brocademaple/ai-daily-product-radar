# Yuque retry note - Daily AI Native Product Radar 2026-09-03

Status: not archived.

Target repo: `brocademaple/fww6dt`

Directory: Daily AI Native Product Radar under `向26出发`

Suggested title: `2026-09-03 Daily Radar`

Suggested slug: `daily-ai-native-product-radar-2026-09-03`

Failure:

```text
yuque_search daily-ai-native-product-radar-2026-09-03 failed with Too Many Requests
```

No create or update call was made after the rate-limit response, to avoid duplicate documents.

Retry order:

1. Search for existing doc slug `daily-ai-native-product-radar-2026-09-03`.
2. If found, update that document with `data/runs/2026-09-03.md`.
3. If not found, create a new public document in `brocademaple/fww6dt` titled `2026-09-03 Daily Radar` with slug `daily-ai-native-product-radar-2026-09-03`.
