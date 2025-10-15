import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginRequest, LoginResponse, User } from '../models/user';
import { ErrorHandlingService } from './error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // API base URL
  private apiUrl = 'http://localhost:8081/api/auth';
  
  // Store current user data
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private errorService: ErrorHandlingService
  ) {
    // Check if user data exists in session
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Real login with backend authentication
  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log(`Attempting login at ${this.apiUrl}/login`, { username: credentials.username });
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Login successful:', response);
          // Store user data in session storage
          sessionStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }),
        catchError(error => {
          console.error('Login failed:', error);
          return this.errorService.handleError(error);
        })
      );
  }

  // Real registration with backend
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user)
      .pipe(
        catchError(error => this.errorService.handleError(error))
      );
  }

  // Logout method
  logout(): void {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    console.log('User logged out');
  }

  // Get current user
  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
