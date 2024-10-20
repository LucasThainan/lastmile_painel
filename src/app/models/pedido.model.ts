export interface Entregador {
  id_pedido: string
  cod_user: string
  cod_entregador?: string
  name: string
  description: string
  comments?: string
  address: string
  city: string
  state: string
  number: string
  postal_code: string
  createdAt?: string
  updatedAt?: string
  status_pedido: number
}