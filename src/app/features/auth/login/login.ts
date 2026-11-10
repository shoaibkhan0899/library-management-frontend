
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LucideEye, LucideEyeOff],
  templateUrl: './login.html',
})
export class Login {
  submitted = false;
  isSubmitting = false;
  errorMessage = '';
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  readonly loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.isSubmitting = false;

        const dashboardRoute = response.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
        this.router.navigateByUrl(dashboardRoute);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Login failed. Check your email and password, then try again.';
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
