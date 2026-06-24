import fp from 'fastify-plugin'
import radarModule from './modules/radar'
import todoModule from './modules/todo'

/**
 * Aggregates every business module's plugin. To add a new module, register
 * its default-exported plugin here. The module decides its own URL prefix.
 */
export default fp(
  async (app) => {
    await app.register(todoModule)
    await app.register(radarModule)
  },
  { name: 'app-routes' },
)
