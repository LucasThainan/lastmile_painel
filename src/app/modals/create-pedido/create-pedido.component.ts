import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { NgxMaskDirective } from 'ngx-mask'
import { LoaderComponent } from '../../components/loader/loader.component'
import { Pedido, ResponseGetPedido } from '../../models/pedido.model'
import { CepService, PedidoService } from '../../services'
import { Security } from '../../utils/security.utils'

@Component({
  selector: 'app-create-pedido',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoaderComponent,
    NgxMaskDirective
  ],
  templateUrl: './create-pedido.component.html',
  styleUrl: './create-pedido.component.scss'
})
export class CreatePedidoComponent {
  @Output() close: any = new EventEmitter()

  pedidoForm: FormGroup

  error: string = ''
  isLoading: boolean = false

  constructor(
    private readonly pedidoService: PedidoService,
    private readonly formBuilder: FormBuilder,
    private readonly cepService: CepService
  ) {
    this.pedidoForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      comments: [null],
      address: [null, [Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]],
      number: [null, [Validators.required]],
      postal_code: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    window.document.body.style.overflow = 'hidden'
  }

  ngOnDestroy(): void {
    window.document.body.style.overflow = 'auto'
  }

  buscarCep() {
    const cep = this.pedidoForm.controls['postal_code'].value
    if (!cep) return

    if (this.pedidoForm.controls['postal_code'].value.length === 8) {
      this.cepService.getCep(this.pedidoForm.controls['postal_code'].value)
        .subscribe((data: any) => {
          let address = data.bairro
            ? data.logradouro 
              ? `${data.logradouro}, ${data.bairro}`
              : data.bairro
            : ''
          this.pedidoForm.controls['address'].setValue(address)
          this.pedidoForm.controls['number'].setValue(data.complemento)
          this.pedidoForm.controls['city'].setValue(data.localidade)
          this.pedidoForm.controls['state'].setValue(data.uf)
        })
    }
  }

  onInputUF(event: Event) {
    const inputElement = event.target as HTMLInputElement
    this.pedidoForm.controls['state'].setValue(inputElement.value.toUpperCase(), { emitEvent: false })
  }

  onPedidoSubmit() {
    if (this.pedidoForm.invalid) return
    this.isLoading = true
    this.pedidoForm.disable()

    let user = Security.getUser()
    if (!user) return

    const data: Omit<Pedido, 'id_pedido'> = {
      cod_user: user.id_usuario,
      name: this.pedidoForm.controls['name'].value,
      description: this.pedidoForm.controls['description'].value,
      comments: this.pedidoForm.controls['comments'].value,
      address: this.pedidoForm.controls['address'].value,
      city: this.pedidoForm.controls['city'].value,
      state: this.pedidoForm.controls['state'].value,
      number: this.pedidoForm.controls['number'].value,
      postal_code: this.pedidoForm.controls['postal_code'].value,
      status_pedido: 1
    }

    this.pedidoService.createPedido(data).subscribe({
      next: (res: ResponseGetPedido) => {
        this.isLoading = false
        this.closeModal(res.pedido)
      },
      error: (err: any) => {
        this.isLoading = false
        this.error = err.error.message
        this.pedidoForm.enable()
        console.log(err)
      }
    })
  }

  closeModal(item?: Pedido) {
    this.close.emit(item || null)
  }
}
