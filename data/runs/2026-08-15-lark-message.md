# 2026-08-15 Daily AI Native Product Radar — 飞书投递稿

幂等 key：`daily-ai-native-radar-20260815-v1`

## 投递状态

2026-08-15 本地 CLI 使用 user 身份发送到 `oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f`，在 API 写入前失败：缺少 scope `im:message.send_as_user`。CLI 提示需要运行：

```bash
lark-cli auth login --scope "im:message.send_as_user" --no-wait --json
```

完成授权后可用下方重试命令发送。

## 可发送内容

**Daily AI Native Product Radar · 2026-08-15**

GitHub Pages 主链路已完成：53 期历史日报、801 个去重项目、999 条历史记录。

今日 Top 9：
1. `mcpg-dev/mcpg` — Rust governed MCP gateway，覆盖协议、身份、授权、后端 dispatch 和可观测性
2. `Deep99739/Threadline` — 绑定 commit 与证据的 coding-agent handoff
3. `7757/Fan-Browser-Agent` — 可见桌面 browser agent，内置 Chromium、人类确认和本地任务历史
4. `labmimors/dsh-mcp-lens` — 大型 MCP catalog 的 progressive tool discovery / schema 压缩
5. `Ya-KARAS/AgentControlPlane` — web AI 到本地 Codex/Claude/OpenCode 等 executor 的委派控制面
6. `blakepiper/coducktor` — 本地 coding-agent cockpit，展示 live steps、costs、diffs 和 worktrees
7. `hocky0301/kamiwaza-engine` — 纸质表单照片到可运行业务 app 的 constrained DSL 生成器
8. `thedarkich/codelore` — 本地代码智能，AST sidecars + ranking + Ollama/OpenAI-compatible backend
9. `xingyangJP/esp32-ai-robot` — iPhone app 驱动 VLM→动作 loop 的 ESP32 rover

趋势：MCP 从“接更多工具”转向 governance、policy、observability 和 schema 成本控制；coding-agent 产品继续围绕 evidence handoff、control plane、cockpit 和 worktree/queue 展开；browser agent 分化为可见桌面 app、extension、本地 Playwright 原型和 regression harness。

公开看板：https://brocademaple.github.io/ai-daily-product-radar/
GitHub 提交：`6769619` (`Daily radar snapshot 2026-08-15`)

## 重试命令

```bash
lark-cli im +messages-send --as user --chat-id oc_c8ae6d4214cb5c1ab3566c90c6f7cb5f --markdown "$(sed '1,22d' data/runs/2026-08-15-lark-message.md)" --idempotency-key daily-ai-native-radar-20260815-v1
```
