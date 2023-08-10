// import { jwtDecode } from 'jwt-decode'
import { isPlainObject } from 'lodash-es'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAppFetch } from '@/api/shared/network/useAppFetch'
import { RouteNamesEnum } from '@/router/router.types'

import { IUser } from './auth.types'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const route = useRoute()
  const userData = ref<IUser | null>(null)
  const isAuth = computed<boolean>(
    () =>
      !!userData.value &&
      isPlainObject(userData.value) &&
      Object.keys(userData.value as object).length > 0
  )

  async function authUser({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    try {
      userData.value = {
        userEmail: email,
        userPassword: password,
        userName: 'John Testenko'
      }

      if (
        route.query.redirect &&
        Object.values(RouteNamesEnum).includes(
          route.query.redirect.slice(
            1
          ) as (typeof RouteNamesEnum)[keyof typeof RouteNamesEnum]
        )
      ) {
        await router.push(route.query.redirect.slice(1) as string)
        return
      }

      await router.push({ name: RouteNamesEnum.home })

      const _fetchReturn = await useAppFetch('login').post().json()
      console.log(_fetchReturn)

      return true
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  async function signUpUser({
    email,
    name,
    lastName,
    password
  }: {
    email: string
    name: string
    lastName?: string
    password: string
  }) {
    try {
      userData.value = {
        userEmail: email,
        userName: name,
        ...(lastName
          ? { userLastName: lastName }
          : { userLastName: undefined }),
        userPassword: password
      }

      await router.push({ name: RouteNamesEnum.home })

      const _fetchReturn = await useAppFetch('signup').post().json()
      console.log(_fetchReturn)

      return true
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  async function logoutUser() {
    userData.value = null
    await router.push({ name: RouteNamesEnum.home })
  }

  return { userData, isAuth, authUser, signUpUser, logoutUser }
})
