# Daily AI Native Product Radar - 2026-08-17

GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/

主链路已更新: 55 runs / 843 projects / 1044 history entries。

## Top 5
1. AreevAI/areev (91) - Embedded Agent Memory Engine
2. prellr/apiary (88) - Portable Agent Host
3. stef41/agentvisor-ai (87) - Agent Traffic Audit Proxy
4. majiayu000/dsh-desk (86) - Coding Agent Desktop Distribution
5. zh667/TokenLedger (84) - Agent Token Accounting Plugin

## Watchlist sample
- WTStarMark/QAQ (76)
- CHENHUI-X/dsh-client-ui-dashboard (75)
- omnigauge/omnigauge (74)

## 今日趋势
The freshest AI-native product activity is clustered around agent operating layers: durable memory engines, portable agent identity/governance, inline audit proxies, quota/token observability and desktop/mobile shells for coding-agent harnesses. DeepSeek Harness continues to attract plugin and distribution work, but the strongest items are the ones with concrete install/build paths, state models, CI or safety boundaries. A parallel enterprise-app cluster is moving from generic RAG demos toward admin consoles, tenant isolation, semantic query validation and operational dashboards.

本地报告: data/runs/2026-08-17.md
幂等 key: daily-ai-native-radar-20260817-v1

## Delivery status

Feishu/Lark delivery was attempted for chat `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f` as user with idempotency key `daily-ai-native-radar-20260817-v1`.

Sandboxed attempt failed while refreshing local token storage:

`keychain Set failed: open /Users/eee/Library/Application Support/lark-cli/... operation not permitted`

Escalated retry reached authorization validation but failed because the user identity is missing scope:

`missing required scope(s): im:message.send_as_user`

Retry after reauthorization:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
lark-cli im +messages-send --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --as user --markdown "$(cat data/runs/2026-08-17-lark-message.md)" --idempotency-key daily-ai-native-radar-20260817-v1
```
