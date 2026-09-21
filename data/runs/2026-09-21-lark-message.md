# Lark retry - 2026-09-21

Status: not delivered. User identity is missing scope `im:message.send_as_user`.

Chat ID: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`
Idempotency key: `daily-ai-native-radar-20260921-v1`

Message draft:

```text
Daily AI Native Product Radar 2026-09-21 已更新并推送到 GitHub Pages 主链路。

Top 10 / Watchlist 7 / Skip 10。重点：ZCode、RepoPilot、abide、Hermes Jev Skills、geo-sleuth、coding-agent、Aldus Palace、Awwards MCP、otelyssey、jev-ultrafast-mcp。

Snapshot: 75 runs, 1300 projects, 1558 history entries。
Pages: https://brocademaple.github.io/ai-daily-product-radar/
Commit: 3fb54df
```

Retry auth command if the user wants to grant scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

Retry send command after authorization:

```bash
lark-cli im +messages-send --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --as user --msg-type text --content '{"text":"Daily AI Native Product Radar 2026-09-21 已更新并推送到 GitHub Pages 主链路。\n\nTop 10 / Watchlist 7 / Skip 10。重点：ZCode、RepoPilot、abide、Hermes Jev Skills、geo-sleuth、coding-agent、Aldus Palace、Awwards MCP、otelyssey、jev-ultrafast-mcp。\n\nSnapshot: 75 runs, 1300 projects, 1558 history entries。\nPages: https://brocademaple.github.io/ai-daily-product-radar/\nCommit: 3fb54df"}' --idempotency-key daily-ai-native-radar-20260921-v1
```
