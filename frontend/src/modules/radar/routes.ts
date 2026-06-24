import type { RouteRecordRaw } from 'vue-router'

export const radarRoutes: RouteRecordRaw[] = [
  {
    path: 'radar',
    name: 'radar-board',
    component: () => import('./views/RadarBoardView.vue'),
  },
]
