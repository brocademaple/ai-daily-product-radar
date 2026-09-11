# Lark retry note - 2026-09-11

Status: delivery not completed.

Target chat: mjf-开发with Codex记录群
Chat ID: oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f
Identity: user
Idempotency key: daily-ai-native-radar-20260911-v1

Failure observed after non-sandbox retry:

```text
missing required scope(s): im:message.send_as_user
```

Grant the missing user scope, then retry:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization is completed, send:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --markdown "**Daily AI Native Product Radar 2026-09-11**\n\nTop 10 / Watchlist 7 / Skipped 10。今日重点：coding-agent 手机监督、发布/MCP、GitHub 只读上下文网关、API 安全验证、secret redaction、agent demo video。\n\nTop 3：viminizer/remux、Drop-to-run/drop2run-cli、bohanyt/github-but-fast。\n\nPages 已发布： https://brocademaple.github.io/ai-daily-product-radar/\n数据文件：data/runs/2026-09-11.md 和 data/runs/2026-09-11.json\nCommit：bf0bcdf" \
  --idempotency-key daily-ai-native-radar-20260911-v1 \
  --format json
```
