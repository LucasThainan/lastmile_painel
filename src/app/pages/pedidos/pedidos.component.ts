import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { PedidoService } from '../../services'
import { User } from '../../models/user.model'
import { Security } from '../../utils/security.utils'
import { StatusPedidoEnum } from '../../enums/status-pedido.enum'
import { CreatePedidoComponent } from "../../modals/create-pedido/create-pedido.component"
import { ConfirmMessageComponent } from "../../modals/confirm-message/confirm-message.component";
import { Pedido } from '../../models/pedido.model'

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, CreatePedidoComponent, ConfirmMessageComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  pedidos: any[] = []
  selectedPedido!: Pedido | null
  user!: User

  offset: number = 0
  limit: number = 10
  currentPage: number = 1
  totalPages: number = 0
  total: number = 0

  showModalPedido: boolean = false
  showModalConfirm: boolean = false

  constructor(private readonly pedidoService: PedidoService) { }

  ngOnInit() {
    this.user = Security.getUser()
    this.getPedidos()
  }

  getPedidos() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      cod_user: this.user.id_usuario
    }

    this.pedidoService.getPedidos(params).subscribe({
      next: (res) => {
        this.pedidos = res.pedidos
        this.total = res.total
        this.totalPages = Math.ceil(this.total / 10)
      },
      error: (err) => console.log(err)
    })
  }

  getStatus(status: number) {
    return StatusPedidoEnum[status]
  }

  cancelarPedido() {
    if (!this.selectedPedido) return

    const data = { status_pedido: StatusPedidoEnum.Cancelado }
    
    this.pedidoService.updatePedidos(this.selectedPedido.id_pedido, data).subscribe({
      next: () => this.getPedidos(),
      error: (err) => console.log(err)
    })
  }

  previousPage() {
    if (this.currentPage <= 1) return

    this.currentPage--
    this.offset = (this.currentPage - 1) * 10
    this.getPedidos()
  }

  nextPage() {
    if (this.currentPage >= this.totalPages) return

    this.currentPage++
    this.offset = (this.currentPage - 1) * 10
    this.getPedidos()
  }

  openModalPedido() {
    this.showModalPedido = true
  }

  closeModalPedido(event: any) {
    if (event) this.getPedidos()
    this.showModalPedido = false
  }

  openModalConfirm(pedido: Pedido) {
    if (pedido.status_pedido !== StatusPedidoEnum.Pendente) return

    this.showModalConfirm = true
    this.selectedPedido = pedido
  }

  closeModalConfirm(event: any) {
    if (event) this.cancelarPedido()
    this.showModalConfirm = false
  }
}
