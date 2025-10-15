import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../models/user';
import { HttpErrorResponse } from '@angular/common/http';


// Feature 4: Root component for login functionality
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Feature 1: Property binding - data properties for template
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Feature 3: Event binding - handles form submission
  // Feature 8: Form validation and submission
  onSubmit(): void {
    this.errorMessage = '';

    // Feature 9: Client-side validation
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }

    this.isLoading = true;
    const credentials: LoginRequest = {
      username: this.username,
      password: this.password,
    };

    // Feature 10: HTTP POST request with Observable subscription
    this.authService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        this.isLoading = false;
        // Feature 14: Programmatic navigation to dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Login failed', error);
        this.isLoading = false;
        // Feature 9: Display validation error message
        if (error.status === 401) {
          this.errorMessage = 'Invalid username or password';
        } else {
          this.errorMessage = error.error?.message || 'Login failed. Please try again.';
        }
      },
    });
  }
}
