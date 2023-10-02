/* eslint-disable unicorn/consistent-function-scoping */
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

import { IProduct } from '@/api/modules/catalog'
import { useCatalogStore } from '@/api/modules/catalog'
import { useApiRequest } from '@/api/shared/network/http'

import { useUserStore } from '../user'
import { CalcApiMapper, cartStorageProvider } from './cart.service'
import { OrderApiMapper } from './cart.service'
import { ICartItem } from './cart.types'

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<ICartItem[] | []> = ref(cartStorageProvider.getAll())
  const catalogStore = useCatalogStore()
  const userStore = useUserStore()

  function addItem(id: number, size: string) {
    try {
      cartStorageProvider.add(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  function forget() {
    cartStorageProvider.deleteAll()
  }

  function removeItem(id: number, size: string) {
    try {
      cartStorageProvider.decrease(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  function deleteItem(id: number, size: string) {
    try {
      cartStorageProvider.delete(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  const createOrder = async ({
    promocode,
    deliveryType,
    paymentType
  }: {
    promocode?: string
    deliveryType?: string
    paymentType?: string
  } = {}) => {
    try {
      const fetchResponse = await useApiRequest.post('/create_order', {
        ...OrderApiMapper.toEntity({
          promocode,
          deliveryType,
          paymentType,
          products: cart.value,
          address: userStore.addresses![0]
        })
      })

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        cartStorageProvider.deleteAll()
        cart.value = []
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

  const expandCartProducts = async () => {
    const fetcher = async (productId: number | string) => {
      return await catalogStore.fetchProduct(productId)
    }

    if (cart.value.length > 0) {
      const _cart = cart.value
      const _responsedCart: IProduct[] = []
      for (const element of _cart) {
        const _product = await fetcher(element.id)
        if (_product) {
          _responsedCart.push(_product)
        }
      }

      catalogStore.products = _responsedCart
    }
  }

  function calculateCost() {
    if (cart.value.length === 0) {
      return 0
    }

    let _total = 0
    for (const choosenProduct of cart.value) {
      const productCost =
        catalogStore.products!.find(product => product.id === choosenProduct.id)
          ?.cost || 0

      _total += productCost * choosenProduct.count
    }

    // console.log(1)
    // const fetchResponse = await useApiRequest.post('/calculate_price')
    // console.log(fetchResponse.data)
    // if (
    //   fetchResponse?.status &&
    //   fetchResponse.status < 400 &&
    //   fetchResponse?.data
    // ) {
    //   console.log(fetchResponse.data)
    // }
    return _total
  }

  const calcServerPrice = async ({
    promocode,
    deliveryType,
    paymentType
  }: {
    promocode?: string
    deliveryType?: string
    paymentType?: string
  } = {}) => {
    try {
      const fetchResponse = await useApiRequest.post('/calculate_price', {
        ...OrderApiMapper.toEntity({
          promocode,
          deliveryType,
          paymentType,
          products: cart.value,
          address: userStore.addresses![0]
        })
      })

      if (fetchResponse?.status && fetchResponse.status <= 400) {
        const serverData = fetchResponse.data
        return {
          error: false,
          status: true,
          data: CalcApiMapper.toDomain(serverData)
        }
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

  function calculateDeliveryCost() {
    return 10
  }

  return {
    cart,
    addItem,
    removeItem,
    calculateCost,
    calculateDeliveryCost,
    deleteItem,
    createOrder,
    expandCartProducts,
    forget,
    calcServerPrice
  }
})
