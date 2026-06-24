import { z } from 'zod'

export const RadarSectionSchema = z.enum(['top', 'watchlist', 'skip'])
export const RadarBoardStatusSchema = z.enum(['top-picks', 'watchlist', 'skip-low-signal', 'published'])

export const RadarProjectItemSchema = z.object({
  rank: z.number().int().positive().optional(),
  full_name: z.string().min(1),
  url: z.string().url(),
  category: z.string().optional(),
  score: z.number().int().min(0).max(100).optional(),
  summary: z.string().optional(),
  audience: z.string().optional(),
  ai_native_angle: z.string().optional(),
  growth_signal: z.string().optional(),
  runnability: z.string().optional(),
  recommended_action: z.string().optional(),
  skip_reason: z.string().optional(),
})

export const RadarRunPayloadSchema = z.object({
  run_date: z.string().min(1),
  generated_at: z.string().min(1),
  data_window: z.string().min(1),
  source_summary: z.string().min(1),
  trend_observations: z.string().min(1),
  assumptions: z.string().min(1),
  markdown_report: z.string().min(1),
  top_projects: z.array(RadarProjectItemSchema),
  watchlist: z.array(RadarProjectItemSchema),
  skipped_projects: z.array(RadarProjectItemSchema),
})

export const RadarImportSchema = z.object({
  importedRuns: z.number().int().nonnegative(),
  importedEntries: z.number().int().nonnegative(),
  sourceDir: z.string(),
})

export const RadarRunSchema = z.object({
  id: z.string(),
  runDate: z.string(),
  generatedAt: z.string(),
  dataWindow: z.string(),
  sourceSummary: z.string(),
  trendObservations: z.string(),
  assumptions: z.string(),
  markdownReport: z.string(),
  sourceFile: z.string().nullable(),
  entryCount: z.number().int().nonnegative(),
})

export const RadarProjectEntrySchema = z.object({
  id: z.string(),
  runId: z.string(),
  runDate: z.string(),
  generatedAt: z.string(),
  section: RadarSectionSchema,
  rank: z.number().int().positive().nullable(),
  fullName: z.string(),
  url: z.string(),
  category: z.string().nullable(),
  score: z.number().int().min(0).max(100).nullable(),
  summary: z.string().nullable(),
  audience: z.string().nullable(),
  aiNativeAngle: z.string().nullable(),
  growthSignal: z.string().nullable(),
  runnability: z.string().nullable(),
  recommendedAction: z.string().nullable(),
  skipReason: z.string().nullable(),
  rawJson: z.record(z.unknown()),
})

export const RadarSchema = z.object({
  fullName: z.string(),
  url: z.string(),
  firstSeenDate: z.string(),
  lastSeenDate: z.string(),
  seenCount: z.number().int().positive(),
  bestScore: z.number().int().min(0).max(100).nullable(),
  latestScore: z.number().int().min(0).max(100).nullable(),
  latestSection: RadarSectionSchema,
  boardStatus: RadarBoardStatusSchema,
  category: z.string().nullable(),
  summary: z.string().nullable(),
  audience: z.string().nullable(),
  aiNativeAngle: z.string().nullable(),
  growthSignal: z.string().nullable(),
  runnability: z.string().nullable(),
  recommendedAction: z.string().nullable(),
  skipReason: z.string().nullable(),
  history: z.array(RadarProjectEntrySchema).optional(),
})

export const RadarFullNameSchema = z.object({
  fullName: z.string().min(1),
})

export const RadarProjectHistoryQuerySchema = z.object({
  fullName: z.string().min(1),
})

export type RadarSection = z.infer<typeof RadarSectionSchema>
export type RadarBoardStatus = z.infer<typeof RadarBoardStatusSchema>
export type RadarProjectItem = z.infer<typeof RadarProjectItemSchema>
export type RadarRunPayload = z.infer<typeof RadarRunPayloadSchema>
export type RadarImportResult = z.infer<typeof RadarImportSchema>
