import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Ticket } from '../../models/ticket';
import { CommentSectionComponent } from '../comment-section/comment-section.component';
import { HttpErrorResponse } from '@angular/common/http';

// Feature 4: Component for detailed ticket view
@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, CommentSectionComponent],
  templateUrl: './ticket-detail.component.html',
  styleUrl: './ticket-detail.component.css',
})
export class TicketDetailComponent implements OnInit {
  // Feature 1: Properties for data binding
  ticket: Ticket | null = null;
  isLoading: boolean = true;
  isEditing: boolean = false;
  ticketId: number = 0;
  currentUserId: number = 0;

  // Feature 8: Form properties for editing
  editForm: Ticket = {
    title: '',
    description: '',
    status: '',
    priority: '',
    severity: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Feature 12: Accessing route parameters
    this.route.params.subscribe((params) => {
      this.ticketId = +params['id']; // Convert string to number with +
      this.loadTicket();
    });

    // Get current user from auth service
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserId = user.userId;
    }
  }

  // Feature 10: HTTP GET request to fetch ticket details
  loadTicket(): void {
    this.isLoading = true;
    this.ticketService.getTicketById(this.ticketId).subscribe({
      next: (data: Ticket) => {
        this.ticket = data;
        // Copy ticket data to edit form
        this.editForm = { ...data };
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading ticket:', error);
        this.isLoading = false;
        alert('Ticket not found');
        // Feature 14: Navigate back to dashboard on error
        this.router.navigate(['/dashboard']);
      },
    });
  }

  // Feature 3: Event handler to toggle edit mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;

    // If canceling edit, restore original ticket data
    if (!this.isEditing && this.ticket) {
      this.editForm = { ...this.ticket };
    }
  }

  // Feature 8: Form submission for updating ticket
  // Feature 10: HTTP PUT request
  onUpdateTicket(): void {
    // Feature 9: Validation
    if (!this.editForm.title || !this.editForm.description) {
      alert('Title and description are required');
      return;
    }

    if (!this.editForm.title.trim()) {
      alert('Title cannot be empty');
      return;
    }

    this.ticketService.updateTicket(this.ticketId, this.editForm).subscribe({
      next: (updated: Ticket) => {
        this.ticket = updated;
        this.isEditing = false;
        alert('Ticket updated successfully');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error updating ticket:', error);
        alert('Failed to update ticket');
      },
    });
  }

  // Feature 3: Event handler for delete action
  // Feature 10: HTTP DELETE request
  onDeleteTicket(): void {
    // Confirm before deleting
    if (
      confirm(
        'Are you sure you want to delete this ticket? This action cannot be undone.'
      )
    ) {
      this.ticketService.deleteTicket(this.ticketId).subscribe({
        next: () => {
          alert('Ticket deleted successfully');
          // Feature 14: Programmatic navigation back to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error: Error) => {
          console.error('Error deleting ticket:', error);
          alert('Failed to delete ticket. Please try again.');
        },
      });
    }
  }

  // Feature 14: Navigate back to dashboard
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  
  // Get reporter name from the ticket
  getReporterName(): string {
    if (!this.ticket) return 'Unknown';
    
    // If we have reporterUsername from backend, use it
    if (this.ticket.reporterUsername) {
      return this.ticket.reporterUsername;
    }
    
    // Otherwise, just show the ID
    return `User #${this.ticket.reporterId}`;
  }
  
  // Get assignee name from the ticket
  getAssigneeName(): string {
    if (!this.ticket || !this.ticket.assigneeId) return 'Unassigned';
    
    // If we have assigneeUsername from backend, use it
    if (this.ticket.assigneeUsername) {
      return this.ticket.assigneeUsername;
    }
    
    // Otherwise, just show the ID
    return `User #${this.ticket.assigneeId}`;
  }
}
