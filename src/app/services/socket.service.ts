import { Injectable } from '@angular/core'
import { io, Socket } from 'socket.io-client'
import { Security } from '../utils/security.utils'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket

  constructor() {
    this.connect()
  }

  connect() {
    const user = Security.getUser()
    this.socket = io('http://localhost:3000', {
      query: {
        id_usuario: user.id_usuario,
        name: user.name,
        type: user.type,
        cod_entregador: user.cod_entregador
      }
    })
  }

  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data)
  }

  on(eventName: string, callback: (data: any) => void): void {
    this.socket.on(eventName, callback)
  }

  getId() {
    return this.socket.id
  }

  disconnect(): void {
    if (this.socket) this.socket.disconnect()
  }
}
