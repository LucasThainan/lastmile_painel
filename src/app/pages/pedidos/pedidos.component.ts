import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { PedidoService } from '../../services'
import { User } from '../../models/user.model'
import { Security } from '../../utils/security.utils'
import { StatusPedidoEnum } from '../../enums/status-pedido.enum'

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  pedidos: any[] = []
  user!: User

  offset: number = 0
  limit: number = 10
  currentPage: number = 1
  totalPages: number = 0
  total: number = 0

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

  cancelarPedido(pedido: any) {

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
}
