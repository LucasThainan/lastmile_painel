import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router, RouterLink } from '@angular/router'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { LoaderComponent } from '../../components/loader/loader.component'
import { Security } from '../../utils/security.utils'
import { User } from '../../models/user.model'
import { UserService } from '../../services'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LoaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup

  error: string = ''
  isLoading: boolean = false

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      password_confirm: [null, [Validators.required, Validators.minLength(6)]],
      document: [null, [Validators.required]],
      phone: [null, [Validators.required]]
    })
  }

  onSignupSubmit(): void {
    if (this.signupForm.invalid) return
    this.isLoading = true

    if (this.signupForm.controls['password'].value !== this.signupForm.controls['password_confirm'].value) {
      this.error = 'As senhas não conferem'
      this.isLoading = false
      return
    }
    this.error = ''

    const data: Omit<User, 'id_usuario'> = {
      name: this.signupForm.controls['name'].value,
      email: this.signupForm.controls['email'].value,
      password: this.signupForm.controls['password'].value,
      document: this.signupForm.controls['document'].value,
      phone: this.signupForm.controls['phone'].value,
      type: 1,
      status_usuario: 1
    }

    this.userService.createUser(data).subscribe({
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
