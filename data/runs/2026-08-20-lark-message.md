# Lark delivery retry - 2026-08-20

Status: not delivered.

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: `--as user`

Idempotency key: `daily-ai-native-radar-20260820-v1`

Failure:

```text
missing required scope(s): im:message.send_as_user
```

Authorize the minimal missing user scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization is completed in a later turn, finish login with the returned device code:

```bash
lark-cli auth login --device-code <device_code>
```

Retry command:

```bash
lark-cli im +messages-send \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --as user \
  --idempotency-key daily-ai-native-radar-20260820-v1 \
  --markdown $'Daily AI Native Product Radar - 2026-08-20\n\n主链路已完成并推送 GitHub Pages 项目。\n\nTop 10: pqpo/pragma, AMAP-ML/LongHorizon-Harness, nexu-io/open-design, get-bb/bb, fstubner/harness-dispatch, walleliu1016/lynel-desktop, KyaniteLabs/kinocut, artokun/comfyui-mcp, codecoradev/uteke, poojakira/mcp-agent-security-gateway.\n\nWatchlist 7; snapshot: 57 runs / 887 projects / 1090 history entries / latestRunDate 2026-08-20.\n\nPages: https://brocademaple.github.io/ai-daily-product-radar/\nCommit: e227da0 Daily radar snapshot 2026-08-20'
```
