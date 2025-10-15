import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../models/ticket';

// Feature 4: Grandchild component (Dashboard > TicketList > TicketCard)
@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket-card.component.html',
  styleUrl: './ticket-card.component.css',
})
export class TicketCardComponent {
  // Feature 5: @Input to receive data from parent (TicketList)
  @Input() ticket!: Ticket;
  // Feature 7: Receiving loop contextual variables from parent
  @Input() index!: number;
  @Input() isFirst!: boolean;
  @Input() totalCount!: number;

  // Feature 5: @Output to emit events to parent
  @Output() ticketClick = new EventEmitter<number>();

  // Feature 3: Event handler that emits to parent
  onClick(): void {
    if (this.ticket.id) {
      this.ticketClick.emit(this.ticket.id);
    }
  }

  // Feature 2: Method to get CSS class based on priority
  getPriorityClass(): string {
    return `priority-${this.ticket.priority.toLowerCase()}`;
  }

  // Feature 2: Method to get CSS class based on status
  getStatusClass(): string {
    return `status-${this.ticket.status.toLowerCase().replace('_', '-')}`;
  }
}
