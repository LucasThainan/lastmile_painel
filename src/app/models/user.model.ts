import { Entregador } from "./entregador.model"

export interface User {
  id_usuario: string
  name: string
  email: string
  password: string
  document: string
  phone: string
  type: number
  createdAt?: string
  updatedAt?: string
  status_usuario: number
  entregador?: Partial<Entregador>
}

export interface ParamsUsers {
  limit?: number
  offset?: number
  type?: number
}

export interface ResponseLogin {
  user: User
  access_token: string
  refresh_token: string
}

export interface ResponseRefreshToken {
  access_token: string
  refresh_token: string
}

export interface ResponseGetUsers {
  users: User[]
  count: number
}

export interface ResponseGetUser {
  user: User
}