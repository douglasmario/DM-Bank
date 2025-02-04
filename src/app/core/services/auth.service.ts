import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USER } from '../../mocks/auth.mock';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private useMock = true; // Set to 'false' for real authentication API
  private readonly AUTH_TOKEN_KEY = 'auth_token'; // Local storage key for auth token

  /** Simulates login using mock data */
  login(credentials: { email: string; password: string }): Observable<User | null> {
    if (this.useMock) {
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        this.setToken('mock_token');
        return of(MOCK_USER as User);
      }
      return of(null);
    }
    return of(null);
  }


  /** Logs the user out and removes the token */
  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
  }

  /** Checks if the user is authenticated */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** Retrieves the authentication token */
  getToken(): string | null {
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /** Retrieves the authentication token as an Observable */
  getAuthToken(): Observable<string | null> {
    return of(this.getToken()); // Wrap the token in an Observable
  }

  /** Stores the authentication token */
  private setToken(token: string): void {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
  }
}
