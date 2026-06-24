import { db, type Database } from '@/db'
import { nanoid } from '@/utils/id'
import { buildProjectBoard, type NormalizedRadarRun } from './radar.importer'
import type { Radar, RadarProjectEntry, RadarProjectEntryRow, RadarRun, RadarRunRow } from './radar.types'

function nowIso() {
  return new Date().toISOString()
}

function dateValue(value: string | Date): string {
  return value instanceof Date ? value.toISOString() : value
}

function toRun(row: RadarRunRow): RadarRun {
  return {
    id: row.id,
    runDate: row.run_date,
    generatedAt: dateValue(row.generated_at),
    dataWindow: row.data_window,
    sourceSummary: row.source_summary,
    trendObservations: row.trend_observations,
    assumptions: row.assumptions,
    markdownReport: row.markdown_report,
    sourceFile: row.source_file,
    entryCount: Number(row.entry_count ?? 0),
  }
}

function toEntry(row: RadarProjectEntryRow): RadarProjectEntry {
  const generatedAt = dateValue(row.generated_at)
  return {
    id: row.id,
    runId: row.run_id,
    runDate: row.run_date,
    generatedAt,
    section: row.section,
    rank: row.rank,
    fullName: row.full_name,
    url: row.url,
    category: row.category,
    score: row.score,
    summary: row.summary,
    audience: row.audience,
    aiNativeAngle: row.ai_native_angle,
    growthSignal: row.growth_signal,
    runnability: row.runnability,
    recommendedAction: row.recommended_action,
    skipReason: row.skip_reason,
    rawJson: JSON.parse(row.raw_json) as Record<string, unknown>,
  }
}

async function upsertRun(conn: Database, run: NormalizedRadarRun): Promise<string> {
  const existing = await conn.queryOne<{ id: string }>(
    'SELECT id FROM radar_runs WHERE run_date = ? AND generated_at = ?',
    [run.run_date, run.generated_at],
  )
  const timestamp = nowIso()
  if (existing) {
    await conn.execute(
      `
      UPDATE radar_runs
      SET data_window = ?, source_summary = ?, trend_observations = ?,
          assumptions = ?, markdown_report = ?, source_file = ?, updated_at = ?
      WHERE id = ?
      `,
      [
        run.data_window,
        run.source_summary,
        run.trend_observations,
        run.assumptions,
        run.markdown_report,
        run.sourceFile,
        timestamp,
        existing.id,
      ],
    )
    await conn.execute('DELETE FROM radar_project_entries WHERE run_id = ?', [existing.id])
    return existing.id
  }

  const id = nanoid()
  await conn.execute(
    `
    INSERT INTO radar_runs (
      id, run_date, generated_at, data_window, source_summary,
      trend_observations, assumptions, markdown_report, source_file, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id,
      run.run_date,
      run.generated_at,
      run.data_window,
      run.source_summary,
      run.trend_observations,
      run.assumptions,
      run.markdown_report,
      run.sourceFile,
      timestamp,
      timestamp,
    ],
  )
  return id
}

async function ensureProject(conn: Database, fullName: string, url: string): Promise<string> {
  const existing = await conn.queryOne<{ id: string }>('SELECT id FROM radar_projects WHERE full_name = ?', [fullName])
  const timestamp = nowIso()
  if (existing) {
    await conn.execute('UPDATE radar_projects SET url = ?, updated_at = ? WHERE id = ?', [url, timestamp, existing.id])
    return existing.id
  }

  const id = nanoid()
  await conn.execute(
    'INSERT INTO radar_projects (id, full_name, url, created_at, updated_at) VALUES (?, ?, ?, ?, ?)',
    [id, fullName, url, timestamp, timestamp],
  )
  return id
}

export const radarRepository = {
  async importRuns(runs: NormalizedRadarRun[]): Promise<{ importedRuns: number; importedEntries: number }> {
    return db.transaction(async (tx) => {
      let importedEntries = 0
      for (const run of runs) {
        const runId = await upsertRun(tx, run)
        for (const entry of run.entries) {
          const projectId = await ensureProject(tx, entry.fullName, entry.url)
          await tx.execute(
            `
            INSERT INTO radar_project_entries (
              id, run_id, project_id, section, rank, category, score, summary,
              audience, ai_native_angle, growth_signal, runnability,
              recommended_action, skip_reason, raw_json, created_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,
            [
              nanoid(),
              runId,
              projectId,
              entry.section,
              entry.rank,
              entry.category,
              entry.score,
              entry.summary,
              entry.audience,
              entry.aiNativeAngle,
              entry.growthSignal,
              entry.runnability,
              entry.recommendedAction,
              entry.skipReason,
              JSON.stringify(entry.rawJson),
              nowIso(),
            ],
          )
          importedEntries += 1
        }
      }
      return { importedRuns: runs.length, importedEntries }
    })
  },

  async listRuns(): Promise<RadarRun[]> {
    const rows = await db.query<RadarRunRow>(
      `
      SELECT r.*, COUNT(e.id) AS entry_count
      FROM radar_runs r
      LEFT JOIN radar_project_entries e ON e.run_id = r.id
      GROUP BY r.id
      ORDER BY r.generated_at DESC
      `,
    )
    return rows.map(toRun)
  },

  async listProjects(): Promise<Radar[]> {
    const entries = await this.listAllEntries()
    const runsById = new Map<string, NormalizedRadarRun>()
    for (const entry of entries) {
      const run = runsById.get(entry.runId) ?? {
        run_date: entry.runDate,
        generated_at: entry.generatedAt,
        data_window: '',
        source_summary: '',
        trend_observations: '',
        assumptions: '',
        markdown_report: '',
        top_projects: [],
        watchlist: [],
        skipped_projects: [],
        sourceFile: '',
        entries: [],
      }
      run.entries.push({
        runDate: entry.runDate,
        generatedAt: entry.generatedAt,
        sourceFile: '',
        section: entry.section,
        rank: entry.rank,
        fullName: entry.fullName,
        url: entry.url,
        category: entry.category,
        score: entry.score,
        summary: entry.summary,
        audience: entry.audience,
        aiNativeAngle: entry.aiNativeAngle,
        growthSignal: entry.growthSignal,
        runnability: entry.runnability,
        recommendedAction: entry.recommendedAction,
        skipReason: entry.skipReason,
        rawJson: entry.rawJson,
      })
      runsById.set(entry.runId, run)
    }
    return buildProjectBoard(Array.from(runsById.values())).map(({ history: _history, ...project }) => project)
  },

  async listProjectHistory(fullName: string): Promise<RadarProjectEntry[]> {
    const rows = await db.query<RadarProjectEntryRow>(
      `
      SELECT e.*, r.run_date, r.generated_at, p.full_name, p.url
      FROM radar_project_entries e
      JOIN radar_runs r ON r.id = e.run_id
      JOIN radar_projects p ON p.id = e.project_id
      WHERE p.full_name = ?
      ORDER BY r.generated_at DESC, e.section, e.rank
      `,
      [fullName],
    )
    return rows.map(toEntry)
  },

  async listAllEntries(): Promise<RadarProjectEntry[]> {
    const rows = await db.query<RadarProjectEntryRow>(
      `
      SELECT e.*, r.run_date, r.generated_at, p.full_name, p.url
      FROM radar_project_entries e
      JOIN radar_runs r ON r.id = e.run_id
      JOIN radar_projects p ON p.id = e.project_id
      ORDER BY r.generated_at DESC, e.section, e.rank
      `,
    )
    return rows.map(toEntry)
  },
}
