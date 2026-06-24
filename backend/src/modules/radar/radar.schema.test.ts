import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { RadarProjectHistoryQuerySchema } from './radar.schema'

describe('radar schema', () => {
  it('accepts repository full names with slashes in project history query', () => {
    const parsed = RadarProjectHistoryQuerySchema.parse({ fullName: 'HKUDS/AgentSpace' })

    assert.equal(parsed.fullName, 'HKUDS/AgentSpace')
  })
})
