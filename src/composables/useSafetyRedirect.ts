import { useRoute, useRouter } from 'vue-router'

import { RouteNamesEnum } from '@/router/router.types'

export const useSafetyRedirect = () => {
  const route = useRoute()
  const router = useRouter()

  async function _tryToRedirectFromQuery() {
    try {
      if (
        route.query.redirect &&
        Object.values(RouteNamesEnum).includes(
          route.query.redirect.slice(
            1
          ) as (typeof RouteNamesEnum)[keyof typeof RouteNamesEnum]
        )
      ) {
        router.push(route.query.redirect.slice(1) as string)
        return
      }
    } catch {
      /* empty */
    }
  }

  _tryToRedirectFromQuery()
}
