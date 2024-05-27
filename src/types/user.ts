export interface User {
  id: string
  name: string
  password: string
}

export interface CreateUserDto {
  name: string
  password: string
}

export interface CreateUserResponse {
  user: Omit<User, 'password'>
  token: string
}
