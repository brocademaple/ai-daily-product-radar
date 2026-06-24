<script setup lang="ts">
import type { Radar, RadarProjectEntry } from '../types'

defineProps<{
  project: Radar | null
  history: RadarProjectEntry[]
  loading: boolean
}>()
</script>

<template>
  <aside class="radar-detail">
    <div v-if="!project" class="radar-detail__empty">Select a project card to inspect its history.</div>
    <template v-else>
      <header class="radar-detail__header">
        <a :href="project.url" target="_blank" rel="noreferrer">{{ project.fullName }}</a>
        <span>{{ project.latestSection }} · seen {{ project.seenCount }}x</span>
      </header>

      <dl class="radar-detail__facts">
        <div>
          <dt>Audience</dt>
          <dd>{{ project.audience || 'Unknown' }}</dd>
        </div>
        <div>
          <dt>AI-native angle</dt>
          <dd>{{ project.aiNativeAngle || 'Unknown' }}</dd>
        </div>
        <div>
          <dt>Runnability</dt>
          <dd>{{ project.runnability || 'Unknown' }}</dd>
        </div>
        <div>
          <dt>Recommended action</dt>
          <dd>{{ project.recommendedAction || project.skipReason || 'Review manually' }}</dd>
        </div>
      </dl>

      <section>
        <h3>History</h3>
        <div v-if="loading" class="radar-detail__loading">Loading history...</div>
        <ol v-else class="radar-detail__history">
          <li v-for="entry in history" :key="entry.id">
            <strong>{{ entry.runDate }}</strong>
            <span>{{ entry.section }}</span>
            <span v-if="entry.score !== null">score {{ entry.score }}</span>
            <p>{{ entry.summary || entry.skipReason || 'No summary recorded.' }}</p>
          </li>
        </ol>
      </section>
    </template>
  </aside>
</template>

<style lang="less" scoped>
.radar-detail {
  min-height: 320px;
  padding: @space-lg;
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
      font-size: @font-size-xl;
      font-weight: 700;
      color: @color-primary;
      overflow-wrap: anywhere;
    }

    span {
      color: @color-text-secondary;
    }
  }

  &__facts {
    display: grid;
    gap: @space-md;
    margin: 0 0 @space-lg;

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
}
</style>
