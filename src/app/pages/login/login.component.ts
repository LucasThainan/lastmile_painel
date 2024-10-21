import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoaderComponent } from '../../components/loader/loader.component'
import { Security } from '../../utils/security.utils'
import { User } from '../../models/user.model'
import { LoginService } from '../../services'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup

  error: string = ''
  isLoading: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return
    this.isLoading = true

    this.loginService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false
        this.setUser(res.user_data, res.access_token, res.refresh_token)
      },
      error: (err: any) => {
        this.isLoading = false
        this.error = err.error.message
        console.log(err)
      }
    })
  }

  setUser(user: User, token: string, refresh_token: string) {
    Security.set(user, token, refresh_token)
    this.router.navigate(['/'])
  }
}
