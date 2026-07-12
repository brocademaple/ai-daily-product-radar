# Daily AI Native Product Radar - 2026-07-12

GitHub Pages 数据已更新并推送：
https://brocademaple.github.io/ai-daily-product-radar/

- Top projects: 10
- Watchlist: 6
- Snapshot: 41 runs, 618 deduplicated projects, 753 history entries
- Latest run: 2026-07-12
- Commit: c15c478

今日主线：
1. Agent skills 正在变成端到端生产工具，代表项目包括 Vox Director、Marketing Studio、Generative Media Skills。
2. Coding-agent reliability 从提示词转向 loop、memory、workspace，代表项目包括 Loop.js、Mnemon、OpenLoomi。
3. Local-first/self-hosted agent platform 继续活跃，DuDuClaw、Omadia、Mnemon 都强调可审计和部署。
4. Agent 安全工具开始围绕本机动作与日志解释展开，Agent Install Monitor、Sigwood 值得继续观察。

Top 3:
1. Alisa0808/vox-director - Agent skill for finished explainer videos - Score 86
2. ucsandman/marketing-studio - Agent-driven launch asset studio - Score 85
3. loop-js/loop.js - Goal-loop engineering framework - Score 84

Full report:
https://github.com/brocademaple/ai-daily-product-radar/blob/main/data/runs/2026-07-12.md

Retry command:
lark-cli im +messages-send --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --as user --markdown "$(cat data/runs/2026-07-12-lark-message.md)" --idempotency-key daily-ai-native-radar-20260712-v1

Delivery status:
- Attempted at 2026-07-12 18:20 Asia/Shanghai with user identity.
- Failed before API send because local keychain access is unavailable in this automation context: `keychain Get failed: keychain not initialized`.
- lark-cli update notice: current 1.0.49, latest 1.0.68.

Recovery options:
- In an interactive Terminal, run `lark-cli config keychain-downgrade` to materialize the master key into a local file, then retry the command above.
- Or reconfigure with `lark-cli config init`, then retry the same idempotency key.
