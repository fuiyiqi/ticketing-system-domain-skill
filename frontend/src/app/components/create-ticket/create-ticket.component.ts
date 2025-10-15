import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ticket.component.html',
  styleUrl: './create-ticket.component.css'
})
export class CreateTicketComponent {
  // New ticket form data
  newTicket: Ticket = {
    title: '',
    description: '',
    status: 'OPEN',
    priority: 'MEDIUM',
    severity: 'MINOR',
    reporterId: 0,
  };
  
  constructor(
    private ticketService: TicketService, 
    private router: Router,
    private authService: AuthService
  ) {
    // Set the reporter ID to current user
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.userId) {
      this.newTicket.reporterId = currentUser.userId;
    }
  }
  
  // Form submission handler
  onCreateTicket(): void {
    // Form validation
    if (!this.newTicket.title || !this.newTicket.description) {
      alert('Title and description are required');
      return;
    }

    this.ticketService.createTicket(this.newTicket).subscribe({
      next: (created: Ticket) => {
        console.log('Ticket created:', created);
        // Navigate back to dashboard after creating
        this.router.navigate(['/dashboard']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating ticket:', error);
        alert('Failed to create ticket');
      },
    });
  }
  
  // Cancel and return to dashboard
  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}
