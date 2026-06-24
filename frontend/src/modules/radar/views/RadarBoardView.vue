<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseButton from '@/components/BaseButton/index.vue'
import BaseEmpty from '@/components/BaseEmpty/index.vue'
import RadarProjectCard from '../components/RadarProjectCard.vue'
import RadarProjectDetail from '../components/RadarProjectDetail.vue'
import { useRadarStore } from '../store'
import type { Radar, RadarBoardStatus } from '../types'

const store = useRadarStore()
const selectedDate = ref('all')
const selectedProject = ref<Radar | null>(null)

const columns: Array<{ key: RadarBoardStatus; title: string }> = [
  { key: 'top-picks', title: 'Top Picks' },
  { key: 'watchlist', title: 'Watchlist' },
  { key: 'skip-low-signal', title: 'Skip / Low Signal' },
  { key: 'published', title: 'Published' },
]

const dates = computed(() => Array.from(new Set(store.projects.map((project) => project.lastSeenDate))).sort().reverse())
const filteredProjects = computed(() =>
  selectedDate.value === 'all'
    ? store.projects
    : store.projects.filter((project) => project.lastSeenDate === selectedDate.value),
)
const projectCount = computed(() => filteredProjects.value.length)

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
    <header class="radar-page__header">
      <div>
        <h1>AI Daily Product Radar</h1>
        <p>Global board of historical Codex daily radar outputs.</p>
      </div>
      <div class="radar-page__actions">
        <select v-model="selectedDate" aria-label="Filter by latest seen date">
          <option value="all">All history</option>
          <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
        </select>
        <BaseButton v-if="!store.isStaticMode" :loading="store.importing" @click="store.importLocalRuns">
          Import historical runs
        </BaseButton>
      </div>
    </header>

    <div v-if="store.error" class="radar-page__error">{{ store.error }}</div>
    <div v-if="store.lastImport" class="radar-page__notice">
      Imported {{ store.lastImport.importedRuns }} runs and {{ store.lastImport.importedEntries }} entries.
    </div>

    <div class="radar-page__summary">
      <span>{{ store.runs.length }} runs</span>
      <span>{{ projectCount }} projects</span>
      <span>{{ selectedDate === 'all' ? 'All history' : selectedDate }}</span>
    </div>

    <div class="radar-page__grid">
      <div class="radar-page__board">
        <div v-if="store.loading" class="radar-page__loading">Loading radar board...</div>
        <BaseEmpty
          v-else-if="store.projects.length === 0"
          description="No radar runs imported yet. Import historical runs to build the board."
        />
        <section v-for="column in columns" v-else :key="column.key" class="radar-column">
          <header>
            <h2>{{ column.title }}</h2>
            <span>{{ projectsFor(column.key).length }}</span>
          </header>
          <div class="radar-column__items">
            <RadarProjectCard
              v-for="project in projectsFor(column.key)"
              :key="project.fullName"
              :project="project"
              :active="selectedProject?.fullName === project.fullName"
              @click="selectProject(project)"
            />
          </div>
        </section>
      </div>

      <RadarProjectDetail
        :project="selectedProject"
        :history="store.selectedHistory"
        :loading="store.historyLoading"
      />
    </div>
  </section>
</template>

<style lang="less" scoped>
.radar-page {
  display: grid;
  gap: @space-lg;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: @space-lg;

    h1 {
      font-size: @font-size-xxl;
      margin-bottom: @space-xs;
    }

    p {
      color: @color-text-secondary;
    }
  }

  &__actions {
    display: flex;
    gap: @space-sm;

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
  &__notice,
  &__summary {
    padding: @space-md;
    border-radius: @radius-md;
  }

  &__error {
    background: rgba(239, 68, 68, 0.08);
    color: @color-danger;
  }

  &__notice,
  &__summary {
    background: @color-bg-muted;
    color: @color-text-secondary;
  }

  &__summary {
    display: flex;
    gap: @space-lg;
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 360px;
    gap: @space-lg;
    align-items: start;
  }

  &__board {
    display: grid;
    grid-template-columns: repeat(4, minmax(220px, 1fr));
    gap: @space-md;
    overflow-x: auto;
    padding-bottom: @space-sm;
  }

  &__loading {
    color: @color-text-secondary;
  }
}

.radar-column {
  display: grid;
  gap: @space-md;
  min-width: 220px;
  align-content: start;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: @space-sm @space-md;
    border-bottom: 2px solid @color-border;

    h2 {
      font-size: @font-size-lg;
    }

    span {
      color: @color-text-secondary;
    }
  }

  &__items {
    display: grid;
    gap: @space-sm;
  }
}

@media (max-width: 960px) {
  .radar-page {
    &__header,
    &__actions {
      flex-direction: column;
    }

    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
