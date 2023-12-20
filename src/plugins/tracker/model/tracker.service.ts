import { MetricsProvider } from './metrics.provider'
import { EVENT_TYPES } from './tracker.constants'

class TrackerService {
  _metrics = MetricsProvider

  track(targetSlug, options) {
    this._metrics?.notifyServices(
      options?.route ? EVENT_TYPES.ROUTE_CHANGING : EVENT_TYPES.GOAL,
      {
        target: targetSlug,
        ...(options?.referer ? { referer: options.referer } : {})
      }
    )
  }
}

const tracker = new TrackerService()

export { tracker, TrackerService }
