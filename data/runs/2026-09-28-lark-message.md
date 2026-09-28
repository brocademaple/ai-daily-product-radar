# Lark retry note - 2026-09-28

Target chat: mjf-开发with Codex记录群

chat_id: oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f
identity: user
idempotency_key: daily-ai-native-radar-20260928-v1

Status: not delivered. The send attempt failed because the current user auth is missing scope `im:message.send_as_user`.

Error summary:

```json
{
  "ok": false,
  "identity": "user",
  "error": {
    "type": "authorization",
    "subtype": "missing_scope",
    "message": "missing required scope(s): im:message.send_as_user",
    "missing_scopes": ["im:message.send_as_user"]
  }
}
```

To authorize the required scope later:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization is completed, retry sending:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli im +messages-send \
  --as user \
  --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f \
  --idempotency-key daily-ai-native-radar-20260928-v1 \
  --markdown "**Daily AI Native Product Radar - 2026-09-28**

Repo-first chain completed and pushed.

- Top projects: 10
- Watchlist: 7
- Snapshot: 80 runs, 1394 projects, 1687 history entries
- Commit: 6c2b8c1
- Pages: https://brocademaple.github.io/ai-daily-product-radar/

Top focus: Arcbox, Celesto, cc-haha, computer-use-linux, Ogcode, Jev GUI Delegate, nuphus-mcp, mcp-audit-tool, Myna Recorder, BrewReel."
```
