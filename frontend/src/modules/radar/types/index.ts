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
  category: string | null
  summary: string | null
  audience: string | null
  aiNativeAngle: string | null
  growthSignal: string | null
  runnability: string | null
  recommendedAction: string | null
  skipReason: string | null
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
