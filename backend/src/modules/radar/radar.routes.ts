import type { FastifyInstance } from 'fastify'
import { radarController } from './radar.controller'

export async function radarRoutes(app: FastifyInstance) {
  app.post('/import/local-runs', radarController.importLocalRuns)
  app.get('/runs', radarController.listRuns)
  app.get('/projects', radarController.listProjects)
  app.get('/projects/history', radarController.getProjectHistoryByQuery)
  app.get('/projects/:fullName/history', radarController.getProjectHistory)
}
