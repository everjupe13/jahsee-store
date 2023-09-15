export type IAddress = {
  id: number
  country: string
  city: string
  street: string
  zipCode: string
}

export type AddressResponseType = {
  id: number
  street_address: string
  city: string
  country: string
  zipcode: string
}
