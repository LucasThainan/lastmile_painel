import { User } from '../models/user.model'

export class Security {
  public static set(user: User, token: string, refresh_token: string) {
    const userData = JSON.stringify(user)

    localStorage.setItem('user', userData)
    localStorage.setItem('access_token', token)
    localStorage.setItem('refresh_token', refresh_token)
  }

  public static setUser(user: User) {
    const userData = JSON.stringify(user)
    localStorage.setItem('user', userData)
  }

  public static setToken(token: string) {
    localStorage.setItem('access_token', token)
  }

  public static setRefreshToken(token: string) {
    localStorage.setItem('refresh_token', token)
  }

  public static getUser(): User {
    const data = localStorage.getItem('user')

    if (data) return JSON.parse(data)

    throw new Error('Usuário não encontrado na sessão')
  }

  public static getToken(): string {
    const token = localStorage.getItem('access_token')

    if (token) return token

    return ''
  }

  public static getRefreshToken(): string {
    const token = localStorage.getItem('refresh_token')

    if (token) return token

    return ''
  }

  public static hasToken(): boolean {
    if (this.getToken()) return true
    return false
  }

  public static clear() {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }
}
