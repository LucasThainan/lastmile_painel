import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  User,
  ParamsUsers,
  ResponseLogin,
  ResponseGetUsers,
  ResponseGetUser
} from '../models/user.model'
import { RequestService } from './request.service'
import { environment } from '../../environments/environments'

@Injectable({ providedIn: 'root' })
export class UserService {
  base_url = environment.base_url

  constructor(private requestService: RequestService) { }

  createUser(data: Omit<User, 'id_usuario'>): Observable<ResponseLogin> {
    return this.requestService.postRequest(`${this.base_url}usuarios`, data)
  }

  getUsers(data: ParamsUsers): Observable<ResponseGetUsers> {
    return this.requestService.getRequest(`${this.base_url}usuarios`, data)
  }

  getUserID(id: string): Observable<ResponseGetUser> {
    return this.requestService.getRequest(`${this.base_url}usuarios/${id}`, {})
  }

  updateUsers(id: string, data: Partial<User>): Observable<ResponseGetUser> {
    return this.requestService.patchRequest(`${this.base_url}usuarios/${id}`, data)
  }
}
