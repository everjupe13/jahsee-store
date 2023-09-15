import { UserResponseDataType } from '../user.types'
import { AddressResponseType, IAddress } from './address.types'

export const AddressApiMapper = {
  toDomain(entity: AddressResponseType): IAddress {
    return {
      id: entity.id,
      country: entity.country,
      city: entity.city,
      street: entity.street_address,
      zipCode: entity.zipcode
    }
  },
  toEntity(domainModel: Partial<IAddress>): Partial<AddressResponseType> {
    return {
      ...(domainModel.id ? { id: domainModel.id } : {}),
      street_address: domainModel.street,
      city: domainModel.city,
      country: domainModel.country,
      zipcode: domainModel.zipCode
    }
  },
  toDomainUserAddresses(entity: UserResponseDataType): IAddress[] {
    return entity.addresses.map(address => this.toDomain(address))
  }
}
