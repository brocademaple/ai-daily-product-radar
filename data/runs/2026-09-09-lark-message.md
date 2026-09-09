# Lark Retry - Daily AI Native Product Radar 2026-09-09

Status: not delivered.

Attempted at: 2026-09-09T19:59:00+08:00

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: `user`

Idempotency key: `daily-ai-native-radar-20260909-v1`

Failure:

```text
missing required scope(s): im:message.send_as_user
```

Retry after completing user authorization for `im:message.send_as_user`:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 \
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --msg-type text \
  --content 'Daily AI Native Product Radar 2026-09-09

Top 10: nexu-io/open-design, headroomlabs-ai/headroom, colbymchenry/codegraph, Hmbown/Codewhale, Yeachan-Heo/oh-my-claudecode, herdrdev/herdr, esengine/DeepSeek-Reasonix, Yeachan-Heo/oh-my-codex, getpaseo/paseo, citrolabs/ego-lite.

Watchlist 7: EverOS, RocketRide, Worktrunk, ODS, LobsterAI, Ouroboros, Entire CLI.

Snapshot: 67 runs, 1101 projects, 1342 history entries. Commit: b1fa338. Pages: https://brocademaple.github.io/ai-daily-product-radar/' \
  --idempotency-key daily-ai-native-radar-20260909-v1
```
