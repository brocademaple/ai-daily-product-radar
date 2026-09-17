# Lark retry note - 2026-09-17 Daily Radar

Status: not delivered.

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: `user`

Idempotency key: `daily-ai-native-radar-20260917-v1`

Failure:

```text
missing required scope(s): im:message.send_as_user
```

Retry after granting the user scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization completes, send:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --markdown '### Daily AI Native Product Radar - 2026-09-17

主链路已更新并推送：Top 10 / Watchlist 7 / Skip 10。

公开数据：73 期历史日报，1246 个去重 GitHub 项目，1504 条项目历史记录。

今日 Top 方向：低成本 macOS computer-use、iPad/iPhone 真实设备控制、RimWorld 自改写 agent、coding-agent 记忆层、本地人审工作台、iOS Simulator MCP、结构化 code review、agent2llm、agent commerce acceptance、tool evidence guard。

GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/' \
  --idempotency-key daily-ai-native-radar-20260917-v1
```
