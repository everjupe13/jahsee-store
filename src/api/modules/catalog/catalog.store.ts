import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { useApiRequest } from '@/api/shared/network/http'

import { CATALOG_DATA, PRODUCTS_DATA } from './catalog.data'
import { CatalogApiMapper, ProductsApiMapper } from './catalog.service'
import {
  CatalogResponseDataType,
  ICatalog,
  IProduct,
  ProductsResponseDataType
} from './catalog.types'

export const useCatalogStore = defineStore('catalog', () => {
  const catalog = ref<ICatalog[] | null>(null)
  const products = ref<IProduct[] | null>(null)
  const sortedCatalog = computed<ICatalog[]>(() =>
    catalog.value ? catalog.value.sort((a, b) => b.id - a.id) : []
  )

  async function fetchCatalog() {
    if (catalog.value !== null) {
      return true
    }

    catalog.value = CATALOG_DATA
    return true

    try {
      const fetchResponse = await useApiRequest.get('/catalog')

      if (
        fetchResponse?.status &&
        fetchResponse.status < 400 &&
        fetchResponse?.data
      ) {
        const data: CatalogResponseDataType[] = fetchResponse.data.data
        const _domainCatalog = CatalogApiMapper.toDomain(data)
        catalog.value = _domainCatalog

        return true
      }

      return false
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  async function fetchProduct(productId?: string | number) {
    if (!productId) {
      return null
    }

    return PRODUCTS_DATA.find(product => product.id === productId) || null

    try {
      const fetchResponse = await useApiRequest.get(`/product/${productId}`)

      if (
        fetchResponse?.status &&
        fetchResponse.status < 400 &&
        fetchResponse?.data
      ) {
        const data: ProductsResponseDataType = fetchResponse.data.data
        const _domainProducts = ProductsApiMapper.toPrimitiveDomain(data)
        return _domainProducts
      }

      return null
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      return null
    }
  }

  async function fetchProducts(catalogId: number) {
    if (catalogId === undefined) {
      return false
    }

    const _domainProducts =
      PRODUCTS_DATA.filter(product => product.dropId === catalogId) || null
    products.value = _domainProducts
    return true

    try {
      const fetchResponse = await useApiRequest.get(
        `/latest-products/${catalogId}`
      )

      if (
        fetchResponse?.status &&
        fetchResponse.status < 400 &&
        fetchResponse?.data
      ) {
        const data: ProductsResponseDataType[] = fetchResponse.data.data
        const _domainProducts = ProductsApiMapper.toDomain(data)
        products.value = _domainProducts

        return true
      }

      return false
    } catch (error) {
      // TODO add notification observer center
      // eslint-disable-next-line no-console
      console.log(error)
      return false
    }
  }

  return {
    catalog,
    sortedCatalog,
    products,
    fetchCatalog,
    fetchProducts,
    fetchProduct
  }
})
