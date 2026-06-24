<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRadarLocale } from '@/modules/radar'

const { locale, messages, toggleLocale } = useRadarLocale()
</script>

<template>
  <div class="layout">
    <header class="layout__header">
      <RouterLink to="/" class="layout__brand">{{ messages.nav.brand }}</RouterLink>
      <nav class="layout__nav">
        <RouterLink to="/radar" active-class="is-active">{{ messages.nav.radar }}</RouterLink>
      </nav>
      <button class="layout__locale" type="button" :aria-label="messages.nav.language" @click="toggleLocale">
        <span :class="{ 'is-active': locale === 'zh-CN' }">中文</span>
        <span>/</span>
        <span :class="{ 'is-active': locale === 'en-US' }">EN</span>
      </button>
    </header>
    <main class="layout__main">
      <RouterView />
    </main>
  </div>
</template>

<style lang="less" scoped>
.layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &__header {
    height: 72px;
    padding: 0 @space-xl;
    background-color: @color-bg-elevated;
    border-bottom: 1px solid @color-border;
    display: flex;
    align-items: center;
    gap: @space-xl;
    box-shadow: @shadow-sm;
    flex: 0 0 auto;
  }

  &__brand {
    font-weight: 700;
    font-size: @font-size-lg;
    color: @color-text;
  }

  &__nav {
    display: flex;
    gap: @space-lg;
    flex: 1;

    a {
      color: @color-text-secondary;
      padding: @space-xs @space-sm;
      border-radius: @radius-sm;

      &.is-active {
        color: @color-primary;
        background-color: rgba(59, 130, 246, 0.08);
      }
    }
  }

  &__locale {
    display: inline-flex;
    align-items: center;
    gap: @space-xs;
    height: 32px;
    padding: 0 @space-sm;
    border: 1px solid @color-border;
    border-radius: @radius-sm;
    background: @color-bg-elevated;
    color: @color-text-secondary;
    cursor: pointer;
    transition: border-color @transition-fast, color @transition-fast;

    &:hover {
      border-color: @color-primary;
      color: @color-text;
    }

    .is-active {
      color: @color-primary;
      font-weight: 700;
    }
  }

  &__main {
    flex: 1;
    min-height: 0;
    padding: @space-xl;
    overflow: hidden;
  }
}

@media (max-width: 720px) {
  .layout {
    &__header {
      padding: 0 @space-md;
      gap: @space-md;
    }

    &__brand {
      font-size: @font-size-md;
    }
  }
}
</style>
