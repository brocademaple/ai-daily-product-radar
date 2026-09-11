# Yuque retry note - 2026-09-11

Status: archive not completed.

Target repo: brocademaple/fww6dt
Directory/context: Daily AI Native Product Radar under 向26出发
Suggested title: 2026-09-11 Daily Radar
Suggested slug: daily-ai-native-product-radar-2026-09-11
Source markdown: data/runs/2026-09-11.md

Failure observed:

```text
Yuque search for daily-ai-native-product-radar-2026-09-11 failed with Too Many Requests. No create/update call was made after the rate limit.
```

Retry when Yuque rate limit clears by searching the slug first, then create or update exactly one document with the markdown report.

Suggested create parameters:

```json
{
  "repo_id": "brocademaple/fww6dt",
  "title": "2026-09-11 Daily Radar",
  "slug": "daily-ai-native-product-radar-2026-09-11",
  "format": "markdown",
  "public": 0,
  "body_file": "data/runs/2026-09-11.md"
}
```
