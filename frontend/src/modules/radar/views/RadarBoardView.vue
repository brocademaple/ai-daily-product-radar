<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton/index.vue'
import BaseEmpty from '@/components/BaseEmpty/index.vue'
import RadarProjectCard from '../components/RadarProjectCard.vue'
import RadarProjectDetail from '../components/RadarProjectDetail.vue'
import { formatCount, getColumnTitle, useRadarLocale } from '../i18n'
import { useRadarStore } from '../store'
import type { Radar, RadarBoardStatus } from '../types'

const store = useRadarStore()
const { locale, messages } = useRadarLocale()
const selectedDate = ref('all')
const selectedProject = ref<Radar | null>(null)

const columns: Array<{ key: RadarBoardStatus }> = [
  { key: 'top-picks' },
  { key: 'watchlist' },
  { key: 'skip-low-signal' },
  { key: 'published' },
]

const dates = computed(() => Array.from(new Set(store.projects.map((project) => project.lastSeenDate))).sort().reverse())
const filteredProjects = computed(() =>
  selectedDate.value === 'all'
    ? store.projects
    : store.projects.filter((project) => project.lastSeenDate === selectedDate.value),
)
const projectCount = computed(() => filteredProjects.value.length)
const selectedDateLabel = computed(() => (selectedDate.value === 'all' ? messages.value.controls.allHistory : selectedDate.value))
const importNotice = computed(() =>
  store.lastImport
    ? messages.value.feedback.importNotice(store.lastImport.importedRuns, store.lastImport.importedEntries)
    : '',
)
const latestRunDate = computed(() => {
  const [latest] = store.runs
    .map((run) => run.runDate)
    .filter(Boolean)
    .sort()
    .reverse()
  return latest ?? messages.value.detail.unknown
})
const proofStats = computed(() => [
  {
    label: messages.value.page.proof.runsLabel,
    value: store.loading ? '...' : String(store.runs.length),
  },
  {
    label: messages.value.page.proof.projectsLabel,
    value: store.loading ? '...' : String(store.projects.length),
  },
  {
    label: messages.value.page.proof.latestLabel,
    value: store.loading ? '...' : latestRunDate.value,
  },
  {
    label: messages.value.page.proof.modeLabel,
    value: store.isStaticMode ? messages.value.page.proof.staticMode : messages.value.page.proof.liveMode,
  },
])

function projectsFor(status: RadarBoardStatus) {
  return filteredProjects.value.filter((project) => project.boardStatus === status)
}

async function selectProject(project: Radar) {
  selectedProject.value = project
  await store.fetchProjectHistory(project.fullName)
}

onMounted(() => {
  void store.fetchDashboard()
})
</script>

<template>
  <section class="radar-page">
    <header class="radar-page__hero">
      <div class="radar-page__hero-copy">
        <p class="radar-page__kicker">{{ messages.page.heroKicker }}</p>
        <h1>{{ messages.page.heroTitle }}</h1>
        <p>{{ messages.page.heroSubtitle }}</p>
        <div class="radar-page__hero-actions">
          <a class="radar-page__cta radar-page__cta--primary" href="#radar-board">{{ messages.page.primaryCta }}</a>
          <a
            class="radar-page__cta radar-page__cta--secondary"
            href="https://github.com/brocademaple/ai-daily-product-radar"
            target="_blank"
            rel="noreferrer"
          >
            {{ messages.page.secondaryCta }}
          </a>
        </div>
      </div>

      <aside class="radar-page__proof" :aria-label="messages.page.heroKicker">
        <dl class="radar-page__proof-grid">
          <div v-for="stat in proofStats" :key="stat.label">
            <dt>{{ stat.label }}</dt>
            <dd>{{ stat.value }}</dd>
          </div>
        </dl>
        <ol class="radar-page__workflow">
          <li v-for="item in messages.page.workflow" :key="item.title">
            <strong>{{ item.title }}</strong>
            <span>{{ item.body }}</span>
          </li>
        </ol>
      </aside>
    </header>

    <section id="radar-board" class="radar-page__workspace">
      <header class="radar-page__header">
        <div class="radar-page__title">
          <h2>{{ messages.page.title }}</h2>
          <p>{{ messages.page.subtitle }}</p>
        </div>
        <div class="radar-page__summary" aria-live="polite">
          <span>{{ formatCount(locale, store.runs.length, 'runs') }}</span>
          <span>{{ formatCount(locale, projectCount, 'projects') }}</span>
          <span>{{ selectedDateLabel }}</span>
        </div>
        <div class="radar-page__actions">
          <select v-model="selectedDate" :aria-label="messages.controls.filterByDate">
            <option value="all">{{ messages.controls.allHistory }}</option>
            <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
          </select>
          <BaseButton v-if="!store.isStaticMode" :loading="store.importing" @click="store.importLocalRuns">
            {{ messages.controls.importRuns }}
          </BaseButton>
        </div>
      </header>

      <div v-if="store.error" class="radar-page__error">{{ store.error }}</div>
      <div v-if="store.lastImport" class="radar-page__notice">{{ importNotice }}</div>

      <div class="radar-page__grid">
        <div class="radar-page__board">
          <div v-if="store.loading" class="radar-page__loading">{{ messages.feedback.loading }}</div>
          <BaseEmpty
            v-else-if="store.projects.length === 0"
            :description="messages.feedback.empty"
          />
          <section v-for="column in columns" v-else :key="column.key" class="radar-column">
            <header>
              <h2>{{ getColumnTitle(locale, column.key) }}</h2>
              <span>{{ projectsFor(column.key).length }}</span>
            </header>
            <div class="radar-column__items">
              <RadarProjectCard
                v-for="project in projectsFor(column.key)"
                :key="project.fullName"
                :project="project"
                :active="selectedProject?.fullName === project.fullName"
                :locale="locale"
                @click="selectProject(project)"
              />
            </div>
          </section>
        </div>

        <RadarProjectDetail
          :project="selectedProject"
          :history="store.selectedHistory"
          :loading="store.historyLoading"
          :locale="locale"
        />
      </div>
    </section>
  </section>
</template>

<style lang="less" scoped>
.radar-page {
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow: auto;
  padding-bottom: @space-xl;

  &__hero {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.7fr);
    gap: @space-xl;
    align-items: stretch;
    padding: 34px;
    border: 1px solid @color-border;
    border-radius: @radius-lg;
    background:
      linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(16, 185, 129, 0.1)),
      @color-bg-elevated;
    box-shadow: @shadow-sm;
  }

  &__hero-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: @space-lg;

    h1 {
      max-width: 760px;
      font-size: clamp(40px, 6vw, 76px);
      line-height: 0.98;
      letter-spacing: 0;
      color: #111827;
    }

    p:not(.radar-page__kicker) {
      max-width: 620px;
      color: #374151;
      font-size: 18px;
      line-height: 1.7;
    }
  }

  &__kicker {
    width: fit-content;
    padding: 4px @space-sm;
    border: 1px solid rgba(37, 99, 235, 0.22);
    border-radius: @radius-sm;
    color: @color-primary-active;
    background: rgba(255, 255, 255, 0.72);
    font-size: @font-size-sm;
    font-weight: 700;
  }

  &__hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: @space-sm;
    align-items: center;
  }

  &__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding: 0 @space-lg;
    border-radius: @radius-md;
    border: 1px solid transparent;
    font-weight: 700;
    white-space: nowrap;
    transition: transform @transition-fast, border-color @transition-fast, background @transition-fast;

    &:active {
      transform: translateY(1px);
    }

    &--primary {
      color: @color-text-inverse;
      background: @color-primary-active;

      &:hover {
        color: @color-text-inverse;
        background: #1e40af;
      }
    }

    &--secondary {
      color: #111827;
      border-color: rgba(17, 24, 39, 0.16);
      background: rgba(255, 255, 255, 0.74);

      &:hover {
        color: #111827;
        border-color: rgba(17, 24, 39, 0.32);
      }
    }
  }

  &__proof {
    display: grid;
    gap: @space-lg;
    padding: @space-lg;
    border: 1px solid rgba(17, 24, 39, 0.1);
    border-radius: @radius-lg;
    background: rgba(255, 255, 255, 0.78);
  }

  &__proof-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: @space-sm;
    margin: 0;

    div {
      padding: @space-md;
      border: 1px solid rgba(17, 24, 39, 0.08);
      border-radius: @radius-md;
      background: @color-bg-elevated;
    }

    dt {
      color: @color-text-secondary;
      font-size: @font-size-sm;
      line-height: 1.4;
    }

    dd {
      margin: @space-xs 0 0;
      color: #111827;
      font-size: 24px;
      line-height: 1.1;
      font-weight: 800;
      overflow-wrap: anywhere;
    }
  }

  &__workflow {
    display: grid;
    gap: @space-sm;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      display: grid;
      gap: 2px;
      padding-left: @space-md;
      border-left: 3px solid rgba(37, 99, 235, 0.24);
    }

    strong {
      color: @color-text;
    }

    span {
      color: @color-text-secondary;
      line-height: 1.6;
    }
  }

  &__workspace {
    min-height: 680px;
    display: flex;
    flex-direction: column;
    gap: @space-lg;
    padding: @space-xl;
    border: 1px solid @color-border;
    border-radius: @radius-lg;
    background: @color-bg-elevated;
    scroll-margin-top: 88px;
  }

  &__header {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      'title actions'
      'summary actions';
    align-items: start;
    row-gap: @space-xl;
    column-gap: @space-xl;
    min-height: 150px;
    flex: 0 0 auto;
  }

  &__title {
    grid-area: title;
    min-width: 280px;
    flex: 1 1 auto;

    h2 {
      font-size: 28px;
      line-height: 1.25;
      margin-bottom: @space-sm;
    }

    p {
      color: @color-text-secondary;
      font-size: @font-size-md;
    }
  }

  &__actions {
    grid-area: actions;
    display: flex;
    gap: @space-sm;
    align-items: center;

    select {
      min-width: 148px;
      height: 36px;
      padding: 0 @space-sm;
      border: 1px solid @color-border;
      border-radius: @radius-sm;
      background: @color-bg-elevated;
    }
  }

  &__error,
  &__notice {
    padding: @space-sm @space-md;
    border-radius: @radius-md;
  }

  &__error {
    background: rgba(239, 68, 68, 0.08);
    color: @color-danger;
  }

  &__notice {
    background: @color-bg-muted;
    color: @color-text-secondary;
  }

  &__summary {
    grid-area: summary;
    display: flex;
    gap: @space-lg;
    flex: 0 0 auto;
    color: @color-text-secondary;
    font-size: @font-size-md;
    white-space: nowrap;
  }

  &__grid {
    flex: 1;
    min-height: 520px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, 460px);
    gap: @space-xl;
    align-items: stretch;
  }

  &__board {
    min-width: 0;
    min-height: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: @space-md;
    overflow-x: auto;
    overflow-y: hidden;
  }

  &__loading {
    color: @color-text-secondary;
  }
}

.radar-column {
  min-height: 0;
  display: flex;
  flex-direction: column;
  min-width: 220px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 @space-md @space-sm;
    border-bottom: 2px solid @color-border;
    flex: 0 0 auto;

    h2 {
      font-size: @font-size-lg;
    }

    span {
      color: @color-text-secondary;
    }
  }

  &__items {
    min-height: 0;
    display: grid;
    align-content: start;
    gap: @space-sm;
    padding: @space-sm 0 0;
    overflow-y: auto;
  }
}

@media (max-width: 960px) {
  .radar-page {
    gap: @space-md;
    padding-bottom: @space-md;

    &__hero {
      grid-template-columns: 1fr;
      padding: @space-xl;
    }

    &__hero-copy {
      h1 {
        font-size: 44px;
      }
    }

    &__proof-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    &__workspace {
      min-height: auto;
      padding: @space-lg;
    }

    &__header {
      grid-template-columns: 1fr;
      grid-template-areas:
        'title'
        'summary'
        'actions';
      min-height: auto;
      row-gap: @space-md;
    }

    &__summary {
      flex-wrap: wrap;
    }

    &__grid {
      flex: 0 0 auto;
      min-height: auto;
      grid-template-columns: 1fr;
      overflow: visible;
    }

    &__board {
      height: 520px;
      min-height: 0;
    }

    &__title {
      min-width: 0;
    }
  }
}

@media (max-width: 640px) {
  .radar-page {
    &__hero {
      padding: @space-lg;
    }

    &__hero-copy {
      h1 {
        font-size: 38px;
      }

      p:not(.radar-page__kicker) {
        font-size: @font-size-md;
      }
    }

    &__proof-grid {
      grid-template-columns: 1fr;
    }

    &__summary,
    &__actions,
    &__hero-actions {
      width: 100%;
    }

    &__actions {
      align-items: stretch;
      flex-direction: column;

      select {
        width: 100%;
      }
    }

    &__cta {
      width: 100%;
    }
  }
}
</style>
