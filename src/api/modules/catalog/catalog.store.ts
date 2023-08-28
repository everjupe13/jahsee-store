import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useAppFetch } from '@/api/shared/network/useAppFetch'

import { CATALOG_DATA, PRODUCTS_DATA } from './catalog.data'
import { CatalogApiMapper } from './catalog.service'
import { CatalogResponseDataType, ICatalog, IProduct } from './catalog.types'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<ICatalog[] | null>(null)
  const products = ref<IProduct[] | null>(null)
  const sortedCatalog = computed<ICatalog[]>(() =>
    catalog.value ? catalog.value.sort((a, b) => b.id - a.id) : []
  )

  async function fetchCatalog() {
    if (Array.isArray(catalog.value) && catalog.value.length > 0) {
      return true
    }

    try {
      catalog.value = [...CATALOG_DATA]

      const _fetchReturn = await useAppFetch('/catalog').get().json()

      if (_fetchReturn?.data) {
        const _domainCatalog = CatalogApiMapper.toDomain(
          _fetchReturn.data.value.data as CatalogResponseDataType[]
        )
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

      const _fetchReturn = await useAppFetch('/products').get().json()

      if (_fetchReturn?.data) {
        const _domainProducts = CatalogApiMapper.toDomain(
          _fetchReturn.data.value.data as CatalogResponseDataType[]
        )
      }

      return true
    } catch (error) {
      // TODO add notification observer center
      console.log(error)
      return false
    }
  }

  return { catalog, sortedCatalog, products, fetchCatalog, fetchProducts }
})
