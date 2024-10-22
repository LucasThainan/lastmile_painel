import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  Pedido,
  ParamsPedido,
  ResponseGetPedidos,
  ResponseGetPedido,
  AssignEntregador
} from '../models/pedido.model'
import { RequestService } from './request.service'
import { environment } from '../../environments/environments'

@Injectable({ providedIn: 'root' })
export class PedidoService {
  apiUrl = environment.base_url

  constructor(private requestService: RequestService) { }

  createPedido(data: Omit<Pedido, 'id_pedido'>): Observable<ResponseGetPedido> {
    return this.requestService.postRequest(`${this.apiUrl}pedidos`, data)
  }

  getPedidos(data: ParamsPedido): Observable<ResponseGetPedidos> {
    return this.requestService.getRequest(`${this.apiUrl}pedidos`, data)
  }

  getPedidoID(id: string): Observable<ResponseGetPedido> {
    return this.requestService.getRequest(`${this.apiUrl}pedidos/${id}`, {})
  }

  updatePedidos(id: string, data: Partial<Pedido>): Observable<ResponseGetPedido> {
    return this.requestService.patchRequest(`${this.apiUrl}pedidos/${id}`, data)
  }

  AssignEntregador(id: string, data: AssignEntregador): Observable<ResponseGetPedido> {
    return this.requestService.patchRequest(`${this.apiUrl}pedidos/assign-entregador/${id}`, data)
  }
}
