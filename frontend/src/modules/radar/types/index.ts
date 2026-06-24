import type { LocalizedText } from '../i18n'

export type RadarSection = 'top' | 'watchlist' | 'skip'
export type RadarBoardStatus = 'top-picks' | 'watchlist' | 'skip-low-signal' | 'published'

export interface RadarProjectEntry {
  id: string
  runId: string
  runDate: string
  generatedAt: string
  section: RadarSection
  rank: number | null
  fullName: string
  url: string
  category: LocalizedText | null
  score: number | null
  summary: LocalizedText | null
  audience: LocalizedText | null
  aiNativeAngle: LocalizedText | null
  growthSignal: LocalizedText | null
  runnability: LocalizedText | null
  recommendedAction: LocalizedText | null
  skipReason: LocalizedText | null
  rawJson: Record<string, unknown>
}

export interface Radar {
  fullName: string
  url: string
  firstSeenDate: string
  lastSeenDate: string
  seenCount: number
  bestScore: number | null
  latestScore: number | null
  latestSection: RadarSection
  boardStatus: RadarBoardStatus
  category: LocalizedText | null
  summary: LocalizedText | null
  audience: LocalizedText | null
  aiNativeAngle: LocalizedText | null
  growthSignal: LocalizedText | null
  runnability: LocalizedText | null
  recommendedAction: LocalizedText | null
  skipReason: LocalizedText | null
  history?: RadarProjectEntry[]
}

export interface RadarRun {
  id: string
  runDate: string
  generatedAt: string
  dataWindow: string
  sourceSummary: string
  trendObservations: string
  assumptions: string
  markdownReport: string
  sourceFile: string | null
  entryCount: number
}

export interface RadarImportResult {
  importedRuns: number
  importedEntries: number
  sourceDir: string
}
