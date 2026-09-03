# Lark retry note - Daily AI Native Product Radar 2026-09-03

Status: not delivered.

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: user

Idempotency key: `daily-ai-native-radar-20260903-v1`

Failure:

```text
missing required scope(s): im:message.send_as_user
```

Retry auth command:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization is completed, retry delivery:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --msg-type text \
  --text "Daily AI Native Product Radar 2026-09-03 已发布：Top 10 / Watchlist 7 / Skip 8。主趋势：WebMCP 页面工具成为产品原语，浏览器/文件/硬件/工作流都在把 agent action contract 产品化；人类确认、接管、审批和本地隐私是主要护栏。GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/ commit f146bc2" \
  --idempotency-key daily-ai-native-radar-20260903-v1
```

CLI notice during failed attempt: current `1.0.85`, latest `1.0.93`.
