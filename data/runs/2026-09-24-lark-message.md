# Lark retry note - 2026-09-24

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: `--as user`

Idempotency key: `daily-ai-native-radar-20260924-v1`

Status: not delivered. The send attempt failed with missing scope `im:message.send_as_user`.

Message:

```text
Daily AI Native Product Radar 2026-09-24

Top 10 / Watchlist 7 / Skip 10
主线已推送：cc3a754 -> origin/main
Snapshot：77 runs, 1346 projects, 1606 history entries, latestRunDate 2026-09-24
Pages：https://brocademaple.github.io/ai-daily-product-radar/

今日关注：local Apple-silicon computer-use、Jev/Laya browser decisions、browser-to-Excel tests、docs drift repair、macOS/desktop app control、VS Copilot orchestration、transparent enterprise RAG。

本地文件：data/runs/2026-09-24.md 和 data/runs/2026-09-24.json
```

Retry command:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --text $'Daily AI Native Product Radar 2026-09-24\n\nTop 10 / Watchlist 7 / Skip 10\n主线已推送：cc3a754 -> origin/main\nSnapshot：77 runs, 1346 projects, 1606 history entries, latestRunDate 2026-09-24\nPages：https://brocademaple.github.io/ai-daily-product-radar/\n\n今日关注：local Apple-silicon computer-use、Jev/Laya browser decisions、browser-to-Excel tests、docs drift repair、macOS/desktop app control、VS Copilot orchestration、transparent enterprise RAG。\n\n本地文件：data/runs/2026-09-24.md 和 data/runs/2026-09-24.json' \
  --idempotency-key daily-ai-native-radar-20260924-v1 \
  --json
```
