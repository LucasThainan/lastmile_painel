import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Router, RouterLink, RouterLinkActive } from '@angular/router'
import { Security } from '../../utils/security.utils'
import { User } from '../../models/user.model'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user!: User
  links: any[]
  openNav: boolean = false

  constructor(private router: Router) {
    this.user = Security.getUser()

    this.links = [{ name: 'início', url: '/' }]

    this.user.type == 1
      ? this.links.push({ name: 'pedidos', url: '/pedidos' })
      : this.links.push({ name: 'entregas', url: '/entregas' })


  }

  checkRoute(event: any) {
    if (!event.srcElement.className) this.openNav = false
  }

  logout() {
    Security.clear()
    this.router.navigate(['/login'])
  }
}
