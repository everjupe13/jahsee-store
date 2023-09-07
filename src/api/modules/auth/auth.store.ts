/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApiRequest } from '@/api/shared/network/http'
import { SHARED_LOCALSTORAGE_KEYS } from '@/config'

import { AuthApiMapper } from './auth.service'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(
    localStorage.getItem(SHARED_LOCALSTORAGE_KEYS.TOKEN)
  )

  async function signIn({
    email,
    password
  }: {
    email: string
    password: string
  }) {
    try {
      const fetchResponse = await useApiRequest.post('/token/login', {
        email,
        password
      })

      if (
        fetchResponse?.status &&
        fetchResponse.status < 400 &&
        fetchResponse?.data
      ) {
        token.value = fetchResponse?.data?.auth_token || null

        if (!token.value) {
          return { error: false, status: true, data: null }
        }

        localStorage.setItem(SHARED_LOCALSTORAGE_KEYS.TOKEN, token.value)
      }

      return { error: false, status: true, data: { email, password } }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      const errors = (error as AxiosError)?.response?.data as {
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, data: null, status: false }
      }
      return { error: error, data: null, status: false }
    }
  }

  async function signUp({
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
      const fetchResponse = await useApiRequest.post(
        '/users/',
        AuthApiMapper.toEntity({
          userEmail: email,
          userName: name,
          userLastName: lastName,
          userPassword: password
        })
      )

      if (fetchResponse?.status && fetchResponse.status < 400) {
        const { error, data, status } = await signIn({ email, password })
        return { error, data, status }
      }

      return {
        error: false,
        status: true,
        data: { email, name, lastName, password }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
      const errors = (error as AxiosError)?.response?.data as {
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, data: null, status: false }
      }
      return { error: error, data: null, status: false }
    }
  }

  async function forget() {
    token.value = null
    localStorage.removeItem(SHARED_LOCALSTORAGE_KEYS.TOKEN)
  }

  return {
    token,
    signIn,
    signUp,
    forget
  }
})
