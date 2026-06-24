<script setup lang="ts">
import { computed } from 'vue'
import {
  formatDetailMeta,
  formatScore,
  getFirstLocalizedText,
  getLocalizedText,
  radarMessages,
  type Locale,
  type LocalizedTextResult,
} from '../i18n'
import type { Radar, RadarProjectEntry } from '../types'

const props = defineProps<{
  project: Radar | null
  history: RadarProjectEntry[]
  loading: boolean
  locale: Locale
}>()

const messages = computed(() => radarMessages[props.locale])
const detailMeta = computed(() =>
  props.project ? formatDetailMeta(props.locale, props.project.latestSection, props.project.seenCount) : '',
)
type FactKey = 'audience' | 'aiNativeAngle' | 'runnability' | 'recommendedAction'

const latestHistoryEntry = computed(() => props.history[0] ?? null)
const currentJudgment = computed(() => {
  if (!props.project) return { text: null, isOriginal: false } satisfies LocalizedTextResult
  const latest = latestHistoryEntry.value
  if (latest) return getFirstLocalizedText([latest.skipReason, latest.summary], props.locale)
  return getFirstLocalizedText([props.project.skipReason, props.project.summary], props.locale)
})
const facts = computed<Array<{ key: FactKey; label: string; value: LocalizedTextResult }>>(() => {
  if (!props.project) return []
  return [
    {
      key: 'audience',
      label: messages.value.detail.audience,
      value: getLocalizedText(props.project.audience, props.locale),
    },
    {
      key: 'aiNativeAngle',
      label: messages.value.detail.aiNativeAngle,
      value: getLocalizedText(props.project.aiNativeAngle, props.locale),
    },
    {
      key: 'runnability',
      label: messages.value.detail.runnability,
      value: getLocalizedText(props.project.runnability, props.locale),
    },
    {
      key: 'recommendedAction',
      label: messages.value.detail.recommendedAction,
      value: getFirstLocalizedText([props.project.recommendedAction, props.project.skipReason], props.locale),
    },
  ]
})
const profileUsesHistory = computed(() => {
  const latest = latestHistoryEntry.value
  if (!props.project || !latest) return false
  return facts.value.some((fact) => fact.value.text && latest[fact.key] === null)
})
const historyItems = computed(() =>
  props.history.map((entry) => ({
    ...entry,
    sectionLabel: messages.value.sections[entry.section],
    scoreLabel: entry.score === null ? null : formatScore(props.locale, entry.score),
    body: getFirstLocalizedText([entry.summary, entry.skipReason], props.locale),
  })),
)
</script>

<template>
  <aside class="radar-detail">
    <div v-if="!project" class="radar-detail__empty">{{ messages.detail.empty }}</div>
    <template v-else>
      <header class="radar-detail__header">
        <a :href="project.url" target="_blank" rel="noreferrer">{{ project.fullName }}</a>
        <span>{{ detailMeta }}</span>
      </header>

      <section class="radar-detail__current">
        <h3>{{ messages.detail.currentJudgment }}</h3>
        <p>
          {{ currentJudgment.text || messages.detail.unknown }}
          <span v-if="currentJudgment.isOriginal" class="radar-detail__source">{{ messages.detail.original }}</span>
        </p>
      </section>

      <section class="radar-detail__profile">
        <h3>{{ messages.detail.profile }}</h3>
        <p v-if="profileUsesHistory" class="radar-detail__hint">{{ messages.detail.profileFromHistory }}</p>
        <dl class="radar-detail__facts">
          <div v-for="fact in facts" :key="fact.key">
            <dt>{{ fact.label }}</dt>
            <dd>
              {{ fact.value.text || (fact.key === 'recommendedAction' ? messages.detail.reviewManually : messages.detail.unknown) }}
              <span v-if="fact.value.isOriginal" class="radar-detail__source">{{ messages.detail.original }}</span>
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h3>{{ messages.detail.history }}</h3>
        <div v-if="loading" class="radar-detail__loading">{{ messages.detail.loadingHistory }}</div>
        <ol v-else class="radar-detail__history">
          <li v-for="entry in historyItems" :key="entry.id">
            <strong>{{ entry.runDate }}</strong>
            <span>{{ entry.sectionLabel }}</span>
            <span v-if="entry.scoreLabel">{{ entry.scoreLabel }}</span>
            <p>
              {{ entry.body.text || messages.detail.unknown }}
              <span v-if="entry.body.isOriginal" class="radar-detail__source">{{ messages.detail.original }}</span>
            </p>
          </li>
        </ol>
      </section>
    </template>
  </aside>
</template>

<style lang="less" scoped>
.radar-detail {
  height: 100%;
  min-height: 0;
  overflow: auto;
  padding: @space-md;
  border: 1px solid @color-border;
  border-radius: @radius-md;
  background: @color-bg-elevated;

  &__empty,
  &__loading {
    color: @color-text-secondary;
  }

  &__header {
    display: grid;
    gap: @space-xs;
    margin-bottom: @space-lg;

    a {
      font-size: @font-size-lg;
      font-weight: 700;
      color: @color-primary;
      overflow-wrap: anywhere;
    }

    span {
      color: @color-text-secondary;
    }
  }

  &__current,
  &__profile {
    margin-bottom: @space-md;
  }

  &__current p,
  &__hint {
    margin-top: @space-xs;
    line-height: @line-height-base;
  }

  &__hint {
    color: @color-text-secondary;
    font-size: @font-size-sm;
  }

  &__facts {
    display: grid;
    gap: @space-sm;
    margin: @space-sm 0 0;

    dt {
      color: @color-text-secondary;
      font-size: @font-size-sm;
    }

    dd {
      margin: @space-xs 0 0;
      line-height: @line-height-base;
    }
  }

  h3 {
    margin-bottom: @space-md;
  }

  &__history {
    display: grid;
    gap: @space-md;
    padding-left: @space-lg;

    li {
      line-height: @line-height-base;
    }

    span {
      margin-left: @space-sm;
      color: @color-text-secondary;
      font-size: @font-size-sm;
    }

    p {
      margin-top: @space-xs;
    }
  }

  &__source {
    display: inline-block;
    margin-left: @space-xs;
    padding: 1px @space-xs;
    border: 1px solid @color-border;
    border-radius: @radius-sm;
    color: @color-text-secondary;
    font-size: @font-size-sm;
    line-height: 1.3;
    vertical-align: 1px;
  }
}

@media (max-width: 960px) {
  .radar-detail {
    height: min(520px, 70dvh);
  }
}
</style>
