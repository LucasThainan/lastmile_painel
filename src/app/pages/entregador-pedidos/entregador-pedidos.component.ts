import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { User } from '../../models/user.model'
import { Pedido } from '../../models/pedido.model'
import { Security } from '../../utils/security.utils'
import { PedidoService, SocketService } from '../../services'
import { StatusPedidoEnum } from '../../enums/status-pedido.enum'
import { ConfirmMessageComponent } from "../../modals/confirm-message/confirm-message.component"

@Component({
  selector: 'app-entregador-pedidos',
  standalone: true,
  imports: [CommonModule, ConfirmMessageComponent],
  templateUrl: './entregador-pedidos.component.html',
  styleUrl: './entregador-pedidos.component.scss'
})
export class EntregadorPedidosComponent {
  user!: User
  pedidos: any[] = []
  selectedPedido!: Pedido | null
  statusPedido!: number

  offset: number = 0
  limit: number = 10
  currentPage: number = 1
  totalPages: number = 0
  total: number = 0

  showModalConfirm: boolean = false

  constructor(
    private readonly socketService: SocketService,
    private readonly pedidoService: PedidoService
  ) {
    this.socketService.on('pedido_created', (res) => {
      this.getPedidos()
    })

    this.socketService.on('pedido_status_updated', (res) => {
      this.getPedidos()
    })
  }

  ngOnInit() {
    this.user = Security.getUser()
    this.getPedidos()
  }

  getPedidos() {
    const params = {
      limit: this.limit,
      offset: this.offset,
      cod_entregador: this.user.cod_entregador
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

  iniciarEntrega() {
    if (!this.selectedPedido) return

    const data = { cod_entregador: this.user.cod_entregador || '' }

    this.pedidoService.AssignEntregador(this.selectedPedido.id_pedido, data).subscribe({
      next: () => this.getPedidos(),
      error: (err) => console.log(err)
    })
  }

  confirmarEntrega() {
    if (!this.selectedPedido) return

    const data = { status_pedido: StatusPedidoEnum.Entregue }

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

  openModalConfirm(pedido: Pedido, status: number) {
    this.statusPedido = status
    this.selectedPedido = pedido
    this.showModalConfirm = true
  }

  closeModalConfirm(event: any) {
    if (event) {
      this.statusPedido == 2
        ? this.iniciarEntrega()
        : this.confirmarEntrega()
    }
    this.showModalConfirm = false
  }
}
