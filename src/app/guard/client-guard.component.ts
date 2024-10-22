import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { Security } from '../utils/security.utils'

@Injectable({ providedIn: 'root' })
export class ClientGuard {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = Security.getUser()

    if (!(user.type === 1)) {
      this.router.navigate(['/entregas'])
      return false
    }

    return true
  }
}