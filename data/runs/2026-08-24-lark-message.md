# Lark retry note - Daily AI Native Product Radar 2026-08-24

Lark group delivery failed after the public repository chain had completed.

- Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`
- Identity: `user`
- Idempotency key: `daily-ai-native-radar-20260824-v1`
- Failure: missing required scope `im:message.send_as_user`

Retry after user auth grants the missing scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization completes, send:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --msg-type text \
  --text 'Daily AI Native Product Radar 2026-08-24 已发布：Top 10，Watchlist 7，Skip 8。Snapshot: 60 runs / 955 projects / 1165 history entries。Commit: 935720d。Pages: https://brocademaple.github.io/ai-daily-product-radar/' \
  --idempotency-key daily-ai-native-radar-20260824-v1
```

Public chain status before this retry note:

- Commit: `935720d` (`Daily radar snapshot 2026-08-24`)
- Push target: `origin/main`
- GitHub Pages workflow: `32689159523`
- GitHub Pages URL: <https://brocademaple.github.io/ai-daily-product-radar/>
- Yuque archive: succeeded in `brocademaple/fww6dt`, doc id `282466665`, slug `daily-ai-native-product-radar-2026-08-24`
