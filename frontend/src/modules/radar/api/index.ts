import { http } from '@/utils/request'
import type { Radar, RadarImportResult, RadarProjectEntry, RadarRun } from '../types'
import { getSnapshotProjectHistory, loadRadarSnapshot, summarizeSnapshotImport, type RadarSnapshot } from './static-snapshot'

const isStaticMode = import.meta.env.VITE_RADAR_DATA_MODE === 'static'
const snapshotUrl = `${import.meta.env.BASE_URL}radar-snapshot.json`
let snapshotPromise: Promise<RadarSnapshot> | null = null

function getSnapshot(signal?: AbortSignal) {
  snapshotPromise ??= loadRadarSnapshot(snapshotUrl, signal)
  return snapshotPromise
}

export const radarApi = {
  isStaticMode,
  importLocalRuns: async () =>
    isStaticMode ? summarizeSnapshotImport(await getSnapshot()) : http.post<RadarImportResult>('/radar/import/local-runs'),
  listRuns: async (signal?: AbortSignal) =>
    isStaticMode ? (await getSnapshot(signal)).runs : http.get<RadarRun[]>('/radar/runs', { signal }),
  listProjects: async (signal?: AbortSignal) =>
    isStaticMode ? (await getSnapshot(signal)).projects : http.get<Radar[]>('/radar/projects', { signal }),
  getProjectHistory: async (fullName: string, signal?: AbortSignal) =>
    isStaticMode
      ? getSnapshotProjectHistory(await getSnapshot(signal), fullName)
      : http.get<RadarProjectEntry[]>('/radar/projects/history', { query: { fullName }, signal }),
}
