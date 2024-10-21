import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, concatMap, throwError } from 'rxjs'
import { Security } from '../utils/security.utils'
import { LoginService } from './login.service'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    private readonly loginService: LoginService,
    private readonly http: HttpClient
  ) { }

  private getHeaders() {
    const token = Security.getToken()
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    if (token) headers = headers.set('Authorization', `Bearer ${token}`)
    return headers
  }

  private handleError = (error: any, operation: () => Observable<any>) => {
    if (error.status === 401) {
      return this.loginService.refreshToken().pipe(
        concatMap(() => { return operation() }),
        catchError((err: any) => {
          Security.clear()
          setTimeout(() => { location.reload() }, 500)
          return throwError(() => error)
        })
      )
    } else {
      console.log(error)
      return throwError(() => error)
    }
  }

  getRequest(url: string, params: any): Observable<any> {
    const headers = this.getHeaders()
    params = new HttpParams({ fromObject: params })
    return this.http.get<any>(url, { headers, params })
      .pipe(catchError((error) => this.handleError(error, () => this.getRequest(url, params))))
  }

  postRequest(url: string, body: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.post<any>(url, body, { headers })
      .pipe(catchError((error) => this.handleError(error, () => this.postRequest(url, body))))
  }

  patchRequest(url: string, body: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.patch<any>(url, body, { headers })
      .pipe(catchError((error) => this.handleError(error, () => this.patchRequest(url, body))))
  }
}
