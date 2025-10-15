import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../models/user';
import { TicketListComponent } from '../ticket-list/ticket-list.component';

// Feature 4: Parent component in hierarchy (Dashboard > TicketList)
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TicketListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  // Feature 1: Properties for interpolation and binding
  currentUser: LoginResponse | null = null;

  // Feature 5: Data passed to child component via @Input
  filterStatus: string = '';
  filterPriority: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get current logged-in user
    this.currentUser = this.authService.getCurrentUser();

    if (!this.currentUser) {
      // Feature 14: Programmatic navigation if not authenticated
      this.router.navigate(['/login']);
    }
  }

  // Feature 3: Event handler for logout button
  onLogout(): void {
    this.authService.logout();
    // Feature 14: Navigate to login after logout
    this.router.navigate(['/login']);
  }

  // Feature 3: Event handlers for filter changes
  // Feature 5: Methods to update data passed to child
  onStatusFilterChange(status: string): void {
    this.filterStatus = status;
  }

  onPriorityFilterChange(priority: string): void {
    this.filterPriority = priority;
  }
}
