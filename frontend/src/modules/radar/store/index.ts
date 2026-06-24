import { defineStore } from 'pinia'
import { ref } from 'vue'
import { radarApi } from '../api'
import type { Radar, RadarImportResult, RadarProjectEntry, RadarRun } from '../types'

export const useRadarStore = defineStore('radar', () => {
  const runs = ref<RadarRun[]>([])
  const projects = ref<Radar[]>([])
  const selectedHistory = ref<RadarProjectEntry[]>([])
  const loading = ref(false)
  const importing = ref(false)
  const historyLoading = ref(false)
  const error = ref<string | null>(null)
  const lastImport = ref<RadarImportResult | null>(null)
  const isStaticMode = radarApi.isStaticMode

  async function fetchDashboard() {
    loading.value = true
    error.value = null
    try {
      const [nextRuns, nextProjects] = await Promise.all([radarApi.listRuns(), radarApi.listProjects()])
      runs.value = nextRuns
      projects.value = nextProjects
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }

  async function importLocalRuns() {
    importing.value = true
    error.value = null
    try {
      lastImport.value = await radarApi.importLocalRuns()
      await fetchDashboard()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      importing.value = false
    }
  }

  async function fetchProjectHistory(fullName: string) {
    historyLoading.value = true
    error.value = null
    try {
      selectedHistory.value = await radarApi.getProjectHistory(fullName)
    } catch (e) {
      error.value = (e as Error).message
      selectedHistory.value = []
    } finally {
      historyLoading.value = false
    }
  }

  return {
    runs,
    projects,
    selectedHistory,
    loading,
    importing,
    historyLoading,
    error,
    lastImport,
    isStaticMode,
    fetchDashboard,
    importLocalRuns,
    fetchProjectHistory,
  }
})
