import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap, switchMap } from 'rxjs/operators';
import { Ticket } from '../models/ticket';
import { Comment, CommentRequest } from '../models/comment';
import { ErrorHandlingService } from './error-handling.service';
import { User } from '../models/user';

// Feature 10: Service for ticket-related HTTP operations
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:8081/api/tickets';
  private userApiUrl = 'http://localhost:8081/api/users';

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlingService
  ) {}
  
  // Convert ISO date strings to Date objects
  private convertDates(ticket: Ticket): Ticket {
    if (ticket.createdAt && typeof ticket.createdAt === 'string') {
      ticket.createdAt = new Date(ticket.createdAt);
    }
    if (ticket.updatedAt && typeof ticket.updatedAt === 'string') {
      ticket.updatedAt = new Date(ticket.updatedAt);
    }
    return ticket;
  }

  // Feature 10: GET request to fetch all tickets with optional query parameters
  getAllTickets(
    status?: string,
    priority?: string,
    reporterId?: number
  ): Observable<Ticket[]> {
    // Build HTTP parameters
    let params = new HttpParams();
    if (status) {
      params = params.append('status', status);
    }
    if (priority) {
      params = params.append('priority', priority);
    }
    if (reporterId) {
      params = params.append('reporterId', reporterId.toString());
    }

    console.log(`Fetching tickets from ${this.apiUrl} with params:`, params.toString() || 'none');

    return this.http.get<Ticket[]>(this.apiUrl, { params })
      .pipe(
        tap(tickets => console.log(`Received ${tickets.length} tickets from API`)),
        map(tickets => tickets.map(ticket => this.convertDates(ticket))),
        // Get all users once to reduce API calls
        switchMap(tickets => {
          return this.getAllUsers().pipe(
            map(users => {
              // Add username to each ticket
              return tickets.map(ticket => {
                const enhanced = { ...ticket };
                
                // Find and add reporter username
                if (ticket.reporterId) {
                  const reporter = users.find(user => user.id === ticket.reporterId);
                  if (reporter) {
                    enhanced.reporterUsername = reporter.username;
                  }
                }
                
                // Find and add assignee username
                if (ticket.assigneeId) {
                  const assignee = users.find(user => user.id === ticket.assigneeId);
                  if (assignee) {
                    enhanced.assigneeUsername = assignee.username;
                  }
                }
                
                return enhanced;
              });
            })
          );
        }),
        catchError(error => {
          console.error('API Error in getAllTickets:', error);
          return this.errorService.handleError(error);
        })
      );
  }

  // Get all users - internal method for caching purposes
  private getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userApiUrl}`)
      .pipe(
        catchError(error => {
          console.warn(`Could not fetch users:`, error);
          return of([]); // Return empty array if users can't be fetched
        })
      );
  }
  
  // Get user by ID - internal method
  private getUserById(id: number): Observable<User | null> {
    // Since there's no direct endpoint to get user by ID,
    // we'll get all users and find the one we need
    return this.getAllUsers().pipe(
      map(users => users.find(user => user.id === id) || null),
      catchError(error => {
        console.warn(`Could not fetch user with ID ${id}:`, error);
        return of(null); // Return null if user not found
      })
    );
  }
  
  // Enhance ticket with user information
  private enhanceTicketWithUserInfo(ticket: Ticket): Observable<Ticket> {
    const enhanced = { ...ticket };
    const tasks = [];
    
    // If there's a reporter ID, get the username
    if (ticket.reporterId) {
      tasks.push(
        this.getUserById(ticket.reporterId).pipe(
          tap(user => {
            if (user) {
              enhanced.reporterUsername = user.username;
              console.log(`Set reporter username to ${user.username}`);
            } else {
              console.log(`Reporter with ID ${ticket.reporterId} not found`);
            }
          })
        )
      );
    }
    
    // If there's an assignee ID, get the username
    if (ticket.assigneeId) {
      tasks.push(
        this.getUserById(ticket.assigneeId).pipe(
          tap(user => {
            if (user) {
              enhanced.assigneeUsername = user.username;
              console.log(`Set assignee username to ${user.username}`);
            } else {
              console.log(`Assignee with ID ${ticket.assigneeId} not found`);
            }
          })
        )
      );
    }
    
    // If we have any tasks, run them all and return the enhanced ticket
    if (tasks.length > 0) {
      return forkJoin(tasks).pipe(
        map(() => enhanced),
        catchError(error => {
          console.error('Error enhancing ticket with user info:', error);
          return of(enhanced); // Return ticket even if enhancement fails
        })
      );
    }
    
    // If no tasks, just return the ticket as is
    return of(enhanced);
  }

  // Feature 10: GET request to fetch single ticket by ID
  getTicketById(id: number): Observable<Ticket> {
    console.log(`Fetching ticket details from ${this.apiUrl}/${id}`);
    return this.http.get<Ticket>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(ticket => console.log('Received ticket from API:', ticket)),
        map(ticket => this.convertDates(ticket)),
        switchMap(ticket => this.enhanceTicketWithUserInfo(ticket)),
        catchError(error => {
          console.error(`API Error in getTicketById(${id}):`, error);
          return this.errorService.handleError(error);
        })
      );
  }

  // Feature 10: POST request to create new ticket
  createTicket(ticket: Ticket): Observable<Ticket> {
    console.log(`Creating new ticket at ${this.apiUrl}`, ticket);
    return this.http.post<Ticket>(this.apiUrl, ticket)
      .pipe(
        tap(newTicket => console.log('Created ticket from API:', newTicket)),
        map(newTicket => this.convertDates(newTicket)),
        catchError(error => {
          console.error('API Error in createTicket:', error);
          return this.errorService.handleError(error);
        })
      );
  }

  // Feature 10: PUT request to update existing ticket
  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.apiUrl}/${id}`, ticket)
      .pipe(
        map(updatedTicket => this.convertDates(updatedTicket)),
        catchError(error => this.errorService.handleError(error))
      );
  }

  // Feature 10: DELETE request to remove ticket
  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  // Feature 10: GET request to fetch comments for a ticket
  getComments(ticketId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${ticketId}/comments`)
      .pipe(
        map(comments => comments.map(comment => this.convertCommentDates(comment))),
        catchError(error => this.errorService.handleError(error))
      );
  }
  
  // Convert ISO date strings to Date objects for comments
  private convertCommentDates(comment: Comment): Comment {
    if (comment.createdAt && typeof comment.createdAt === 'string') {
      comment.createdAt = new Date(comment.createdAt);
    }
    return comment;
  }

  // Feature 10: POST request to add comment to ticket
  addComment(ticketId: number, comment: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/${ticketId}/comments`, comment)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }
}
