import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { enhanceRadarSnapshot, getSnapshotProjectHistory, type RadarSnapshot } from './static-snapshot'

describe('radar static snapshot', () => {
  it('returns history for repository full names that contain slashes', () => {
    const snapshot: RadarSnapshot = {
      runs: [],
      projects: [
        {
          fullName: 'HKUDS/AgentSpace',
          url: 'https://github.com/HKUDS/AgentSpace',
          firstSeenDate: '2026-06-24',
          lastSeenDate: '2026-06-24',
          seenCount: 1,
          bestScore: 89,
          latestScore: 89,
          latestSection: 'top',
          boardStatus: 'top-picks',
          category: 'Agent Workspace',
          summary: 'A shared human-agent workspace.',
          audience: null,
          aiNativeAngle: null,
          growthSignal: null,
          runnability: null,
          recommendedAction: null,
          skipReason: null,
        },
      ],
      histories: {
        'HKUDS/AgentSpace': [
          {
            id: 'entry-1',
            runId: 'run-1',
            runDate: '2026-06-24',
            generatedAt: '2026-06-24T10:21:30+08:00',
            section: 'top',
            rank: 1,
            fullName: 'HKUDS/AgentSpace',
            url: 'https://github.com/HKUDS/AgentSpace',
            category: 'Agent Workspace',
            score: 89,
            summary: 'A shared human-agent workspace.',
            audience: null,
            aiNativeAngle: null,
            growthSignal: null,
            runnability: null,
            recommendedAction: null,
            skipReason: null,
            rawJson: {},
          },
        ],
      },
    }

    const history = getSnapshotProjectHistory(snapshot, 'HKUDS/AgentSpace')

    assert.equal(history.length, 1)
    assert.equal(history[0]?.fullName, 'HKUDS/AgentSpace')
  })

  it('translates visible strings and backfills sparse project profile fields from history', () => {
    const snapshot: RadarSnapshot = {
      runs: [],
      projects: [
        {
          fullName: 'owner/agent',
          url: 'https://github.com/owner/agent',
          firstSeenDate: '2026-06-02',
          lastSeenDate: '2026-06-23',
          seenCount: 2,
          bestScore: 92,
          latestScore: null,
          latestSection: 'skip',
          boardStatus: 'skip-low-signal',
          category: null,
          summary: null,
          audience: null,
          aiNativeAngle: null,
          growthSignal: null,
          runnability: null,
          recommendedAction: null,
          skipReason: 'Mature coding-agent baseline; skip today.',
        },
      ],
      histories: {
        'owner/agent': [
          {
            id: 'entry-latest',
            runId: 'run-2',
            runDate: '2026-06-23',
            generatedAt: '2026-06-23T10:00:00Z',
            section: 'skip',
            rank: null,
            fullName: 'owner/agent',
            url: 'https://github.com/owner/agent',
            category: null,
            score: null,
            summary: null,
            audience: null,
            aiNativeAngle: null,
            growthSignal: null,
            runnability: null,
            recommendedAction: null,
            skipReason: 'Mature coding-agent baseline; skip today.',
            rawJson: {},
          },
          {
            id: 'entry-profile',
            runId: 'run-1',
            runDate: '2026-06-02',
            generatedAt: '2026-06-02T10:00:00Z',
            section: 'top',
            rank: 1,
            fullName: 'owner/agent',
            url: 'https://github.com/owner/agent',
            category: 'Code Agent CLI',
            score: 92,
            summary: 'Open-source terminal coding agent.',
            audience: 'Developers comparing coding agents.',
            aiNativeAngle: 'Repository context and shell commands become one agent loop.',
            growthSignal: null,
            runnability: 'README documents npm installation.',
            recommendedAction: 'Run locally and compare patch review flow.',
            skipReason: null,
            rawJson: {},
          },
        ],
      },
    }

    const enhanced = enhanceRadarSnapshot(snapshot, {
      locale: 'zh-CN',
      sourceSnapshot: 'radar-snapshot.json',
      generatedAt: '2026-06-24T00:00:00.000Z',
      items: [
        { source: 'Mature coding-agent baseline; skip today.', zhCN: '成熟的 coding-agent 基线；今日跳过。', fields: ['skipReason'], count: 2 },
        { source: 'Code Agent CLI', zhCN: '代码智能体 CLI', fields: ['category'], count: 1 },
        { source: 'Open-source terminal coding agent.', zhCN: '开源终端 coding agent。', fields: ['summary'], count: 1 },
        { source: 'Developers comparing coding agents.', zhCN: '正在比较 coding agent 的开发者。', fields: ['audience'], count: 1 },
        { source: 'Repository context and shell commands become one agent loop.', zhCN: '仓库上下文和 shell 命令组成一个智能体循环。', fields: ['aiNativeAngle'], count: 1 },
        { source: 'README documents npm installation.', zhCN: 'README 记录了 npm 安装方式。', fields: ['runnability'], count: 1 },
        { source: 'Run locally and compare patch review flow.', zhCN: '本地运行并比较补丁审查流程。', fields: ['recommendedAction'], count: 1 },
      ],
    })

    const project = enhanced.projects[0]
    const profileHistory = enhanced.histories['owner/agent']?.[1]

    assert.deepEqual(project?.skipReason, {
      'en-US': 'Mature coding-agent baseline; skip today.',
      'zh-CN': '成熟的 coding-agent 基线；今日跳过。',
    })
    assert.deepEqual(project?.category, { 'en-US': 'Code Agent CLI', 'zh-CN': '代码智能体 CLI' })
    assert.deepEqual(project?.summary, { 'en-US': 'Open-source terminal coding agent.', 'zh-CN': '开源终端 coding agent。' })
    assert.deepEqual(profileHistory?.recommendedAction, {
      'en-US': 'Run locally and compare patch review flow.',
      'zh-CN': '本地运行并比较补丁审查流程。',
    })
  })
})
