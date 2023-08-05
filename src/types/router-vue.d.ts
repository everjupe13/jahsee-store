import type { VueElement } from 'vue'

import type { AppLayoutsEnum } from '@/layout/layout.types'

declare module 'vue-router' {
  interface RouteMeta {
    layout?: AppLayoutsEnum
    layoutComponent?: VueElement
  }
}
