<script setup lang="ts">
import { computed } from 'vue'
import { formatCardMeta, getLocalizedText, type Locale } from '../i18n'
import type { Radar } from '../types'

const props = defineProps<{
  project: Radar
  active?: boolean
  locale: Locale
}>()

const category = computed(() => getLocalizedText(props.project.category, props.locale).text)
const summary = computed(() => getLocalizedText(props.project.summary, props.locale).text)
const meta = computed(() => formatCardMeta(props.locale, props.project.seenCount, props.project.lastSeenDate))
</script>

<template>
  <button class="radar-card" :class="{ 'is-active': active }" type="button">
    <span class="radar-card__topline">
      <span class="radar-card__name">{{ project.fullName }}</span>
      <span v-if="project.bestScore !== null" class="radar-card__score">{{ project.bestScore }}</span>
    </span>
    <span v-if="category" class="radar-card__category">{{ category }}</span>
    <span v-if="summary" class="radar-card__summary">{{ summary }}</span>
    <span class="radar-card__meta">{{ meta }}</span>
  </button>
</template>

<style lang="less" scoped>
.radar-card {
  width: 100%;
  display: grid;
  gap: @space-xs;
  padding: @space-sm @space-md;
  border: 1px solid @color-border;
  border-radius: @radius-md;
  background: @color-bg-elevated;
  text-align: left;
  color: @color-text;
  cursor: pointer;
  transition: border-color @transition-fast, box-shadow @transition-fast;

  &:hover,
  &.is-active {
    border-color: @color-primary;
    box-shadow: @shadow-sm;
  }

  &__topline {
    display: flex;
    justify-content: space-between;
    gap: @space-sm;
    align-items: center;
  }

  &__name {
    font-weight: 700;
    min-width: 0;
    overflow-wrap: anywhere;
  }

  &__score {
    flex: 0 0 auto;
    min-width: 32px;
    padding: 2px @space-xs;
    border-radius: @radius-sm;
    color: @color-text-inverse;
    background: @color-primary;
    text-align: center;
    font-size: @font-size-sm;
    font-weight: 700;
  }

  &__category,
  &__meta {
    color: @color-text-secondary;
    font-size: @font-size-sm;
  }

  &__summary {
    line-height: @line-height-base;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>
