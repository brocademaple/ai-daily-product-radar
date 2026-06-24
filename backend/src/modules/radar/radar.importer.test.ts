import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { buildProjectBoard, isRadarRunPayload, normalizeRadarRunPayload } from './radar.importer'

describe('radar importer', () => {
  it('deduplicates repositories while preserving run history', () => {
    const first = normalizeRadarRunPayload(
      {
        run_date: '2026-06-20',
        generated_at: '2026-06-20T10:00:00Z',
        data_window: '2026-06-19 to 2026-06-20',
        source_summary: 'GitHub Search',
        trend_observations: 'Agent tooling is active.',
        assumptions: 'Prefer runnable products.',
        markdown_report: '# Radar 2026-06-20',
        top_projects: [
          {
            rank: 1,
            full_name: 'owner/radar',
            url: 'https://github.com/owner/radar',
            category: 'AI Agent',
            score: 91,
            summary: 'A strong product-shaped agent.',
            audience: 'Builders',
            ai_native_angle: 'Agent workflow is core.',
            growth_signal: 'Fast recent growth.',
            runnability: 'Has CLI instructions.',
            recommended_action: 'Try locally.',
          },
        ],
        watchlist: [],
        skipped_projects: [],
      },
      '2026-06-20.json',
    )
    const second = normalizeRadarRunPayload(
      {
        run_date: '2026-06-22',
        generated_at: '2026-06-22T10:00:00Z',
        data_window: '2026-06-21 to 2026-06-22',
        source_summary: 'GitHub Search',
        trend_observations: 'Agent tooling is still active.',
        assumptions: 'Prefer runnable products.',
        markdown_report: '# Radar 2026-06-22',
        top_projects: [],
        watchlist: [
          {
            full_name: 'owner/radar',
            url: 'https://github.com/owner/radar',
            category: 'AI Agent',
            score: 80,
            summary: 'Still promising.',
            recommended_action: 'Keep watching.',
          },
        ],
        skipped_projects: [],
      },
      '2026-06-22.json',
    )

    const board = buildProjectBoard([first, second])

    assert.equal(board.length, 1)
    const project = board[0]
    assert.ok(project)
    assert.equal(project.fullName, 'owner/radar')
    assert.equal(project.seenCount, 2)
    assert.equal(project.firstSeenDate, '2026-06-20')
    assert.equal(project.lastSeenDate, '2026-06-22')
    assert.equal(project.bestScore, 91)
    assert.equal(project.latestSection, 'watchlist')
    assert.equal(project.latestScore, 80)
    assert.ok(project.history)
    assert.equal(project.history.length, 2)
    assert.deepEqual(
      project.history.map((entry) => entry.runDate),
      ['2026-06-22', '2026-06-20'],
    )
  })

  it('rejects payloads missing required arrays', () => {
    assert.throws(
      () =>
        normalizeRadarRunPayload(
          {
            run_date: '2026-06-22',
            generated_at: '2026-06-22T10:00:00Z',
            data_window: '2026-06-21 to 2026-06-22',
            source_summary: 'GitHub Search',
            trend_observations: 'Agent tooling is active.',
            assumptions: 'Prefer runnable products.',
            markdown_report: '# Radar 2026-06-22',
          },
          'broken.json',
        ),
      /top_projects/,
    )
  })

  it('identifies non-run JSON payloads so imports can skip side artifacts', () => {
    assert.equal(isRadarRunPayload([]), false)
    assert.equal(isRadarRunPayload({ run_date: '2026-06-23', top_projects: [] }), false)
  })
})
