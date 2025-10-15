export interface User {
  id?: number;
  username: string;
  password?: string;
  email: string;
  role: string;
  createdAt?: Date;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userId: number;
  username: string;
  email: string;
  role: string;
  message: string;
}
