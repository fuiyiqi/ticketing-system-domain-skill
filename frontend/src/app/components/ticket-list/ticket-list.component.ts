import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket';
import { TicketCardComponent } from '../ticket-card/ticket-card.component';

// Feature 4: Child component (Dashboard > TicketList > TicketCard)
@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TicketCardComponent],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.css',
})
export class TicketListComponent implements OnInit, OnChanges {
  // Feature 5: @Input to receive data from parent (Dashboard)
  @Input() filterStatus: string = '';
  @Input() filterPriority: string = '';
  @Input() currentUserId: number = 0;

  // Feature 1: Properties for template binding
  tickets: Ticket[] = [];
  isLoading: boolean = true;

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  // Feature 5: Detect changes in @Input properties from parent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filterStatus'] || changes['filterPriority']) {
      this.loadTickets();
    }
  }

  // Feature 10: HTTP GET request with Observable
  loadTickets(): void {
    this.isLoading = true;

    const status = this.filterStatus || undefined;
    const priority = this.filterPriority || undefined;

    this.ticketService.getAllTickets(status, priority).subscribe({
      next: (data: Ticket[]) => {
        this.tickets = data;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading tickets:', error);
        this.isLoading = false;
      },
    });
  }

  // Navigate to create ticket page
  navigateToCreateTicket(): void {
    this.router.navigate(['/create-ticket']);
  }

  // Feature 3: Event handler for ticket card click
  // Feature 11: Navigate to detail route with parameter
  onTicketClick(ticketId: number): void {
    // Feature 14: Programmatic navigation with route parameter
    this.router.navigate(['/ticket', ticketId]);
  }
}
