export interface Pedido {
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

export interface AssignEntregador {
  cod_entregador: string
}

export interface ParamsPedido {
  limit?: number
  offset?: number
  cod_user?: string
  cod_entregador?: string
}

export interface ResponseGetPedidos {
  pedidos: Pedido[]
  count: number
}

export interface ResponseGetPedido {
  pedido: Pedido
}