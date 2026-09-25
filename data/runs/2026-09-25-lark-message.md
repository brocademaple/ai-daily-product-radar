# Lark retry note - 2026-09-25

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: `--as user`

Idempotency key: `daily-ai-native-radar-20260925-v1`

Status: not delivered. The send attempt failed with missing scope `im:message.send_as_user`.

Message:

```text
Daily AI Native Product Radar 2026-09-25

Top 10 / Watchlist 7 / Skip 10
主线已推送：a64c179 -> origin/main
Snapshot：78 runs, 1364 projects, 1633 history entries, latestRunDate 2026-09-25
Pages：https://brocademaple.github.io/ai-daily-product-radar/

今日关注：agent terminal/workbench、Windows MCP、persistent agent memory、session resume、browser-component agents、multi-machine harness。

本地文件：data/runs/2026-09-25.md 和 data/runs/2026-09-25.json
```

Retry command:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --text $'Daily AI Native Product Radar 2026-09-25\n\nTop 10 / Watchlist 7 / Skip 10\n主线已推送：a64c179 -> origin/main\nSnapshot：78 runs, 1364 projects, 1633 history entries, latestRunDate 2026-09-25\nPages：https://brocademaple.github.io/ai-daily-product-radar/\n\n今日关注：agent terminal/workbench、Windows MCP、persistent agent memory、session resume、browser-component agents、multi-machine harness。\n\n本地文件：data/runs/2026-09-25.md 和 data/runs/2026-09-25.json' \
  --idempotency-key daily-ai-native-radar-20260925-v1 \
  --json
```
