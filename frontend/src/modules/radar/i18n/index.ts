import { computed, ref } from 'vue'
import type { RadarBoardStatus, RadarSection } from '../types'

export type Locale = 'zh-CN' | 'en-US'
export type LocalizedText = string | Partial<Record<Locale, string>>

interface LocaleStorageLike {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

export interface LocalizedTextResult {
  text: string | null
  isOriginal: boolean
}

export const DEFAULT_LOCALE: Locale = 'zh-CN'
export const RADAR_LOCALE_STORAGE_KEY = 'radar.locale'

export const radarMessages = {
  'zh-CN': {
    nav: {
      brand: 'AI 产品雷达',
      radar: '看板',
      language: '切换语言',
    },
    page: {
      heroKicker: '公开项目池',
      heroTitle: 'AI Daily Product Radar',
      heroSubtitle: '把每天的 AI 原生项目判断沉淀成可搜索、可复盘、可公开演示的产品池。',
      primaryCta: '查看看板',
      secondaryCta: 'GitHub 仓库',
      title: '项目池看板',
      subtitle: '按最近一次判断进入精选、观察、低信号和已发布列。',
      proof: {
        runsLabel: '历史日报',
        projectsLabel: '去重项目',
        latestLabel: '最新日报',
        modeLabel: '展示模式',
        staticMode: 'Pages 静态版',
        liveMode: '本地 API 版',
      },
      workflow: [
        {
          title: '从日报导入',
          body: '只读取完整 run JSON，自动跳过消息稿和重试稿。',
        },
        {
          title: '合并同名 repo',
          body: '把反复出现的项目聚合为一张卡，保留首次、最近和最高分。',
        },
        {
          title: '保留判断历史',
          body: '点开项目即可看到每次出现时的分类、理由和建议动作。',
        },
      ],
    },
    controls: {
      allHistory: '全部历史',
      importRuns: '导入历史数据',
      filterByDate: '按最近出现日期筛选',
    },
    stats: {
      runs: '期日报',
      projects: '个项目',
    },
    columns: {
      'top-picks': '优先精选',
      watchlist: '继续观察',
      'skip-low-signal': '低信号跳过',
      published: '已发布',
    },
    sections: {
      top: '精选',
      watchlist: '观察',
      skip: '跳过',
    },
    card: {
      seenMeta: (count: number, date: string) => `出现 ${count} 次 · 最近 ${date}`,
    },
    detail: {
      empty: '选择一个项目，查看它的历史判断和行动线索。',
      currentJudgment: '当前判断',
      profile: '项目画像',
      profileFromHistory: '部分画像字段沿用最近一次完整历史记录。',
      audience: '目标用户',
      aiNativeAngle: 'AI 原生角度',
      runnability: '可运行性',
      recommendedAction: '建议动作',
      history: '历史记录',
      loadingHistory: '正在加载历史...',
      original: '原文',
      unknown: '暂无记录',
      reviewManually: '手动复核',
      score: (score: number) => `分数 ${score}`,
      seenMeta: (section: string, count: number) => `${section} · 出现 ${count} 次`,
    },
    feedback: {
      loading: '正在加载看板...',
      empty: '还没有雷达数据。请先导入历史日报来生成看板。',
      importNotice: (runs: number, entries: number) => `已导入 ${runs} 期日报和 ${entries} 条项目记录。`,
    },
  },
  'en-US': {
    nav: {
      brand: 'AI Product Radar',
      radar: 'Radar',
      language: 'Switch language',
    },
    page: {
      heroKicker: 'Public project pool',
      heroTitle: 'AI Daily Product Radar',
      heroSubtitle: 'A searchable, reviewable project pool built from daily AI-native product judgments.',
      primaryCta: 'Explore board',
      secondaryCta: 'GitHub repo',
      title: 'Project pool board',
      subtitle: 'Projects are grouped by their latest judgment: top picks, watchlist, low signal, or published.',
      proof: {
        runsLabel: 'historical runs',
        projectsLabel: 'deduplicated projects',
        latestLabel: 'latest run',
        modeLabel: 'demo mode',
        staticMode: 'Pages snapshot',
        liveMode: 'Local API mode',
      },
      workflow: [
        {
          title: 'Import runs',
          body: 'Read complete run JSON only, while skipping message drafts and retry files.',
        },
        {
          title: 'Merge repositories',
          body: 'Repeated repos become one card with first seen, latest seen, and best score preserved.',
        },
        {
          title: 'Keep judgment history',
          body: 'Open a card to inspect every prior category, reason, and recommended action.',
        },
      ],
    },
    controls: {
      allHistory: 'All history',
      importRuns: 'Import historical runs',
      filterByDate: 'Filter by latest seen date',
    },
    stats: {
      runs: 'runs',
      projects: 'projects',
    },
    columns: {
      'top-picks': 'Top Picks',
      watchlist: 'Watchlist',
      'skip-low-signal': 'Skip / Low Signal',
      published: 'Published',
    },
    sections: {
      top: 'top',
      watchlist: 'watchlist',
      skip: 'skip',
    },
    card: {
      seenMeta: (count: number, date: string) => `Seen ${count}x · latest ${date}`,
    },
    detail: {
      empty: 'Select a project card to inspect its history.',
      currentJudgment: 'Current judgment',
      profile: 'Project profile',
      profileFromHistory: 'Some profile fields reuse the most recent complete history entry.',
      audience: 'Audience',
      aiNativeAngle: 'AI-native angle',
      runnability: 'Runnability',
      recommendedAction: 'Recommended action',
      history: 'History',
      loadingHistory: 'Loading history...',
      original: 'Original',
      unknown: 'Unknown',
      reviewManually: 'Review manually',
      score: (score: number) => `score ${score}`,
      seenMeta: (section: string, count: number) => `${section} · seen ${count}x`,
    },
    feedback: {
      loading: 'Loading radar board...',
      empty: 'No radar runs imported yet. Import historical runs to build the board.',
      importNotice: (runs: number, entries: number) => `Imported ${runs} runs and ${entries} entries.`,
    },
  },
} satisfies Record<Locale, unknown>

const currentLocale = ref<Locale>(readStoredLocale(getBrowserStorage()))

function getBrowserStorage(): LocaleStorageLike | null {
  if (typeof window === 'undefined') return null
  return window.localStorage
}

function isLocalizedRecord(value: LocalizedText): value is Partial<Record<Locale, string>> {
  return typeof value === 'object' && value !== null
}

function hasChineseText(value: string): boolean {
  return /[\u3400-\u9fff]/.test(value)
}

export function isLocale(value: unknown): value is Locale {
  return value === 'zh-CN' || value === 'en-US'
}

export function readStoredLocale(storage: Pick<LocaleStorageLike, 'getItem'> | null | undefined): Locale {
  if (!storage) return DEFAULT_LOCALE
  try {
    const value = storage.getItem(RADAR_LOCALE_STORAGE_KEY)
    return isLocale(value) ? value : DEFAULT_LOCALE
  } catch {
    return DEFAULT_LOCALE
  }
}

export function writeStoredLocale(
  storage: Pick<LocaleStorageLike, 'setItem'> | null | undefined,
  locale: Locale,
): void {
  if (!storage) return
  try {
    storage.setItem(RADAR_LOCALE_STORAGE_KEY, locale)
  } catch {
    // Storage can be unavailable in private browsing or tests.
  }
}

export function getLocalizedText(value: LocalizedText | null | undefined, locale: Locale): LocalizedTextResult {
  if (!value) return { text: null, isOriginal: false }
  if (typeof value === 'string') {
    return { text: value, isOriginal: locale !== 'en-US' && !hasChineseText(value) }
  }
  if (isLocalizedRecord(value)) {
    const localized = value[locale]
    if (localized) return { text: localized, isOriginal: false }
    const source = value['en-US']
    if (source) return { text: source, isOriginal: locale !== 'en-US' }
  }
  return { text: null, isOriginal: false }
}

export function getFirstLocalizedText(
  values: Array<LocalizedText | null | undefined>,
  locale: Locale,
): LocalizedTextResult {
  for (const value of values) {
    const result = getLocalizedText(value, locale)
    if (result.text) return result
  }
  return { text: null, isOriginal: false }
}

export function formatCount(locale: Locale, count: number, unit: 'runs' | 'projects'): string {
  const messages = radarMessages[locale]
  return locale === 'zh-CN' ? `${count} ${messages.stats[unit]}` : `${count} ${messages.stats[unit]}`
}

export function formatCardMeta(locale: Locale, seenCount: number, lastSeenDate: string): string {
  return radarMessages[locale].card.seenMeta(seenCount, lastSeenDate)
}

export function formatDetailMeta(locale: Locale, section: RadarSection, seenCount: number): string {
  const messages = radarMessages[locale]
  return messages.detail.seenMeta(messages.sections[section], seenCount)
}

export function formatScore(locale: Locale, score: number): string {
  return radarMessages[locale].detail.score(score)
}

export function getColumnTitle(locale: Locale, status: RadarBoardStatus): string {
  return radarMessages[locale].columns[status]
}

export function useRadarLocale() {
  const messages = computed(() => radarMessages[currentLocale.value])

  function setLocale(locale: Locale) {
    currentLocale.value = locale
    writeStoredLocale(getBrowserStorage(), locale)
  }

  function toggleLocale() {
    setLocale(currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN')
  }

  return {
    locale: currentLocale,
    messages,
    setLocale,
    toggleLocale,
  }
}
