# Lark delivery retry - 2026-07-11

Daily AI Native Product Radar 2026-07-11 main GitHub Pages chain completed, but Lark group delivery did not complete.

Target:

- Chat: `mjf-开发with Codex记录群`
- Chat ID: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`
- Identity: user
- Idempotency key: `daily-ai-native-radar-20260711-v1`

Failure:

```text
missing required scope(s): im:message.send_as_user, im:message
```

Retry after authorizing scopes:

```bash
lark-cli auth login --scope "im:message.send_as_user im:message" --no-wait --json
```

After authorization is completed, resend:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --markdown "**Daily AI Native Product Radar 2026-07-11**

主链路已完成并推送到 GitHub Pages 项目。

- Top: 10 个项目
- Watchlist: 6 个项目
- Skip: 8 个项目
- Snapshot: 40 期 / 595 个去重项目 / 729 条历史记录
- Commit: a49a3eb
- Pages: https://brocademaple.github.io/ai-daily-product-radar/

今日重点：agent skills/plugins 产品化、MCP 桌面/浏览器控制、AI companion richer UI、支付/外联/交易动作的安全边界。" \
  --idempotency-key daily-ai-native-radar-20260711-v1
```

CLI update notice seen during delivery:

```text
lark-cli 1.0.68 available, current 1.0.49, run: lark-cli update
```
