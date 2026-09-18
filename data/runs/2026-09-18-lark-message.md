# Lark retry note - 2026-09-18 Daily Radar

Status: not delivered.

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: `user`

Idempotency key: `daily-ai-native-radar-20260918-v1`

Message:

```markdown
### Daily AI Native Product Radar - 2026-09-18

主链路已更新并推送：Top 10 / Watchlist 7 / Skip 10。

公开数据：74 期历史日报，1273 个去重 GitHub 项目，1531 条项目历史记录。

今日 Top 方向：自托管 agent skills registry、policy-guarded browser、Jev browser action selection、phone-approved secrets、screen-to-agent bug reports、tender-document agent、browser ADE、skill ranking、typed-judgment MCP、browser provider control plane。

GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/
```

Failure:

```text
missing required scope(s): im:message.send_as_user
```

Retry after granting the user scope if needed:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

Send:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --markdown '### Daily AI Native Product Radar - 2026-09-18

主链路已更新并推送：Top 10 / Watchlist 7 / Skip 10。

公开数据：74 期历史日报，1273 个去重 GitHub 项目，1531 条项目历史记录。

今日 Top 方向：自托管 agent skills registry、policy-guarded browser、Jev browser action selection、phone-approved secrets、screen-to-agent bug reports、tender-document agent、browser ADE、skill ranking、typed-judgment MCP、browser provider control plane。

GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/' \
  --idempotency-key daily-ai-native-radar-20260918-v1
```
