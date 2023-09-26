/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddressApiMapper } from '../user/address/address.service'
import { AddressResponseType, IAddress } from '../user/address/address.types'
import { ICartItem } from '.'

export const LOCAL_STORAGE_CART_KEY = 'x-cart-product'

export const cartStorageProvider = {
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

export type OrderResponseProductType = {
  id: number
  name?: string
  contents: {
    size: string
    amount: number
  }
}
export type OrderResponseType = {
  promocode: string
  delivery_address: AddressResponseType
  products: OrderResponseProductType[]
  type_of_payment_system: string
}

export type IOrder = {
  products: ICartItem[]
  address: IAddress
  promocode?: string
}
export const OrderApiMapper = {
  toEntity(domainModel: IOrder): OrderResponseType {
    const getProducts = () => {
      // eslint-disable-next-line unicorn/no-array-reduce
      return domainModel.products.reduce(
        (acc: any, product) => {
          const _productIdx = acc.findIndex(
            (resulted: OrderResponseProductType) => resulted.id === product.id
          )

          if (_productIdx < 0) {
            acc.push({
              id: product.id,
              contents: [{ size: product.size, amount: Number(product.count) }]
            })
            return acc
          }

          const contentIdx = acc[_productIdx]?.contents?.findIndex(
            (content: { size: string; amount: number }) =>
              content.size === product.size
          )

          if (contentIdx >= 0) {
            acc[_productIdx].contents.amount += 1
          } else {
            acc[_productIdx].contents.push({
              size: product.size,
              amount: Number(product.count)
            })
          }

          return acc
        },
        [] as Array<OrderResponseProductType> | []
      )
    }
    return {
      products: getProducts(),
      type_of_payment_system: 'helio',
      delivery_address: AddressApiMapper.toEntity(
        domainModel.address
      ) as AddressResponseType,
      promocode: 'фыв'
    }
  }
}
