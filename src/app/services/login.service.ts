import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { Security } from '../utils/security.utils'
import { Login, RefreshToken, ResponseLogin, ResponseRefreshToken } from '../models/user.model'
import { environment } from '../../environments/environments'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  base_url: string

  constructor(private http: HttpClient) {
    this.base_url = environment.base_url
  }

  login(data: Login): Observable<HttpEvent<ResponseLogin>> {
    const httpOptions: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<ResponseLogin>(`${this.base_url}usuarios/login`, JSON.stringify(data), httpOptions)
  }

  refreshToken(): Observable<HttpEvent<ResponseRefreshToken>> {
    const refresh_token: string = Security.getRefreshToken()
    const body: RefreshToken = { refresh_token: refresh_token }

    const httpOptions: any = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.post<ResponseRefreshToken>(`${this.base_url}usuarios/refresh-token`, JSON.stringify(body), httpOptions).pipe(
      tap((res: any): any => {
        Security.setToken(res.access_token)
        Security.setRefreshToken(res.refresh_token)
      }),
      catchError((error: any) => { return throwError(() => new Error('Erro ao atualizar access_token', error)) })
    )
  }
}
