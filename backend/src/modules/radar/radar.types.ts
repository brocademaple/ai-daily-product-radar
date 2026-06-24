import type { z } from 'zod'
import type { RadarProjectEntrySchema, RadarRunSchema, RadarSchema } from './radar.schema'

export type Radar = z.infer<typeof RadarSchema>
export type RadarRun = z.infer<typeof RadarRunSchema>
export type RadarProjectEntry = z.infer<typeof RadarProjectEntrySchema>

export interface RadarRunRow {
  id: string
  run_date: string
  generated_at: string
  data_window: string
  source_summary: string
  trend_observations: string
  assumptions: string
  markdown_report: string
  source_file: string | null
  entry_count?: number
}

export interface RadarProjectEntryRow {
  id: string
  run_id: string
  run_date: string
  generated_at: string
  section: 'top' | 'watchlist' | 'skip'
  rank: number | null
  full_name: string
  url: string
  category: string | null
  score: number | null
  summary: string | null
  audience: string | null
  ai_native_angle: string | null
  growth_signal: string | null
  runnability: string | null
  recommended_action: string | null
  skip_reason: string | null
  raw_json: string
}
