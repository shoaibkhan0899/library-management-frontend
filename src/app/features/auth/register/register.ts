import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideEye, LucideEyeOff } from '@lucide/angular';
import { AuthService } from '../../../services/auth.service';
import { RegisterRequest } from '../../../models/auth.model';

const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const confirmPassword = form.get('confirmPassword')?.value;

  if (!confirmPassword || password === confirmPassword) {
    return null;
  }

  return { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, LucideEye, LucideEyeOff],
  templateUrl: './register.html',
})
export class Register {
  submitted = false;
  isSubmitting = false;
  errorMessage = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  readonly registerForm = new FormGroup(
    {
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/[^A-Za-z0-9]/),
        ],
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    { validators: passwordMatchValidator },
  );

  onSubmit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();
    const request: RegisterRequest = {
      name: formValue.name,
      email: formValue.email,
      password: formValue.password,
    };

    this.isSubmitting = true;
    this.authService.register(request).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.isSubmitting = false;
        this.errorMessage = 'Registration failed. Please try again.';
      },
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}