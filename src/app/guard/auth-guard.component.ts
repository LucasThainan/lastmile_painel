import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('access_token')

    if (!token) {
      this.router.navigate(['/login'])
      return false
    }

    return true
  }
}