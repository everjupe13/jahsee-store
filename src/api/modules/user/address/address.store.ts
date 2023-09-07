/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useApiRequest } from '@/api/shared/network/http'

import { AddressApiMapper } from './address.service'
import { IAddress } from './address.types'

export const useAddressStore = defineStore('user-address', () => {
  const addresses = ref<IAddress[] | null>(null)

  async function fetchAddresses() {
    try {
      const fetchResponse = await useApiRequest.get('/user-info')

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        addresses.value = AddressApiMapper.toDomainUserAddresses(
          fetchResponse.data.data
        )
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
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false }
      }
      return { error: error, status: false }
    }
  }

  async function createAddress(address: Omit<IAddress, 'id'>) {
    try {
      const fetchResponse = await useApiRequest.post(
        '/user-info/address',
        AddressApiMapper.toEntity(address)
      )

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        await fetchAddresses()
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
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false }
      }
      return { error: error, status: false }
    }
  }

  async function editAddress(address: IAddress) {
    try {
      const fetchResponse = await useApiRequest.patch(
        `/user-info/address/${address.id}`,
        AddressApiMapper.toEntity(address)
      )

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        await fetchAddresses()
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
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false }
      }
      return { error: error, status: false }
    }
  }

  async function deleteAddress(addressId: IAddress['id']) {
    try {
      const fetchResponse = await useApiRequest.delete(
        `/user-info/address/${addressId}`
      )

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        await fetchAddresses()
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
        [x: string]: any
      }

      if (errors instanceof Object && Object.entries(errors).length > 0) {
        return { error: errors, status: false }
      }
      return { error: error, status: false }
    }
  }

  function forget() {
    addresses.value = null
  }

  return {
    addresses,
    fetchAddresses,
    createAddress,
    editAddress,
    deleteAddress,
    forget
  }
})
