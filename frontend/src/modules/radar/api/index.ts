import { http } from '@/utils/request'
import type { Radar, RadarImportResult, RadarProjectEntry, RadarRun } from '../types'
import {
  enhanceRadarHistory,
  enhanceRadarProjects,
  getSnapshotProjectHistory,
  loadRadarSnapshot,
  loadRadarTranslations,
  summarizeSnapshotImport,
  type RadarSnapshot,
  type RadarTranslationAsset,
} from './static-snapshot'

const isStaticMode = import.meta.env.VITE_RADAR_DATA_MODE === 'static'
const snapshotUrl = `${import.meta.env.BASE_URL}radar-snapshot.json`
const translationsUrl = `${import.meta.env.BASE_URL}radar-translations.zh-CN.json`
let snapshotPromise: Promise<RadarSnapshot> | null = null
let translationsPromise: Promise<RadarTranslationAsset | null> | null = null

function getSnapshot(signal?: AbortSignal) {
  snapshotPromise ??= loadRadarSnapshot(snapshotUrl, signal, translationsUrl)
  return snapshotPromise
}

function getTranslations(signal?: AbortSignal) {
  translationsPromise ??= loadRadarTranslations(translationsUrl, signal)
  return translationsPromise
}

export const radarApi = {
  isStaticMode,
  importLocalRuns: async () =>
    isStaticMode ? summarizeSnapshotImport(await getSnapshot()) : http.post<RadarImportResult>('/radar/import/local-runs'),
  listRuns: async (signal?: AbortSignal) =>
    isStaticMode ? (await getSnapshot(signal)).runs : http.get<RadarRun[]>('/radar/runs', { signal }),
  listProjects: async (signal?: AbortSignal) =>
    isStaticMode
      ? (await getSnapshot(signal)).projects
      : enhanceRadarProjects(await http.get<Radar[]>('/radar/projects', { signal }), await getTranslations(signal)),
  getProjectHistory: async (fullName: string, signal?: AbortSignal) =>
    isStaticMode
      ? getSnapshotProjectHistory(await getSnapshot(signal), fullName)
      : enhanceRadarHistory(
          await http.get<RadarProjectEntry[]>('/radar/projects/history', { query: { fullName }, signal }),
          await getTranslations(signal),
        ),
}
