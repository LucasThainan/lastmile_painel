import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, catchError, throwError } from 'rxjs'
import { Security } from '../utils/security.utils'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = Security.getToken()
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    // if (token) headers = headers.set('x-access-token', token)
    if (token) headers = headers.set('bearer', token)
    return headers
  }

  private handleError = (error: any) => {
    console.log(error)
    return throwError(() => error)
  }

  getRequest(url: string, params: any): Observable<any> {
    const headers = this.getHeaders()
    params = new HttpParams({ fromObject: params })
    return this.http.get<any>(url, { headers, params }).pipe(catchError((error) => this.handleError(error)))
  }

  postRequest(url: string, body: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.post<any>(url, body, { headers }).pipe(catchError((error) => this.handleError(error)))
  }

  patchRequest(url: string, body: any): Observable<any> {
    const headers = this.getHeaders()
    return this.http.patch<any>(url, body, { headers }).pipe(catchError((error) => this.handleError(error)))
  }
}
