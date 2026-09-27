# Yuque retry note - 2026-09-27 Daily Radar

Target repo: brocademaple/fww6dt
Suggested title: 2026-09-27 Daily Radar
Suggested slug: daily-ai-native-product-radar-2026-09-27
Format: markdown
Visibility: private/default unless changed intentionally

Status: Not archived in this run because yuque_search returned Too Many Requests before create/update. Do not blindly create a duplicate; search/list first after rate limit resets.

Retry outline:
1. Search or list docs in brocademaple/fww6dt for slug/title daily-ai-native-product-radar-2026-09-27.
2. If present, update that doc with the markdown report below.
3. If absent, create a new doc with title 2026-09-27 Daily Radar and slug daily-ai-native-product-radar-2026-09-27.

---

# Daily AI Native Product Radar - 2026-09-27

数据窗口：2026-09-24T00:00:00Z to 2026-09-27T22:38:35+08:00。GitHub Search API 查询最近创建或活跃更新的 AI agent、MCP、computer-use、browser automation、code agent、workflow、RAG/LLM app、assistant、copilot 等方向，并对候选仓库做 repository/root/README audit。

信息来源：查询结果保存于 `/tmp/radar_2026_09_27_api/`，包含 7 组 GitHub Search API 响应。合并去重后约 160 个候选；完整 repo metadata、root contents、README 审计保存于 `/tmp/radar_2026_09_27_readmes/`。未认证 GitHub API 在后半段返回 403 rate limit，因此 Top 主要使用已完整审计候选，Watchlist 中少量项目使用搜索元数据和已保存候选摘要保守判断。

关键假设：评分基于 GitHub metadata、README/root-content evidence、项目描述、star/fork、创建/更新时间、文档/测试/安装/安全文件等静态证据。没有 clone、install、build、run、browser-test、desktop-test、mobile-test、MCP handshake、credential test、security scan、payment test 或 provider connection。star 数与 pushed_at 是采集时点快照，后续可能变化。

## 今日趋势观察

AI-native 产品继续从“单个聊天入口”转向“操作系统层”：agent 工作台、跨终端通信、代码图谱、MCP 安全审计、私有 agent 电脑、消息桥、本地桌面助手都在把 agent 的动作、上下文、权限和复盘证据产品化。今天最值得关注的是两条线：一是给 coding agent 提供更少 token、更强上下文和更清晰协作边界；二是把 browser/desktop/control-plane 变成可审计、可授权、可回放的执行面。

## Top Projects

### 1. [CopilotKit/OpenBot](https://github.com/CopilotKit/OpenBot)
- 分类：self-hosted AI coworker computer
- AI Native Product Score：92
- 做什么：开源 AI coworker 平台，每个 coworker 拥有独立 browser、files、tools，并通过 AG-UI 接入不同 agent stack。
- 面向谁：希望在自有基础设施中运行可控 AI coworker 的企业和产品团队。
- AI native 点：把 agent 的执行电脑、登录态、文件和工具授权变成可拥有、可记录、可替换的产品对象。
- 增长/活跃信号：Created 2026-08-17，pushed 2026-09-27，约 5,626 stars；root audit 看到 desktop、docker、charts、examples、docs、agent-* adapters、Tauri signing skill、env example。
- 可运行性判断：High from Docker/Tauri/desktop/examples/docs/app structure；未运行 browser、desktop、AG-UI agent 或 infra deploy。
- 建议动作：用内部假账号跑一个低风险 browser/file workflow，重点验证每次 action 的预决策和事后记录。

### 2. [manaflow-ai/cmux](https://github.com/manaflow-ai/cmux)
- 分类：macOS terminal workspace for coding agents
- AI Native Product Score：91
- 做什么：基于 Ghostty 的 macOS terminal，提供 vertical tabs、notifications、CLI、native app assets、examples 和 release DMG。
- 面向谁：同时运行 Claude Code、Codex、OpenCode 等多个 agent session 的开发者。
- AI native 点：把并行 agent session 当成一等工作对象管理，而不是散落在多个 terminal window 中。
- 增长/活跃信号：Pushed 2026-09-27，约 27,433 stars；root audit 看到 `.agents`、CLI、Native、Examples、Packages、多语言 README、release download。
- 可运行性判断：High from native packaging, examples, docs, release surface；未安装 macOS app 或运行 agent session。
- 建议动作：用两个 disposable agent session 试 tabs、notifications、session recovery 和关闭重开行为。

### 3. [colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)
- 分类：local code graph for agents
- AI Native Product Score：90
- 做什么：为 Claude Code、Codex、Gemini、Cursor、OpenCode 等生成本地预索引代码知识图谱，减少 token 和文件读取。
- 面向谁：大型代码库中的 coding-agent 用户和希望降低上下文成本的工程团队。
- AI native 点：把“代码理解”从临时 grep/read 文件变成可同步、可本地运行、可供多个 agent 使用的语义图谱。
- 增长/活跃信号：Pushed 2026-09-27，约 72,163 stars；root audit 看到 src、ui、tests、site、telemetry docs、install scripts、AGENTS/CLAUDE files。
- 可运行性判断：High on static evidence from install scripts, tests, local-first docs, UI and package files；未执行索引或 agent 集成。
- 建议动作：用一个中型 repo 测试索引耗时、增量同步、token 节省和本地数据边界。

### 4. [chenhg5/cc-connect](https://github.com/chenhg5/cc-connect)
- 分类：messaging bridge for local coding agents
- AI Native Product Score：89
- 做什么：把 Claude Code、Cursor、Gemini CLI、Codex 等本地 coding agents 连接到飞书、钉钉、Slack、Telegram、Discord、LINE、企业微信等消息平台。
- 面向谁：想通过 IM 远程查看和驱动本地 coding agent 的开发者。
- AI native 点：将 agent session 从本地终端扩展为多消息平台可达的协作端点，并保留 daemon/web/provider 结构。
- 增长/活跃信号：Pushed 2026-09-27，约 15,680 stars；root audit 看到 cmd、core、daemon、web、docs、tests、provider presets、skill presets、INSTALL.md。
- 可运行性判断：Medium-high from Go app, daemon, web, docs and tests；未连接任何真实 IM 平台或本地 agent。
- 建议动作：先用测试群和 disposable repo 验证权限、消息回放、取消任务与日志脱敏。

### 5. [23blocks-OS/ai-maestro](https://github.com/23blocks-OS/ai-maestro)
- 分类：agent orchestrator dashboard
- AI Native Product Score：88
- 做什么：面向 AI-first organization 的 agent dashboard，支持 persistent memory、agent-to-agent messaging、multi-machine movement、skills 和 plugin install。
- 面向谁：同时调度多个 Claude/Codex/自定义 agent 的团队和高级个人用户。
- AI native 点：把 agent 编排、记忆、通信、迁移和技能安装收束到一个工作台。
- 增长/活跃信号：Pushed 2026-09-25，约 799 stars；root audit 看到 app、agent-container、channels、components、contexts、docs、install scripts、SECURITY、PRODUCT。
- 可运行性判断：Medium-high from dashboard/app/container/install evidence；未启动 dashboard、agent container 或 multi-machine workflow。
- 建议动作：验证 agent-to-agent messaging 的审计日志和跨机器迁移边界，再连接真实项目。

### 6. [graygnatconsole/mcp-audit-tool](https://github.com/graygnatconsole/mcp-audit-tool)
- 分类：MCP security audit CLI
- AI Native Product Score：87
- 做什么：扫描 MCP server/agent configs 中的 tool poisoning、rug pull、hardcoded secrets、command injection 和 supply-chain 风险。
- 面向谁：正在接入 MCP server 的 agent 用户、平台团队和安全负责人。
- AI native 点：把 agent tool surface 的信任问题前置为 CLI/SARIF/CI 审计，而不是等 model 执行危险工具。
- 增长/活跃信号：Created 2026-09-26，pushed 2026-09-26，约 94 stars；root audit 看到 pyproject、src、tests、examples、install.sh、CI badge、README safety framing。
- 可运行性判断：Medium-high from Python package, tests, examples and SARIF/CI positioning；未对真实 MCP config 运行。
- 建议动作：用 synthetic malicious MCP configs 跑一次，记录 false positive 和 CI 输出质量。

### 7. [jgravelle/jcodemunch-mcp](https://github.com/jgravelle/jcodemunch-mcp)
- 分类：symbol-level code retrieval MCP
- AI Native Product Score：86
- 做什么：使用 tree-sitter AST 提供精准代码检索 MCP，减少 coding agent 探索代码时读取整文件的 token 浪费。
- 面向谁：把 Claude Code、Cursor 或其他 MCP client 用在大型代码库中的团队。
- AI native 点：把代码检索做成 MCP 能力层，面向 agent 的上下文预算和符号级定位优化。
- 增长/活跃信号：Pushed 2026-09-27，约 2,715 stars；root audit 看到 QUICKSTART、SECURITY、Dockerfile、docs、client/config docs、AGENT files、token-savings docs。
- 可运行性判断：High from MCP/docs/config/docker/package evidence；未启动 MCP server 或连接 IDE/agent client。
- 建议动作：用同一问题对比 grep/read 与 MCP symbol retrieval 的 token、召回和误导率。

### 8. [aannoo/hcom](https://github.com/aannoo/hcom)
- 分类：cross-terminal agent communication CLI
- AI Native Product Score：85
- 做什么：让 Claude Code、Codex、Cursor CLI、OpenCode 等 agent 在不同 terminal/session 之间 message、watch、spawn。
- 面向谁：并行运行多个 coding agent、希望减少人工转述上下文的开发者。
- AI native 点：把 agent 间通信和派生任务做成 CLI/plugin/skill 层，而不是复制粘贴 transcript。
- 增长/活跃信号：Pushed 2026-09-27，约 522 stars；root audit 看到 Rust/Node/Python packaging、install.sh、plugin、skills、tests、CI、release badge。
- 可运行性判断：Medium-high from CLI packaging and tests；未实际让多个 agent 互相通信。
- 建议动作：先用两个空 repo agent session 测试消息隔离、watch 输出和 runaway spawn 防护。

### 9. [skalesapp/skales](https://github.com/skalesapp/skales)
- 分类：personal cross-platform autonomous agent
- AI Native Product Score：84
- 做什么：个人 AI agent，覆盖 macOS/Windows/Linux/Android/iOS，支持 coding、desktop/browser automation、scheduled tasks、voice、local LLM、MCP、Agent Skills。
- 面向谁：想要不依赖 Docker/terminal 的个人本地 agent 用户。
- AI native 点：将个人 agent 作为跨设备、跨任务、跨 provider 的本地工作伴侣，而不是单一 chat app。
- 增长/活跃信号：Pushed 2026-09-25，约 1,920 stars；root audit 看到 platform install docs、security/trademark/license docs、releases link、screenshots、commercial license。
- 可运行性判断：Medium from release/docs evidence but source surface appears limited in root audit；未安装任何客户端或运行任务。
- 建议动作：只在隔离账户测试 scheduled task 和 desktop automation，特别检查权限与本地数据存储。

### 10. [tale-project/tale](https://github.com/tale-project/tale)
- 分类：multi-agent orchestrator
- AI Native Product Score：83
- 做什么：连接 OpenClaw、Hermes Agent、Claude Code、Codex、Cursor、Gemini CLI、OpenCode、Pi、Qwen Code 的 agent orchestrator。
- 面向谁：希望汇聚多个 agent 的知识、委派任务并构建 swarm 的高级用户。
- AI native 点：把多 agent 的 delegation、shared knowledge、gateway、sandbox/test compose files 组织为产品化 orchestrator。
- 增长/活跃信号：Pushed 2026-09-27，约 29 stars；root audit 看到 `.mcp.json`、compose variants、web/docs/test configs、AGENTS、screenshots docs、CI badges。
- 可运行性判断：Medium from compose/test/docs structure；未启动 gateway、UI 或任何 agent adapter。
- 建议动作：等待更清晰 quickstart 后，用 mock agents 验证 delegation loop 和失败恢复。

## Watchlist

- [the-open-agent/openagent](https://github.com/the-open-agent/openagent) — Personal AI assistant single-binary，Score 82。支持 RAG、agent loops、computer/browser/coding agent；root audit 有 Go services、Docker Compose、auth/guard/audit modules。建议：关注它的权限模型和 browser/computer-use 审计日志。
- [apache/maka](https://github.com/apache/maka) — Agent workspace with execution record，Score 81。Apache incubating 项目，强调完整执行记录；root audit 有 apps/native/packages/website/skills/docs。建议：等稳定 release，再评估执行记录是否可导出复盘。
- [Hacker-Valley-Media/Interceptor](https://github.com/Hacker-Valley-Media/Interceptor) — Browser/Mac/iPhone automation for agents，Score 80。CLI/MCP/daemon/extension/iOS bridge；能力强但账户和设备风险高。建议：只在 disposable browser profile 与测试设备中验证。
- [szczyglis-dev/py-gpt](https://github.com/szczyglis-dev/py-gpt) — Desktop AI assistant with computer-use，Score 79。成熟跨平台 desktop assistant，支持 agents/MCP/RAG/voice/computer use。建议：作为成熟参照，不作为今天新鲜 Top。
- [YUTA-fywoo/jev-gui-delegate](https://github.com/YUTA-fywoo/jev-gui-delegate) — Windows/Chrome GUI delegation for Codex，Score 78。Created 2026-09-25，搜索元数据显示 task contracts、local execution、recovery/outcome verification。建议：API 额度恢复后补 README 审计。
- [glanderness/BeefTV](https://github.com/glanderness/BeefTV) — Local-first AI-native video workspace，Score 77。Created 2026-09-24，视频工作台方向新鲜。建议：需要确认 timeline/editor、model integration 与本地资产边界。
- [pez2001/pytermwm](https://github.com/pez2001/pytermwm) — MCP-operable terminal window manager，Score 76。Created 2026-09-25，描述包含 CLI、HTTP/web API、browser UI、MCP server。建议：适合后续观察 agent 操作 terminal workspace 的产品化程度。

## Skip Reasons

- [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — awesome list，资源集合，不是可运行产品。
- [feder-cr/invisible_playwright_mcp](https://github.com/feder-cr/invisible_playwright_mcp) — stealth/anti-bot 方向风险高，本轮不作为正向产品候选。
- [openclaw/openclaw](https://github.com/openclaw/openclaw) — 体量巨大且成熟，今天窗口信号更像持续活跃而非新产品发现。
- [code-yeongyu/oh-my-openagent](https://github.com/code-yeongyu/oh-my-openagent) — 描述和定位不清，静态搜索信号不足以进入候选。
- [router-for-me/CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) — 更像 provider/API 兼容代理，AI-native product workflow 信号弱。
- [amitshekhariitbhu/ai-system-design](https://github.com/amitshekhariitbhu/ai-system-design) — 学习材料/教程，不是产品候选。
- [JoinArtisanVent/x-scraper-no-api](https://github.com/JoinArtisanVent/x-scraper-no-api) — X scraping/no-API 自动化风险高，且更偏数据抓取工具。
- [bestagentkits/motion-video-skill](https://github.com/bestagentkits/motion-video-skill) — agent skill 包，产品面较窄。
- [opensite-ai/opensite-skills](https://github.com/opensite-ai/opensite-skills) — skills library，可复用但不是独立产品 surface。
- [API relay / model gateway SEO clones](https://github.com/search?q=AI+API+gateway+pricing&type=repositories) — 多个 2026-09-24 创建的中转站文档/SEO repo 信号重复，未作为真实产品候选。

Type-level skip reasons：纯课程、awesome list、prompt/skill collections、模型/API 中转文档、单页营销 repo、stealth scraping、未经保护的账户自动化、成熟平台的日常活跃、缺少 runnable code 的 README-only 项目。

## 今日建议动作

- 优先做一次 OpenBot、cmux、CodeGraph、cc-connect 的小型可运行评估：它们分别代表 agent computer、terminal workspace、code context、IM bridge 四条主线。
- 把 MCP 安全工具独立成安全评估线：mcp-audit-tool 和 jcodemunch-mcp 都应该用 synthetic repo/config 做可重复验证。
- 对 browser/desktop/iPhone automation 类项目保持高标准：必须有权限边界、审计记录、disposable profile/device 方案。
- 对 skills/awesome/API gateway 类项目继续降权，除非它们转化成明确 CLI/UI/API 产品面。

## Data Window and Assumptions

- Window: 2026-09-24T00:00:00Z to 2026-09-27T22:38:35+08:00.
- Sources: 7 GitHub Search API responses under `/tmp/radar_2026_09_27_api/`; selected repository/root/README audits under `/tmp/radar_2026_09_27_readmes/`.
- Limitation: unauthenticated GitHub API returned 403 rate limit during the second half of repository audit. Top projects use complete evidence where available; watchlist includes a few search-metadata-only items called out conservatively.
- Assumptions: no third-party repository was cloned, installed, built, run, browser-tested, desktop-tested, mobile-tested, MCP-connected, credential-tested, provider-tested, security-tested, payment-tested, or deployed locally.

