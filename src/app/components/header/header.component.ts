import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { Security } from '../../utils/security.utils'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  links: any[]
  openNav: boolean = false

  constructor(private router: Router) {
    this.links = [
      { name: 'início', url: '/' },
      { name: 'pedidos', url: '/pedidos' }
    ]
  }

  checkRoute(event: any) {
    if (!event.srcElement.className) this.openNav = false
  }

  logout() {
    Security.clear()
    this.router.navigate(['/login'])
  }
}
