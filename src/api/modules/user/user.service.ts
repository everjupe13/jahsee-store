import { IUser, UserResponseDataType } from './user.types'

export const UserApiMapper = {
  toDomain(entity: UserResponseDataType): IUser {
    return {
      userEmail: entity.email,
      userPhone: entity.phone || undefined,
      userName: entity.first_name,
      userLastName: entity.last_name || undefined
    }
  },
  toEntity(domainModel: IUser) {
    return {
      email: domainModel.userEmail,
      first_name: domainModel.userName,
      last_name: domainModel.userLastName,
      ...(domainModel.userPhone ? { phone: domainModel.userPhone } : {})
    }
  }
}
