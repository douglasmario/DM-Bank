import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { MOCK_USER } from '../../mocks/auth.mock';
import { User } from '../models/user.model';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private useMock = true; // Set to 'false' for real authentication API
  private readonly AUTH_TOKEN_KEY = 'auth_token'; // Session storage key for auth token

  constructor(private notificationService: NotificationService) {}

  /** Simulates login using mock data */
  login(credentials: { email: string; password: string }): Observable<User | null> {
    if (this.useMock) {
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        this.setToken('mock_token');
        return of(MOCK_USER as User);
      } else {
        this.notificationService.showError('Invalid email or password');
        return throwError(() => new Error('Invalid email or password'));
      }
    }
    return throwError(() => new Error('Authentication service not available'));
  }

  /** Logs the user out and removes the token */
  logout(): void {
    sessionStorage.removeItem(this.AUTH_TOKEN_KEY);
    this.notificationService.showSuccess('Logged out successfully');
  }

  /** Checks if the user is authenticated */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** Retrieves the authentication token */
  getToken(): string | null {
    return sessionStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /** Retrieves the authentication token as an Observable */
  getAuthToken(): Observable<string | null> {
    return of(this.getToken()); // Wrap the token in an Observable
  }

  /** Stores the authentication token */
  private setToken(token: string): void {
    sessionStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }
}
