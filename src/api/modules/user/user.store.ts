/* eslint-disable unicorn/consistent-function-scoping */
import { AxiosError } from 'axios'
// import { isPlainObject } from 'lodash-es'
import { defineStore } from 'pinia'
import { computed, type Ref, ref } from 'vue'

import { useApiRequest } from '@/api/shared/network/http'

import { useAuthStore } from '../auth'
import { cartStorageProvider } from '../cart'
import { IAddress, useAddressStore } from './address'
import { UserApiMapper, UserOrdersApiMapper } from './user.service'
import { IUser, UserOrderResponseType } from './user.types'

export const useUserStore = defineStore('user', () => {
  const profile = ref<IUser | null>(null)
  const fullName = computed(() =>
    profile.value?.userName && profile.value?.userLastName
      ? `${profile.value?.userName} ${profile.value?.userLastName}`
      : ''
  )

  const authStore = useAuthStore()
  const isAuth = computed<boolean>(() =>
    // isPlainObject(profile.value) &&
    // Object.keys(profile.value as object).length > 0 &&
    // Boolean(authStore.token) &&
    Boolean(authStore.token)
  )
  async function initialize() {
    if (!authStore.token) {
      forget()
      cartStorageProvider.deleteAll()
      return
    }

    await fetchProfile()
  }

  async function fetchProfile() {
    try {
      const fetchResponse = await useApiRequest.get('/user-info')

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        profile.value = UserApiMapper.toDomain(fetchResponse.data.data)
        await addressStore.fetchAddresses()
        return { error: false, status: true }
      }

      return {
        error: false,
        status: false
      }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      const errors = (error as AxiosError)?.response?.data as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false }
      }
      return { error: error, status: false }
    }
  }

  async function editProfile(user: IUser) {
    try {
      const fetchResponse = await useApiRequest.patch('/user-info', {
        ...UserApiMapper.toEntity(user),
        ...(user.userPassword ? { current_password: user.userPassword } : {})
      })

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        await fetchProfile()
        return { error: false, status: true }
      }

      return {
        error: false,
        status: false
      }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      const errors = (error as AxiosError)?.response?.data as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false }
      }
      return { error: error, status: false }
    }
  }

  const addressStore = useAddressStore()
  const addresses: Ref<IAddress[] | null> = computed(
    () => addressStore.addresses
  )

  async function createAddress(address: Omit<IAddress, 'id'>) {
    try {
      const { status, error } = await addressStore.createAddress(address)

      if (status) {
        await addressStore.fetchAddresses()
        return { status: true, error }
      }

      return { status, error }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      return error as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: { [x: string]: any }
        status: boolean
      }
    }
  }

  async function editAddress(address: IAddress) {
    try {
      const { status, error } = await addressStore.editAddress(address)

      if (status) {
        await addressStore.fetchAddresses()
        return { status: true, error }
      }

      return { status, error }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      return error as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: { [x: string]: any }
        status: boolean
      }
    }
  }

  async function deleteAddress(addressId: IAddress['id']) {
    try {
      const { status, error } = await addressStore.deleteAddress(addressId)

      if (status) {
        await addressStore.fetchAddresses()
        return { status: true, error }
      }

      return { status, error }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      return error as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: { [x: string]: any }
        status: boolean
      }
    }
  }

  async function getOrders() {
    try {
      const fetchResponse = await useApiRequest.get(`/orders`)

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        return {
          error: false,
          status: true,
          data: fetchResponse.data.map((data: UserOrderResponseType) =>
            UserOrdersApiMapper.toDomain(data)
          )
        }
      }

      return {
        error: false,
        status: false,
        data: null
      }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      const errors = (error as AxiosError)?.response?.data as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false, data: null }
      }
      return { error: error, status: false, data: null }
    }
  }

  async function getOrder({
    orderId,
    orderHash
  }: {
    orderId?: number | string
    orderHash: string
  }) {
    try {
      const fetchResponse = await useApiRequest.get(
        `/orders/${orderId ?? orderHash ?? ''}`
      )

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        return {
          error: false,
          status: true,
          data: UserOrdersApiMapper.toDomain(fetchResponse.data)
        }
      }

      return {
        error: false,
        status: false,
        data: null
      }
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      const errors = (error as AxiosError)?.response?.data as {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false, data: null }
      }
      return { error: error, status: false, data: null }
    }
  }

  function forget() {
    authStore.forget()
    profile.value = null
    addressStore.forget()
    cartStorageProvider.deleteAll()
  }

  return {
    profile,
    fullName,
    fetchProfile,
    editProfile,
    addresses,
    createAddress,
    editAddress,
    deleteAddress,
    initialize,
    isAuth,
    forget,

    getOrders,
    getOrder
  }
})
