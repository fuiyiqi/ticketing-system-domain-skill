export interface Comment {
  id?: number;
  content: string;
  authorId: number;
  authorName: string;
  createdAt?: Date;
}

export interface CommentRequest {
  content: string;
  authorId: number;
  authorName: string;
}
