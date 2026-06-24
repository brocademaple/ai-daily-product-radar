import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { env } from '@/config/env'
import { BadRequestError, NotFoundError } from '@/utils/http-error'
import { isRadarRunPayload, normalizeRadarRunPayload } from './radar.importer'
import { radarRepository } from './radar.repository'

export const radarService = {
  async importLocalRuns() {
    const sourceDir = env.RADAR_RUNS_DIR
    let files: string[]
    try {
      files = (await readdir(sourceDir)).filter((file) => file.endsWith('.json')).sort()
    } catch (error) {
      throw BadRequestError(`Cannot read radar runs directory: ${(error as Error).message}`)
    }

    const runs = []
    for (const file of files) {
      const fullPath = join(sourceDir, file)
      const text = await readFile(fullPath, 'utf8')
      const payload = JSON.parse(text) as unknown
      if (isRadarRunPayload(payload)) {
        runs.push(normalizeRadarRunPayload(payload, file))
      }
    }

    const result = await radarRepository.importRuns(runs)
    return { ...result, sourceDir }
  },

  listRuns() {
    return radarRepository.listRuns()
  },

  listProjects() {
    return radarRepository.listProjects()
  },

  async getProjectHistory(fullName: string) {
    const history = await radarRepository.listProjectHistory(fullName)
    if (history.length === 0) throw NotFoundError('radar project')
    return history
  },
}
