import { RadarRunPayloadSchema, type RadarProjectItem, type RadarRunPayload, type RadarSection } from './radar.schema'
import type { Radar, RadarProjectEntry } from './radar.types'

export interface NormalizedRadarRun extends RadarRunPayload {
  sourceFile: string
  entries: NormalizedRadarEntry[]
}

export interface NormalizedRadarEntry {
  runDate: string
  generatedAt: string
  sourceFile: string
  section: RadarSection
  rank: number | null
  fullName: string
  url: string
  category: string | null
  score: number | null
  summary: string | null
  audience: string | null
  aiNativeAngle: string | null
  growthSignal: string | null
  runnability: string | null
  recommendedAction: string | null
  skipReason: string | null
  rawJson: Record<string, unknown>
}

function valueOrNull(value: string | undefined): string | null {
  return value && value.trim() ? value : null
}

function entryFromItem(
  item: RadarProjectItem,
  run: RadarRunPayload,
  sourceFile: string,
  section: RadarSection,
  fallbackRank: number,
): NormalizedRadarEntry {
  return {
    runDate: run.run_date,
    generatedAt: run.generated_at,
    sourceFile,
    section,
    rank: item.rank ?? (section === 'skip' ? null : fallbackRank),
    fullName: item.full_name,
    url: item.url,
    category: valueOrNull(item.category),
    score: item.score ?? null,
    summary: valueOrNull(item.summary),
    audience: valueOrNull(item.audience),
    aiNativeAngle: valueOrNull(item.ai_native_angle),
    growthSignal: valueOrNull(item.growth_signal),
    runnability: valueOrNull(item.runnability),
    recommendedAction: valueOrNull(item.recommended_action),
    skipReason: valueOrNull(item.skip_reason),
    rawJson: item,
  }
}

export function normalizeRadarRunPayload(input: unknown, sourceFile: string): NormalizedRadarRun {
  const run = RadarRunPayloadSchema.parse(input)
  const entries = [
    ...run.top_projects.map((item, index) => entryFromItem(item, run, sourceFile, 'top', index + 1)),
    ...run.watchlist.map((item, index) => entryFromItem(item, run, sourceFile, 'watchlist', index + 1)),
    ...run.skipped_projects.map((item, index) => entryFromItem(item, run, sourceFile, 'skip', index + 1)),
  ]
  return { ...run, sourceFile, entries }
}

export function isRadarRunPayload(input: unknown): boolean {
  return RadarRunPayloadSchema.safeParse(input).success
}

function sectionToBoardStatus(section: RadarSection): Radar['boardStatus'] {
  if (section === 'top') return 'top-picks'
  if (section === 'watchlist') return 'watchlist'
  return 'skip-low-signal'
}

function compareEntryDesc(a: Pick<NormalizedRadarEntry, 'generatedAt' | 'runDate'>, b: Pick<NormalizedRadarEntry, 'generatedAt' | 'runDate'>) {
  return b.generatedAt.localeCompare(a.generatedAt) || b.runDate.localeCompare(a.runDate)
}

function firstPresent<T extends keyof RadarProjectEntry>(history: RadarProjectEntry[], field: T): RadarProjectEntry[T] {
  return (history.find((entry) => entry[field] !== null)?.[field] ?? null) as RadarProjectEntry[T]
}

export function buildProjectBoard(runs: NormalizedRadarRun[]): Radar[] {
  const byRepo = new Map<string, NormalizedRadarEntry[]>()
  for (const run of runs) {
    for (const entry of run.entries) {
      const current = byRepo.get(entry.fullName) ?? []
      current.push(entry)
      byRepo.set(entry.fullName, current)
    }
  }

  return Array.from(byRepo.entries())
    .map(([fullName, entries]) => {
      const history = entries
        .sort(compareEntryDesc)
        .map<RadarProjectEntry>((entry, index) => ({
          id: `${entry.fullName}:${entry.generatedAt}:${entry.section}:${index}`,
          runId: '',
          runDate: entry.runDate,
          generatedAt: entry.generatedAt,
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
        }))
      const latest = history[0]
      const scored = history.map((entry) => entry.score).filter((score): score is number => score !== null)
      return {
        fullName,
        url: latest.url,
        firstSeenDate: history[history.length - 1].runDate,
        lastSeenDate: latest.runDate,
        seenCount: history.length,
        bestScore: scored.length ? Math.max(...scored) : null,
        latestScore: latest.score,
        latestSection: latest.section,
        boardStatus: sectionToBoardStatus(latest.section),
        category: firstPresent(history, 'category'),
        summary: firstPresent(history, 'summary'),
        audience: firstPresent(history, 'audience'),
        aiNativeAngle: firstPresent(history, 'aiNativeAngle'),
        growthSignal: firstPresent(history, 'growthSignal'),
        runnability: firstPresent(history, 'runnability'),
        recommendedAction: firstPresent(history, 'recommendedAction'),
        skipReason: latest.skipReason,
        history,
      }
    })
    .sort((a, b) => {
      const scoreDiff = (b.bestScore ?? -1) - (a.bestScore ?? -1)
      return scoreDiff || b.lastSeenDate.localeCompare(a.lastSeenDate) || a.fullName.localeCompare(b.fullName)
    })
}
