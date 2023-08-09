/* eslint-disable unicorn/consistent-function-scoping */
import { defineStore, storeToRefs } from 'pinia'
import { type Ref, ref } from 'vue'

import { useCatalogStore } from '@/api/modules/catalog'
import { useAppFetch } from '@/api/shared/network/useAppFetch'
import { formatDollars } from '@/utils/cost'

import { ICartItem } from './cart.types'

export const LOCAL_STORAGE_CART_KEY = 'x-cart-product'

const cartStorageProvider = {
  add(id: number, size: string): boolean {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )

    if (!Array.isArray(_items)) {
      return false
    }

    if (_items.length === 0) {
      localStorage.setItem(
        LOCAL_STORAGE_CART_KEY,
        JSON.stringify([{ id, size, count: 1 }])
      )
      return true
    }

    const existedItemIdx = _items.findIndex(
      item => item.id === id && item.size === size
    )
    if (existedItemIdx >= 0) {
      _items[existedItemIdx].count += 1
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
      return true
    }

    _items.push({ id, size, count: 1 })
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
    return true
  },
  decrease(id: number, size: string): boolean {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )

    if (!Array.isArray(_items)) {
      return false
    }

    const existedItemIdx = _items.findIndex(
      item => item.id === id && item.size === size
    )
    if (existedItemIdx >= 0 && _items[existedItemIdx].count > 1) {
      _items[existedItemIdx].count -= 1
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
      return true
    }

    return false
  },
  delete(id: number, size: string): boolean {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )

    if (!Array.isArray(_items)) {
      return false
    }

    const existedItemIdx = _items.findIndex(
      item => item.id === id && item.size === size
    )

    if (existedItemIdx >= 0) {
      _items.splice(existedItemIdx, 1)
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(_items))
      return true
    }

    return false
  },
  deleteAll() {
    localStorage.removeItem(LOCAL_STORAGE_CART_KEY)
  },
  getAll() {
    const _items = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_CART_KEY) || '[]'
    )
    return _items
  }
}

export const useCartStore = defineStore('cart', () => {
  const cart: Ref<ICartItem[] | []> = ref(cartStorageProvider.getAll())
  const catalogStore = useCatalogStore()
  const { products } = storeToRefs(catalogStore)

  function addItem(id: number, size: string) {
    try {
      cartStorageProvider.add(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  function removeItem(id: number, size: string) {
    try {
      cartStorageProvider.decrease(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  function deleteItem(id: number, size: string) {
    try {
      cartStorageProvider.delete(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  function createOrder() {
    try {
      cartStorageProvider.deleteAll()
      cart.value = []

      // const _fetchReturn = useAppFetch('/order').post([cart.value]).json()
    } catch (error) {
      console.log(error)
    }
  }

  function calculateCost() {
    cart.value = cartStorageProvider.getAll()
    if (cart.value.length === 0 || products.value === null) {
      return formatDollars(0)
    }

    let _total = 0
    for (const choosenProduct of cart.value) {
      const productCost =
        products.value.find(product => product.id === choosenProduct.id)
          ?.cost || 0

      _total += productCost * choosenProduct.count
    }

    return formatDollars(_total)
  }

  function calculateDeliveryCost() {
    return formatDollars(10)
  }

  return {
    cart,
    addItem,
    removeItem,
    calculateCost,
    calculateDeliveryCost,
    deleteItem,
    createOrder
  }
})
