import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  User,
  Login,
  RefreshToken,
  ParamsUsers,
  ResponseLogin,
  ResponseRefreshToken,
  ResponseGetUsers,
  ResponseGetUser,
} from '../models/user.model'
import { RequestService } from './request.service'
import { environment } from '../../environments/environments'

@Injectable({ providedIn: 'root' })
export class UserService {
  apiUrl = environment.apiUrl

  constructor(private requestService: RequestService) { }

  login(data: Login): Observable<ResponseLogin> {
    return this.requestService.postRequest(`${this.apiUrl}usuarios/login`, data)
  }

  refreshToken(data: RefreshToken): Observable<ResponseRefreshToken> {
    return this.requestService.postRequest(`${this.apiUrl}usuarios/refresh-token`, data)
  }

  createUser(data: User): Observable<ResponseLogin> {
    return this.requestService.postRequest(`${this.apiUrl}usuarios`, data)
  }

  getUsers(data: ParamsUsers): Observable<ResponseGetUsers> {
    return this.requestService.getRequest(`${this.apiUrl}usuarios`, data)
  }

  getUserID(id: string): Observable<ResponseGetUser> {
    return this.requestService.getRequest(`${this.apiUrl}usuarios/${id}`, {})
  }

  updateUsers(data: Partial<User>): Observable<ResponseGetUser> {
    return this.requestService.patchRequest(`${this.apiUrl}usuarios`, data)
  }
}
