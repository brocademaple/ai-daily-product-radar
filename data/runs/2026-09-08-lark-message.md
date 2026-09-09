# 2026-09-08 Lark retry note

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`

Identity: user

Idempotency key: `daily-ai-native-radar-20260908-v1`

Status: not delivered.

The sandboxed send first failed because local token refresh storage was not writable. A narrow non-sandbox retry reached Lark authorization and failed with:

```text
missing required scope(s): im:message.send_as_user
```

Retry after granting the user scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

After authorization is completed, resend:

```bash
LARKSUITE_CLI_NO_UPDATE_NOTIFIER=1 LARKSUITE_CLI_NO_SKILLS_NOTIFIER=1 lark-cli im +messages-send --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --as user --idempotency-key daily-ai-native-radar-20260908-v1 --markdown $'## 2026-09-08 AI Native Product Radar\n\n已发布到 GitHub Pages： https://brocademaple.github.io/ai-daily-product-radar/\n\n- Top Projects: 10\n- Watchlist: 7\n- Skipped: 8\n- Snapshot: 66 runs / 1089 projects / 1315 history entries\n- Commit: 91237e5\n\n今日重点：agent context database、parallel coding-agent ADE、meta-harness、auth gateway、shared agent room、sandbox runtime、agentic backend platform、source-cited memory wiki、headless browser runtime、policy-gated PR control plane。\n\n本次只做 GitHub API + README/root audit；没有 clone/build/run 第三方项目。'
```
