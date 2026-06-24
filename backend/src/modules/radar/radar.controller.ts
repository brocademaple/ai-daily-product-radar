import type { FastifyReply, FastifyRequest } from 'fastify'
import { success } from '@/utils/response'
import { radarService } from './radar.service'
import { RadarFullNameSchema, RadarProjectHistoryQuerySchema } from './radar.schema'

export const radarController = {
  async importLocalRuns(_req: FastifyRequest, reply: FastifyReply) {
    const data = await radarService.importLocalRuns()
    return reply.status(201).send(success(data, 'imported'))
  },

  async listRuns(_req: FastifyRequest, reply: FastifyReply) {
    const data = await radarService.listRuns()
    return reply.send(success(data))
  },

  async listProjects(_req: FastifyRequest, reply: FastifyReply) {
    const data = await radarService.listProjects()
    return reply.send(success(data))
  },

  async getProjectHistory(req: FastifyRequest, reply: FastifyReply) {
    const { fullName } = RadarFullNameSchema.parse(req.params)
    const data = await radarService.getProjectHistory(fullName)
    return reply.send(success(data))
  },

  async getProjectHistoryByQuery(req: FastifyRequest, reply: FastifyReply) {
    const { fullName } = RadarProjectHistoryQuerySchema.parse(req.query)
    const data = await radarService.getProjectHistory(fullName)
    return reply.send(success(data))
  },
}
