import { storeToRefs } from 'pinia'
import { NavigationGuardWithThis } from 'vue-router'

import { useAuthStore } from '@/api/modules/auth/auth.store'

import { RouteNamesEnum } from '../router.types'

export const authMiddleware: NavigationGuardWithThis<undefined> = (
  to,
  _from
) => {
  const store = useAuthStore()
  const { isAuth } = storeToRefs(store)

  if (
    to.meta?.requiresAuth &&
    !isAuth.value &&
    to.name !== RouteNamesEnum.login
  ) {
    return {
      name: RouteNamesEnum.login,
      query: { redirect: to.fullPath }
    }
  }

  if (
    to.meta?.requiresUnauth &&
    isAuth.value &&
    to.name !== RouteNamesEnum.home
  ) {
    return {
      name: RouteNamesEnum.home
    }
  }
}
