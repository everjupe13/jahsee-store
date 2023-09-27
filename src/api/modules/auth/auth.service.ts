export type AuthResponseDataType = {
  email: string
  first_name: string
  last_name?: string
  phone: string
  password: string
}

export type AuthDomainType = {
  userEmail: string
  userName: string
  userLastName?: string
  userPhone: string
}

export const AuthApiMapper = {
  toDomain(entity: AuthResponseDataType): AuthDomainType {
    return {
      userEmail: entity.email,
      userName: entity.first_name,
      userLastName: entity.last_name,
      userPhone: entity.phone
    }
  },
  toEntity(
    domain: AuthDomainType & { userPassword: string }
  ): AuthResponseDataType {
    return {
      email: domain.userEmail,
      first_name: domain.userName,
      last_name: domain.userLastName,
      password: domain.userPassword,
      phone: domain.userPhone
    }
  }
}
