/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RADAR_DATA_MODE?: 'dynamic' | 'static'
  readonly VITE_ROUTER_MODE?: 'history' | 'hash'
  readonly VITE_BASE_PATH?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
