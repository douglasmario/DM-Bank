import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USER } from '../../mocks/auth.mock';

@Injectable({
  providedIn: 'root', // This makes AuthService available globally in the application
})
export class AuthService {
  private useMock = true; // Toggle this to 'false' for using real authentication API
  private readonly AUTH_TOKEN_KEY = 'auth_token'; // Key used to store the authentication token in localStorage

  constructor() {}

  // Simulate login with mock data (for demo purposes)
  login(credentials: { email: string; password: string }): Observable<any> {
    if (this.useMock) {
      // Mock logic: if the email and password match, simulate a successful login
      if (credentials.email === 'user@example.com' && credentials.password === 'password') {
        localStorage.setItem(this.AUTH_TOKEN_KEY, 'mock_token'); // Store the mock token in localStorage
        return of(MOCK_USER); // Return mock user data
      } else {
        return of(null); // Mock failed login
      }
    }
    // In production, replace with real authentication logic
    return of(null); // Return null as fallback for real authentication logic not yet implemented
  }

  // Log the user out and remove the token from localStorage
  logout(): void {
    localStorage.removeItem(this.AUTH_TOKEN_KEY); // Remove the token from localStorage on logout
  }

  // Check if the user is authenticated based on the presence of the token
  isAuthenticated(): boolean {
    // Check if the auth token exists in localStorage
    return !!localStorage.getItem(this.AUTH_TOKEN_KEY); // Return true if token exists, else false
  }

  // Retrieve the authentication token from localStorage
  getAuthToken(): Observable<string | null> {
    const token = localStorage.getItem(this.AUTH_TOKEN_KEY); // Retrieve the token
    return of(token); // Return the token as an observable
  }
}
