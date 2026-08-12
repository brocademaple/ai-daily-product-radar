# Lark retry note - 2026-08-12

Status: not delivered.

Reason: `lark-cli im +messages-send --as user` failed before sending because the user token is missing scope `im:message.send_as_user`.

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Idempotency key: `daily-ai-native-radar-20260812-v1`

Authorize first:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization is completed, retry:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli im +messages-send --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --as user --markdown 'Daily AI Native Product Radar 2026-08-12 已发布

Top 10：Remarc、Pinvou、CoderBar、ToolPermit、desktop-harness、ainote、AIfred、moli、hr-onboarding-agent、agentic-rag-enterprise-assistant
Watchlist 5：NVIDIA retail-shopping-assistant、VisionClaw、Agent-Reach、headroom、sim

GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/
Commit: 0778cf5
Snapshot: 50 runs / 740 projects / 936 history entries / latestRunDate 2026-08-12

本次说明：GitHub API 两条宽查询超时，已保存可用 API 响应与 README 审计；未 clone/install/run 第三方仓库。' --idempotency-key daily-ai-native-radar-20260812-v1
```
