import { storeToRefs } from 'pinia'
import { NavigationGuardWithThis } from 'vue-router'

import { useUserStore } from '@/api/modules/user'

import { RouteNamesEnum } from '../router.types'

export const authMiddleware: NavigationGuardWithThis<undefined> = async (
  to,
  _from
) => {
  const userStore = useUserStore()
  const { isAuth } = storeToRefs(userStore)

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
