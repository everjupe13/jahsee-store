import { App } from 'vue'

import { tracker } from '../model/tracker.service'

const DEFAULT_EVENT_TYPE = 'click'

export const vTrackerPlugin = {
  install(app: App) {
    app.config.globalProperties.$tracker = (slug: string) => {
      return tracker.track(slug)
    }

    app.provide('tracker', tracker.track.bind(tracker))

    const _eventFn = (slug: string) => {
      tracker.track(slug)
    }

    app.directive('tracker', {
      mounted(el, binding) {
        const eventType = binding.arg || DEFAULT_EVENT_TYPE
        el.addEventListener(eventType, _eventFn.bind(null, binding.value))
      },

      unmounted(el, binding) {
        const eventType = binding.arg || DEFAULT_EVENT_TYPE
        el.removeEventListener(eventType, _eventFn)
      }
    })
  }
}
