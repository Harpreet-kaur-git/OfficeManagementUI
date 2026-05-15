import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields correctly.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    const payload = {
      username: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.loginService.validateUserToken(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 200 && response.data) {
          const token = response.data.token;
          if (token) {
            this.authService.setToken(token);
            this.router.navigateByUrl(this.authService.dashboardUrl);
            return;
          }
        }
        this.errorMessage = response.message || 'Login failed. Please try again.';
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error?.error?.message || 'An error occurred. Please try again.';
        console.error('Login error:', error);
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
