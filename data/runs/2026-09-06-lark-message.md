# Lark retry note - 2026-09-06 Daily AI Native Product Radar

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: user

Idempotency key: `daily-ai-native-radar-20260906-v1`

Status: not delivered.

First sandboxed attempt failed because the local token refresh could not write to keychain storage. A non-sandbox retry reached Lark authorization and failed because the user identity is missing `im:message.send_as_user`.

Retry after granting the missing scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After completing authorization, send:

```bash
lark-cli im +messages-send --as user --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --text $'Daily AI Native Product Radar 2026-09-06\n\nTop 10 / Watchlist 7 / Skip 8\n主线已推送：ce8715d -> origin/main\nSnapshot：65 runs, 1072 projects, 1290 history entries, latestRunDate 2026-09-06\nPages：https://brocademaple.github.io/ai-daily-product-radar/\n\n今日关注：agent memory、parallel coding-agent ADE、AI gateway、self-hosted personal agent、governed browser-computer agents、voice runtime、unified harness API。\n\n本地文件：data/runs/2026-09-06.md 和 data/runs/2026-09-06.json' --idempotency-key daily-ai-native-radar-20260906-v1 --json
```

