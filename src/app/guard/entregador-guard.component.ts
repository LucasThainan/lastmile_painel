import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router'
import { Security } from '../utils/security.utils'

@Injectable({ providedIn: 'root' })
export class EntregadorGuard {
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = Security.getUser()
    
    if (!(user.type === 2)) {
      this.router.navigate(['/pedidos'])
      return false
    }

    return true
  }
}