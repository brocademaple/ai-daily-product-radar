# Lark Retry Note - Daily AI Native Product Radar 2026-09-10

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: user

Idempotency key: `daily-ai-native-radar-20260910-v1`

Status: not delivered. Sandbox retry was blocked by local keychain write access; non-sandbox retry reached Lark and failed because the current user authorization is missing `im:message.send_as_user`.

Missing scope:

```text
im:message.send_as_user
```

Retry command after user re-authorizes the missing scope:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --msg-type text \
  --text 'Daily AI Native Product Radar 2026-09-10 已发布

Top 10 / Watchlist 7 / Skip 10
Snapshot: 68 runs, 1112 projects, 1369 history entries
Commit: f5e6455
Pages: https://brocademaple.github.io/ai-daily-product-radar/

Top focus: Chrome DevTools MCP for agents, AI pentesting, agent-native video rendering, cross-agent memory, self-hosted personal agents, browser automation CLI, and AI app builders.

GitHub API note: late README audits hit unauthenticated rate limits; metadata-only watchlist items are marked in the report.' \
  --idempotency-key daily-ai-native-radar-20260910-v1
```

Authorization hint from CLI:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```
