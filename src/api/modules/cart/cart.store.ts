import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

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
    return false
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

  function addItem(id: number, size: string) {
    try {
      cartStorageProvider.add(id, size)
      cart.value = cartStorageProvider.getAll()
    } catch (error) {
      console.log(error)
    }
  }

  return { cart, addItem }
})
