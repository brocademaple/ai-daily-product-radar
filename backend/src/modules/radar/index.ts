import fp from 'fastify-plugin'
import { radarRoutes } from './radar.routes'

export default fp(
  async (app) => {
    await app.register(radarRoutes, { prefix: '/api/radar' })
  },
  { name: 'module-radar' },
)

export type { Radar } from './radar.types'
export { RadarImportSchema, RadarProjectEntrySchema, RadarRunSchema, RadarSchema } from './radar.schema'
