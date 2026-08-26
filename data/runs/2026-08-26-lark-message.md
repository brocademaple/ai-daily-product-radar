# Lark retry - Daily AI Native Product Radar 2026-08-26

Status: not sent. The repo-first public chain was already committed and pushed before this best-effort delivery attempt.

Target chat: `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`
Identity: user
Idempotency key: `daily-ai-native-radar-20260826-v1`
Failure: missing required scope `im:message.send_as_user`

Retry after authorizing the missing scope:

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
# Complete the device-code flow, then run from repo root:
node - <<'NODE_RETRY'
const fs = require('fs');
const { spawnSync } = require('child_process');
const msg = fs.readFileSync('/tmp/radar_2026_08_26_lark_message.md', 'utf8');
const result = spawnSync('lark-cli', ['im', '+messages-send', '--chat-id', 'oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f', '--as', 'user', '--markdown', msg, '--idempotency-key', 'daily-ai-native-radar-20260826-v1', '--json'], { encoding: 'utf8' });
process.stdout.write(result.stdout || '');
process.stderr.write(result.stderr || '');
process.exit(result.status ?? 1);
NODE_RETRY
```

Message content:

```markdown
# Daily AI Native Product Radar - 2026-08-26

GitHub Pages: https://brocademaple.github.io/ai-daily-product-radar/

本次已推送仓库主链路：
- Top Projects: 10
- Watchlist: 7
- Skipped: 8
- Snapshot: 61 runs / 979 projects / 1190 history entries
- Commit: b416e64 Daily radar snapshot 2026-08-26

Top 5:
1. truespar/sentio - agent email inbox/API/MCP infrastructure
2. Stupidoodle/swissdevjobs-cli - job-search CLI/MCP for agents
3. w-partners/Wbrowser - logged-in Chrome bridge for assistants
4. MaxHu-xuan/task-state-guard - restart reconciliation guardrail
5. PrismorSec/patchbot - scanner plus coding-agent fix PR pipeline

趋势：agent inbox、真实浏览器控制、完成证据、事务安全和垂直 RAG/voice workflows 正在产品化。

完整报告：data/runs/2026-08-26.md
```
