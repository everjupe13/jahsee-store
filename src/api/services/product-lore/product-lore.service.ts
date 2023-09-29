import { type AxiosError } from 'axios'

import { useApiRequest } from '@/api/shared/network/http'

import {
  type ProductLoreResponseType,
  type ProductLoreType
} from './product-lore.types'

const ApiMapper = {
  toDomain(entity: ProductLoreResponseType): ProductLoreType {
    return {
      productId: entity.product_id,
      title: entity.droplore_title,
      image: entity.get_image,
      description: entity.description
    }
  }
}

const getLore = async ({ productSlug }: { productSlug: string }) => {
  try {
    const fetchResponse = await useApiRequest.get(`/droplore/${productSlug}`)

    if (
      fetchResponse?.status &&
      fetchResponse.status <= 400 &&
      fetchResponse.data &&
      Object.keys(fetchResponse.data).length > 0
    ) {
      const normalizedData = ApiMapper.toDomain(fetchResponse.data)
      return {
        error: false,
        status: true,
        data: normalizedData
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

export const ProductLoreService = {
  getLore
}
