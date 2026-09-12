# Lark retry note - 2026-09-12

Status: delivery not completed.

Target chat: mjf-开发with Codex记录群
Chat ID: oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f
Identity: user
Idempotency key: daily-ai-native-radar-20260912-v1

Failure observed:

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
  --markdown "**Daily AI Native Product Radar 2026-09-12**\n\nTop 10 / Watchlist 7 / Skipped 10。今日重点：n8n MCP 回滚防护、本地 Rust coding agent、agent 安全边界、最小权限策略编译、人类确认的求职自动化、文档/Android/漫画 MCP。\n\nTop 3：FarazHayder/n8n-mcp-guard、flashback7766/FlashAgent、ECD5A/Tkach-Security。\n\nPages 已发布：https://brocademaple.github.io/ai-daily-product-radar/\n数据文件：data/runs/2026-09-12.md 和 data/runs/2026-09-12.json\nCommit：9cd00bf" \
  --idempotency-key daily-ai-native-radar-20260912-v1 \
  --format json
```
