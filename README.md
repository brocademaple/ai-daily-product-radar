# AI Daily Product Radar

[English](README.en.md)

一个面向 AI 原生产品发现的全栈工作台：把每日 GitHub 产品雷达从一次性的聊天记录，变成可以总览、归档、复盘和继续行动的产品池。

第一版目标很克制：先做一个本地看板，清晰保存每次 Radar Run 的结构化数据，把完整日报归档到语雀，并把项目卡片同步到飞书多维表格。重点不是“多抓一点项目”，而是把判断过程沉淀下来。

## 这个项目解决什么问题

每天看 AI 项目时，真正有价值的不是榜单本身，而是判断：

- 哪些项目已经有真实产品形态。
- 哪些只是 demo、论文复现、SDK wrapper、prompt 集合或营销壳。
- 这个项目面向谁，AI 原生点在哪里。
- 是否能运行，是否值得复刻、跟踪或跳过。
- 今天的趋势信号是什么，下一步该做什么。

AI Daily Product Radar 把这些判断变成一套可展示、可存档、可持续扩展的数据结构。

## MVP 范围

第一版服务于一个 90 分钟内可以完成的演示闭环：

1. 加载一份结构化 Radar Run。
2. 在看板中一次性查看很多项目卡片。
3. 按状态分组：
   - `Top Picks`
   - `Watchlist`
   - `Skip / Low Signal`
   - `Published`
4. 点击项目卡片，查看完整判断理由。
5. 预览语雀日报和飞书多维表格同步内容。
6. 将完整日报发布到语雀。
7. 将项目卡片同步到飞书多维表格。
8. 显示每个发布通道的状态、失败原因和重试提示。

第一版先不做实时 GitHub 搜索、自动评分、复杂权限、定时任务、拖拽流程和统计大盘。

## 产品形态

```text
Radar Run
  ├─ 项目看板
  │  ├─ Top Picks
  │  ├─ Watchlist
  │  ├─ Skip / Low Signal
  │  └─ Published
  ├─ 项目详情
  ├─ 趋势观察
  ├─ 语雀日报预览
  └─ 飞书多维表格同步预览
```

每张项目卡片会保留这些字段：

- 项目名和 GitHub 链接
- 来源日期
- 分类
- 分数
- 状态
- 一句话摘要
- 目标用户
- AI 原生角度
- 增长或活跃信号
- 可运行判断
- 建议动作
- Skip Reason
- 语雀日报链接
- 备注

## 外部归档目标

默认设计目标：

- 语雀知识库：`向26出发`
- 语雀分组：`AI Daily Product Radar`
- 飞书：多维表格项目看板

语雀负责完整日报归档。飞书多维表格负责全局项目池，让项目可以按状态、日期、分数和行动建议继续流转。

## 技术栈

- 前端：Vue 3、TypeScript、Less、Vite、Pinia、Vue Router
- 后端：Node.js、Fastify、TypeScript、zod
- 数据库：本地 SQLite，保留 PostgreSQL 适配能力
- 发布目标：语雀知识库、飞书多维表格

项目由两个独立子项目组成：

```text
frontend/   Vue 前端
backend/    Fastify API
```

## 本地启动

启动后端：

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

启动前端：

```bash
cd frontend
npm install
npm run dev
```

然后打开：

```text
http://localhost:5173
```

前端开发服务器会把 `/api` 代理到 `http://localhost:3000`。

## 开发工作流

这个仓库沿用 closed-loop module 结构。业务模块位于 `src/modules/<name>/`，模块只通过自己的 `index.ts` 暴露公共入口。

修改功能代码前，先使用项目内置技能：

```text
$vibecoding-codex-workflow
$vibecoding-architecture-design
$vibecoding-fullstack-module
```

完成模块、API、数据库或前后端契约改动后，运行架构验证：

```bash
bash .agents/skills/vibecoding-verify/scripts/verify.sh
```

## 路线图

详见 [docs/roadmap.md](docs/roadmap.md)。
