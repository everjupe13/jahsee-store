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
