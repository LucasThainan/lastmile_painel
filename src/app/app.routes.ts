import { Routes } from '@angular/router'

import { AuthGuard } from './guard/auth-guard.component'
import { LayoutComponent } from './components/layout/layout.component'
import { ClientGuard } from './guard/client-guard.component'
import { EntregadorGuard } from './guard/entregador-guard.component'

export const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'pedidos',
        canActivate: [ClientGuard],
        loadComponent: () => import('./pages/pedidos/pedidos.component').then(m => m.PedidosComponent)
      },
      {
        path: 'entregas',
        canActivate: [EntregadorGuard],
        loadComponent: () => import('./pages/entregador-pedidos/entregador-pedidos.component').then(m => m.EntregadorPedidosComponent)
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent)
  },
]
