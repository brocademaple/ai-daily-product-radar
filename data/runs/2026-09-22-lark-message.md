# Feishu delivery retry — 2026-09-22

Target: `mjf-开发with Codex记录群` (`oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`)

Identity: user (`马锦枫`)

Idempotency key: `daily-ai-native-radar-20260922-v1`

## Delivery state

The sandboxed send could not refresh token storage. An approved non-sandbox retry reached Feishu but failed because user authorization lacks `im:message.send_as_user`. The public data, snapshot, build, commit, and GitHub push completed independently.

## Required authorization and retry

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After completing the device authorization, resend as user with the same idempotency key:

```bash
lark-cli im +messages-send --as user --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --markdown $'## Daily AI Native Product Radar · 2026-09-22\n\n- 已发布：76 期 / 1320 项目 / 1579 条历史记录\n- 今日 Top 10：Jev Chat Assistant、Third Hand、ESF、Rizzo Flow、jev-use、Preflight、jevals、Herdr GPUI、Sno Station、CometixCode\n- 信号：低延迟类型化决策开始进入手机副驾、macOS 可访问性控制、代理评估与隔离软件工厂；更值得关注的是测试、签名发布、沙箱、权限和脱敏边界。\n- 看板：https://brocademaple.github.io/ai-daily-product-radar/' --idempotency-key daily-ai-native-radar-20260922-v1
```
