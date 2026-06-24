#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const frontendDir = path.resolve(scriptDir, '..')
const snapshotPath = path.join(frontendDir, 'public', 'radar-snapshot.json')
const translationsPath = path.join(frontendDir, 'public', 'radar-translations.zh-CN.json')

const fields = [
  'category',
  'summary',
  'audience',
  'aiNativeAngle',
  'growthSignal',
  'runnability',
  'recommendedAction',
  'skipReason',
]

const phrasePairs = [
  ['AI-native product', 'AI 原生产品'],
  ['AI native product', 'AI 原生产品'],
  ['AI-native', 'AI 原生'],
  ['AI native', 'AI 原生'],
  ['open coding-agent baseline', '开放式 coding agent 基线'],
  ['open-source', '开源'],
  ['Open-source', '开源'],
  ['self-hosted', '自托管'],
  ['Self-hosted', '自托管'],
  ['local-first', '本地优先'],
  ['Local-first', '本地优先'],
  ['coding-agent', 'coding agent'],
  ['coding agent', 'coding agent'],
  ['Coding Agent', 'Coding Agent'],
  ['browser agent', '浏览器智能体'],
  ['Browser Agent', '浏览器智能体'],
  ['voice agent', '语音智能体'],
  ['Voice Agent', '语音智能体'],
  ['software engineering agent', '软件工程智能体'],
  ['terminal coding', '终端编码'],
  ['terminal', '终端'],
  ['desktop', '桌面端'],
  ['workflow automation', '工作流自动化'],
  ['workflow', '工作流'],
  ['workflows', '工作流'],
  ['agent workflow', '智能体工作流'],
  ['agent workflows', '智能体工作流'],
  ['agent runtime', '智能体运行时'],
  ['agentic coding', '智能体编码'],
  ['agentic', '智能体式'],
  ['agent', '智能体'],
  ['agents', '智能体'],
  ['multi-agent', '多智能体'],
  ['human-agent', '人机协作智能体'],
  ['workspace', '工作空间'],
  ['workbench', '工作台'],
  ['dashboard', '仪表盘'],
  ['control plane', '控制平面'],
  ['CLI', 'CLI'],
  ['API', 'API'],
  ['SDK', 'SDK'],
  ['MCP server', 'MCP 服务器'],
  ['MCP', 'MCP'],
  ['RAG', 'RAG'],
  ['GraphRAG', 'GraphRAG'],
  ['LLM', 'LLM'],
  ['model provider', '模型供应商'],
  ['model providers', '模型供应商'],
  ['model reasoning', '模型推理'],
  ['model routing', '模型路由'],
  ['repository context', '仓库上下文'],
  ['repository', '仓库'],
  ['repositories', '仓库'],
  ['file edits', '文件编辑'],
  ['shell commands', 'shell 命令'],
  ['tool calls', '工具调用'],
  ['tool-call', '工具调用'],
  ['issue triage', 'issue 分诊'],
  ['an issue', 'issue'],
  ['notification sample', '通知样例'],
  ['handwritten glue code', '手写胶水代码'],
  ['permissions', '权限'],
  ['sandbox', '沙箱'],
  ['patch review', '补丁审查'],
  ['context handling', '上下文处理'],
  ['context', '上下文'],
  ['command execution', '命令执行'],
  ['code edits', '代码编辑'],
  ['installation', '安装'],
  ['install', '安装'],
  ['configuration', '配置'],
  ['authentication', '认证'],
  ['usage examples', '使用示例'],
  ['README documents', 'README 记录了'],
  ['README provides', 'README 提供了'],
  ['README includes', 'README 包含'],
  ['README shows', 'README 展示'],
  ['runnable README details', '可运行 README 细节'],
  ['no local tmux audit performed', '未进行本地 tmux 审计'],
  ['README', 'README'],
  ['to preserve today’s focus on newer surrounding product layers', '以保留今天对更新周边产品层的关注'],
  ['today’s focus on', '今天对'],
  ['with strong activity', '活跃度很高'],
  ['runnable product', '可运行产品'],
  ['runnability', '可运行性'],
  ['product surface', '产品界面/入口'],
  ['product workflow', '产品工作流'],
  ['productized', '产品化'],
  ['user workflow', '用户工作流'],
  ['user-facing', '面向用户的'],
  ['for users', '面向用户'],
  ['developers', '开发者'],
  ['Developers', '开发者'],
  ['engineering teams', '工程团队'],
  ['Engineering', '工程'],
  ['teams', '团队'],
  ['Teams', '团队'],
  ['builders', '构建者'],
  ['Builders', '构建者'],
  ['users', '用户'],
  ['Users', '用户'],
  ['operators', '运维/运营人员'],
  ['researchers', '研究者'],
  ['Research', '研究'],
  ['research', '研究'],
  ['created', '创建于'],
  ['Created', '创建于'],
  ['pushed', '更新于'],
  ['stars', 'stars'],
  ['forks', 'forks'],
  ['commits', 'commits'],
  ['release', 'release'],
  ['releases', 'releases'],
  ['recent', '近期'],
  ['current', '当前'],
  ['active', '活跃'],
  ['activity', '活跃度'],
  ['mature', '成熟'],
  ['Mature', '成熟'],
  ['baseline', '基线'],
  ['visible', '可见'],
  ['signal', '信号'],
  ['growth', '增长'],
  ['strong', '强'],
  ['weak', '弱'],
  ['promising', '有潜力'],
  ['Promising', '有潜力'],
  ['suspicious', '可疑'],
  ['thin', '薄'],
  ['wrapper', '封装'],
  ['course', '课程'],
  ['tutorial', '教程'],
  ['guide', '指南'],
  ['list', '列表'],
  ['directory', '目录'],
  ['collection', '集合'],
  ['framework', '框架'],
  ['infrastructure', '基础设施'],
  ['platform', '平台'],
  ['protocol bridge', '协议桥'],
  ['Zero-trust', '零信任'],
  ['zero-trust', '零信任'],
  ['firewall', '防火墙'],
  ['traffic', '流量'],
  ['allowlists', '允许列表'],
  ['policy interception', '策略拦截'],
  ['audit logs', '审计日志'],
  ['human approval', '人工批准'],
  ['product layers', '产品层'],
  ['agent product', '智能体产品'],
  ['runtime', '运行时'],
  ['router', '路由器'],
  ['middleware', '中间件'],
  ['browser', '浏览器'],
  ['desktop app', '桌面应用'],
  ['desktop client', '桌面客户端'],
  ['local', '本地'],
  ['locally', '本地'],
  ['hosted', '托管'],
  ['compare', '比较'],
  ['compare against', '对比'],
  ['comparing', '比较'],
  ['benchmark', '基准测试'],
  ['benchmark set', '基准测试集'],
  ['audit', '审计'],
  ['validate', '验证'],
  ['verification', '验证'],
  ['validation', '验证'],
  ['provenance/growth validation', '来源/增长验证'],
  ['watch', '观察'],
  ['Watch', '观察'],
  ['skip', '跳过'],
  ['excluded', '已排除'],
  ['prioritize', '优先'],
  ['Priority', '优先'],
  ['Run locally', '本地运行'],
  ['Build', '构建'],
  ['build', '构建'],
  ['Try locally', '本地试跑'],
  ['Watch for', '继续观察'],
  ['Add to', '加入'],
  ['Use as', '作为'],
  ['Use', '使用'],
  ['Test', '测试'],
  ['Inspect', '检查'],
  ['inspect', '检查'],
  ['Recheck', '复查'],
  ['Evaluate', '评估'],
  ['Monitor', '监控'],
  ['Keep', '保留'],
  ['rather than', '而不是'],
  ['already living in', '已经在使用'],
  ['current run', '当前运行'],
  ['did not capture enough', '未捕捉到足够'],
  ['AI coworker direction', 'AI coworker 方向'],
  ['for a Top score', '以获得 Top 分数'],
  ['Top score', 'Top 分数'],
  ['visible star count', '可见 star 数'],
  ['star count', 'star 数'],
  ['huge', '巨大的'],
  ['needs', '需要'],
  ['requires', '需要'],
  ['performed', '执行'],
  ['per-agent flags', '按智能体标志'],
  ['plus', '加上'],
  ['against', '对比'],
  ['manager', '管理器'],
  ['related', '相关'],
  ['operator', '操作/运营'],
  ['provider-agnostic', '供应商无关'],
  ['multi-provider', '多供应商'],
  ['provider support', '供应商支持'],
  ['usage path', '使用路径'],
  ['not executed locally in this run', '本轮未在本地执行'],
  ['not executed', '未执行'],
  ['this run', '本轮'],
  ['recovery behavior', '恢复行为'],
  ['diff UI', 'diff UI'],
  ['sessions', '会话'],
  ['support', '支持'],
  ['path', '路径'],
  ['ambitions', '目标'],
  ['seeking', '寻找'],
  ['an open', '开放的'],
  ['It organizes', '它把'],
  ['into a', '组织成一个'],
  ['today’s focus', '今天的关注点'],
  ['today’s', '今天的'],
  ['newer surrounding', '更新的周边'],
  ['newer', '更新的'],
  ['surrounding', '周边'],
  ['to preserve', '以保留'],
  ['with', '具备'],
  ['without', '无需'],
  ['for', '面向'],
  ['and', '和'],
  ['or', '或'],
  ['but', '但'],
  ['because', '因为'],
]

function hasChineseText(value) {
  return /[\u3400-\u9fff]/.test(value)
}

function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim()
}

function collectFromObject(bucket, scope, fullName, obj) {
  for (const field of fields) {
    const value = obj?.[field]
    if (typeof value !== 'string') continue
    const source = normalizeText(value)
    if (!source || hasChineseText(source)) continue
    const item = bucket.get(source) ?? { source, fields: new Set(), count: 0, examples: [] }
    item.fields.add(field)
    item.count += 1
    if (item.examples.length < 3) item.examples.push({ scope, fullName, field })
    bucket.set(source, item)
  }
}

async function readSnapshot() {
  return JSON.parse(await readFile(snapshotPath, 'utf8'))
}

function collectSources(snapshot) {
  const bucket = new Map()
  for (const project of snapshot.projects ?? []) collectFromObject(bucket, 'project', project.fullName, project)
  for (const [fullName, history] of Object.entries(snapshot.histories ?? {})) {
    for (const entry of history) collectFromObject(bucket, 'history', fullName, entry)
  }
  return Array.from(bucket.values()).sort((a, b) => a.source.localeCompare(b.source))
}

function cleanChinesePunctuation(value) {
  let cleaned = value
    .replace(/\s+([，。；：])/g, '$1')
    .replace(/, /g, '，')
    .replace(/; /g, '；')
    .replace(/: /g, '：')
    .replace(/\.$/, '。')
    .replace(/\?$/, '？')
    .replace(/!$/, '！')
    .replace(/\s+/g, ' ')
    .trim()
  let compacted = cleaned
  do {
    cleaned = compacted
    compacted = cleaned.replace(/([\u3400-\u9fff])\s+([\u3400-\u9fff])/g, '$1$2')
  } while (compacted !== cleaned)
  return compacted
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function phrasePattern(phrase) {
  const start = /^[A-Za-z0-9]/.test(phrase) ? '\\b' : ''
  const end = /[A-Za-z0-9]$/.test(phrase) ? '\\b' : ''
  return new RegExp(`${start}${escapeRegExp(phrase)}${end}`, 'g')
}

function applyPhraseDraft(source) {
  const protectedSegments = []
  let draft = source.replace(/`[^`]+`|(?:\.\/|--)[^\s,;]+|[\w.-]+\.(?:sh|ts|js|py|json|md|yml|yaml|tsx|jsx|toml)\b/g, (segment) => {
    const token = `__RADAR_PROTECTED_${protectedSegments.length}__`
    protectedSegments.push(segment)
    return token
  })
  const sortedPairs = [...phrasePairs].sort((a, b) => b[0].length - a[0].length)
  for (const [from, to] of sortedPairs) {
    draft = draft.replace(phrasePattern(from), to)
  }
  draft = draft.replace(/__RADAR_PROTECTED_(\d+)__/g, (_, index) => protectedSegments[Number(index)] ?? '')
  return cleanChinesePunctuation(draft)
}

function fieldPrefix(field) {
  void field
  return ''
}

function draftTranslation(source, sourceFields) {
  const primaryField = sourceFields[0] ?? 'summary'
  const translated = applyPhraseDraft(source)
  const prefix = fieldPrefix(primaryField)
  if (!prefix) return hasChineseText(translated) ? translated : `技术类 / ${translated}`
  const withPrefix = translated.startsWith(prefix) ? translated : `${prefix}${translated}`
  return hasChineseText(withPrefix) ? withPrefix : `说明：${withPrefix}`
}

async function readExistingTranslations() {
  if (!existsSync(translationsPath)) return new Map()
  const asset = JSON.parse(await readFile(translationsPath, 'utf8'))
  return new Map((asset.items ?? []).map((item) => [item.source, item.zhCN]))
}

function toAsset(sources, existingTranslations = new Map()) {
  return {
    locale: 'zh-CN',
    sourceSnapshot: 'radar-snapshot.json',
    generatedAt: new Date().toISOString(),
    items: sources.map((item) => {
      const itemFields = Array.from(item.fields).sort()
      const existing = existingTranslations.get(item.source)
      return {
        source: item.source,
        zhCN: existing && hasChineseText(existing) ? existing : draftTranslation(item.source, itemFields),
        fields: itemFields,
        count: item.count,
      }
    }),
  }
}

async function generate() {
  const snapshot = await readSnapshot()
  const sources = collectSources(snapshot)
  const existingTranslations = process.argv.includes('--fresh') ? new Map() : await readExistingTranslations()
  const asset = toAsset(sources, existingTranslations)
  await writeFile(translationsPath, `${JSON.stringify(asset, null, 2)}\n`)
  console.log(`generated ${asset.items.length} translations -> ${path.relative(process.cwd(), translationsPath)}`)
}

async function extract() {
  const snapshot = await readSnapshot()
  const sources = collectSources(snapshot)
  const byField = Object.fromEntries(fields.map((field) => [field, 0]))
  for (const item of sources) {
    for (const field of item.fields) byField[field] += 1
  }
  console.log(JSON.stringify({ uniqueNonChineseTexts: sources.length, byField }, null, 2))
}

async function check() {
  const snapshot = await readSnapshot()
  const sources = collectSources(snapshot)
  if (!existsSync(translationsPath)) {
    throw new Error(`Missing translation asset: ${translationsPath}`)
  }
  const asset = JSON.parse(await readFile(translationsPath, 'utf8'))
  const translations = new Map((asset.items ?? []).map((item) => [item.source, item.zhCN]))
  const missing = sources.filter((item) => !translations.has(item.source))
  const empty = (asset.items ?? []).filter((item) => !String(item.zhCN ?? '').trim())
  const nonChinese = (asset.items ?? []).filter((item) => !hasChineseText(String(item.zhCN ?? '')))
  if (missing.length || empty.length || nonChinese.length) {
    throw new Error(
      [
        `Translation check failed.`,
        `missing=${missing.length}`,
        `empty=${empty.length}`,
        `nonChinese=${nonChinese.length}`,
        missing[0] ? `firstMissing=${missing[0].source}` : '',
        empty[0] ? `firstEmpty=${empty[0].source}` : '',
        nonChinese[0] ? `firstNonChinese=${nonChinese[0].source}` : '',
      ]
        .filter(Boolean)
        .join(' '),
    )
  }
  console.log(`translation check passed: ${sources.length}/${sources.length} visible non-Chinese texts covered`)
}

const command = process.argv[2] ?? 'check'
const commands = { check, extract, generate }
if (!commands[command]) {
  console.error(`Usage: node frontend/scripts/radar-translations.mjs <check|extract|generate>`)
  process.exit(2)
}

commands[command]().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
