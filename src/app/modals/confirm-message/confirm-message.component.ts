import { Component, EventEmitter, Input, Output } from '@angular/core'
import { IConfirmMessage } from '../../interfaces/confirm-message.interface'

@Component({
  selector: 'app-confirm-message',
  standalone: true,
  imports: [],
  templateUrl: './confirm-message.component.html',
  styleUrl: './confirm-message.component.scss'
})
export class ConfirmMessageComponent {
  @Output() close: any = new EventEmitter()
  @Input() object: IConfirmMessage = {
    title: '',
    message: ''
  }

  closeModal(confirm?: boolean) {
    this.close.emit(confirm || null)
  }
}
