import { IAddress } from './address'
import { AddressResponseType } from './address/address.types'

export type IUser = {
  userEmail: string
  userPhone?: string
  userName: string
  userLastName?: string
  userPassword?: string
  addresses?: IAddress[]
}

export type UserResponseDataType = {
  id: number
  email: string
  first_name: string
  last_name: string
  phone: string
  addresses: AddressResponseType[]
}

export type UserOrderResponseType = {
  id: number
  products: {
    id: number
    contents: {
      size: string
      amount: number
    }[]
  }[]
  paid_amount: string
  type_of_payment_system: string
  status: string
  delivery_address: {
    id: number
    city: string
    country: string
    zipcode: string
    street_address: string
  }
  promocode: string
}

export type UserOrderType = {
  id: number
  products: {
    id: number
    contents: {
      size: string
      amount: number
    }[]
  }[]
  cost: string
  status: string
}
