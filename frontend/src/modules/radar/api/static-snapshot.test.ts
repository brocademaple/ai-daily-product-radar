import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getSnapshotProjectHistory, type RadarSnapshot } from './static-snapshot'

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
})
