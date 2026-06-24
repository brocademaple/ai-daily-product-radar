import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  DEFAULT_LOCALE,
  getFirstLocalizedText,
  getLocalizedText,
  isLocale,
  readStoredLocale,
  radarMessages,
  writeStoredLocale,
  type Locale,
} from './index'

function memoryStorage(initial?: string) {
  let value = initial ?? null
  return {
    getItem: (_key: string) => value,
    setItem: (_key: string, next: string) => {
      value = next
    },
  }
}

describe('radar i18n', () => {
  it('defaults to Chinese when storage is empty or invalid', () => {
    assert.equal(DEFAULT_LOCALE, 'zh-CN')
    assert.equal(readStoredLocale(memoryStorage()), 'zh-CN')
    assert.equal(readStoredLocale(memoryStorage('fr-FR')), 'zh-CN')
  })

  it('reads and writes a persisted locale', () => {
    const storage = memoryStorage()

    writeStoredLocale(storage, 'en-US')

    assert.equal(readStoredLocale(storage), 'en-US')
  })

  it('recognizes the supported locales only', () => {
    assert.equal(isLocale('zh-CN'), true)
    assert.equal(isLocale('en-US'), true)
    assert.equal(isLocale('zh'), false)
  })

  it('exposes Chinese and English UI labels', () => {
    assert.equal(radarMessages['zh-CN'].columns['top-picks'], '优先精选')
    assert.equal(radarMessages['en-US'].columns['top-picks'], 'Top Picks')
    assert.equal(radarMessages['zh-CN'].detail.audience, '目标用户')
    assert.equal(radarMessages['en-US'].detail.audience, 'Audience')
  })

  it('exposes public GitHub Pages hero copy in both languages', () => {
    assert.equal(radarMessages['zh-CN'].page.heroKicker, '公开项目池')
    assert.equal(radarMessages['zh-CN'].page.primaryCta, '查看看板')
    assert.equal(radarMessages['zh-CN'].page.proof.projectsLabel, '去重项目')
    assert.equal(radarMessages['en-US'].page.heroKicker, 'Public project pool')
    assert.equal(radarMessages['en-US'].page.primaryCta, 'Explore board')
    assert.equal(radarMessages['en-US'].page.proof.projectsLabel, 'deduplicated projects')
  })

  it('uses translated content when present', () => {
    const text = getLocalizedText({ 'en-US': 'Run locally', 'zh-CN': '本地运行' }, 'zh-CN')

    assert.deepEqual(text, { text: '本地运行', isOriginal: false })
  })

  it('falls back to original English content when Chinese is missing', () => {
    const text = getLocalizedText({ 'en-US': 'Run locally' }, 'zh-CN')

    assert.deepEqual(text, { text: 'Run locally', isOriginal: true })
  })

  it('marks plain English strings as original source text for Chinese mode', () => {
    const text = getLocalizedText('Run locally', 'zh-CN' satisfies Locale)

    assert.deepEqual(text, { text: 'Run locally', isOriginal: true })
  })

  it('does not mark plain Chinese strings as original source text for Chinese mode', () => {
    const text = getLocalizedText('本地运行', 'zh-CN' satisfies Locale)

    assert.deepEqual(text, { text: '本地运行', isOriginal: false })
  })

  it('uses the first available localized text from a fallback list', () => {
    const text = getFirstLocalizedText([null, { 'en-US': 'Skip because signal is weak' }], 'zh-CN')

    assert.deepEqual(text, { text: 'Skip because signal is weak', isOriginal: true })
  })
})
