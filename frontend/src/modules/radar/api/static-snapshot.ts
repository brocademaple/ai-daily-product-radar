import type { Radar, RadarProjectEntry, RadarRun } from '../types'

type TranslatableField =
  | 'category'
  | 'summary'
  | 'audience'
  | 'aiNativeAngle'
  | 'growthSignal'
  | 'runnability'
  | 'recommendedAction'
  | 'skipReason'

export interface RadarSnapshot {
  runs: RadarRun[]
  projects: Radar[]
  histories: Record<string, RadarProjectEntry[]>
}

export interface RadarTranslationItem {
  source: string
  zhCN: string
  fields: string[]
  count: number
}

export interface RadarTranslationAsset {
  locale: 'zh-CN'
  sourceSnapshot: string
  generatedAt: string
  items: RadarTranslationItem[]
}

function hasChineseText(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value)
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function isLocalizedRecord(value: unknown): value is Partial<Record<'en-US' | 'zh-CN', string>> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function translationMap(translations?: RadarTranslationAsset | null) {
  return new Map(
    (translations?.items ?? [])
      .filter((item) => item.source.trim() && item.zhCN.trim())
      .map((item) => [item.source, item.zhCN] as const),
  )
}

function localizeValue(
  value: Radar[TranslatableField] | RadarProjectEntry[TranslatableField],
  translations: Map<string, string>,
): Radar[TranslatableField] {
  if (!value) return null
  if (typeof value === 'string') {
    if (hasChineseText(value)) return value
    const zhCN = translations.get(normalizeText(value))
    return zhCN ? { 'en-US': value, 'zh-CN': zhCN } : value
  }
  if (!isLocalizedRecord(value)) return value
  const source = value['en-US'] ? normalizeText(value['en-US']) : null
  if (value['zh-CN'] || !source) return value
  const zhCN = translations.get(source)
  return zhCN ? { ...value, 'zh-CN': zhCN } : value
}

function localizeProject(project: Radar, translations: Map<string, string>): Radar {
  return {
    ...project,
    category: localizeValue(project.category, translations),
    summary: localizeValue(project.summary, translations),
    audience: localizeValue(project.audience, translations),
    aiNativeAngle: localizeValue(project.aiNativeAngle, translations),
    growthSignal: localizeValue(project.growthSignal, translations),
    runnability: localizeValue(project.runnability, translations),
    recommendedAction: localizeValue(project.recommendedAction, translations),
    skipReason: localizeValue(project.skipReason, translations),
  }
}

function localizeEntry(entry: RadarProjectEntry, translations: Map<string, string>): RadarProjectEntry {
  return {
    ...entry,
    category: localizeValue(entry.category, translations),
    summary: localizeValue(entry.summary, translations),
    audience: localizeValue(entry.audience, translations),
    aiNativeAngle: localizeValue(entry.aiNativeAngle, translations),
    growthSignal: localizeValue(entry.growthSignal, translations),
    runnability: localizeValue(entry.runnability, translations),
    recommendedAction: localizeValue(entry.recommendedAction, translations),
    skipReason: localizeValue(entry.skipReason, translations),
  }
}

function firstHistoryValue(history: RadarProjectEntry[], field: Exclude<TranslatableField, 'skipReason'>) {
  return history.find((entry) => entry[field] !== null)?.[field] ?? null
}

function backfillProject(project: Radar, history: RadarProjectEntry[]): Radar {
  return {
    ...project,
    category: project.category ?? firstHistoryValue(history, 'category'),
    summary: project.summary ?? firstHistoryValue(history, 'summary'),
    audience: project.audience ?? firstHistoryValue(history, 'audience'),
    aiNativeAngle: project.aiNativeAngle ?? firstHistoryValue(history, 'aiNativeAngle'),
    growthSignal: project.growthSignal ?? firstHistoryValue(history, 'growthSignal'),
    runnability: project.runnability ?? firstHistoryValue(history, 'runnability'),
    recommendedAction: project.recommendedAction ?? firstHistoryValue(history, 'recommendedAction'),
  }
}

export async function loadRadarTranslations(url: string, signal?: AbortSignal): Promise<RadarTranslationAsset | null> {
  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json' },
      signal,
    })
    if (!res.ok) return null
    return (await res.json()) as RadarTranslationAsset
  } catch {
    return null
  }
}

export function enhanceRadarProjects(projects: Radar[], translations?: RadarTranslationAsset | null): Radar[] {
  const translationsBySource = translationMap(translations)
  return projects.map((project) => localizeProject(project, translationsBySource))
}

export function enhanceRadarHistory(history: RadarProjectEntry[], translations?: RadarTranslationAsset | null): RadarProjectEntry[] {
  const translationsBySource = translationMap(translations)
  return history.map((entry) => localizeEntry(entry, translationsBySource))
}

export function enhanceRadarSnapshot(snapshot: RadarSnapshot, translations?: RadarTranslationAsset | null): RadarSnapshot {
  const translationsBySource = translationMap(translations)
  const histories = Object.fromEntries(
    Object.entries(snapshot.histories).map(([fullName, history]) => [
      fullName,
      history.map((entry) => localizeEntry(entry, translationsBySource)),
    ]),
  )
  const projects = snapshot.projects.map((project) => backfillProject(localizeProject(project, translationsBySource), histories[project.fullName] ?? []))

  return {
    ...snapshot,
    projects,
    histories,
  }
}

export async function loadRadarSnapshot(
  url: string,
  signal?: AbortSignal,
  translationsUrl?: string,
): Promise<RadarSnapshot> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!res.ok) {
    throw new Error(`Cannot load radar snapshot: ${res.status} ${res.statusText}`)
  }
  const snapshot = (await res.json()) as RadarSnapshot
  const translations = translationsUrl ? await loadRadarTranslations(translationsUrl, signal) : null
  return enhanceRadarSnapshot(snapshot, translations)
}

export function getSnapshotProjectHistory(snapshot: RadarSnapshot, fullName: string): RadarProjectEntry[] {
  return snapshot.histories[fullName] ?? []
}

export function summarizeSnapshotImport(snapshot: RadarSnapshot) {
  return {
    importedRuns: snapshot.runs.length,
    importedEntries: Object.values(snapshot.histories).reduce((total, entries) => total + entries.length, 0),
    sourceDir: 'radar-snapshot.json',
  }
}
