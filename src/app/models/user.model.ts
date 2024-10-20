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