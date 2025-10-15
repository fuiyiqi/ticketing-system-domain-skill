import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { DebugComponent } from './debug.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule, DebugComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Ticket Management System';
  
  constructor(
    public authService: AuthService,
    public router: Router
  ) {
    console.log('AppComponent initialized');
    console.log('Auth service available:', !!this.authService);
    console.log('Is user logged in:', this.authService?.isLoggedIn());
  }
  
  // Logout function to clear user session and redirect to login
  logout(): void {
    console.log('Logging out user');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
