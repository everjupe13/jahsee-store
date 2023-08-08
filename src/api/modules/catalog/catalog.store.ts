import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAppFetch } from '@/api/shared/network/useAppFetch'

import { CATALOG_DATA, PRODUCTS_DATA } from './catalog.data'
import { ICatalog, IProduct } from './catalog.types'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<ICatalog[] | null>(null)
  const products = ref<IProduct[] | null>(null)
  const sortedCatalog = computed<ICatalog[]>(() =>
    catalog.value ? catalog.value.sort((a, b) => b.id - a.id) : []
  )

  async function _assertProducts() {
    await fetchProducts()

    if (Array.isArray(catalog.value) && Array.isArray(products.value)) {
      catalog.value = catalog.value.map(drop => {
        const _dropProducts = products.value!.filter(
          product => product.dropId === drop.id
        )
        drop.products = _dropProducts

        return drop
      })
    }
  }

  async function fetchCatalog() {
    if (Array.isArray(catalog)) {
      return true
    }

    try {
      catalog.value = CATALOG_DATA

      const _fetchReturn = await useAppFetch('catalog').get().json()

      try {
        _assertProducts()
      } catch (error) {
        console.log(error)
      }

      return true
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  async function fetchProducts() {
    if (Array.isArray(products)) {
      return true
    }

    try {
      products.value = PRODUCTS_DATA

      const _fetchReturn = await useAppFetch('products').get().json()

      return true
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  return { catalog, sortedCatalog, products, fetchCatalog, fetchProducts }
})
