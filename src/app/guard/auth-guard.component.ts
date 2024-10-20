import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { Security } from '../utils/security.utils'

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!Security.hasToken()) {
      Security.clear()
      this.router.navigate(['/login'])
      return false
    }

    return true
  }
}