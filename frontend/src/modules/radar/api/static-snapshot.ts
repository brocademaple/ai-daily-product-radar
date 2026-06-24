import type { Radar, RadarProjectEntry, RadarRun } from '../types'

export interface RadarSnapshot {
  runs: RadarRun[]
  projects: Radar[]
  histories: Record<string, RadarProjectEntry[]>
}

export async function loadRadarSnapshot(url: string, signal?: AbortSignal): Promise<RadarSnapshot> {
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  })
  if (!res.ok) {
    throw new Error(`Cannot load radar snapshot: ${res.status} ${res.statusText}`)
  }
  return (await res.json()) as RadarSnapshot
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
