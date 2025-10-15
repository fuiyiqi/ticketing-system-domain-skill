import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService } from '../../services/ticket.service';
import { AuthService } from '../../services/auth.service';
import { Comment, CommentRequest } from '../../models/comment';
import { HttpErrorResponse } from '@angular/common/http';

// Feature 4: Child component for comments section
@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css',
})
export class CommentSectionComponent implements OnInit {
  // Feature 5: @Input to receive data from parent
  @Input() ticketId!: number;
  @Input() currentUserId!: number;

  // Feature 1: Properties for data binding
  comments: Comment[] = [];
  isLoading: boolean = true;
  newCommentContent: string = '';
  currentUsername: string = '';

  constructor(
    private ticketService: TicketService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUsername = user.username;
    }
    this.loadComments();
  }

  // Feature 10: HTTP GET request to fetch comments
  loadComments(): void {
    this.isLoading = true;
    this.ticketService.getComments(this.ticketId).subscribe({
      next: (data: Comment[]) => {
        this.comments = data;
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error loading comments:', error);
        this.isLoading = false;
      },
    });
  }

  // Feature 8: Form submission for adding comment
  // Feature 10: HTTP POST request
  onAddComment(): void {
    // Feature 9: Validation
    if (!this.newCommentContent.trim()) {
      alert('Comment cannot be empty');
      return;
    }

    const commentRequest: CommentRequest = {
      content: this.newCommentContent,
      authorId: this.currentUserId,
      authorName: this.currentUsername,
    };

    this.ticketService.addComment(this.ticketId, commentRequest).subscribe({
      next: (newComment: Comment) => {
        this.comments.push(newComment);
        this.newCommentContent = '';
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error adding comment:', error);
        alert('Failed to add comment');
      },
    });
  }
}
